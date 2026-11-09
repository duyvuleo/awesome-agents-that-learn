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

## Monthly coverage audit: 2026-11-01

Added **12 works** after selected full-text review: eleven papers and one benchmark paper. The catalog now contains **153 research works** (134 papers, six surveys, thirteen benchmark papers) and 23 separately counted software records. Daily discovery used an overlapping 24 October–1 November window; the monthly audit targeted publications listed from November 2025 through October 2026 and followed older foundational citation trails.

This pass screened the full returned title listings below with mechanism-specific keywords, then compared candidate identities with the catalog and prioritized original-paper reading. Counts describe fetched metadata and filters, not eligible studies, confirmed omissions, independent findings, or recall. Different source families used different topic filters; cross-venue versions and event-volume headers may overlap.

| Listing screened | Parsed title records/anchors | Keyword candidates |
| --- | ---: | ---: |
| [ACL 2026 event volumes](https://aclanthology.org/events/acl-2026/) | 6,419 | 290 |
| [EMNLP 2026 event volumes](https://aclanthology.org/events/emnlp-2026/) | 7,070 | 414 |
| [ICLR 2026](https://proceedings.iclr.cc/paper_files/paper/2026) | 5,351 | 187 |
| [ICML 2026](https://proceedings.mlr.press/v306/) | 6,553 | 206 |
| [NeurIPS 2025 main conference](https://proceedings.neurips.cc/paper_files/paper/2025/vol38-main-conference) | 5,823 | 159 |
| [COLM 2026](https://proceedings.colm.cc/paper_files/paper/2026) | 856 | 170 |
| [TMLR, November 2025–October 2026](https://jmlr.org/tmlr/papers/) | 2,041 | 107 |
| [TACL 2026](https://aclanthology.org/volumes/2026.tacl-1/) | 118 | 8 |
| [AAAI 2026, 48 listed issues](https://ojs.aaai.org/index.php/AAAI/issue/archive) | 4,920 | 371 |

The fetched Anthology index listed NAACL 2025 as its latest NAACL event; the requested 2026 route was unavailable. No 2026 volume was invented. Large-page tool limits were resolved through ordinary public HTTP access where possible. Candidate eligibility and full-text review remain incomplete, and mechanisms absent from titles can still be missed.

The audit also compared selected references from [Learning to Remember](https://arxiv.org/abs/2610.35089), the existing safety survey, and related survey collections. The safety-survey companion's 683 metadata records supplied a broader comparison set; year-only and unresolved identities remain leads. MemEvolve, MemSkill, SkillOpt, optimize_anything, EMMA, and Combee address memory and optimization gaps. METTA and OPST clarify temporary adaptation versus reusable model training. RoboCat was recovered as an older embodied-learning anchor, with its original 2023 date retained. Three safety works add bounded evidence about benign experience, contrastive guards, and personalized memory risks.

Remaining priorities include Skill∞, AgentEvolver, MARSHAL, Search Self-Play, SiriuS, UI-Genie, additional harness methods, and unreviewed metadata candidates. Title inventories are preserved for follow-up rather than treated as automatic admissions. This completes the stated listing-screen operations and selected reviews, not an exhaustive twelve-month literature review or a complete correction/withdrawal audit. No linked research code was executed.

## Monday catch-up: 2026-11-02

Added **12 works** after selected full-text review: eleven papers and one benchmark paper. The catalog now contains **165 research works** (145 papers, six surveys, fourteen benchmark papers) and 23 separately counted software records. Group-Evolving Agents also received a publication-status correction from an official COLM 2026 record; its original abstract-review depth and scientific annotation were preserved.

Daily discovery overlapped 25 October–2 November, with a deeper 4 August–2 November catch-up. This rotation emphasized web/GUI skill acquisition, scientific and coding harnesses, embodied failure analysis, and negative/evaluation results. Multiple arXiv query variants, official ACL/ICML/COLM records, author artifacts, and backward citation trails supplied complementary evidence. Search ranking and date filters remain imperfect; no full ninety-day enumeration or absence-of-new-papers claim is made.

The monthly inventories were used for bounded follow-up rather than regenerated: 24 EMNLP web/GUI/skill titles, 30 ICLR training-related titles, and the 26-title priority COLM slice received triage. These are metadata decisions, not new full-text reviews or independent-study counts. Unresolved relevance, identities, and body reviews remain queued. The COLM slice recovered the missing Group-Evolving Agents publication record.

Skill∞, MultiEvoSkill, and MiniWeb broaden skill-learning coverage. CoHARL, the retrospective harness study, and policy–harness geometry distinguish joint training, human-selected adaptations, and interface analysis. Reasoning Cache and the self-evolution generalization study clarify model-training limits, while a 123-round robotics case study preserves negative results. Memory Tax, the quadruped-curriculum benchmark, and REUSE add controls for memory value, easier starting distributions, and adaptive benchmark reuse.

Existing SkillOpt, MemSkill, METTA, OPST, VERSE, and Harness² versions were spot-checked without timestamp-only edits. Remaining priorities include primary review of Search Self-Play/MARSHAL, scientific harnesses, skill-evaluation studies, and the unreviewed inventory tails. All coverage limits and access failures remain distinct from negative scientific evidence. No linked research code was executed or result reproduced.

## Recent work and unresolved-lead follow-up: 2026-11-04

Added **five papers**, bringing the collection to **170 research works** (150 papers, six surveys, fourteen benchmark papers) and 23 separately counted software records. Three additions cover new memory control, skill routing, and continual harness evaluation; two close earlier leads on obsolete facts and search self-play.

Discovery revisited 26 October–4 November with multiple mechanism terms across memory, skills/tools, prompts/context, workflows/harnesses, parameter adaptation, self-play/curricula, lifelong learning, recursive improvement, and evaluation/safety. Indexed arXiv searches were complemented by official proceedings and journal searches, current version records, author repositories, and citation trails. Empty revision-specific or forward-citation queries are inconclusive; version checks were record-specific, not a complete revision or withdrawal census.

Follow-up also screened positions 31–45 of the preserved 93-title training inventory filter, extending the earlier 30-title slice. This was title triage only; relevance and full-text decisions remain queued. Search Self-Play was recovered from the existing ICLR lead, retaining its older first-public date. Backward references supplied Self-Harness and skill-interference leads, while newer work citing Search Self-Play supplied additional search-training candidates.

Priority follow-ups include MARSHAL, SELF-HARMONY, CUA-Master, LIFE, MUSE, AgentPRO, CLR-Bench, and the effects of recursive self-training on confidence. Search snippets and related lists were used only for discovery. Remaining inventory tails, the unfinished ninety-day audit, and source-access limits remain open; no exhaustive coverage claim is made.

## Daily discovery and version follow-up: 2026-11-05

Added five papers and one research implementation: **175 research works** (155 papers, six surveys, fourteen benchmark papers) and **24 software records**. Hyperagents also received a substantive v2 annotation update. Two reading routes were extended.

Discovery overlapped 28 October–5 November across all nine mechanism families, using arXiv and independent official proceedings/journal searches. Narrower variants followed empty or noisy harness, self-play, and safety queries. Current primary records, author repositories, and backward/forward citation trails supplied follow-up evidence. Search date filters are imperfect, and empty revision searches do not imply an absence of revised work: a direct Hyperagents record check found v2, which was then inspected.

Artifact-to-Capability adds controlled negative findings; MUSE and LIFE extend scientific and embodied coverage; Exo clarifies runtime changes and fixed activation controls. MARSHAL closes an older self-play lead with its first 2025 date retained. The existing ReSight record was checked to keep LIFE’s inherited results explicit. ACE’s current version metadata was spot-checked without relabeling its prior full-text review.

Unresolved leads include Meta², SelfImprove-Bench, EVOLVE guardrail evolution, MemHarmBench, EpiAgent, CUA-Master, SELF-HARMONY, and outstanding venue-inventory candidates. Citation expansion recovered additional artifact-use and scientific-memory leads. Complete ninety-day coverage, venue-tail eligibility, and a full correction/withdrawal census remain unfinished; no exhaustive coverage claim is made.

## Daily discovery and retained-state follow-up: 2026-11-06

Added **five works**: four papers and Continual AutoResearch as a benchmark paper. The collection now contains **180 research works** (159 papers, six surveys, fifteen benchmark papers) and 24 software records. Two reading routes were extended.

The discovery window overlapped 29 October–6 November. Multiple mechanism terms covered memory/experience, skills/tools, prompts/context, harnesses/workflows, parameter adaptation, self-play/curricula, lifelong learning, recursive improvement, and evaluation/safety. arXiv searches were complemented by official proceedings/journal records, primary version checks, and author artifacts. Focused harness and weight-memory variants reduced noise in broader queries. Empty revision and citation searches remain inconclusive.

The preserved training inventory received a further title screen of positions 46–60 of its 93-title filter; candidate eligibility and full-text work remain open. This continues the earlier slices rather than treating a listing as a completed literature review. Meta² and Self-Harmony closed queued leads. New research-learning, memory, and benign-skill safety papers supplied complementary evidence, including negative findings.

Memento, MemRL, ReasoningBank, and the safety survey received metadata/version spot checks without timestamp-only catalog edits. References from the new papers connect them to existing survey themes and anchors, and supply leads on procedural distillation, compiled memory, and continual research. Priority follow-ups include ScienceCUA, WASP-Mem, Reglos, MDSKILL, Harness-S, TinyAstral, and unresolved evaluation studies. Complete date-window recall, venue-tail reviews, and a full revision/withdrawal census remain unfinished.

## Daily discovery and skill/revision evidence: 2026-11-07

Added **six papers**, bringing the collection to **186 research works** (165 papers, six surveys, fifteen benchmark papers) and 24 software records. Three reading routes were extended.

The overlapping discovery window was 30 October–7 November. Mechanism variants covered memory reuse, skill/tool acquisition, context optimization, harness/workflow evolution, parameter learning, self-play/curricula, continual learning, recursive improvement, and evaluation/safety. arXiv records were complemented by official proceedings/journal searches and author repositories. Newly indexed IJCNLP-AACL records supplied additional leads; their venue-wide review remains unfinished.

BASM and SkillRubricsRL add published evidence about skill boundaries and credit assignment. Coalition-Aware Skill Reliability, recovered through related-work discovery and verified in its primary manuscript, explicitly studies joint skill effects and transfer masking. MemoRepair and StateGraph distinguish recorded dependency repair from inferred dependency revision. Beneath the Surface adds recent evidence about harness regressions, component interactions and transfer. Older first-public dates were retained.

MemSkill, SkillRL, the continual harness-forgetting study and the what/when/how survey received primary version checks without changing historical inspection dates. Backward references and newer work around these anchors supplied further leads. Remaining priorities include targeted agent-training guidance, HarnessFlow, RSI-Env, SCOPE web exploration, skill-shift evaluation and unreviewed venue-inventory tails. Indexed queries have no reliable result-total or pagination guarantee; this is bounded discovery, not exhaustive date-window coverage or a complete correction/withdrawal census.

## Continued discovery and Monday catch-up: 2026-11-08–09

Four further works bring the collection to **190 research works** (168 papers, six surveys, sixteen benchmark papers), with 24 separately counted software records. The ten additions reviewed on 7–9 November include both recent work and recovered earlier omissions.

Discovery continued over the overlapping 30 October–9 November window across all nine mechanism families. The Monday pass additionally targeted 11 August–9 November, rotating toward continual robotics, demonstration and human-feedback learning, scientific verification, and negative results. Indexed arXiv queries were complemented by official proceedings/journal records, author artifacts and citation trails. These bounded checks do not establish complete ninety-day coverage.

Positions 61–75 of the preserved 93-title training inventory received title triage, leaving eighteen positions in that filtered inventory. Candidate eligibility and body reviews remain unfinished. DexFlyWheel's official NeurIPS 2025 record and SkillShift-Bench's EMNLP 2026 record were inspected as follow-up leads; neither was automatically admitted from metadata.

Targeted guidance and HarnessFlow close queued training and architecture leads. ReScopeBench and RIFAR add experience-maintenance and robot-replay perspectives. Current CIDER, Memory Anchors, PEAM and Meta-Harness records were spot-checked without changing their historical review dates. Unresolved source identities, venue tails, artifact availability and full correction/withdrawal coverage remain open.

## 2026-11-09 — Existing-catalog full-text review

Revisited the primary arXiv records and complete article bodies for A-MEM, ADAS, AgentDevel and AgentSquare, including relevant appendices and PDF evidence objects. This is a depth audit of existing works, not a new-release search; it does not advance discovery coverage or add publications. The [review log](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-1) records inspected versions, remaining collection-wide scope and interpretation changes.

The second detailed-reading batch covers DSPy, MemGPT, ReAct and Self-Refine at pinned arXiv versions, including their methods, results and appendices. See the [second review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-2). It changes existing annotations and method classifications, without adding works or advancing discovery coverage.

The third detailed-reading batch revisits AlphaGo Zero, Constitutional AI, Generative Agents and Toolformer. An author-linked public PDF resolved AlphaGo Zero body access after publisher and institutional failures; the official UIST proceedings reconfirmed Generative Agents' publication identity. The [third review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-3) records the inspection boundaries. This remains existing-work review, not new-release discovery.

The fourth depth-audit batch covers Mem0, MemoryBank, LongMemEval and the ACL LoCoMo paper, with a targeted A-MEM v5/v11 comparison prompted by conflicting table labels. LoCoMo's preprint metadata resolves its first-public date; benchmark statistics remain attached to their source versions. See the [fourth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-4). No new-release coverage date was advanced.

The fifth depth-audit batch reads OPRO, the published ICML Promptbreeder paper, TextGrad v1 and GEPA v2 beyond their abstracts. Primary PDFs clarify selection rules, budget accounting and version-specific evidence. TextGrad's later journal body remains an access gap. See the [fifth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-5). Discovery coverage dates and frozen weekly issues are unchanged.

The sixth depth-audit batch reads Self-Instruct and the two ICML training papers alongside the intrinsic self-correction evaluation. Primary records recover two earlier first-public dates; the [sixth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-6) separates synthetic reference data, retained human/external supervision, metric definitions and theoretical assumptions. This adds no new works and does not advance discovery coverage.

The seventh depth-audit batch covers tool creation/reuse and externally rewarded model training: CREATOR, LLMs as Tool Makers, ReST and SCoRe. The [seventh review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-7) records exact versions, appendix evidence and distinctions between transfer, dispatch, reward optimization and reasoning validity. No new works or successful discovery windows are claimed.

The eighth depth-audit batch reads four recursive/evolutionary-learning works and follows full-paper artifact links for STOP and OpenSIR. Public source inspection distinguishes actual evaluator files from simplified paper descriptions, and separates model changes, score proxies and budget units. See the [eighth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-8). No new papers or discovery-window completion is claimed.

The ninth depth-audit batch follows memory construction and reuse from Memp through Mem-α, Memory-R1 and MemRL. The [ninth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-9) distinguishes externally rewarded policy training from fixed-weight memory updates, repeated-instance gains from held-out transfer, and estimator assumptions from retention guarantees. No new works or discovery-window completion is claimed.

The tenth depth-audit batch appraises four evaluation resources, including negative findings, with the same scrutiny used for positive methods. Primary-source follow-up recovers three official artifact links and a precise first-release date. The [tenth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-10) preserves measurement assumptions, task resets, scoring limitations and paper-level reporting errors. No new works or completed discovery window is claimed.

The eleventh depth-audit batch reviews prompt/workflow optimization and runtime or collaborative harness adaptation. The [eleventh review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-11) distinguishes evaluated tool changes from proposed self-modification, integration from new algorithms, and conditional composition theory from measured retention. Two artifact links were recovered; no new works or completed discovery windows are claimed.

The twelfth depth-audit batch reviews budgeted memory access and skill creation/reuse, retaining both favorable results and counterexamples. The [twelfth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-12) records feedback provenance, prospective versus development evidence, coverage denominators and family-local evaluation. Three artifact links were recovered; no new works or completed discovery windows are claimed.

The thirteenth depth-audit batch examines self-generated curricula and process supervision. The [thirteenth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-13) distinguishes consensus, proposer labels, oracle answers and executable checks, retaining iteration regressions and verification limits. Two official artifact links were recovered. No new works or completed discovery window is claimed.

The fourteenth depth-audit batch reviews hierarchical code adaptation, temporal preference training and a critical self-correction survey. The [fourteenth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-14) records implementation boundaries, alternative explanations and historical scope. A first-release date was recovered; no new works or completed discovery window is claimed.

The fifteenth depth-audit batch reads the safety and workflow surveys through their methodology and substantive appendices. The [fifteenth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-15) distinguishes corpus inventories from close appraisal, proposed evaluation contracts from experiments, and per-run variation from persistent learning. One official literature artifact was recovered; no discovery coverage window was advanced.

The sixteenth depth-audit batch completes broader reading of the sixty entries originally based only on abstracts/metadata. The [sixteenth review map](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-16) records the final three surveys' scope, protocol and source limitations. The remaining 130 earlier selected-section reviews still require broader appraisal; their dates and execution boundaries are unchanged. No new research works or completed discovery window is claimed.

The [seventeenth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-17) expands four prior selected-section memory reviews. It separates reward proxies, repeated-task learning, transfer, scaling and aggregate-score qualifications. Broader appraisal is now 64/190; this is not a newly completed discovery window.

The [eighteenth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-18) revisits ACE, AWM, ExpeL and A-MemGuard through their substantive appendices and current official artifacts. Final-paper additions and negative results are retained, and ACE's official code link was recovered. Broader appraisal is 68/190; discovery coverage dates are unchanged.

The [nineteenth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-19) revisits Reflexion, Voyager, TroVE and AutoSkill through methods, experiments, limitations and substantive appendices. Broader appraisal is 72/190, with same-task retries, skill reuse, tool selection and instruction extraction kept distinct. No new works or discovery-coverage window is claimed.

The [twentieth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-20) covers Agent-R, Re-ReST, RAGEN and RISE, including final-paper additions and explicit source/version limits. Two official code links were recovered. Broader appraisal is 76/190; new leads remain queued and discovery-coverage dates are unchanged.

The [twenty-first depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-21) revisits STaR and SEAL through their complete substantive appendices, including negative findings and stronger controls. Broader appraisal is 78/190; no research works were added and no discovery-coverage date advanced.

The [twenty-second depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-22) covers Absolute Zero and RoboCat through methods, full substantive appendices and negative results. Source versions and publication-date discrepancies are explicit. Broader appraisal is 80/190; no works were added or discovery-coverage windows advanced.

The [twenty-third depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-23) reviews SPICE, Socratic-Zero, SPIRAL and Agent0 through complete substantive appendices, retaining positive controls and unresolved evidence limits. Broader appraisal is 84/190; no new works or discovery-coverage completion is claimed.

The [twenty-fourth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-24) reviews SICA and AFlow through complete substantive appendices and selected artifact checks. It distinguishes reused-benchmark optimization from held-out tests, inference from search cost, and theoretical discussion from guarantees. Broader appraisal is 86/190; discovery-coverage dates remain unchanged.

The [twenty-fifth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-25) appraises DGM's revised full paper, including all substantive code and safety appendices. Broader appraisal is 87/190, with fixed diagnostic components, transfer controls and objective-hacking evidence made explicit. No new works or discovery-window completion is claimed.

The [twenty-sixth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-26) appraises Hyperagents v2 and its substantive appendices, including component transfer, parent-selection experiments and a read-only statistical-source follow-up. Broader appraisal is 88/190. No new works, research executions or completed discovery windows are claimed.

The [twenty-seventh depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-27) reads the final ICML versions of MemEvolve and MCE through their substantive appendices and artifact documentation. Broader appraisal is 90/190; new evidence controls, subset overlap and negative component findings are retained. No new publications, research executions or completed discovery windows are claimed.

The [twenty-eighth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-28) appraises Meta-Harness and Meta² through all substantive appendices, retaining model-transfer distinctions, scaffolding confounds, unfavorable ablations and artifact limitations. Broader appraisal is 92/190; no new works, research executions or completed discovery windows are claimed.

The [twenty-ninth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-29) reviews MemoryTax and The Value of Memory through their substantive appendices. It adds the former's official artifact and retry-accounting boundary, and separates the latter's conditional theory, diagnostics and proposed hypotheses. Broader appraisal is 94/190; the separate Memory Tax: net value paper remains queued. No new works, research executions or discovery-window completion are claimed.

The [thirtieth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-30) completes MemoryArena's final-publication review and the separate Memory Tax: net value study. It aligns MemoryArena's full title with the venue record and adds the net-value paper's official artifact links with release limits. Broader appraisal is 96/190; no new works, research executions or completed discovery windows are claimed.

The [thirty-first depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-31) reads the accumulation study's full arXiv v2 and the corrected Nature collapse article with its complete substantive supplement. It corrects COLM publication metadata, the Nature work's first-public date and artifact availability, and retains version/access limits. Broader appraisal is 98/190; no new works, research executions or completed discovery windows are claimed.

The [thirty-second detailed-review batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-32) covers MARSHAL, Search Self-Play and Self-Harmony in full, including substantive appendices, negative controls, raw results and proofs. It clarifies replay/supervision and transductive evaluation, and records a bounded curator check of a mathematical equivalence. Broader appraisal is 101/190; discovery coverage dates are unchanged.

The [thirty-third depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-33) completes StuLife's final Findings publication, including its added learning/context experiments and complete substantive appendices. It aligns the published title and adds verified official artifact links with explicit metric/version differences. Broader appraisal is 102/190; no new works or research executions are claimed.

The [thirty-fourth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-34) completes AgentMemRec and COLLABMEM, qualifying conditional ranking theory, compared protocols, inference cost, memory-diagnostic attribution and an empty promised artifact repository. Broader appraisal is 104/190; no discovery window or execution claim is advanced.

The [thirty-fifth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-35) completes AgentStream's full v2, including every substantive appendix, adaptation prompt, per-seed result and cumulative plot. It clarifies fixed task/domain-order coverage and cost-run limits, and links the paper's current Sico project location. Broader appraisal is 105/190; discovery coverage remains unchanged.

The [thirty-sixth depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-36) completes MemSkill v3, SkillRL v2 and the final SkillRubricsRL publication, including all substantive appendices and disclosures. Individual official NeurIPS records resolve the two earlier acceptance uncertainties. Broader appraisal is 108/190; no discovery window, model run or reproduction is claimed.

The [thirty-seventh depth-audit batch](review-log.md#2026-11-09--detailed-review-of-existing-entries-batch-37) completes HarnessFlow and ReScopeBench v1, including complete substantive appendices and metric/cost definitions. Broader appraisal is 110/190; this deepens existing entries without advancing discovery coverage or changing the frozen weekly edition.
