"""Record reviewed publication files; verify ownership before resuming.

This helper never stages, commits, pushes, fetches, or executes research code.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path
from catalog import ROOT


def git(root, *args):
    return subprocess.check_output(["git", *args], cwd=root, text=True).strip()


def allowed(path):
    p = Path(path)
    return (not p.is_absolute() and ".." not in p.parts and
            (path in {"README.md", "CHANGELOG.md", "CONTRIBUTING.md", "AGENTS.md", "site/catalog.js", "site/catalog.json"}
             or len(p.parts) > 1 and p.parts[0] in {"data", "docs", "scripts", "tests", "templates"}))


def digest(root, name):
    if not isinstance(name, str) or not allowed(name):
        raise ValueError("checkpoint path is outside the curation scope")
    path = root / name
    if not path.resolve().is_relative_to(root.resolve()) or path.is_symlink():
        raise ValueError("checkpoint path escapes the repository")
    if path.exists() and not path.is_file():
        raise ValueError("checkpoint must name files")
    return {"sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "mode": path.stat().st_mode & 0o777} if path.exists() else None


def changed(root):
    return set(filter(None, git(root, "diff", "--name-only", "HEAD").splitlines())) | set(
        filter(None, git(root, "ls-files", "--others", "--exclude-standard").splitlines()))


def index_agrees(root):
    staged = set(filter(None, git(root, "diff", "--cached", "--name-only").splitlines()))
    unstaged = set(filter(None, git(root, "diff", "--name-only").splitlines()))
    return not (staged & unstaged)


def capture(root, paths):
    if not index_agrees(root):
        raise ValueError("partially staged files require review")
    names = sorted(set(paths))
    base, head = git(root, "rev-parse", "origin/main"), git(root, "rev-parse", "HEAD")
    git(root, "merge-base", "--is-ancestor", base, head)
    if git(root, "rev-list", "--merges", f"{base}..{head}"):
        raise ValueError("merge history requires review")
    pending = changed(root) | set(filter(None, git(root, "diff", "--name-only", base, head).splitlines()))
    if not names or set(names) != pending:
        raise ValueError("explicit reviewed file list must equal all pending publication changes")
    return {"base_commit": base, "files": {name: digest(root, name) for name in names}}


def verify(root, manifest):
    try:
        if not index_agrees(root):
            raise ValueError("index differs from reviewed working files")
        base, files = manifest["base_commit"], manifest["files"]
        if not re.fullmatch(r"[0-9a-f]{40}", base) or not isinstance(files, dict) or not files:
            raise ValueError("invalid checkpoint")
        if any(digest(root, name) != value for name, value in files.items()):
            raise ValueError("prepared file content changed")
        head, remote = git(root, "rev-parse", "HEAD"), git(root, "rev-parse", "origin/main")
        git(root, "merge-base", "--is-ancestor", base, head)
        if git(root, "rev-list", "--merges", f"{base}..{head}") or remote not in {base, head}:
            raise ValueError("unexpected merge history or remote divergence")
        working = changed(root)
        committed = set(filter(None, git(root, "diff", "--name-only", base, head).splitlines()))
        if working | committed != set(files):
            raise ValueError("publication changes exceed reviewed files")
        if working:
            if remote != base:
                raise ValueError("refresh the checkpoint against the published base")
            return {"matches": True, "phase": "prepared", "commit": head}
        return {"matches": True, "phase": "pushed" if remote == head else "committed", "commit": head}

    except (KeyError, TypeError, ValueError, subprocess.CalledProcessError) as exc:
        return {"matches": False, "reason": str(exc)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--create", nargs="+", metavar="REVIEWED_FILE")
    group.add_argument("--verify", action="store_true")
    parser.add_argument("--manifest", type=Path, default=ROOT / "local-notes" / "publication-checkpoint.json")
    args = parser.parse_args()
    path = args.manifest.resolve()
    if not path.is_relative_to((ROOT / "local-notes").resolve()):
        raise SystemExit("checkpoints must stay in ignored local-notes/")
    if subprocess.run(["git", "check-ignore", "-q", str(path)], cwd=ROOT).returncode:
        raise SystemExit("checkpoint location is not ignored")
    if args.create:
        record = capture(ROOT, args.create)
        path.parent.mkdir(parents=True, exist_ok=True)
        # Preserve an older checkpoint as history before replacing it.
        if path.exists():
            previous = path.read_bytes()
            archive = path.with_name(path.stem + "-" + hashlib.sha256(previous).hexdigest()[:16] + ".json")
            if not archive.exists():
                archive.write_bytes(previous)
        path.write_text(json.dumps(record, indent=2) + "\n")
        print("Saved reviewed publication checkpoint.")
    else:
        result = verify(ROOT, json.loads(path.read_text()))
        print(json.dumps(result, indent=2))
        raise SystemExit(0 if result["matches"] else 1)


if __name__ == "__main__":
    main()
