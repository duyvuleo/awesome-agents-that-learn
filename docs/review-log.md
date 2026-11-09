# Source-review notes

[Overview](../README.md) · [Search method](search-log.md)

Launch review: 2026-10-28. Every catalog entry includes primary sources and its review depth. The initial 24 `full-text` entries below received targeted inspection of relevant methods, evaluation, and/or limitations sections. This label does not mean every page was audited or that a result was reproduced. Other entries are primary-abstract/metadata reviews with correspondingly narrower annotations.

## Full-text inspection map

| Work | Source version / inspected material | Boundary emphasized |
| --- | --- | --- |
| [Voyager](papers.md#voyager) | arXiv v2, §§2.2–2.3, 3–4 | Skill admission, critic errors, and reuse in a new Minecraft world. |
| [Reflexion](papers.md#reflexion) | arXiv v4, §§3–5 | Bounded memory across repeated attempts; task-dependent feedback. |
| [ExpeL](papers.md#expel) | arXiv v3, §§3–6 | Cross-task insights, environment assumptions, and memory scaling. |
| [Agent Workflow Memory](papers.md#agent-workflow-memory) | arXiv v1, §§2.2–3 | Offline versus online induction and LM-judged trajectory admission. |
| [ReasoningBank](papers.md#reasoningbank) | arXiv v1, §§3–5; current v2 mechanism checked | Self-judged successes/failures and sequential reuse without test labels. |
| [SkillRL](papers.md#skillrl) | arXiv v1, §§3–4; v2 mechanism checked | Teacher distillation, trained policy, and skill-library updates. |
| [AFlow](papers.md#aflow) | arXiv v1, §§3–5 | Operator search space, validation selection, and held-out tasks. |
| [Darwin Gödel Machine](papers.md#darwin-godel-machine) | arXiv v1, §§3–4 and limitations; v3 abstract checked | Agent self-edits with fixed archive/selection machinery. |
| [Hyperagents](papers.md#hyperagents) | arXiv v1, §§3, 5.2–5.3, 7 and transfer protocol | Editable meta-agent with a fixed outer evaluation boundary. |
| [ACE](papers.md#ace) | arXiv v1, §§3–4 and Appendix B; v3 abstract checked | Incremental context updates and reflector dependence. |
| [ModularRSI](papers.md#modularrsi) | arXiv v2, §§3–5 | Restricted modules and frozen downstream function libraries. |
| [SICA](papers.md#sica) | arXiv v2, §§3–5 | Utility-based selection, benchmark subset, timeouts, and path dependence. |
| [STaR](papers.md#star) | NeurIPS 2022 PDF, §§3–4 and Algorithm 1 | Known answers and seed rationales remain inputs. |
| [RISE](papers.md#rise) | arXiv v2, §4 and evaluation overview | Persistent trained policy versus within-problem revision. |
| [Absolute Zero](papers.md#absolute-zero) | arXiv v3, §§2–4 and evaluation protocol | Pretraining and engineered execution feedback remain necessary context. |
| [SEAL](papers.md#seal) | arXiv v2, §§3–5 | Selected adaptation tasks, reward-evaluation cost, and forgetting. |
| [ELL / StuLife](papers.md#ell-stulife) | arXiv v6, framework and §5.2.1 | Reset-context baseline is distinct from a complete lifelong learner. |
| [Agent0](papers.md#agent0) | arXiv v2, §§3.1–3.3, 4.1–4.2 | Curriculum reward, self-consistency pseudo-labels, and peak checkpoint reporting. |
| [Model collapse](papers.md#model-collapse) | Nature 2024 main text/theory; 2025 correction | Replacement assumptions and finite experiments are distinct. |
| [Accumulating data](papers.md#accumulating-data-model-collapse) | arXiv v2, §§1–2.1 and theory overview | Retention changes data/compute costs; linear theory is not a general guarantee. |
| [AgentStream](papers.md#agentstream) | arXiv v2, framework, experimental settings, limitations | No test labels for adaptation; rankings depend on stream, framework, and model. |
| [PAST-Bench](papers.md#past-bench) | arXiv v1, §3 and evaluation pipeline | Fresh sessions and matched retained-state controls isolate a specific pathway. |
| [GDPevo](papers.md#gdpevo) | arXiv v1, §§3.2–3.4 and evaluation design | Task calibration includes expected evolution gains, affecting interpretation. |
| [Trusting Trust, Revisited](papers.md#trusting-trust-agents) | arXiv v1, threat model and §3.6 persistence | Constructed attacks and imperfect decontamination, not prevalence estimates. |

## Identity and publication notes

The official publication may follow the recorded preprint date. Titles can also change: DSPy's proceedings title uses “State-of-the-Art Pipelines” while its arXiv/PDF title uses “Self-Improving Pipelines”; TextGrad's Nature article is “Optimizing generative AI by backpropagating language model feedback”; the ACL Gödel Agent title uses “Recursively Self-Improvement.” These remain single works, with source links retained.

A second publication pass used the [ICLR 2023 ReAct page](https://iclr.cc/virtual/2023/poster/11003), [TMLR accepted papers](https://www.jmlr.org/tmlr/papers/), [ReasoningBank proceedings](https://proceedings.iclr.cc/paper_files/paper/2026/hash/980ea04d23d1f6908964eba2a74afe45-Abstract-Conference.html), and [UIST 2023 proceedings](https://uist.acm.org/2023/proceedings/) to resolve earlier access uncertainties. SkillRL's claimed NeurIPS 2026 acceptance remains author-reported until a venue record is inspected.

COLM 2026 calls its [volume](https://proceedings.colm.cc/paper_files/paper/2026) pre-proceedings because DOI assignment is pending, while stating that its PDFs and abstracts are final. Agent0 and Dr. Zero have linked conference records. Some OpenReview PDFs were visible through indexed primary extracts while direct requests were restricted; this is documented rather than treated as a failed publication check.

LoCoMo's project and proceedings describe different dataset statistics; the annotation avoids merging them. Pin the specific artifact and evaluator when comparing results. A-MEM's system repository is distinguished from its paper-evaluation repository. No repository link establishes reproducibility.

## Targeted full-text expansion: 2026-10-29

The 26 additions contain 25 selected full-text reviews and one primary-abstract/venue review. After that pass, totals were 49 selected full-text and 60 abstract/metadata reviews. These labels describe source inspection; no research implementation was executed and no result was independently reproduced.

| Work | Inspected version and sections | Boundary emphasized |
| --- | --- | --- |
| [Memento](papers.md#memento) | arXiv v2, §§3–4.2, 5.4–5.5, Appendix B | Frozen LLM versus trained retrieval network; validation/test protocols. |
| [AgeMem](papers.md#agemem) | arXiv v3, §§3.1–3.4, 4.1–4.2, limitations; ACL record | Fixed memory-tool vocabulary and controlled transfer. |
| [G-Memory](papers.md#g-memory) | arXiv v2, §§3–6 selected mechanisms/evaluation; NeurIPS record | Memory changes versus team redesign. |
| [TroVE](papers.md#trove) | arXiv v1, §§2–3, 5.4, 6; ICML record | Execution agreement and bounded human-verification study. |
| [AutoSkill](papers.md#autoskill) | arXiv v2, §§3, 4.5–4.8, 5.1–5.3 | Skill-bank construction is not a controlled downstream gain. |
| [LifeMem](papers.md#lifemem) | arXiv v1, §§4–6, limitations; EMNLP record | Mixed-source experience and remaining negative backward transfer. |
| [REM](papers.md#rem-experience-memory) | arXiv v1, §§3–6, Table 3 | Fixed experience pool, weak contrasts, same-repository retrieval. |
| [MemComposer](papers.md#memcomposer) | arXiv v2, §§3–4, limitations, Appendix B | Trained composer with fixed bank; performance-gap uncertainty. |
| [ASCENT](papers.md#ascent) | arXiv v1, §§3.1–3.3, 4.1–4.4, sparse-selection discussion | Persistent adapters, verifier dependence, reward thresholds. |
| [Continual learning limits](papers.md#self-evolving-continual-learners) | arXiv v1, §§3–4, Appendix D | One backbone, constructed drift, unconditional retrieval. |
| [StepLearn](papers.md#steplearn) | arXiv v1, §§3.1–3.4, 4.1, safeguards/cost analysis | Prospective checks versus causal utility; repeated tasks. |
| [RAGEN](papers.md#ragen) | arXiv v2, §§2.2–3.1, 4.1–4.2, 6 | Collapse diagnostics and current repository's RAGEN-2 expansion. |
| [Agent-R](papers.md#agent-r) | arXiv v3, §§3.1–3.2, 4.1–4.2 | Supplied training data and revision connectors. |
| [Re-ReST](papers.md#re-rest) | arXiv v3, §§2.1–2.3, 3.1, inference/DPO analysis; EMNLP record | External training feedback and separate reflector weights. |
| [SPIRAL](papers.md#spiral) | arXiv v3, §§3–4, Appendix B; ICLR record | Engineered games, compute, and transfer limits. |
| [SPICE](papers.md#spice) | arXiv v1, §§2.1–2.5, 3.1, evaluation and conclusion | Selected corpus and designed verification remain inputs. |
| [Socratic-Zero](papers.md#socratic-zero) | arXiv v1, §§3.1–3.3, 4.1 | Seed/SFT data and stronger frozen teacher qualify title. |
| [AIDE²](papers.md#aide2) | arXiv v1, §§2, 3.3, 3.5–3.6, 5 | Inconclusive outer-improver experiment; fixed selection. |
| [EvoX](papers.md#evox) | arXiv v2, §§3–4, 6; COLM record | Per-problem adaptation and unequal budget knowledge. |
| [MCE](papers.md#meta-context-engineering) | arXiv v2, §§3, 4.1, 4.3, 5; ICML record | Full offline evolution versus single-pass online variant. |
| [SelfOp](papers.md#selfop) | arXiv v1, §§III-A, III-D, IV | Earlier validation-based calibration of stopping. |
| [VERSE](papers.md#verse) | arXiv v1, §§2.1–2.2, 3.1, 4.1, 4.4, 5, Appendix E | Reimplemented baselines, fixed controls, compute limits. |
| [PACE](papers.md#pace) | arXiv v1, §§3–6 | Conditional per-candidate guarantee and finite audits. |
| [SED](papers.md#self-evolving-defense) | arXiv v1, §§4–5, Appendix A.11 | Benchmark-local memory and remaining defense failures. |
| [RSI evidence audit](papers.md#rsi-evaluation-audit) | arXiv v1, §§4–6, 9 | Search-frame and coding reliability limits. |

The [workflow optimization survey](papers.md#workflow-optimization-survey) received a primary abstract and Findings of EMNLP 2026 metadata review only. Independent source checks of selected annotations refined the MemComposer confidence-interval wording and retained the critical protocol qualifications above.

### Publication and artifact distinctions

[ELL / StuLife's official Findings of EMNLP 2026 record](https://aclanthology.org/2026.findings-emnlp.770/) uses “A Benchmark for Self-Evolving Agents via Experience-Driven Lifelong Learning.” The original arXiv title, first-public date, and stable catalog identity are retained. The publication abstract adds context-engineering comparisons; its large PDF could not be inspected in this pass. The launch's v6 full-text baseline review must not be treated as inspection of that later protocol.

Memento's original author repository redirects to Memento-Teams/Memento. MCE's current repository points separately to a paper-artifact repository. RAGEN's current source includes RAGEN-2, which remains a separate literature lead. REM's workshop acceptance is author-reported pending a venue record. These checks do not establish installation, paper-version equivalence, licensing compatibility, or reproduction.

## Targeted full-text expansion: 2026-10-30

All 20 additions received selected methods, evaluation, and limitation inspection. Totals after this pass are 69 selected full-text and 60 abstract/metadata reviews. These are source reviews, not independent reproductions.

| Work | Inspected version and sections | Boundary emphasized |
| --- | --- | --- |
| [ProactAgent](papers.md#proactagent) | arXiv v2, §§2–3, Appendices B and E; Findings EMNLP record | Reward-bearing replay, cold-start data, and shaped retrieval credit. |
| [MASkills](papers.md#maskills) | arXiv v1, §§3–5 selected methods/transfer; Findings EMNLP record | Textual-gradient analogy and validation-gate tolerance. |
| [APEX-EM](papers.md#apex-em) | arXiv v3, §§3–4, selected Appendices D/E/F/L/M/Q; Findings EMNLP record | Repeated-epoch cumulative success versus frozen-memory transfer. |
| [AgentMemRec](papers.md#agentmemrec) | arXiv v1, §§4–7 | Gold-supervised ranker and static memory-selection evaluation. |
| [PRISM](papers.md#beyond-prompts-prism) | arXiv v2, §§3–5, limitations; Findings EMNLP metadata and official reproducibility guide | Different Telecom scoring paths and bounded harness-edit surface. |
| [Control–data separation](papers.md#control-data-flow-separation) | arXiv v1, §§3–5 selected methods/experiments, limitations; Findings EMNLP record | Protocol validity versus task correctness; schemas remain fixed. |
| [FlowEvo](papers.md#flowevo) | arXiv v2, §§3–5; COLM record and author README | Online skill accumulation versus separate frozen-bank analyses. |
| [Code-edit readout](papers.md#rsi-budget-code-scoring) | arXiv v1, §§2–3 and 6 | Fixed predictor, disjoint score roles, and end-to-end budget uncertainty. |
| [Meta-Harness](papers.md#meta-harness) | arXiv v1, §§3–5; COLM record and author README | TerminalBench search/final task reuse versus separate transfer tests. |
| [Harness²](papers.md#harness2) | arXiv v1, §§2–3, analysis, Appendices F/G; author README | Persistent library versus reset execution harness and fixed stage rules. |
| [Memory Anchors](papers.md#memory-anchors) | arXiv v1, §§3–6 selected methods/experiments | Required past data and bounded simulation/real-robot sequences. |
| [CIDER](papers.md#cider) | arXiv v1, §§3–6 | Human-assisted acquisition and six-task retention evidence. |
| [PEAM](papers.md#peam) | arXiv v2, §§3–4 and limitations; Findings EMNLP metadata | Three-category isolation and fixed consolidation rules. |
| [EmbodiedRSI](papers.md#embodiedrsi) | arXiv v1, §§3–4; author project | Memory-manager training and human demonstrations before harness transfer. |
| [EoG](papers.md#evolve-on-graph) | arXiv v1, §§3–4, Appendix C; author README | Supplied graph/query patterns and validation/test separation uncertainty. |
| [SAGE](papers.md#sage-acceptance-gate) | arXiv v1, §§3–5 | Fixed-comparison error control and manual tuning. |
| [The Value of Memory](papers.md#value-of-memory) | arXiv v2, §§3, 5–6, 8 | Small diagnostics, post-hoc controls, and one-owner case evidence. |
| [MemoryTax](papers.md#memorytax) | arXiv v1, §§2, 4–6, Appendix A overview | Single runs and unequal access to photo evidence. |
| [TAME](papers.md#tame-memory) | arXiv v2, §§3–5, Appendix B; EMNLP record and author README | Shared-bank revision and frozen trustworthiness evaluation. |
| [SciValidityBench](papers.md#scivaliditybench) | arXiv v1, §§3–4, Appendix B, ethics/reproducibility; author README | Synthetic histories, supplied compilation, and state-use evaluation. |

Independent source checks of selected annotations confirmed the main qualifications for SAGE, TAME, EmbodiedRSI, EoG, The Value of Memory, and SciValidityBench.

### Versions and publication identities

[PEAM's published title](https://aclanthology.org/2026.findings-emnlp.1326/) uses “for Continual Skill Learning via Internalization of Experience in Minecraft”; the linked arXiv title uses “through Contrastive Internalization of Experience in Minecraft.” Matching authors and the author page connect them as one work. The full-text review concerns arXiv v2; the proceedings PDF was inaccessible, so version-equivalent experiments are not assumed.

FlowEvo's primary history lists 18 April 2026 as its first date despite its July-form identifier. Dates follow the source history. TAME v2 replaces the initial dual-memory account with a shared trust-aware bank, and APEX-EM v3 adds comparison distinctions absent from older indexed summaries. PRISM's verified venue is Findings of EMNLP 2026. EmbodiedRSI's project also uses the name EmbodiedEvo; it is retained as one identity.

EoG's current README describes validation using WebQSP/CWQ test questions. This limits what the inspected artifact establishes about checkpoint selection; it is not an assertion that a particular published run leaked test labels. Harness²'s documented network defaults likewise call for separate contamination controls without proving contamination in the paper. No source inspection here establishes artifact completeness or reproduction.

## Targeted full-text expansion: 2026-10-31

The twelve additions received selected full-text reviews, bringing the totals to 81 full-text and 60 abstract/metadata reviews. No research implementation or experiment was executed.

| Work | Inspected source and material | Boundary emphasized |
| --- | --- | --- |
| [DiscernMem](papers.md#discernmem) | arXiv v1, §§3–4 and limitations; author README | Fixed task order/backbone, inherited baselines, and accumulating avoidance conditions. |
| [CaliMem](papers.md#calimem) | arXiv v1, §§2–6 selected methods/evaluation, Appendices B/E | Memory persists within one search; repeated noisy evaluation feedback. |
| [ExpRAG](papers.md#exprag) | arXiv v2, §§2–5, Table 1 and Appendix F; EMNLP record | Fixed expert banks, matched hard-task traces, and task-dependent retry benefits. |
| [GameSmith](papers.md#gamesmith) | arXiv v1, §§4–5, Appendices A.3 and C.3–C.4 | Fixed game templates, teacher distillation, and model-dependent transfer. |
| [SPSD](papers.md#spsd) | arXiv v1 PDF, §§4–7 and Appendix C | Expert self-play precedes offline LLM training; evaluation protocols differ. |
| [ReSight](papers.md#resight) | arXiv v1, §§3–5 | Exploration episodes versus separate frozen-tool reuse; memory queries versus physical execution. |
| [MLE-World](papers.md#mle-world) | arXiv v1, §§3–7 and Appendix D; author sources | Prior execution corpus and seen-task surrogate training. |
| [CEPO](papers.md#cepo) | arXiv v1, §§3–5, ethics/reproducibility | Supplied role guidance, optimizers, labels, and dataset splits. |
| [EvolveMAS](papers.md#evolvemas) | arXiv v1, §§3–4, Appendices A/F | Fixed schema/models, adapted baselines, and bounded interactions. |
| [A-MemGuard](papers.md#a-memguard) | arXiv v1, §§3–5 and Table 1; ICML record and author README | Mostly-benign memory assumption; retrieval and end-to-end attack success differ. |
| [MemoryArena](papers.md#memoryarena) | arXiv v2, §§3–4 and Table 3; ICML record and preview README | Interdependent execution tests; memory gains vary by backend and task. |
| [COLLABMEM](papers.md#collabmem) | EMNLP proceedings PDF, §§3–6 and limitations, pp. 3–8 | Controlled memory-layer comparisons, not native product deployments. |

### Headline and protocol qualifications

A-MemGuard's abstract reports attack-success reductions above 95%, but Table 1 separates retrieval, thought, and task outcomes. For GPT-4o-mini with DPR on EHRAgent, retrieval attack success falls from 100% to 2.13%, while task-level success remains 36.17%. The annotation therefore does not generalize retrieval suppression to uniform end-to-end protection. MemoryArena §4.3 describes gains in web search and formal reasoning, while Table 3 shows backend- and metric-dependent results; the annotation retains that heterogeneity rather than treating every memory system as beneficial.

COLLABMEM's average-score finding is consistent with Table 5 within its fixed harness; it does not establish a universal product ranking. Its limitations explicitly question the compression metric. The inspected official record supports a year-only date, without an invented submission day. MemoryArena's proceedings and v2 HTML omit the title's MemoryArena prefix; the linked arXiv record retains it. They remain one work.

GameSmith uses a stronger teacher and engineered game templates; SPSD trains language models from separately trained search experts rather than putting the language model into expert self-play. ReSight separates exploration-set expansion from held-out reuse. ExpRAG's self-experience helps ALFWorld but hurts ScienceWorld. MLE-World's primary search tasks were seen in surrogate training, and its baseline lacks the same prior execution corpus. These qualifications limit the corresponding headline claims without treating untested generalization as a demonstrated failure.

## Monthly audit: selected full-text reviews, 2026-11-01

Twelve additions received selected original-source review. Totals are now 93 selected full-text and 60 abstract/metadata reviews. Metadata screening of venue listings is recorded separately in the search log and does not increase these review-depth counts.

| Work | Inspected version/material | Boundary emphasized |
| --- | --- | --- |
| [MemEvolve](papers.md#memevolve) | arXiv v1, §§3–5; ICML record and author README | Fixed outer search, candidate-memory resets, and pass-budget differences. |
| [MemSkill](papers.md#memskill) | arXiv v2, §§3–4, Appendices B/F; author README | Trained controller, fixed executor/designer, expert trajectories and validation tuning. |
| [SkillOpt](papers.md#skillopt) | arXiv v2, §§3–4, Appendices B/C; author project | Optimization cost versus deployment calls; current Sleep features are separate. |
| [optimize_anything](papers.md#optimize-anything) | arXiv v1, §§3–5 and 7–8; author framework/artifact | Supplied evaluators and diagnostic design; uneven multi-task transfer. |
| [EMMA](papers.md#emma) | arXiv v1, §§3, 5–6, Tables 2–5 | Persistent edits can survive failed repairs; comparator feedback/splits differ. |
| [Combee](papers.md#combee) | arXiv v2, §§3–4, Appendices B/E/H; COLM record | Speed–accuracy tradeoff and single-trial latency profiling. |
| [METTA](papers.md#metta) | arXiv v1, §§2–5, Appendices B/C | Fast-state and trial-history resets versus persistent slow weights. |
| [OPST](papers.md#on-policy-self-training) | arXiv v1, §§3–4 and 6, Appendices A.5–A.6 | Hand-chosen topics, unlabeled images, consistency verification and mixed retention. |
| [RoboCat](papers.md#robocat) | arXiv v2, §§2, 4–5, 7 and broader impact; TMLR accepted list | One demonstrated iteration, human demonstrations and controlled collection. |
| [Experience-driven safety](papers.md#experience-driven-safety) | arXiv v1, §§3–5, 7 and limitations; Findings ACL record | Two frameworks, automated grading and bounded evolution horizons. |
| [Membrane](papers.md#membrane) | arXiv v2, §§3–5 and limitations; EMNLP record and author README | Frozen primary tables, separately evolving streams, refusal-based headline metrics. |
| [PerMemSafe](papers.md#permemsafe) | Findings ACL PDF, §§3–5 and limitations, pp. 3–8 | Synthetic text, sampled judge verification and response-level safety. |

### Interpretation and identity notes

Combee's abstract allows matching or approaching baseline quality; Table 2 shows that its largest Terminal-Bench speedup accompanies lower accuracy than sequential ACE. The annotation preserves that tradeoff without calling the statements contradictory. OPST improves average out-of-domain retention while its all-domain mixture loses 4.9 points on MATH-500; its annotation retains both the aggregate benefit and that counterexample. RoboCat's self-improvement evidence includes one successful loop iteration with human-managed data collection, not unrestricted online learning.

Membrane's main AgentHarm attack-success metric is non-refusal, while a separate appendix reports native graded outcomes. Its annotation therefore qualifies the headline metric rather than claiming execution outcomes were never studied. Online evolution receives paired benign counterparts, and fully adaptive prompt-plus-memory control lies outside the tested threat model. PerMemSafe measures personalized response safety in constructed conversations; those scores do not establish clinical outcomes or safe autonomous action. Experience-driven safety findings are kept within the evaluated memory frameworks and finite horizons.

MemSkill's NeurIPS 2026 acceptance remains author-reported despite an official title listing, because the detailed venue record was not inspected. optimize_anything remains a preprint entry with an author-reported ACM CAIS note because the publisher record was inaccessible. Combee's proceedings title adds “Parallel” and uses “LLM Agents”; author and paper identity connect it to the retained arXiv title. RoboCat's TMLR accepted-list record confirms its publication, while its linked OpenReview page remains restricted. Missing code URLs remain unverified availability, not evidence that no release exists.

## Monday source review: 2026-11-02

Twelve selected full-text additions bring the totals to 105 full-text and 60 abstract/metadata reviews. The separate Group-Evolving Agents update verifies publication metadata only.

| Work | Inspected version/material | Boundary emphasized |
| --- | --- | --- |
| [Skill∞](papers.md#skill-infinity) | arXiv v1, §§3–4, limitations and Appendices B/C/E/G; author README | Fixed external scores/caps; task-level validation does not establish a separate meta-task test split. |
| [MultiEvoSkill](papers.md#multievoskill) | arXiv v1, §§3–4, limitations and Appendix B | Workflow-node F1 differs from interactive task success; model review is not proof. |
| [MiniWeb](papers.md#miniweb) | arXiv v1, §§3–4, 6, Appendices H/J | Planner dependence, privileged generation and filtered live-web evaluation. |
| [CoHARL](papers.md#coharl) | arXiv v1, §§3–4, Appendices B/C/E–G | Fixed training/evaluation framework, single training runs and separate terminal training. |
| [Retrospective harness study](papers.md#retrospective-harness-study) | arXiv v1, §§III–VI | Human selection/labeling and targeted behavior rather than consistent task-success gains. |
| [Policy–harness geometry](papers.md#policy-harness-geometry) | arXiv v2, §§2–3, 5–7, Appendix F; author README | Exact control theory versus stronger-teacher ceiling proxies in coding tasks. |
| [Reasoning Cache](papers.md#reasoning-cache) | arXiv v2, §§3–7, Appendix E; ICML record and author README | Within-problem inference, supplied mathematical supervision and revised grading. |
| [Self-evolution gap](papers.md#self-evolution-generalization-gap) | arXiv v2, §§2–6, Appendix A; ICML record | Restricted offline setup and a larger-model near-oracle exception. |
| [Robot RSI failure study](papers.md#robot-rsi-123-rounds) | arXiv v1, §§2–4, 6, 10 and round-ledger overview | One simulated run, human harness repairs and unresolved target task. |
| [Memory Tax: net value](papers.md#memory-tax-net-value) | arXiv v1, §§3–5, limitations, Appendices A/B/C | Static long-history tasks, relative retrieval scope and heterogeneous results. |
| [Curriculum or easy start?](papers.md#quadruped-curriculum-benchmark) | arXiv v1, §§3–7 and budget protocol; author repository | Equal student steps do not equal total simulation compute. |
| [REUSE](papers.md#reuse-evaluation) | arXiv v2, §2 assumptions/theorem, §3 and §5 | Independent evaluation sample, decision-only protected feedback and finite classification holdout. |

### Interpretation and publication distinctions

Skill∞ revises a meta-skill, but external scores, budgets, and reviewer responsibilities remain fixed. Its task-level training/validation protocol does not establish disjoint meta-training and meta-test tasks. MultiEvoSkill's WikiHow, ToolAlpaca, and WebShop adapters score workflow nodes; their F1 scores must not be relabeled interactive success. MiniWeb explicitly reports that skill-only fine-tuning fails to transfer well to full tasks; planner composition and filtered benchmark denominators matter.

Reasoning Cache's title refers to continued improvement within one problem using trained summary-conditioned inference, not ongoing deployment weight updates. Its v2 changed IMO-AnswerBench grading after earlier parser errors. The generalization-gap study reports both plateaus and a larger-model revision condition near oracle supervision. The robotics case study does not eliminate human intervention: people repaired the evaluator and surrounding machinery, and one target task never succeeded.

Memory Tax (arXiv 2610.34073) is distinct from MemoryTax (2610.29823), with different authors and experiments. Its main settings are long-history memory benchmarks, including non-conversational state changes; a stronger retrieval baseline does not establish that memory is generally unnecessary. The quadruped study finds no universally best curriculum and counts student environment steps; PAIRED's antagonist adds simulation work. REUSE derives simultaneous error control under explicit independence and protected-feedback assumptions. Its Covertype holdout estimates population improvement, and its adapted comparison schemes are not executions of the original SICA/DGM/PACE systems. Selected draft-informed cross-checks supported these qualifications.

[Group-Evolving Agents' official COLM record](https://proceedings.colm.cc/paper_files/paper/2026/hash/87b321515dc33137ffcc5d1654b7d182-Abstract-Conference.html) matches the existing work's title, core author identity, and abstract. It remains one record with its original first-public date; publication metadata was upgraded without claiming a new full-text review or reproduction. The retrospective harness study's linked archive was inaccessible, and Skill∞'s repository promises a future code release; neither was promoted to runnable-code evidence.

## 2026-11-04 — Memory control, skill routing, and retention

Five additions received selected full-text review; the catalog now has 110 full-text and 60 abstract/metadata research reviews. No linked research code was executed or result independently reproduced.

| Work | Primary material inspected | Evidence boundary retained |
| --- | --- | --- |
| [OMCE](papers.md#omce) | arXiv v1, §§3–4, Appendices F/G/H | Single runs, tuning/evaluation overlap, judge costs and fixed controller design. |
| [Skill++](papers.md#skill-plus-plus) | arXiv v1, §§3–4, Appendices B/C | Deliberately confusable additions; routing versus the smaller task-success check. |
| [Harness forgetting](papers.md#continual-harness-forgetting) | arXiv v1, §§2–4, Appendices A/B; author README | Reused small subsets and adapted implementations, without a described held-out split. |
| [Obsolete facts](papers.md#obsolete-facts-memory) | arXiv v1, §§2–4, Appendices A/B; author README | Within-cohort intervention, prior-knowledge confounding and diagnostic gold access. |
| [Search Self-Play](papers.md#search-self-play) | arXiv v3, §§3–4, Appendix A; ICLR record and selected proceedings methods; author README | Training-set seed answers, larger-model verification and bounded local retrieval. |

Search Self-Play retains its first preprint date, 21 October 2025. The official ICLR title capitalizes “Self-Play”; arXiv uses “Self-play”. The inspected current manuscript is v3 (19 May 2026), and its current artifact link is Qwen-Applications/SSP. Obsolete Facts remains labeled preprint because its author-reported PALM workshop acceptance was not independently confirmed in a primary venue record.

Prior inspection dates and all software execution records were preserved. MemEvolve, Absolute Zero, and the Learning to Remember survey received metadata/version spot checks without timestamp-only edits. Reading routes now connect memory routing, skill selection, search self-play, and harness retention.

## 2026-11-05 — Artifact effects, embodied memory, and runtime adaptation

Five new papers received selected full-text review, and Hyperagents was revisited at v2. There are now 115 selected-full-text reviews and 60 abstract/metadata reviews. No linked code was executed.

| Work | Material inspected | Boundary retained |
| --- | --- | --- |
| [Artifact-to-Capability](papers.md#artifact-to-capability) | arXiv v1, §§3–7 and Appendix F | Study-specific Gomoku adaptations, evolution-derived states and local rule checks. |
| [MUSE scientific memory](papers.md#muse-scientific-memory) | arXiv v1, §§3–4, Appendix A; author README | Frozen memory/test split, shared backbone and separate benchmark integrations. |
| [LIFE](papers.md#life-embodied) | arXiv v1, §§2–7, Appendix D | Offline replay, six questions and inherited ReSight experiments. |
| [Exo](papers.md#exo-runtime) | arXiv v1 PDF, §§3–5/7, Appendices A/B; pinned README and current docs | Build-only guardian, enforcement assumptions, limited transfer and low-reuse cost penalty. |
| [MARSHAL](papers.md#marshal) | arXiv v3, §§3–4/6, Appendices B–E; ICLR record and author README | Two-player training, auxiliary rewards and fixed downstream frameworks. |
| [Hyperagents](papers.md#hyperagents) | arXiv v2, §5.2, §7 and Appendix D.5 | Separate meta/task transfer under a fixed meta-agent generation test. |

LIFE explicitly reuses ReSight’s capability-expansion results; the added perception and integrated study do not make those results independent replications. Its paper-linked repository returned HTTP 404 through both web retrieval and ordinary public HTTP, so implementation availability is left unverified. MUSE here is distinct from the existing MUSE-Autoskill entry.

Exo’s arXiv metadata title is retained; its PDF uses “Exo: A Harness Architecture for Runtime Self-Improvement”. The HTML conversion ends before completing the evaluation, so the PDF supplied that evidence. The paper cites source snapshot c5c1963, whose README and MIT license were inspected. Current official documentation calls the self-evolving harness an earlier experiment and describes a changed hosting runtime. The new software record preserves this relationship.

Hyperagents retains its first-public date and prior v1 source. The current v2 annotation makes the component-transfer control and formatting-sensitive initial score explicit. This is a selected source review, not a rerun or complete version diff. Other existing inspection dates and execution records are unchanged.

## 2026-11-06 — Research transfer, weight memory, and skill safety

Five additions received selected full-text review: four papers and one benchmark paper. The catalog now has 120 selected-full-text and 60 abstract/metadata reviews. No linked code, agent experiments, attacks, or model training were executed.

| Work | Material inspected | Boundary retained |
| --- | --- | --- |
| [Continual AutoResearch](papers.md#continual-autoresearch) | arXiv v1, §§3–6 and reproducibility statement | Earlier useful initialization differs from better final research outcomes; short streams and limited repeats. |
| [Route to Remember](papers.md#route-to-remember) | arXiv v1, §§3–5, Appendix A.1–A.5 | Delayed forgetting, conflict-category regression, judge artifacts and uncounted training compute. |
| [Meta²](papers.md#meta-square) | arXiv v1, §§3–4, Appendices B/C/F; author project | Frozen guidance, task-local edits, privileged training information and per-backbone reconstruction. |
| [Benign skill safety](papers.md#benign-skill-misalignment) | arXiv v1, §§2–6, Appendix A.1–A.6 | Harmful evaluation requests, unresolved-judgment exclusions and bundled content changes. |
| [Self-Harmony](papers.md#self-harmony) | arXiv v2, §§3–4, Appendix E.2; ICLR record/PDF and author README | Adaptation and evaluation share unlabeled questions; consistency is not a correctness oracle. |

Self-Harmony’s first date remains 3 November 2025, and its ICLR 2026 status is supported by the official proceedings. Route to Remember retains a preprint label: its PALM workshop reference was author-reported, with no independently verified venue record in this pass. Its annotations describe the reported question set rather than asserting complete benchmark coverage.

Continual AutoResearch promises a future code release. Meta²’s project page was accessible through ordinary public HTTP after the web reader failed; no implementation link was established. These access and availability observations are separate from scientific evidence. Existing paper/system inspection dates and execution records were preserved.

## 2026-11-07 — Skill interactions, memory revision, and evolution regressions

Six additions received selected full-text review, for **126 full-text and 60 abstract/metadata reviews**. No linked research code, agents, attacks or model training were executed.

| Work | Primary material inspected | Evidence boundary retained |
| --- | --- | --- |
| [BASM](papers.md#basm) | arXiv v1, §§3–5 and limitations; Findings EMNLP record/PDF | Offline library construction; schema checks versus semantics; utility/safety tradeoff. |
| [SkillRubricsRL](papers.md#skillrubricsrl) | Findings EMNLP PDF, §§3–4 and Appendix A.2–A.3; author README | Skill-on/off results, model-judged rubrics, partial cost accounting and unreleased code. |
| [MemoRepair](papers.md#memorepair) | arXiv v1, §§2–5 | Complete provenance, constructed task diagnostic and operator-level cost boundary. |
| [StateGraph](papers.md#stategraph) | arXiv v1, §§3–6 and limitations | Inferred support, missing run/annotation records and omitted action evaluation. |
| [Coalition skill reliability](papers.md#coalition-skill-reliability) | arXiv v1 HTML and nine-page PDF, §§3–5 | Bank-level sampled knockouts, target proxy, twelve proposals and uncertain target reversal. |
| [Beneath the Surface](papers.md#beneath-surface-agent-evolution) | arXiv v1, §§3–8 and Appendices A/B.4/D/E; RSIHub README | Adapted recipes, repeated evaluation versus search replication, fixed bundled revisions. |

BASM's AgentDojo safety gain does not imply uniform utility improvement. SkillRubricsRL's strongest metrics span different deployment conditions, and its paper-linked repository currently promises future code. Its year-only date reflects verified publication precision, without an invented preprint day.

MemoRepair's min-cut result applies to a fixed scalarized selection problem; its task diagnostic is derived from repaired and stale artifact sets. StateGraph preserves historical states and alternative support, but its closure measure relies on model judgments. Coalition skill reliability's abstract invokes Shapley marginals, whereas the implemented CASS gate uses a sampled bank-level knockout average; the annotation follows the method. Its referenced appendices were not present in the inspected nine-page PDF, so no appendix-level verification is claimed.

Beneath the Surface calls its diagnostic workflow EvoAudit and the resulting fixed operator recipe AGE. The author-linked RSIHub is shared infrastructure; its current default branch was not audited for paper-version equivalence. Prior source-review dates and all software execution records were preserved.

## 2026-11-08–09 — Targeted training, experience lifecycles, and replay

Four further additions received selected full-text review: three papers and one benchmark paper. The resulting collection has **130 full-text and 60 abstract/metadata reviews**. Individual inspection dates remain attached to the records.

| Work | Primary material inspected | Evidence boundary retained |
| --- | --- | --- |
| [Targeted guidance](papers.md#targeted-guidance) | arXiv v2, §§3–6; primary version record | Designed hints, failure-only distillation, training-step variability and remaining collapse risk. |
| [ReScopeBench](papers.md#rescopebench) | arXiv v1, §§2–3, Appendix B and selected C; author README | One stream per condition, diverging environment state, reference coverage and first-completion recovery. |
| [RIFAR](papers.md#rifar) | arXiv v3, §§3–4, limitations and selected Appendices A–C | Trainable reliability model, demonstration dependence, residual replay errors and storage-versus-compute distinction. |
| [HarnessFlow](papers.md#harnessflow) | arXiv v1, §§2–4/6 and Appendices B–D | Fixed outer optimizer, stronger proposer, disjoint task splits and search-cost exclusion. |

RIFAR retains its 2 October first-public date and the current v3 title. Its reliability model is updated sequentially in v3; the earlier v1 description of a frozen model was not carried into the annotation. HarnessFlow's additional executor experiment reruns search rather than demonstrating transfer of an unchanged harness. Targeted guidance retains its original 3 November date despite the v2 revision on 4 November.

ReScopeBench separates programmatically scored task outcomes from model-judged coverage of saved experience. Its simulated applications do not establish live deployment, and background skill review is outside foreground tool-call counts. No linked implementation, training procedure or benchmark was executed.

## 2026-11-09 — Detailed review of existing entries, batch 1

The broader audit covers all 190 research works. This first batch upgrades four previously abstract-only entries; it does **not** complete the collection-wide audit. There are now **134 full-text and 56 abstract/metadata reviews**. Earlier full-text labels still describe their documented, selected-section inspections. No research code was executed and no result was independently reproduced.

| Work | Version and material inspected | Qualification added |
| --- | --- | --- |
| [A-MEM](papers.md#a-mem) | [arXiv v11](https://arxiv.org/html/2502.12110v11): §§1–6, Appendices A–B, Tables 1–8, figure captions, checklist; PDF inspection of Table 1 and Figures 3–5 | Model/category-specific retrieval settings, missing repeated-run significance analysis, and category-level losses. |
| [ADAS](papers.md#adas) | [arXiv v2](https://arxiv.org/html/2408.08435v2): §§1–6, Appendices A–J, Tables 1–6; framework/example code read only; Figure 3 visually inspected | Small ARC split, source-test selection for transfer candidates, variable transfer outcomes, and fixed outer search. |
| [AgentDevel](papers.md#agentdevel) | [arXiv v1](https://arxiv.org/html/2601.04620v1): §§1–4, Appendices A–C; Figure 1 and Tables 1–3 visually inspected in PDF | Regression control trades off against final score; configurable gates do not guarantee zero regressions. |
| [AgentSquare](papers.md#agentsquare) | [arXiv v3](https://arxiv.org/html/2410.06153v3): §§1–6, Appendix A, algorithm and tables; Figures 4–6 and A.7–A.15 visually inspected; example-module text read from PDF | Separate search cost, heterogeneous task metrics, and an unspecified independent search/test split and run uncertainty. |

A-MEM §4.3 describes twofold multi-hop gains, but Table 1's GPT-4o multi-hop F1 is 32.86 versus MemGPT's 30.36; the larger temporal improvements must not be relabeled as multi-hop evidence. The annotation retains the category-specific results. AgentDevel's WebArena final score is 35.5 in Table 1 and 34.2 in Table 3; the paper does not explain the difference, so those figures are not merged. The same ablation reports a higher final score without the gate alongside more regressions. ADAS and AgentSquare demonstrate bounded external search; neither establishes unrestricted post-deployment continual improvement.

## 2026-11-09 — Detailed review of existing entries, batch 2

DSPy, MemGPT, ReAct and Self-Refine now have full-text annotations. The catalog has **138 full-text and 52 abstract/metadata reviews**. Eight works have received the broader appraisal begun today; the other 182 remain pending for that broader pass, including the 130 earlier selected-section inspections. Source reading is not reproduction.

| Work | Version and material inspected | Qualification added |
| --- | --- | --- |
| [DSPy](papers.md#dspy) | [arXiv v1](https://arxiv.org/html/2310.03714v1): §§1–8, Appendices A–F, prompt/code examples read only; Tables 1–2 checked in PDF | Metric-conditioned compilation, ensembles and optional weight training; development/test and teacher-input distinctions. |
| [MemGPT](papers.md#memgpt) | [arXiv v2](https://arxiv.org/html/2310.08560v2): §§1–5, Appendix 6.1, Tables 1–3 and Figures 1–8 | Full-history access versus summary-only baselines, permissive judging, small document-QA sample and function-call failures. |
| [ReAct](papers.md#react) | [arXiv v3](https://arxiv.org/html/2210.03629v3): §§1–6, Appendices A–E, prompts and trajectories; main result tables and Figures 1–5 checked in PDF | Prompted within-task behavior and separate offline fine-tuning are distinct; best-prompt results are not average performance. |
| [Self-Refine](papers.md#self-refine) | [arXiv v2](https://arxiv.org/html/2303.17651v2): §§1–7, Appendices A–S and prompt examples; main tables, oracle comparison, confidence-interval page and key figures inspected visually | Main-table math gains are negligible; oracle-guided refinement, human-written examples and preference measures must be identified separately. |

DSPy's reusable changes include optional fine-tuned weights and ensemble composition, not only prompts. ReAct's tags now accommodate its explicitly separate fine-tuned variant; the prompted loop remains a within-task baseline. MemGPT's conversation-opener similarity scores are not a human-preference result. Self-Refine's Table 1 reports math gains of 0, 0.2 and 0.2 percentage points; Appendix H.1 and Appendix O use correctness-guided variants. Its Appendix J caption says 95% while the following paragraph says 99%; this unresolved discrepancy is retained rather than assigning an assumed confidence level.

## 2026-11-09 — Detailed review of existing entries, batch 3

AlphaGo Zero, Constitutional AI, Generative Agents and Toolformer received detailed source reviews. Counts are now **142 full-text and 48 abstract/metadata reviews**. Twelve broader appraisals are complete; 178 works remain pending for that pass. No game, simulation, training process or linked research code was executed.

| Work | Version and material inspected | Qualification added |
| --- | --- | --- |
| [AlphaGo Zero](papers.md#alphago-zero) | Nature article, DOI 10.1038/nature24270, [public PDF linked by an author](https://www.julian.ac/papers/): main text, Methods, main plots, Extended Data 2–3 and Tables 1–3, reporting summary | Distinct 3-day/40-day runs and opponents; data-generation gate, engineered game assumptions and training versus playing hardware. Game records were not replayed. |
| [Constitutional AI](papers.md#constitutional-ai) | [arXiv v1](https://arxiv.org/html/2212.08073v1): §§1–7, Appendices A–E, Figures 1–12 | Human helpfulness labels remain; evaluation instructions, initialization, judge variants and over-optimization qualify the results. |
| [Generative Agents](papers.md#generative-agents) | [arXiv v2](https://arxiv.org/html/2304.03442v2): §§1–9, Appendices A–B, Figures 1–9; official UIST proceedings | Two simulated days and interview believability; ablations reuse full-system histories rather than independently simulating alternatives. |
| [Toolformer](papers.md#toolformer) | [arXiv v1](https://arxiv.org/html/2302.04761v1): §§1–8, Appendices A–D, result tables and method/scaling figures | Loss-based filtering, externally supplied APIs, tool restrictions, decoding intervention and non-uniform downstream gains. |

The AlphaGo Zero publisher page had a cookie/access failure and UCL's PDF returned an access error; the author's openly linked PDF supplied the article and Methods with the matching DOI. Four TPUs refer to playing, whereas the optimization pipeline uses 64 GPU workers and 19 CPU parameter servers. Constitutional AI retains human helpfulness labels and prompt authorship despite replacing human harmlessness labels. Generative Agents' earlier code note incorrectly continued to describe the work as a preprint after its status had been verified; the note now agrees with the [official UIST record](https://uist.acm.org/2023/proceedings/) while retaining the original repository-inspection date. Toolformer's one-call restriction and top-ten API-token decoding rule are part of the evaluated system, not evidence of unconstrained multi-tool learning.

## 2026-11-09 — Detailed review of existing entries, batch 4

Mem0, MemoryBank, LongMemEval and LoCoMo now have full-text annotations; A-MEM received a version-comparison follow-up. Counts are **146 full-text and 44 abstract/metadata reviews**. Sixteen broader appraisals are complete and 174 remain pending, including the earlier selected-section reviews. No memory system, benchmark or training procedure was executed.

| Work | Version and material inspected | Qualification added |
| --- | --- | --- |
| [Mem0](papers.md#mem0) | [arXiv v1](https://arxiv.org/html/2504.19413v1): §§1–5, Appendices A–C, Tables 1–2, architecture and latency figures | Higher full-context QA accuracy, category-dependent graph gains, query-time versus construction cost, excluded adversarial questions. |
| [MemoryBank](papers.md#memorybank) | [arXiv v3](https://arxiv.org/html/2305.10250v3): §§1–6, Tables 1–2 and Figures 1–4 | Synthetic bilingual probes compare backbones, not a controlled forgetting-rule intervention; no clinical validation. |
| [LongMemEval](papers.md#longmemeval) | [arXiv v2](https://arxiv.org/html/2410.10813v2): §§1–6, Appendices A–E, tables, construction examples and performance/error figures | Constructed histories, limited judge meta-evaluation, reader effects and a separate shorter-history commercial study. |
| [LoCoMo](papers.md#locomo) | [ACL 2024 PDF](https://aclanthology.org/2024.acl-long.747.pdf): §§1–9, Appendices A–D, tables, pipeline/multimodal/editing figures; preprint metadata and project page | Ten edited evaluation conversations versus fifty unedited training conversations; single-run results and publication-specific statistics. |

LoCoMo's first-public date is now resolved from year-only precision to **2024-02-27** using its [arXiv record](https://arxiv.org/abs/2402.17753). The ACL paper's Table 5 reports 1,986 questions and approximately 16.6k tokens per conversation; its preprint/project describes approximately 9k tokens. These are retained as different source descriptions, not silently combined. MemoryBank's AAAI page denied this reading tool access; the new body review concerns arXiv v3 and does not assert identity of the later proceedings experiments.

### A-MEM category-label follow-up

The [v5 PDF](https://arxiv.org/pdf/2502.12110v5) and [v11 PDF](https://arxiv.org/pdf/2502.12110v11) display identical GPT-4o-mini Table 1 F1 values under different question-type labels. [Mem0 v1 Table 1](https://arxiv.org/pdf/2504.19413v1) imports these values under another labeling combination:

| F1 value | A-MEM v5 label | A-MEM v11 label | Imported label in Mem0 |
| --- | --- | --- | --- |
| 27.02 | Single hop | Multi hop | Single hop |
| 45.85 | Multi hop | Temporal | Temporal |
| 12.14 | Temporal | Open domain | Multi hop |
| 44.65 | Open domain | Single hop | Open domain |

The first audit batch accurately described v11's displayed table, but this comparison adds a material version ambiguity. The canonical annotation now withholds an unconditional category-level interpretation. The mapping must be resolved against a pinned evaluation artifact before using these imported numbers for cross-paper rankings; this review does not infer which labeling is correct.
