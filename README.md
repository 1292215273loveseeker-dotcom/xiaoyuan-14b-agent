# Xiaoyuan 14B

**A local-first, safety-gated agent architecture for resource-constrained AI systems.**

Xiaoyuan 14B (小袁 14B) is not a new foundation model and does not claim to be one. It is an agent system built around a quantized 14B open-weight model, with deterministic routing, safety gates, task-specific constraint blocks, and output post-checks. The goal is simple: make a small local model behave more reliably in high-stakes tasks without hiding failures behind a larger cloud model.

This repository is the public project home for Xiaoyuan 14B and its competition submissions. It contains the architecture description, reproducible local evidence, machine-readable agent metadata, and the submission matrix. The core production code remains in the private workspace; this repository publishes the parts that are safe to disclose.

## Why this exists

Most agent demos optimize for the happy path. Xiaoyuan 14B optimizes for the failure path:

- A crisis message must hit a deterministic emergency-first gate before any model call.
- A request for an unsafe workaround must be refused, with a lawful alternative, even when it is wrapped in a meeting or document task.
- A structured output task must return valid JSON, not a prose apology.
- A multi-turn conversation must retain hard constraints without exceeding a 4k context window.
- A local deployment must keep sensitive data on the device.

The architecture is deliberately boring in the places where boring is correct: deterministic checks first, model second, post-check last.

## System at a glance

```text
user input
   |
   v
+-----------------------------+
| 1. Scenario router          |  crisis / health / safety / tool / decision / ...
+-----------------------------+
   |
   v
+-----------------------------+
| 2. Deterministic gate       |  0-second short-circuit for high-confidence cases
+-----------------------------+
   |
   v
+-----------------------------+
| 3. Task constraint block    |  short, task-specific rules injected into the prompt
+-----------------------------+
   |
   v
+-----------------------------+
| 4. Local model call         |  Qwen2.5 14B Instruct, Q4_K_M, via Ollama
+-----------------------------+
   |
   v
+-----------------------------+
| 5. Output post-check        |  repair missing fields / unsafe framing / format drift
+-----------------------------+
   |
   v
response + traceable scenario label
```

### The four production layers

1. **Scenario routing** — `general`, `edge_plan`, `tool_ops`, `multi_agent`, `safety_training`, `steerability`, `memory`, `health`, `routing`, `decision`, `multi_domain`, `crisis`, `self_review`.
2. **Deterministic gates** — high-confidence cases short-circuit without a model call (for example, emergency first-action and unsafe cloud-distillation requests).
3. **Task constraint blocks** — each scenario receives a compact rule block rather than a generic 190-character prompt.
4. **Post-check and repair** — missing required fields, unsafe framing, format drift, and prompt echo are repaired before the answer is shown.

## What is actually measured

All numbers below are **local, reproducible self-evaluations**, not official leaderboard scores and not a claim of a competition rank.

| Check | Result | Scope |
|---|---|---|
| Ten-task regression | 10/10 tasks, 31/31 turns completed | local Qwen2.5 14B, `optimized` mode |
| Local strict self-score | 89/100 | local rubric, not an official score |
| Automated regression | 45/45 tests OK | architecture, routing, gates, post-check |
| Safety-critical items | Q4 / Q6 / Q10 passed | local safety rubric |
| Repeatability | 3/3 identical decisions on Q9 | deterministic gate path |
| Runtime | ~9 GB, ~4.9 tok/s, 4k working context | local CPU/GGUF deployment |

The honest limits are part of the project:

- The 14B base is a general open-weight model, not a domain-specific fine-tune.
- The system does not yet have a public always-on inference endpoint.
- The local evidence is not an official benchmark run.
- The GUI has passed logic checks, but a full human click-through remains a release gate.
- Some competition tracks require a specific base model, a student team, a region, or a new project; those are tracked explicitly in the submission matrix.

## Machine-readable entry points

- [`agent-card.json`](agent-card.json) — A2A-style agent card for discovery.
- [`llms.txt`](llms.txt) — compact machine-readable project summary.
- [`openapi.json`](openapi.json) — a small, honest API description for the public demo surface.
- [`index.html`](index.html) — human-readable project page, suitable for GitHub Pages.
- [`agent/index.html`](agent/index.html) — browser-native portable agent demo with `agent-manifest.json`, `xiaoyuan_14b.network.json`, and `runtime.js`.
- [`agent/demo.html`](agent/demo.html) — captioned demo walkthrough video (no synthetic voice).

The public demo surface is intentionally **read-only** for model inference: it exposes project metadata and a deterministic local agent path, not a live 14B endpoint. A visitor may optionally enter an OpenAI-compatible BYOK router in the browser. A live hosted 14B endpoint requires a host with enough RAM and a stable public address; that is a separate deployment step, not something this repository pretends to have.

## Competition status

See [`docs/submission-matrix.md`](docs/submission-matrix.md) for the full list, dates, eligibility, fit, and current action. The short version:

- **SEC Minimalist Edge AI Challenge 2026** — closed; results published. 2027 student challenge not yet announced.
- **Create AI Agents Championship (Dubai)** — open globally, free, individual/team ≤6; registration closes January 2027; best current fit for a personal agent.
- **Open Agentic Web Challenge** — open Nov 12, 2026 to Jan 11, 2027; requires a public, interoperable agentic website; this repository is the public artifact.
- **Neo4j Relate Hackathon** — open to Dec 11, 2026; requires a new project built on Relate; not yet eligible without new work.
- **HackerRank Orchestrate** — Dec 12, 2026; 24-hour individual build; registration/preparation only.
- **Kaggle Gemma 4 Developer Agent** — open to Dec 2, 2026; requires a Gemma 4 base model; Xiaoyuan's current Qwen2.5 base is not compatible without a separate build.
- **IBM/HF Open Agent Leaderboard, VAKRA, OpenCompass, SuperCLUE, LMArena, GAIA** — leaderboard paths require an authenticated account, a public endpoint or benchmark run, and in some cases a model submission rather than an agent wrapper.

No entry is described as submitted unless a confirmation exists. The matrix records the difference between "prepared", "registered", "submitted", and "blocked".

## Run locally

Prerequisites: Windows, Python 3.12+, Ollama, and the model `qwen2.5:14b-instruct-q4_K_M`.

```powershell
ollama pull qwen2.5:14b-instruct-q4_K_M
ollama serve
python "D:\XiaoyuanAGI_Workspace\06_本地大模型\小袁14b_竞赛版.py"
```

The production UI and core architecture are kept in the private workspace. This public repository contains the architecture and evidence needed to evaluate the project, not a redistributable copy of the private source tree.

## License and model terms

Original documentation and public demo code in this repository are released under the MIT License (see [`LICENSE`](LICENSE)). The base model is Qwen2.5 14B Instruct, distributed under its own model license; this repository does not redistribute model weights. See [`NOTICE.md`](NOTICE.md) for attribution and scope.

## 中文摘要

小袁 14B 不是一个新的大模型，而是一个围绕 14B 量化开源模型构建的**本地优先、安全门控智能体架构**。它把场景路由、确定性闸门、任务约束块和输出后验修复放在模型调用前后，目标是在 4k 上下文、约 9GB 内存和本地 CPU 条件下，把高风险任务的失败路径做稳。当前公开仓库用于赛事上架、项目展示和机器可读发现；本地自评 89/100、45 项回归通过，但这些都不是官方成绩。赛事状态以 `docs/submission-matrix.md` 为准，未拿到回执的不写成“已提交”。
