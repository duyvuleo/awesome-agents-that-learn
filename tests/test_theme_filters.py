"""Exercise the browser's theme logic with Node's built-in test runner."""
import subprocess
import unittest
from pathlib import Path


class ThemeFilterTests(unittest.TestCase):
    def test_theme_matching_and_share_links(self):
        root = Path(__file__).resolve().parents[1]
        result = subprocess.run(
            ["node", "--test", "tests/theme_filters.test.js"],
            cwd=root, text=True, capture_output=True, check=False,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
