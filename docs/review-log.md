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
