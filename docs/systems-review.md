# Systems source review

[Overview](../README.md) · [Systems catalog](systems.md) · [Paper-review notes](review-log.md)

Reviewed 2026-10-28. This pass adds **23 software records** alongside the existing 83 research works: 13 research implementations, three optimization frameworks, three memory libraries, two training frameworks, and two agent applications. Paper–software links describe relationships, not additional independent findings.

## Method and inspection boundary

Start with the author repositories linked by the literature, then inspect official README/setup documentation, related official product docs, and the repository license file. Add standalone projects only when their documentation establishes a relevant persistent-memory, skill, optimization, or training mechanism. Source URLs are retained per entry.

The review inspected public source documentation and licensing metadata. No project was installed, no research code or model training was run, no checkpoints were downloaded, and no published benchmark was reproduced. Observations concern current official sources on the review date; they are not pinned paper-reproduction environments. Missing software release dates were not inferred from paper dates, repository creation, or inspection time.

## Material distinctions

| Systems | What the review preserves |
| --- | --- |
| Voyager, ExpeL, Agent Workflow Memory, ReasoningBank, MemRL | Research integrations and environment-specific learning loops, with model feedback and setup constraints. Memory-utility reinforcement learning in MemRL is separate from training the reasoning model. |
| DSPy, GEPA, EvoAgentX | Configurable optimization frameworks. Task data, evaluation functions, and an externally configured search process still determine what improves. |
| ADAS, AFlow | Externally specified search over agents/workflows. AFlow's README notes possible operator bugs after migration from MetaGPT. |
| Darwin Gödel Machine, HyperAgents, SICA | Released research implementations of code/agent evolution, with fixed outer evaluation constraints. HyperAgents' source license is CC-BY-NC-SA-4.0; no external experiment-log audit was performed. |
| SEAL, SkillRL, Agent0, Absolute Zero | Actual model-training/adaptation pipelines with documented runtime and compute requirements. Agent0's language subproject differs from Agent0-VL; its workflow includes manual checkpoint selection. Absolute Zero distinguishes a paper branch from newer development. |
| Letta Code | Current Letta source and a MemGPT-lineage successor. The older Letta V1 server is retired; current memory, skill, and mod behavior is not the original MemGPT experiment. |
| Mem0 | Public SDK/server and managed-platform capabilities remain distinct. Current headline scores include proprietary platform optimizations and should not be attributed unchanged to the SDK. |
| A-MEM | Reusable memory library distinguished from the separate repository used for paper-result reproduction. |
| LangMem | Memory/consolidation and prompt-optimization support, with storage configuration affecting durability. The quickstart's in-process store does not survive restart. |
| Hermes Agent | Upstream application with documented persistent skills/memory. It is not the experimental Hermes+ modification in PAST-Bench. |
| Agent Lightning v1.0 | Current training architecture differs from legacy v0.x. Its linked v1.0 report remains a literature lead; no nonexistent catalog paper ID is invented. |

These observations are supported by the primary links attached to each [system entry](systems.md). Marketing claims of universal improvement, perfect recall, or production readiness were not adopted.

## Licensing and availability

License labels come from inspected repository license files, including public GitHub license metadata/content where useful. They concern those source files. Model checkpoints, datasets, dependencies, and hosted services may have separate terms. This is not a license-compatibility audit.

A code repository, an installable package, a working local setup, a replicated paper score, and deployment validation are different facts. All entries currently use `review_depth: project` and `execution_status: not-run`. Public-source checks assess reachability separately from scientific or runtime validation.

## Coverage and maintenance

This is a focused software companion to the literature rather than an exhaustive agent-platform directory. Generic fixed agent frameworks are not included merely because they can use tools or memory. Revisit repository redirects, current architecture, licensing, runtime requirements, and paper relationships during later maintenance. Update the existing system record when its source moves; do not create a duplicate to inflate coverage.

## 2026-11-05 — Exo research snapshot

Added one [Exo software record](systems.md#system-exo), bringing the software catalog to 24. The paper-cited c5c1963 snapshot’s README and MIT license were inspected alongside current official documentation. Requirements describe that research snapshot; current docs identify its self-evolving harness as an earlier experiment and warn that installation documentation remains incomplete.

The record distinguishes documented code editing and recovery from tested safety: the paper’s default guardian checks builds, and its protection argument assumes authority boundaries not enforced by the broadly writable development setup. No software was installed or executed. All 23 earlier inspection dates and execution records were preserved.

## 2026-11-09 — ReasoningBank artifact clarification

Re-read the official README and Apache-2.0 license at the current repository revision `ed80611788292ea739f1effd31f16c53823b8a0d`. The release documents WebArena and SWE-Bench integrations, provider access, BrowserGym/Docker requirements, and a vendored WebArena harness with shopping-annotation, wishlist-evaluation and interaction fixes. Updated the relationship note to distinguish this current release from the paper's evaluated revision. This remains source inspection only; no install, benchmark run or independent reproduction. The 2026-10-28 inspection record remains historical.

## 2026-11-09 — ExpeL memory-path correction

Re-read ExpeL's official README and Apache-2.0 license alongside the full paper. Corrected the software description: the studied inference path retrieves similar successful trajectories and supplies the entire extracted insight list; extra insight retrieval is a proposed extension for larger stores. Recorded the paper's stronger insight model and environment feedback. This is source inspection only; no installation, data download, model execution or result reproduction. The earlier inspection remains historical.

## 2026-11-13 — Context Language Models research implementation

Added one [CLM software record](systems.md#system-context-language-models), bringing the software catalog to 25. The author-linked source at 483198229ab7b90c0eed4651306ab3b3505aaf50 provides a mirrored-context Harbor harness and a reusable skill-evolution workflow with candidate validation, development-set selection, archives and resume. Its top-level license is CC BY-NC 4.0, distinct from the paper license; Python 3.12–3.13, Harbor and model/tool-serving requirements were checked in primary documentation.

Current serving adapters and defaults differ from the v1 experiment descriptions, and RL integration is partial. The inspected release is not a pinned reproduction of every paper result. Preserved all 24 earlier source-inspection dates and execution records. No software, model, training pipeline or benchmark was installed or executed.

## 2026-11-17 — MAPE memory-program evolution framework

Added the [official MAPE framework](systems.md#system-mape), bringing software records to 26, separately from 201 research works. The author-linked source at `9d356362094b1048a05655002059a191c8ff3d22` documents a reusable memory lifecycle, program search/archive, repair, diagnosis, Pareto selection, baseline adapters and experiment runners. The paper and software are one research program, not independent findings.

The actual license identifies Apache-2.0 for project-owned code; NOTICE and third-party notes retain separate upstream terms. Python 3.12+, uv, Linux/Singularity, model endpoints and search-specific Claude Code/API requirements were inspected. The root environment is an application rather than a buildable package. Current documentation discloses three historical prompt passages rewritten for release; only one selected final program is bundled, without results, retrieval traces or caches. Runtime isolation, exact historical execution and paper-result reproduction were not verified. All 25 earlier source-inspection dates and execution records remain unchanged; nothing was installed or executed.

## 2026-11-19 — Artifact availability follow-up

Full primary-source reviews of CLAM, Context–Weight Adaptation and Experience Rot did not establish author-linked research implementations with inspectable licenses and installation manifests. Their paper records retain unknown artifact status; no additional software record was inferred from a framework description, cited dependency or article license. All twenty-six historical system inspections and execution statuses remain unchanged. No software or model was installed or executed.

## 2026-11-20 — Research-artifact boundaries

Inspected the author-linked Self-Organized Learning repository at `882f6c70dc483aee396c4fe9d63f89253fbbb877`, including README, setup and requirements. Its public research implementation has an unresolved code license and no independently established mapping to every historical paper run; these limits are recorded in the paper's artifact note. Resolution Hypothesis and Skill Staleness did not establish paper-specific executable releases with inspectable licenses and setup. No new software record was added. All twenty-six existing system records retain their inspection dates and not-run status; no software or dataset was installed or executed.
