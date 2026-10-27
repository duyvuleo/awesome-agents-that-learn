# Source-review notes

[Overview](../README.md) · [Search method](search-log.md)

Reviewed 2026-10-28. Every catalog entry includes primary sources and its review depth. The 24 `full-text` entries below received targeted inspection of relevant methods, evaluation, and/or limitations sections. This label does not mean every page was audited or that a result was reproduced. Other entries are primary-abstract/metadata reviews with correspondingly narrower annotations.

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
