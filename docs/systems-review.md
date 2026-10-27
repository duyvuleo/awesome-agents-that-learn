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
