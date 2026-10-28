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

The 26 additions contain 25 selected full-text reviews and one primary-abstract/venue review. Current totals are 49 selected full-text and 60 abstract/metadata reviews. These labels describe source inspection; no research implementation was executed and no result was independently reproduced.

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
