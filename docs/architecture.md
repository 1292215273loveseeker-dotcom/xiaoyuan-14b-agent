# Architecture

## Design goal

Xiaoyuan 14B is built for a constrained setting: one quantized 14B model, a local CPU, a 4k working context, and no reliable cloud dependency. The design goal is not to maximize raw model IQ. It is to make the **failure path** predictable:

- unsafe requests are stopped before generation;
- crisis requests get an emergency-first action before anything else;
- structured tasks return structured output;
- multi-turn constraints survive history compression;
- a missing field or unsafe framing is repaired before the answer reaches the user.

The architecture is a wrapper, not a new model. This distinction matters for every competition and leaderboard: a model leaderboard will see Qwen2.5 14B unless the platform explicitly evaluates agent systems.

## Pipeline

### 1. Scenario router

The router classifies input into one of the following scenarios:

`general`, `edge_plan`, `tool_ops`, `multi_agent`, `safety_training`, `steerability`, `memory`, `health`, `routing`, `decision`, `multi_domain`, `crisis`, `self_review`.

Route priority is deliberate. Crisis and self-review are checked before broader multi-domain routing, because a history containing a five-domain matrix must not pull a self-review request back into the matrix template. Safety is checked before meeting/document tasks, because an unsafe request does not become safe by being wrapped in a business context.

### 2. Deterministic gate

A small number of high-confidence cases short-circuit with zero model latency:

- a crisis signal with no emergency-first action;
- a request to use cloud distillation in a local-only plan;
- a decision task where a deterministic comparison rule applies.

The gate returns a constrained answer and a scenario label. It does not pretend to be a model. Its purpose is to make the critical path deterministic and auditable.

### 3. Task constraint block

Each scenario gets a compact rule block instead of a generic prompt. Examples:

- **edge_plan**: check TOPS and parameter count, reject infeasible 14B-on-0.5-TOPS plans, keep the plan within 13 weeks, do not call the cloud.
- **tool_ops**: read the header first, define tool name/arguments/input/output/failure codes, parameterize SQL, filter the region inside the CSV.
- **multi_agent**: define roles, deliverables, acceptance criteria, and a failure fallback.
- **health**: do not diagnose, do not prescribe, keep the requested length, use a four-step boundary template only when explicitly requested.
- **decision**: separate the deterministic rule from the model's judgment, require a holdout set and a rollback.
- **crisis**: emergency services first, then conflict resolution, then a safety boundary.

The blocks are short by design. A 4k context cannot afford a long constitution on every turn.

### 4. Local model call

- Base model: `qwen2.5:14b-instruct-q4_K_M`
- Runtime: Ollama at `http://127.0.0.1:11434`
- Working context: 4k tokens
- Approximate disk/runtime footprint: 9 GB
- Approximate throughput in the tested environment: 4.9 tokens/s

The architecture does not claim to make the base model faster. It reduces the number of calls by short-circuiting high-confidence cases and by compressing history into a hard-constraint summary.

### 5. Output post-check

The post-check is scenario-specific. It can:

- prepend an emergency-first sentence when a crisis answer omits it;
- replace a plan that exceeds 13 weeks with a feasible 13-week plan;
- replace a decision answer that does not select the deterministic option;
- remove prompt echo from a self-review answer;
- enforce a requested length or a required label only when the user explicitly asked for it.

The post-check is intentionally conservative: it repairs missing critical elements, not style preferences.

## Multi-turn memory

The production UI builds a compact history prompt:

- most recent 8 turns;
- at most 300 characters per turn;
- total budget around 1,200 characters;
- a separate hard-constraint summary;
- the current user request.

This is a compression strategy, not a claim of long-term memory. It preserves the constraints that matter for the current task and discards most of the conversational surface.

## What the architecture does not solve

- It does not turn a 14B model into a 70B model.
- It does not guarantee factual correctness on open-domain knowledge.
- It does not replace a human clinician, lawyer, emergency responder, or financial adviser.
- It does not make a local model publicly available by itself.
- It does not make a model leaderboard entry valid without the platform's required model format and evaluation run.

## Why this is an agent, not a prompt

A prompt is a single instruction. This system has:

- a router with explicit priority;
- deterministic gates with observable short-circuit behavior;
- task-specific constraint blocks;
- a post-check that can change the final answer;
- a traceable scenario label and a regression suite.

Those are system-level behaviors. They are what the project asks judges to evaluate.
