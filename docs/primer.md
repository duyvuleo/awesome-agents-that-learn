# A primer on agents that learn

[← Collection](../README.md) · [Paper catalog](papers.md) · [Evaluation guide](evaluation-guide.md)

An agent can improve an answer without learning anything that survives the task. It can also retain useful experience without changing its model weights. Start by identifying what changes, how long that change lasts, and what evidence shows it helps.

The distinctions below are a reading aid for this collection. They are not a universal taxonomy, and a system may combine several mechanisms.

## Begin with the ordinary agent loop

An agent receives a task, chooses an action, observes the result, and decides what to do next. Reasoning, tool use, retrieval, and retries can all occur inside this loop. [ReAct](papers.md#react) is a useful starting point: actions obtain information that informs later decisions within an interaction. That loop alone does not establish learning between tasks.

For a learning system, look for an additional sequence: collect experience, produce a candidate update, evaluate it, and retain or reject it. The retained artifact might be a memory entry, executable skill, prompt, workflow, program, or set of model parameters. Some systems combine these steps; others omit an explicit acceptance check. Ask which parts the agent controls and which remain fixed by its developers.

## Separate six kinds of change

| Change | What to inspect | Reading examples |
| --- | --- | --- |
| Within-task correction | Revised answers, plans, or retry context; whether anything survives a reset | [Self-Refine](papers.md#self-refine), [Reflexion](papers.md#reflexion) |
| Persistent experience | What is stored, retrieved, revised, and forgotten across tasks | [ExpeL](papers.md#expel), [ReasoningBank](papers.md#reasoningbank) |
| Reusable skills and tools | Executable behavior retained for later selection or composition | [Voyager](papers.md#voyager), [Agent Workflow Memory](papers.md#agent-workflow-memory) |
| External optimization | A developer-configured search or compiler improving a reusable agent configuration | [DSPy](papers.md#dspy), [ADAS](papers.md#adas) |
| Model learning | Training data, rewards, optimizer, updated weights, and adaptation cost | [STaR](papers.md#star), [Absolute Zero](papers.md#absolute-zero), [SEAL](papers.md#seal) |
| Improvement-process changes | Whether the machinery proposing or selecting updates can itself change | [STOP](papers.md#stop), [Hyperagents](papers.md#hyperagents) |

The boundaries matter. Reflexion's central experiments retain reflections for further attempts at the same task; they do not establish a general library that improves later tasks. ExpeL instead extracts reusable insights from training experiences for subsequent tasks. Both use text outside model weights, but the learning claims differ. [Reflexion](papers.md#reflexion) · [ExpeL](papers.md#expel)

“Training-free” also needs a stated reference point. Updating an external memory may leave the base model fixed, while the policy that manages that memory was trained beforehand. [Memory-R1](papers.md#memory-r1) illustrates this distinction. Record both the offline preparation and the changes made during use.

## Follow the feedback

Self-learning does not necessarily mean learning without external information. Feedback can come from an executable environment, reference answers, people, another model, or the learner's own judgments. These signals have different failure modes.

[STaR](papers.md#star) uses known answers to select generated reasoning traces. [Absolute Zero](papers.md#absolute-zero) generates its training tasks but relies on pretrained models and a code executor. [Self-Rewarding Language Models](papers.md#self-rewarding-lms) uses model judgments to construct preferences. Compare what provides evidence of correctness, what merely indicates agreement, and what the learner can influence.

## Ask what “recursive” means

Repeated improvement of a solver is different from changing the process that improves it. In the inspected [Darwin Gödel Machine](papers.md#darwin-godel-machine) study, the agent implementation changes while archive management and parent selection remain fixed. [Hyperagents](papers.md#hyperagents) makes both task-solving and improvement code editable, but still retains an outer evaluation and selection protocol.

A nested training loop or an expanding archive is therefore not sufficient evidence of unrestricted recursive self-improvement. Identify the editable components and the fixed boundary before interpreting the title.

## Read results as bounded evidence

Use three questions for each paper:

1. **What changed?** Name the retained artifact and when it becomes available.
2. **What drove the change?** Trace the feedback, supervision, and acceptance rule.
3. **What improved?** Check the baseline, budget, held-out tasks, transfer, and retention.

Our **core** label identifies direct relevance to agent learning or its evaluation. **Adjacent** identifies useful foundations and comparisons; it is not a quality ranking. Publication status, review depth, available code, and independent reproduction are separate facts. This collection records source inspection, not reproduced experiments. Use the [evaluation guide](evaluation-guide.md) to turn a reading question into a bounded study.
