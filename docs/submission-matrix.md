# Xiaoyuan 14B — competition and leaderboard matrix

> Baseline date: 2026-11-17 (Asia/Shanghai). Only currently open or registrable entry points are listed; closed events are labeled so they are not mistaken for live opportunities.
>
> Xiaoyuan 14B is an **agent architecture around Qwen2.5 14B Instruct**, not a new model weight. It cannot be submitted as a model-weight entry to a leaderboard that requires a different base model or a full official benchmark run.

## Bottom line

| Conclusion | Event / leaderboard | Action |
|---|---|---|
| Best current fit, open | **Create AI Agents Championship (Dubai)** | Global, free, individual/team ≤6, accepts idea/prototype/early MVP; registration closes Jan 2027; English application materials prepared; the form requires real personal details (age/gender/email/phone) that cannot be fabricated |
| Best public listing, open | **Open Agentic Web Challenge** | 2026-11-12 to 2027-01-11 on Devpost; public GitHub repo and project page created; Devpost account/Cloudflare verification is the remaining gate |
| Still open, but requires a different base | **Kaggle Gemma 4 Developer Agent** | Final submission 2026-12-02; requires a Gemma 4 base, current Qwen2.5 version is not compatible |
| Still open, but requires new work | **Neo4j Relate Hackathon** | 2026-12-11; must build a new agent/app on Relate; existing code cannot be submitted as-is |
| Registration / live event only | **HackerRank Orchestrate** | 2026-12-12, 24-hour individual build; not a pre-submission of an existing project |
| Closed / ended | SEC 2026, FlagOS Track 2, CHI-Bench, ARC Prize 2026, Total Recall, Hermes, MatrixNext | Do not backfill; do not write "participated" |
| Not a direct model-leaderboard submission | OpenCompass, SuperCLUE, C-Eval, LMArena, GAIA, HF Open LLM Leaderboard | Require model weights, public endpoint, or official evaluation; C-Eval is no longer maintained, HF Open LLM is archived |
| Possible but heavy | IBM/HF Open Agent Leaderboard, VAKRA | Evaluate full agent systems, but require HF/GitHub account, public endpoint, or full benchmark run |

## Closed / not currently registrable

| Event | Key dates | State | Fit |
|---|---|---|---|
| ACM/IEEE SEC 2026 · Minimalist Edge AI Challenge | 2026-10-13; registration 2026-07-16 to 09-06 | Ended; winners published | Cannot backfill; SEC 2027 student challenge page not published |
| ACM/IEEE SEC 2027 | Main conference 2027-12-07 to 12-10 (tentative, Duke University) | Paper timeline TBD; no student challenge entry | Wait for official page; do not claim registration |
| FlagOS Open Computing Global Challenge · Track 2 | Registration 2026-07-19 to 11-10; submission to 11-20 | Registration closed | Requires MiniCPM5-2B + FlagOS fixed hardware; not a fit |
| IEEE Big Data Cup 2026 · CHI-Bench | Final submission 2026-11-15 | Closed | Requires long-horizon healthcare agent + Docker + Claude API |
| ARC Prize 2026 · ARC-AGI-3 | Entry 2026-10-26; final 2026-11-02 | Closed | Xiaoyuan has no ARC interactive reasoning work |
| Total Recall (Walrus & Tatum) | 2026-11-10 | Past | Persistent memory + decentralized storage |
| Hermes Agent Plugin Hackathon (Nous Research) | 2026-11-11 | Past | Hermes plugin ecosystem |
| MatrixNext Enterprise Agent Hackathon | 2026-11-11 | Past | Enterprise data agent; Shanghai final |

## Open now: priority actions

### Create AI Agents Championship (Dubai)

- Official: https://www.dubaichamberdigital.com/en/create-ai-agents
- Registration: https://www.dubaichamberdigital.com/en/create-ai-agents-register-your-interest
- Timeline: launched 2026-10-07; registration closes **January 2027** (exact day not published); semifinals January 2027; grand final first week of May 2027.
- Eligibility: global, no age/location limit; individual or team ≤6; free; idea/prototype/early MVP accepted.
- Categories: Best Societal Agent / Best Personal Agent / Best Business Agent / Best Youth AI Agent (youth lead under 21).
- Grants: USD 150,000 per category; USD 750,000 total; plus Dubai AI Agent of the Year.
- Submission: agent prototype + pitch deck + demo video; English; original work; no political/religious/unethical content.
- Xiaoyuan positioning: **Best Personal Agent** — local-first, privacy-preserving, personal tasks with explicit safety boundaries.
- Current state: registration form opened and fields confirmed; requires First Name, Last Name, Email, Phone, Nationality, Residency, Age, Gender, Occupation. Real personal data is missing, so it is not submitted.
- Conclusion: highest-priority registration; only real personal data is missing.

### Open Agentic Web Challenge

- Official: https://worldwideagenticweb.org/
- Devpost window: 2026-11-12 to **2027-01-11**; prize pool $13,000.
- Tracks: agentifying existing websites; building technology components.
- Requirement: public, accessible, interoperable agentic website; individual/team; must meet specs.
- Xiaoyuan positioning: public project site with `agent-card.json`, `llms.txt`, and a read-only OpenAPI surface; an agent-readable project page.
- Current state: public GitHub repo and page created; Devpost submission blocked by Cloudflare human verification / account gate.
- Conclusion: closest to submission-ready, but Devpost is an external gate.

### Kaggle Gemma 4 Developer Agent Competition

- Official: https://www.kaggle.com/competitions/gemma-4-developer-agent/overview
- Timeline: start 2026-09-23; entry/team merger **2026-11-25**; final submission **2026-12-02**.
- Prize: $110,000 total; main $65,000; paper track $35,000; small-model bonus $10,000.
- Requirement: post-train Gemma 4; `submission.zip` with root `agent.yaml`; optional prompts/tools/skills/adapters; all agents must use the same Gemma 4 base; 12-hour task limit; PASS/FAIL patch evaluation.
- Allowed bases: `gemma-4-31b-it-qat-w4a16-ct`, `gemma-4-12b-it-qat-w4a16-ct`, `gemma-4-e4b-it-qat-w4a16-ct`, `gemma-4-e2b-it-qat-w4a16-ct`.
- Xiaoyuan current: Qwen2.5 14B, not Gemma 4; cannot submit as-is.
- Conclusion: needs a separate Gemma 4 branch and `agent.yaml`; not currently eligible.

### Neo4j Relate Hackathon 2026

- Window: 2026-11-11 to **2026-12-11**; Devpost.
- Requirement: use Relate embedded graph database; public GitHub repo + 1–2 minute demo; new work.
- Prize: Mac Studio / Mac mini and related.
- Xiaoyuan current: no Relate-based new project; existing code cannot be submitted as-is.
- Conclusion: a 3-week "Xiaoyuan Memory Graph" branch is feasible, but it is new development, not a direct listing of the existing project.

### HackerRank Orchestrate – Holiday Edition

- Official: https://www.hackerrank.com/hackerrank-orchestrate-december26
- Start: **2026-12-12 18:00 IST**, 24 hours; individual online.
- Prize: $2,400 (1st $1,200; 2nd–5th $300 each).
- Submission: code ZIP + output + AI chat transcript; 30-minute AI interview.
- Scoring: Code 30%, Output 30%, Interview 30%, Transcript 10%.
- Xiaoyuan: not a pre-submission event; build live. Register/prepare only.

### Other open events with lower fit

| Event | Deadline | Why not priority |
|---|---|---|
| Steerability Challenge (IBM Research) | 2026-11-21 | Requires `.spipe` steering pipeline and a sycophancy experiment; only 4 days left |
| AMD AI League | 2026-12-01 | Individual, AMD GPU, web-navigation agent; hardware/track mismatch |
| Kiroween 2026 (Kiro/AWS) | 2026-12-04 | Requires a new Kiro Halloween project |
| Alipay Agent Emergence Award | 2026-12-06 | Requires Alipay agent payment stack and a startup/product entity |
| Agents for Impact (Google Cloud) | 2026-12-08 | In-person Sunnyvale/New York; geography mismatch |
| Concordium Trusted Agents | 2026-12-09 | On-chain identity + new project |
| IBM AI Builders Challenge NA | 2026-12-10 | North America only |
| Microsoft Agent-a-Thon | 2026-12-10 | Microsoft agent stack; details unconfirmed |
| AWS MSP AI Hackathon | 2026-12-11 | AWS AgentCore, MSP scenario, new project |
| AI Agents for Founders (HETIC) | 2026-12-18 | Higher-education students only |
| Codegeist 2026 (Atlassian) | 2026-12-23 | Atlassian Forge/Rovo/MCP new project |
| Lablab.ai recurring | 2026-12-31 | A new event every 2–3 weeks; review each theme/stack |
| Verifiable Quantum Circuit Compilation | 2027-01-20 | Quantum circuit compression + classical verifier; not a fit |

## Leaderboards: what can and cannot be submitted

| Leaderboard | Entry mechanism | Can Xiaoyuan submit directly? | Real gate |
|---|---|---|---|
| OpenCompass / CompassArena | Official leaderboard, updated 2026-11-17 | Not a one-click listing | Requires model/API access and official evaluation; self-service external submission not confirmed |
| SuperCLUE | Chinese leaderboard, updated 2026-11 | Cannot submit the architecture alone | Requires model access; external submission process/fee not confirmed |
| C-Eval | Leaderboard stopped (2025-07-26 announcement) | No | No new submissions |
| LMArena | Arena-style leaderboard | No | Requires a public model endpoint; submission process not confirmed |
| GAIA | Official benchmark | No | Requires private test-set run and json-line results |
| HF Open LLM Leaderboard | Hugging Face | No | Reported as archived; no new submissions |
| IBM/HF Open Agent Leaderboard | HF dataset PR related | **Yes, as an agent system candidate** | HF account, six benchmarks, public endpoint; high evaluation cost (public reports around $20,000) |
| VAKRA (IBM Research) | GitHub issue template | **Yes, as an agent system candidate** | Run benchmark, validate output, provide agent description/code/system link; 8,000+ APIs, 60+ domains, 3–7 reasoning steps |

## Actual action list

| Action | State | Evidence / location |
|---|---|---|
| Public GitHub repository | Done | https://github.com/1292215273loveseeker-dotcom/xiaoyuan-14b-agent |
| README / agent card / llms.txt / openapi | Done | This repository |
| Public project page (GitHub Pages) | Pending enablement | `index.html` committed; enable Pages in Settings → Pages, main/root |
| Dubai registration | Materials ready, not submitted | Form requires real personal data |
| Open Agentic Web Challenge | Materials ready, not submitted | Devpost Cloudflare + account |
| Kaggle Gemma 4 | Not fit for current base | Gemma 4 branch required |
| Neo4j Relate | Not fit for current project | Relate new project required |
| HackerRank Orchestrate | Not registered | HackerRank account; live event 12-12 |
| Leaderboards | Not submitted | No HF/Kaggle login, no public endpoint, no official benchmark run |

## Hard constraints that cannot be faked

- Real name, email, phone, age, gender, nationality, student status, or company entity cannot be replaced by a project name or an AI identity.
- No borrowed accounts, borrowed emails, borrowed student IDs, or fabricated GitHub/Kaggle/HF profiles.
- "Materials prepared" is not "submitted" or "participated".
- A local self-score of 89/100 is not an official score or rank.
- A Qwen2.5 agent architecture cannot be submitted to a track that requires a Gemma 4 or another specified base model.
- Devpost/Cloudflare human verification cannot be bypassed; it requires the user or the user's account.
