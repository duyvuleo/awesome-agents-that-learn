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

At launch, leads awaiting full source triage included Memento, AgeMem, G-Memory, TroVE, AutoSkill, Agent-R, RAGEN, Re-ReST, SPIRAL, SPICE, Socratic-Zero, and additional longitudinal/robotics benchmarks. The breadth of a related list is not evidence that every lead meets this collection's scope. Additional passes should prioritize mechanisms and missing evaluation settings rather than a target count.

Ordinary fixed agent frameworks, unverified third-party implementations, commercial claims without a research source, and papers encountered only in aggregator snippets were excluded. Missing official code links mean availability was not established, not that no code exists.

Link-check limitations and restricted responses are recorded in [link checks](link-checks.md). Later corrections should update the affected record, review date, and changelog while preserving what was actually inspected.

## Systems expansion: 2026-10-28

Added 23 official software records after separate README, documentation, and license inspection. They are not added to the 83-work literature count. See the [systems source review](systems-review.md) for selection, current-source differences, and execution limits. Research implementations, optimization frameworks, memory libraries, training frameworks, and applications are labeled separately.

## Literature expansion: 2026-10-29

Added **26 works** after primary-source review: 25 papers and one survey. The collection now contains **109 research works** (94 papers, six surveys, nine benchmark papers) and 23 separately counted software projects. Twenty-five additions received selected full-text inspection; the workflow survey has an abstract/metadata review. All eleven explicitly named launch leads have now been reviewed and admitted, with important qualifications retained.

The search targeted 31 July–29 October 2026, supplemented by older omissions and recent publication records. Mechanism-specific variants covered memory and experience reuse, skill/tool acquisition, context optimization, harness evolution, model updates, self-play, continual learning, and evaluation/integrity. Discovery combined arXiv records and revisions with ACL Anthology, ICLR, ICML/PMLR, NeurIPS, COLM, and author-linked artifacts. The COLM table of contents and reference trails supplied additional leads beyond initial search results. This remains a partial catch-up, not a complete enumeration of the window or a claim of exhaustive coverage.

Recent additions include [ASCENT](papers.md#ascent), [LifeMem](papers.md#lifemem), [MemComposer](papers.md#memcomposer), [REM](papers.md#rem-experience-memory), [StepLearn](papers.md#steplearn), [AIDE²](papers.md#aide2), [SelfOp](papers.md#selfop), [VERSE](papers.md#verse), [SED](papers.md#self-evolving-defense), and two studies of learning/evaluation limits. Older additions recover memory, tools, reflection training, and self-play anchors. [PACE](papers.md#pace) adds statistical acceptance under noisy feedback. Four reading routes now include relevant new evaluation or online-learning perspectives.

Publication metadata also resolves ELL / StuLife to Findings of EMNLP 2026 under a revised title. Its earlier full-text inspection is retained separately from the newly inspected publication abstract; experiment equivalence between versions is not assumed.

Remaining high-priority gaps include PEAM and other continual robot-learning studies; ProactAgent, MASkills, APEX-EM, and the value of memory; SAGE and memory-security diagnostics; and additional harness/skill systems found in current proceedings. Some primary-page fetches failed, and broad journal/proceedings enumeration remains incomplete. New artifacts were inspected only to the depth stated per paper; no new software entry or executed result is implied.

## Literature expansion: 2026-10-30

Added **20 works** after selected primary full-text review: 19 papers and one benchmark paper. The catalog now contains **129 research works** (113 papers, six surveys, ten benchmark papers), with 23 separately counted software records. The additions cover memory selection and governance, skill/workflow optimization, agent harnesses, continual robotics, graph-grounded self-play, and evaluation limits.

Discovery used overlapping 22–30 October queries alongside unresolved leads from the first 90-day catch-up. Multiple mechanism variants searched arXiv and official proceedings, with targeted TMLR, TACL, AAAI, and NAACL checks and author-source follow-up. TMLR and COLM listings were inspected beyond opening results. Journal listings supplied useful leads, but several linked OpenReview pages were access-restricted. A successful query or listing check is not a complete venue audit; pending full-text reviews remain open.

Recent additions include [AgentMemRec](papers.md#agentmemrec), [EoG](papers.md#evolve-on-graph), [SciValidityBench](papers.md#scivaliditybench), [The Value of Memory](papers.md#value-of-memory), and [MemoryTax](papers.md#memorytax). Earlier omissions include ProactAgent, MASkills, APEX-EM, PRISM, control–data separation, FlowEvo, Meta-Harness, Harness², SAGE, TAME, Memory Anchors, CIDER, PEAM, and EmbodiedRSI. An additional code-edit selection study distinguishes a fixed learned predictor from an evolving improver. The continual-learning route now includes robot replay selection.

Annotations preserve important comparison limits: supplied rewards and demonstrations, frozen versus online memory, manual validation tuning, limited task sequences, model-judged correctness, unequal scoring paths, and unclear checkpoint-selection separation. No research code was executed. Existing ASCENT, MemComposer, LifeMem, SPIRAL, PACE, and RSI-audit records were spot-checked without changes; this is not a systematic withdrawal audit.

Remaining priorities include GameSmith and search distillation, ReSight, recent multi-agent memory/configuration methods, MLE-World, additional safety benchmarks, and unresolved journal articles. PEAM's publication-title alias and the reviewed preprint version are documented separately. The 90-day catch-up and broader venue enumeration remain incomplete.

## Literature expansion: 2026-10-31

Added **12 works** after selected full-text review: ten papers and two benchmark papers. The collection now contains **141 research works** (123 papers, six surveys, twelve benchmark papers) and 23 separately counted software records.

Discovery covered overlapping 23–31 October queries across memory/experience, skills/tools, prompts/harnesses, model learning, self-play, continual learning, and evaluation/safety. arXiv, official ACL and ICML records, and author artifacts supplied complementary evidence. Multiple query variants and citation trails broadened the initial results; result totals and cursor pagination were unavailable in the indexed search route, so neither saturation nor complete coverage is claimed. The earlier 90-day catch-up remains open.

Recent additions include DiscernMem, CaliMem, MLE-World, CEPO, EvolveMAS, and ReSight. GameSmith and SPSD add qualified self-play/training perspectives; ExpRAG distinguishes retrieval-aware training from inference-only reuse. A-MemGuard, MemoryArena, and COLLABMEM close evaluation/security gaps. COLLABMEM's previously inaccessible proceedings PDF was read successfully in this pass.

The annotations distinguish within-task optimization, persistent memory changes, offline model training, and fixed surrogate-assisted search. They retain model/benchmark-dependent outcomes, inherited baselines, training-corpus access differences, and attack-stage distinctions. Selected existing records were checked without changing their historical inspection dates. No linked research code was executed, and no result was reproduced.

Unresolved leads include Skill∞, MultiEvoSkill, MiniWeb, obsolete-fact memory evaluation, additional harness studies, and broader journal/venue coverage. Discovery records remain leads until their primary evidence is reviewed; recent-date search results alone do not establish publication dates or completeness.
