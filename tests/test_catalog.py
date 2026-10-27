import copy
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from catalog import identity, load, validate_records
from explore import select
from check_links import normalized, is_access_gate
from render import generate


class CatalogTests(unittest.TestCase):
    def test_catalog_and_generated_payload_agree(self):
        import json
        data = load()
        self.assertFalse(validate_records(data, load("collection.json")))
        payload = json.loads(generate()["site/catalog.json"])
        self.assertEqual({r["id"] for r in data}, {r["id"] for r in payload["papers"]})

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


if __name__ == "__main__":
    unittest.main()
