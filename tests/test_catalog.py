import copy
import sys
import unittest
from unittest.mock import MagicMock, patch
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from catalog import identity, load, validate_records, validate_systems
from explore import select
from check_links import check, normalized, is_access_gate
from render import generate


class CatalogTests(unittest.TestCase):
    def test_catalog_and_generated_payload_agree(self):
        import json
        data = load()
        self.assertFalse(validate_records(data, load("collection.json")))
        payload = json.loads(generate()["site/catalog.json"])
        self.assertEqual({r["id"] for r in data}, {r["id"] for r in payload["papers"]})
        systems = load("systems.json")
        self.assertFalse(validate_systems(systems, load("collection.json"), data))
        self.assertEqual({r["id"] for r in systems}, {r["id"] for r in payload["systems"]})

    def test_system_references_and_execution_claims_are_checked(self):
        systems = copy.deepcopy(load("systems.json"))
        self.assertTrue(systems, "systems catalog must not be empty")
        systems[0]["related_papers"] = ["not-a-catalog-paper"]
        systems[0]["execution_status"] = "reproduced"
        errors = validate_systems(systems, load("collection.json"), load())
        self.assertTrue(any("related paper reference" in e for e in errors))
        self.assertTrue(any("must not imply execution" in e for e in errors))

    def test_system_search_preserves_raw_evidence_without_fake_dates(self):
        systems = load("systems.json")
        results = select(load() + systems, kind="system")
        self.assertTrue(results)
        self.assertEqual({r["id"] for r in results}, {r["id"] for r in systems})
        self.assertTrue(all("date" not in r and "year" not in r and r["execution_status"] == "not-run" and r["sources"] for r in results))
        self.assertEqual([r["name"] for r in results], sorted([r["name"] for r in results], key=str.casefold))

    def test_listing_tables_are_contiguous_and_include_every_record(self):
        outputs = generate()
        for path, first_header, count in [
            ("docs/systems.md", "| System |", len(load("systems.json"))),
            ("docs/papers.md", "| Source date |", len(load())),
        ]:
            lines = outputs[path].splitlines()
            start = next(i for i, line in enumerate(lines) if line.startswith(first_header))
            table = []
            for line in lines[start:]:
                if not line.startswith("|"):
                    break
                table.append(line)
            self.assertEqual(len(table), count + 2, path)

    def test_badges_come_from_catalog_counts(self):
        readme = generate()["README.md"]
        self.assertIn(f"Research works: {len(load())}", readme)
        self.assertIn(f"Systems & frameworks: {len(load('systems.json'))}", readme)
        self.assertNotIn("{{BADGES}}", readme)

    def test_recall_names_are_short_unique_and_do_not_replace_titles(self):
        for records, title_field in [(load(), "title"), (load("systems.json"), "name")]:
            names = [r["short_name"].casefold() for r in records]
            self.assertEqual(len(names), len(set(names)))
            self.assertTrue(all(r[title_field] and 0 < len(r["short_name"]) <= 40 for r in records))

    def test_duplicate_arxiv_versions_rejected(self):
        records = copy.deepcopy(load()[:1])
        records[0]["url"] = "https://arxiv.org/abs/2501.12345"
        records[0]["sources"].append(records[0]["url"])
        other = copy.deepcopy(records[0])
        other.update(id="duplicate-work", url="https://arxiv.org/pdf/2501.12345v2.pdf")
        other["sources"].append(other["url"])
        errors = validate_records([*records, other], load("collection.json"))
        self.assertTrue(any("duplicate primary work" in e for e in errors))

    def test_openreview_identity_keeps_paper_id(self):
        self.assertEqual(identity("https://openreview.net/forum?id=abc"), identity("https://openreview.net/pdf?id=abc"))
        self.assertNotEqual(identity("https://openreview.net/forum?id=abc"), identity("https://openreview.net/forum?id=def"))

    def test_unsafe_url_rejected(self):
        records = copy.deepcopy(load()[:1])
        records[0]["url"] = "javascript:alert(1)"
        records[0]["sources"].append(records[0]["url"])
        self.assertTrue(any("invalid public HTTPS" in e for e in validate_records(records, load("collection.json"))))

    def test_filter_preserves_evidence_and_combines_constraints(self):
        results = select(load(), topic="memory", kind="benchmark")
        self.assertTrue(results)
        self.assertTrue(all("memory" in r["topics"] and r["kind"] == "benchmark" and r["limitations"] and r["sources"] for r in results))
        self.assertEqual(select(load(), "this-is-not-a-research-paper-xyz"), [])

    def test_title_comparison_handles_unicode_and_punctuation(self):
        self.assertEqual(normalized("Darwin Gödel Machine: Agents"), normalized("Darwin Godel Machine — Agents"))

    def test_access_gate_is_not_source_content(self):
        self.assertTrue(is_access_gate("https://openreview.net/challenge?redirect=/pdf?id=abc"))
        self.assertTrue(is_access_gate("https://publisher.example/authorize?target=paper"))
        self.assertFalse(is_access_gate("https://arxiv.org/abs/2501.12345"))

    def test_cookie_error_redirect_with_http_success_is_restricted(self):
        response = MagicMock()
        response.status = 200
        response.url = "https://www.nature.com/articles/example?error=cookies_not_supported&code=example"
        response.__enter__.return_value = response
        with patch("check_links.urllib.request.urlopen", return_value=response):
            result = check("https://www.nature.com/articles/example")
        self.assertEqual(result["http_status"], 200)
        self.assertEqual(result["status"], "restricted-or-transient")
        self.assertIn("not verified", result["note"])
        self.assertFalse(is_access_gate("https://example.org/article?topic=cookies_not_supported"))


if __name__ == "__main__":
    unittest.main()
