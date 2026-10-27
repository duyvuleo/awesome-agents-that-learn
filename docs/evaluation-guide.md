# How to evaluate a learning claim

[← Collection](../README.md) · [Primer](primer.md) · [Paper catalog](papers.md)

These are curator recommendations for designing a study. They are not experiments already executed by this collection, and they do not prescribe one universal benchmark.

## State the claim before running the loop

Choose a question that an experiment can resolve: does a retained skill improve later tasks, does a memory policy preserve earlier knowledge, or does an altered improvement procedure produce better candidates? Specify the unit of change and which components stay fixed. Treat a better answer on another attempt, a better retained agent, and a better optimizer as different outcomes.

| Evidence question | Useful comparison |
| --- | --- |
| Does adaptation help? | Learning enabled versus the same starting agent with updates disabled |
| Does retained experience help? | Updated memory versus empty memory and the frozen initial memory |
| Does the proposed mechanism matter? | Remove, replace, or perturb that component while matching other conditions |
| Does learning transfer? | Previously unseen tasks, task families, domains, or model backbones |
| Does knowledge persist? | Re-evaluate earlier tasks after later updates |
| Does the improver improve? | Original versus modified improver, each starting from matched solvers and budgets |

## Make the comparison fair

Match the base model, starting state, tools, available information, task order, and evaluation wrapper. An empty-memory baseline isolates the value of having memory; a frozen-memory baseline helps isolate the value of updating it. Include a strong fixed agent that can use comparable inference effort. Otherwise, more retries or a better starting prompt can masquerade as a learning benefit.

Run repeated frozen controls through the same pipeline, including sampling and scoring. This estimates apparent changes that arise without learning. [Phantom Gains](papers.md#phantom-gains) motivates this measured null; its findings do not imply that all self-training fails. Use paired task-level results and uncertainty across tasks and seeds, and state how task-family dependence is handled.

Count the whole budget: candidate generation, failed updates, rejected candidates, model calls, training, tool execution, selection, and evaluation. Report tokens or compute, wall time, and human effort where measurable. Separate development/search cost from the cost of deploying the selected agent. Report stopping rules and failures alongside the best candidate.

## Preserve held-out tasks and chronology

Split task families before constructing experiences, skills, curricula, or candidate updates. Use development tasks for selecting variants; reserve held-out tasks for the final comparison. Record any repeated test access, including access through a judge, retrieved document, generated training example, or benchmark-derived skill. If hidden labels are unavailable, disclose that limitation rather than calling the evaluation leakage-free.

For streaming studies, preserve what was available at each decision. Later outcomes must not appear in earlier memories or evaluator prompts. Compare isolated, shifted, and interleaved task streams where relevant; [AgentStream](papers.md#agentstream) provides one such evaluation design. Keep separate snapshots for the agent state, experience store, task stream, and evaluator.

## Test the mechanism and its durability

A log saying “used memory” is not evidence that memory caused the result. Intervene: remove a relevant experience, replace it with a controlled alternative, shuffle retrieval, or hold the learned component fixed. Check whether behavior changes as predicted. [Experience-faithfulness experiments](papers.md#experience-faithfulness) illustrate why end-task success and causal use of experience are separate questions.

Measure learning curves as well as final scores. Revisit earlier tasks, test new families, and distinguish faster adaptation from a higher eventual ceiling. Report regressions, stale knowledge, failed retrieval, and growing memory or context costs. [SEAL](papers.md#seal) explicitly examines forgetting after sequential edits; its adaptation gains should be read together with that retention evidence.

## Keep feedback and evaluation independent

Record who generates tasks, supplies labels, judges outputs, and selects updates. A self-judge's agreement is a training signal, not independent validation. Where possible, use held-out executable checks or separately assessed human judgments, and audit a sample of generated tasks and rewards. Check whether the learner can alter evaluators, tests, or logs that determine its own score.

Evaluate safety and authorization behavior across updates, including later clean tasks and resumed learning after a rollback. Track which descendants inherit a changed component. [Poisoned-benchmark studies](papers.md#trusting-trust-agents) examine persistent effects in specified self-modifying agents; the [safety survey](papers.md#safety-self-evolving-survey) offers a broader organizing framework. Neither supplies a universal safety certificate.

## Keep a compact study note

```text
Question and claimed mechanism:
Starting agent; editable and fixed components:
Data cutoff; task-family splits; task order:
Feedback, selection rule, and independent evaluator:
Frozen, no-memory, and component-ablation baselines:
Total learning/search budget; deployment budget:
Seeds; stopping rule; contamination checks:
Learning curve; held-out transfer; retention; safety regressions:
Failures, uncertainty, and limits of the conclusion:
Versioned artifacts and commands needed to repeat the study:
```
