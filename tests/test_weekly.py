import copy
import datetime as dt
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from catalog import ROOT, load
from weekly import (load_issues, validate_issues, validate_history, generate_weekly,
                    render_issue, source_urls, next_due)
from validate import validate_links
from render import generate
from publication_checkpoint import capture, verify

TODAY = dt.date(2026, 11, 9)


class WeeklyTests(unittest.TestCase):
    def setUp(self):
        self.issue = copy.deepcopy(load_issues()[0])
        self.issue["corrections"] = []
        self.papers = load()

    def errors(self, issue=None, today=TODAY):
        return validate_issues([issue or self.issue], self.papers, today)

    def following_issue(self):
        other = copy.deepcopy(self.issue)
        other.update(week_start="2026-11-09", week_end="2026-11-15", published_on="2026-11-16")
        for pick in other["picks"]:
            pick["citation"]["checked"] = "2026-11-16"
            pick["event"] = {"kind": "revision", "date": "2026-11-12", "source": pick["citation"]["url"]}
            pick["why_now"] = "A newly inspected evaluation changes the earlier interpretation."
        return other

    def published_state(self):
        return {"weeks": {"2026-11-02": {"status": "published", "commit": "a" * 40,
                "workflow": "https://github.com/example/repo/actions/runs/1", "verified_on": "2026-11-09"}}}

    def test_pilot_and_payload_consistency(self):
        self.assertEqual(self.errors(), [])
        outputs = generate()
        self.assertEqual(outputs["docs/weekly/2026-11-02.md"], render_issue(load_issues()[0]).rstrip() + "\n")
        self.assertIn("Latest issue", outputs["README.md"])
        latest = max(load_issues(), key=lambda x: x["week_start"])
        for i in range(1, min(3, len(latest["picks"])) + 1):
            self.assertIn(f"docs/weekly/{latest['week_start']}.md#pick-{i}", outputs["README.md"])
        self.assertNotIn("{{WEEKLY}}", outputs["README.md"])
        self.assertEqual(json.loads(outputs["site/catalog.json"]), json.loads((ROOT / "site/catalog.json").read_text()))

    def test_unknown_and_duplicate_references(self):
        for value in ("missing-paper", self.issue["picks"][1]["paper_id"]):
            issue = copy.deepcopy(self.issue)
            issue["picks"][0]["paper_id"] = value
            self.assertTrue(self.errors(issue))
        self.assertTrue(validate_issues([self.issue, self.issue], self.papers, TODAY))
        self.issue["picks"][0]["connections"][0]["paper_id"] = "missing"
        self.assertTrue(self.errors())

    def test_invalid_and_insufficient_dates(self):
        for field, value in (("week_start", "2026-11-03"), ("week_end", "2026-11-09"),
                             ("published_on", "2026-11-08"), ("published_on", "2026"),
                             ("published_on", "2026-11-10")):
            issue = copy.deepcopy(self.issue); issue[field] = value
            self.assertTrue(self.errors(issue), field)
        for value in ("2026", "2026-11", "2026-10-31"):
            issue = copy.deepcopy(self.issue); issue["picks"][0]["event"]["date"] = value
            self.assertTrue(self.errors(issue), value)
        self.issue["picks"][0]["citation"]["date"] = "2026"
        self.assertTrue(self.errors())

    def test_review_date_is_not_a_release_date(self):
        pick = self.issue["picks"][0]
        pick["event"].pop("occurred_at")
        pick["event"]["date"] = pick["citation"]["checked"]
        self.assertTrue(self.errors())

    def test_sydney_event_conversion_and_precision(self):
        # A Tuesday UTC release is a Wednesday Sydney event in the pilot.
        pick = self.issue["picks"][1]
        self.assertEqual(pick["event"]["date"], "2026-11-04")
        pick["event"]["date"] = "2026-11-03"
        self.assertTrue(self.errors())
        pick["event"]["date"] = "2026-11-04"
        pick["event"]["occurred_at"] = "2026-11-04T04:57:20"
        self.assertTrue(self.errors())

    def test_feature_requires_body_review_and_version(self):
        self.issue["picks"][0]["citation"]["review_depth"] = "abstract"
        self.assertTrue(self.errors())
        self.issue["picks"][0]["citation"]["review_depth"] = "full-text"
        self.issue["picks"][0]["citation"]["reviewed_sources"][0]["sections"] = ""
        self.assertTrue(self.errors())

    def test_one_or_two_picks_allowed_but_empty_issue_rejected(self):
        self.issue["picks"] = self.issue["picks"][:1]
        self.assertEqual(self.errors(), [])
        self.issue["picks"] = []
        self.assertTrue(self.errors())

    def test_repeats_need_new_substantive_event_and_explanation(self):
        other = self.following_issue()
        self.assertEqual(validate_issues([other, self.issue], self.papers, dt.date(2026, 11, 16)), [])
        other["picks"][0]["why_now"] = self.issue["picks"][0]["why_now"]
        self.assertTrue(validate_issues([self.issue, other], self.papers, dt.date(2026, 11, 16)))
        other = self.following_issue(); other["picks"][0]["event"]["kind"] = "new"
        self.assertTrue(validate_issues([self.issue, other], self.papers, dt.date(2026, 11, 16)))

    def test_historical_body_does_not_follow_catalog_changes(self):
        original = render_issue(self.issue)
        altered = copy.deepcopy(self.papers)
        for paper in altered:
            paper.update(title="Changed title", short_name="Changed", mechanism="Different annotation",
                         checked="2027-01-01", status="peer-reviewed")
        self.assertEqual(validate_issues([self.issue], altered, TODAY), [])
        self.assertEqual(render_issue(self.issue), original)
        changed = copy.deepcopy(self.issue); changed["picks"][0]["evidence"] = "Silent rewrite"
        self.assertTrue(validate_history([changed], [self.issue]))
        self.assertTrue(validate_history([], [self.issue]))

    def test_corrections_are_dated_sourced_and_append_only(self):
        corrected = copy.deepcopy(self.issue)
        corrected["corrections"] = [{"date": "2026-11-09", "note": "Clarified a denominator.",
                                    "sources": ["https://arxiv.org/abs/2611.07624"]}]
        self.assertEqual(self.errors(corrected), [])
        self.assertEqual(validate_history([corrected], [self.issue]), [])
        self.assertIn("Dated corrections", render_issue(corrected))
        self.assertTrue(validate_history([self.issue], [corrected]))
        corrected["corrections"][0]["date"] = "2026-11-08"
        self.assertTrue(self.errors(corrected))

    def test_archive_latest_and_old_issues_are_stable(self):
        other = self.following_issue()
        outputs, teaser = generate_weekly([self.issue, other])
        self.assertLess(outputs["docs/weekly/README.md"].index("2026-11-09"), outputs["docs/weekly/README.md"].index("2026-11-02"))
        self.assertIn("2026-11-09.md", teaser)
        self.assertEqual(outputs["docs/weekly/2026-11-02.md"], render_issue(self.issue))

    def test_older_spotlight_is_labeled_and_cannot_duplicate_main(self):
        old = copy.deepcopy(self.issue["picks"][0])
        old.update(paper_id="voyager", event=None)
        old["citation"].update(date="2023-05-25")
        self.issue["older_paper"] = old
        self.assertEqual(self.errors(), [])
        self.assertIn("Older-paper spotlight", render_issue(self.issue))
        old["paper_id"] = self.issue["picks"][0]["paper_id"]
        self.assertTrue(self.errors())

    def test_urls_and_plain_text_rendering_are_safe(self):
        pick = self.issue["picks"][0]
        pick["problem"] = '<script>alert("x")</script> [bait](javascript:bad)\n# forged'
        text = render_issue(self.issue)
        self.assertNotIn("<script>", text)
        self.assertNotIn("\n# forged", text)
        self.assertNotIn("[bait](javascript:bad)", text)
        pick["event"]["source"] = "javascript:bad"
        self.assertTrue(self.errors())
        pick["event"]["source"] = "https://user:secret@example.org/"
        self.assertTrue(self.errors())

    def test_weekly_source_links_are_collected(self):
        self.assertIn(self.issue["picks"][0]["citation"]["reviewed_sources"][0]["url"], source_urls([self.issue]))
        altered = copy.deepcopy(self.issue)
        altered["corrections"].append({"date": "2026-11-09", "note": "Correction",
                                     "sources": ["https://example.org/correction"]})
        self.assertIn("https://example.org/correction", source_urls([altered]))

    def test_nested_markdown_links_are_validated(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp); (root / "data").mkdir(); (root / "docs" / "weekly").mkdir(parents=True)
            for path in ("README.md", "CONTRIBUTING.md", "data/README.md"):
                (root / path).write_text("# Fine\n")
            page = root / "docs/weekly/2026-11-02.md"
            page.write_text("[Bad](missing.md)\n")
            self.assertTrue(any("missing.md" in x for x in validate_links(root)))
            page.write_text("[Good](../../README.md#fine)\n")
            self.assertEqual(validate_links(root), [])

    def test_filename_must_match_week_key(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp); (root / "data/weekly").mkdir(parents=True)
            (root / "data/weekly/wrong.json").write_text(json.dumps(self.issue))
            with self.assertRaises(ValueError):
                load_issues(root)

    def test_missed_runs_verify_existing_issue_instead_of_duplicating(self):
        self.assertEqual(next_due([], today=dt.date(2026, 11, 8)), {"action": "none"})
        self.assertEqual(next_due([], today=dt.date(2026, 11, 24))["week_start"], "2026-11-02")
        self.assertEqual(next_due([self.issue], today=TODAY)["action"], "verify-publication")
        state = self.published_state()
        self.assertEqual(next_due([self.issue], state, TODAY), {"action": "none"})
        self.assertEqual(next_due([self.issue], state, dt.date(2026, 11, 24))["week_start"], "2026-11-09")
        self.assertEqual(next_due([self.issue], state, dt.datetime(2026, 11, 15, 23, tzinfo=dt.timezone.utc))["week_start"], "2026-11-09")

    def test_quiet_review_and_publication_require_evidence(self):
        quiet = {"weeks": {"2026-11-02": {"status": "quiet", "adequate_review": True,
                         "reviewed_on": "2026-11-09", "reason": "No eligible source-reviewed picks."}}}
        self.assertEqual(next_due([], quiet, TODAY), {"action": "none"})
        self.assertEqual(next_due([self.issue], quiet, TODAY)["action"], "verify-publication")
        quiet["weeks"]["2026-11-02"]["adequate_review"] = False
        with self.assertRaises(ValueError): next_due([], quiet, TODAY)
        with self.assertRaises(ValueError): next_due([], self.published_state(), TODAY)


class CheckpointTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.run_git("init", "-q", "-b", "main")
        self.run_git("config", "user.name", "Test")
        self.run_git("config", "user.email", "test@example.invalid")
        (self.root / ".gitignore").write_text("local-notes/\n")
        (self.root / "README.md").write_text("before\n")
        self.run_git("add", "."); self.run_git("commit", "-qm", "base")
        self.run_git("update-ref", "refs/remotes/origin/main", "HEAD")
        (self.root / "README.md").write_text("reviewed\n")

    def run_git(self, *args):
        return subprocess.check_output(["git", *args], cwd=self.root, stderr=subprocess.STDOUT, text=True).strip()

    def test_owned_changes_resume_through_commit_and_push(self):
        record = capture(self.root, ["README.md"])
        self.assertEqual(verify(self.root, record)["phase"], "prepared")
        self.run_git("add", "README.md"); self.run_git("commit", "-qm", "publication")
        self.assertEqual(verify(self.root, record)["phase"], "committed")
        self.run_git("update-ref", "refs/remotes/origin/main", "HEAD")
        self.assertEqual(verify(self.root, record)["phase"], "pushed")

    def test_changed_content_unrelated_files_and_divergence_block_resume(self):
        record = capture(self.root, ["README.md"])
        (self.root / "README.md").write_text("user edit\n")
        self.assertFalse(verify(self.root, record)["matches"])
        (self.root / "README.md").write_text("reviewed\n")
        (self.root / "unrelated.txt").write_text("preserve")
        self.assertFalse(verify(self.root, record)["matches"])
        with self.assertRaises(ValueError): capture(self.root, ["README.md"])

    def test_unreviewed_staged_content_is_preserved(self):
        record = capture(self.root, ["README.md"])
        (self.root / "README.md").write_text("unreviewed staged change\n")
        self.run_git("add", "README.md")
        (self.root / "README.md").write_text("reviewed\n")
        self.assertFalse(verify(self.root, record)["matches"])
        with self.assertRaises(ValueError): capture(self.root, ["README.md"])

    def test_unpushed_batch_can_be_recheckpointed_without_rewriting_history(self):
        record = capture(self.root, ["README.md"])
        self.run_git("add", "README.md"); self.run_git("commit", "-qm", "prepared publication")
        self.assertEqual(verify(self.root, record)["phase"], "committed")
        (self.root / "README.md").write_text("reviewed date correction\n")
        refreshed = capture(self.root, ["README.md"])
        self.assertEqual(verify(self.root, refreshed)["phase"], "prepared")
        self.run_git("add", "README.md"); self.run_git("commit", "-qm", "correct actual publication date")
        self.assertEqual(verify(self.root, refreshed)["phase"], "committed")

    def test_permission_changes_block_resume(self):
        record = capture(self.root, ["README.md"])
        path = self.root / "README.md"
        path.chmod(path.stat().st_mode ^ 0o100)
        self.assertFalse(verify(self.root, record)["matches"])

    def test_checkpoint_cannot_read_outside_scope(self):
        record = capture(self.root, ["README.md"])
        record["files"] = {"../private": None}
        self.assertFalse(verify(self.root, record)["matches"])
        record["files"] = {".git/config": None}
        self.assertFalse(verify(self.root, record)["matches"])


if __name__ == "__main__":
    unittest.main()
