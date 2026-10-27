# Search method and coverage

[Overview](../README.md) · [Review log](review-log.md) · [Related collections](related-collections.md)

## Launch review: 2026-10-28

The launch contains **83 unique works: 69 papers, 5 surveys, and 9 benchmark papers**. Of these, 53 are core and 30 are adjacent. Twenty-four entries include selected full-text inspection; 59 were reviewed at the primary-abstract/metadata level. Dates span 2017–2026, with most coverage focused on language-model agents from 2022 onward. Counts describe this collection, not coverage of the entire field.

This was a structured, multi-pass curation exercise. It is not a systematic review with a preregistered search strategy, an exhaustive database export, or an estimated recall rate. The search and annotation process was AI-assisted. Source inspection, peer review, artifact release, and independent reproduction remain separate facts.

## Search procedure

1. Read the maintainer's Text-to-SQL and AI Co-Scientist collections to reuse their annotated, source-aware format.
2. Map the topic through primary surveys and established anchors, then search four complementary areas: foundations/evaluation, memory/skills, agent architecture, and model-level learning.
3. Expand with recent mechanism-specific queries through the review date and citation trails from primary papers. Related collections supplied discovery leads only.
4. Open primary abstract records to verify titles, identifiers, dates, mechanisms, and reported evaluation. Inspect selected methods/evaluation/limitations sections for central works.
5. Verify publication against official proceedings or journal records where accessible. Inspect official project/repository links separately from paper claims.
6. Merge by work identity, review annotations for scope and persistence, audit publication-status uncertainties, and run catalog/navigation/source-link checks.

Representative queries and anchors:

| Area | Queries and starting points |
| --- | --- |
| Foundations and terminology | `self evolving agents survey`, `Self-Improvements in Modern Agentic Systems`, `self correction external feedback`, ReAct, Self-Refine |
| Memory and skills | Voyager, ExpeL, Agent Workflow Memory, `ReasoningBank`, `Memory-R1`, `MemRL`, `skill self-evolution 2026`, `experience reuse agent` |
| Prompts and architecture | DSPy, OPRO, Promptbreeder, TextGrad, ADAS, AFlow, AgentSquare, GEPA, `agent harness self-improvement 2026`, DGM, Hyperagents, ModularRSI |
| Model learning | STaR, Self-Instruct, ReST, Self-Rewarding LMs, `self play curricula`, Absolute Zero, R-Zero, Agent0, Dr. Zero, SEAL |
| Evaluation and failure | `self improving agents benchmark held out`, LifelongAgentBench, AgentStream, SkillFlow, PAST-Bench, GDPevo, `experience faithfulness`, `Phantom Gains`, `model collapse accumulating data` |
| Publication checks | Exact titles restricted to official ACL, AAAI, ICML/PMLR, ICLR, NeurIPS, COLM, ACM, Nature, and TMLR records |

The main source families were arXiv, official proceedings and journals, author project pages, and official repositories. Aggregator summaries, social posts, and search snippets were not treated as sufficient evidence for catalog annotations. No restricted workplace material was used. No linked code was executed, no paid model experiments were run, and no paper result was reproduced.

## Inclusion decisions

Core entries study reusable agent changes or their evaluation. Adjacent entries clarify necessary foundations and boundaries. AlphaGo Zero is a historical self-play reference; generic tool use, within-task correction, factual memory, and model-only training are included selectively rather than relabeled as full self-evolving agents.

One record represents each work, even when a preprint and publication use different titles. Surveys and benchmark papers are counted separately from other papers. We do not multiply counts by code repositories or by the number of topic tags. Dates are recorded source dates: usually a first arXiv submission, otherwise a publication date with explicit year-only precision.

The publication audit upgraded ReAct, the what/when/how survey, ReasoningBank, and Generative Agents after accessible official venue records were located. A repository acceptance badge alone remains insufficient; SkillRL's author-reported NeurIPS 2026 acceptance is retained as a note pending an independent proceedings check.

## Coverage limits and follow-up leads

The collection emphasizes modern LLM-based agents. It does not exhaust classical reinforcement learning, meta-learning, artificial life, robotics, or continual-learning theory. Within the modern literature, discovery depends on indexing, terminology, citation trails, and source access. Recent work and full-text coverage will need continuing review.

Useful leads not yet admitted after full source triage include Memento, AgeMem, G-Memory, TroVE, AutoSkill, Agent-R, RAGEN, Re-ReST, SPIRAL, SPICE, Socratic-Zero, and additional longitudinal/robotics benchmarks. The breadth of a related list is not evidence that every lead meets this collection's scope. Additional passes should prioritize mechanisms and missing evaluation settings rather than a target count.

Ordinary fixed agent frameworks, unverified third-party implementations, commercial claims without a research source, and papers encountered only in aggregator snippets were excluded. Missing official code links mean availability was not established, not that no code exists.

Link-check limitations and restricted responses are recorded in [link checks](link-checks.md). Later corrections should update the affected record, review date, and changelog while preserving what was actually inspected.
