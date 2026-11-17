# 小袁 14B · 当前可参加赛事与榜单矩阵

> 核查基准：2026-11-17（Asia/Shanghai）。只列“当前仍开放或可登记”的入口；已截止的单独标注，避免把过期赛事写成可报名。  
> 小袁 14B 是“Qwen2.5 14B + 架构层”的 Agent 系统，不是独立新模型权重；凡是要求“提交模型权重/指定基座/跑官方 benchmark”的榜单，不能把架构层直接当成模型提交。

## 0. 结论先行

| 结论 | 赛事/榜单 | 处理 |
|---|---|---|
| 最适合、当前可报名 | **Create AI Agents Championship（迪拜）** | 全球开放、免费、个人/团队≤6、接受 idea/prototype/early MVP；注册截止 2027-01；已准备英文报名材料，但报名表强制要求真实年龄/性别/邮箱/电话，不能编造 |
| 最适合公开上架、已有公开入口 | **Open Agentic Web Challenge** | 2026-11-12 至 2027-01-11，Devpost；已建公开 GitHub 仓库、项目页、浏览器 Agent 站点和 captioned demo；已注册 Devpost，项目草稿已建，待补本人讲解视频后提交 |
| 仍有时间但需改基座 | **Kaggle Gemma 4 Developer Agent** | 2026-12-02 最终提交；必须用 Gemma 4 指定基座，当前 Qwen2.5 版不兼容，需另建 Gemma 4 分支 |
| 仍需“新工作” | **Neo4j Relate Hackathon** | 2026-12-11；必须用 Relate 图数据库新建 Agent/应用，现有小袁不能原样提交 |
| 只能登记/备赛 | **HackerRank Orchestrate** | 2026-12-12 24 小时个人赛；不是提前交现有项目，需当天现场构建 |
| 已截止/已结束 | SEC 2026、FlagOS Track 2、CHI-Bench、ARC Prize 2026、Total Recall、Hermes、MatrixNext | 不补报、不写成“已参赛” |
| 榜单暂不适合直接提交 | OpenCompass、SuperCLUE、C-Eval、LMArena、GAIA、HF Open LLM Leaderboard | 需要模型权重/公开 endpoint/官方评测；C-Eval 已停止维护，HF Open LLM 已归档 |
| 可尝试但成本高 | IBM/HF Open Agent Leaderboard、VAKRA | 评的是完整 Agent 系统，但需要 HF/GitHub 账号、公开 endpoint 或完整 benchmark 运行 |

## 1. 已结束/不可报名（只作背景，不再投入）

| 赛事 | 关键日期 | 状态 | 小袁适配 |
|---|---|---|---|
| ACM/IEEE SEC 2026 · Minimalist Edge AI Challenge | 2026-10-13；报名 2026-07-16 至 09-06 | 已结束，官网已公布 Hardware/Software 获奖名单 | 2026 届无法补报；SEC 2027 学生挑战赛页面尚未发布 |
| ACM/IEEE SEC 2027 | 主会 2027-12-07 至 12-10（tentative，Duke University） | 论文时间线 TBD；无学生挑战赛入口 | 只能等官方页面；不要现在写“已报名” |
| FlagOS Open Computing Global Challenge · Track 2 | 注册 2026-07-19 至 11-10；提交至 11-20 | 注册已截止 | 要求 MiniCPM5-2B + FlagOS 固定硬件，小袁不匹配 |
| IEEE Big Data Cup 2026 · CHI-Bench | 最终提交 2026-11-15 | 已截止 | 需要医疗行政长流程 Agent + Docker + Claude API |
| ARC Prize 2026 · ARC-AGI-3 | 报名 2026-10-26；最终 2026-11-02 | 已截止 | 小袁未做 ARC 交互推理 |
| Total Recall（Walrus & Tatum） | 2026-11-10 | 已过 | 持久记忆 + 去中心化存储，非当前主线 |
| Hermes Agent Plugin Hackathon（Nous Research） | 2026-11-11 | 已过 | 需要 Hermes 插件生态 |
| MatrixNext Enterprise Agent Hackathon | 2026-11-11 | 已过 | 企业数据 Agent，上海决赛 |

## 2. 当前仍开放：优先动作

### 2.1 Create AI Agents Championship（迪拜）

- 官方：<https://www.dubaichamberdigital.com/en/create-ai-agents>
- 报名：<https://www.dubaichamberdigital.com/en/create-ai-agents-register-your-interest>
- 时间：2026-10-07 启动；注册截止 **2027-01**（具体日未公布）；半决赛 2027-01；决赛 2027-05 第一周。
- 资格：全球开放，无年龄/地点限制；个人或团队≤6；免费；接受 idea/prototype/early MVP。
- 类别：Best Societal Agent / Best Personal Agent / Best Business Agent / Best Youth AI Agent（青年组要求 lead <21 岁）。
- 奖金：每类 USD 150,000 grant；总 USD 750,000；另有 Dubai AI Agent of the Year。
- 提交物：Agent 原型 + pitch deck + demo video；英文；不得抄袭现有 repo；不得含政治/宗教/不道德内容。
- 小袁定位：**Best Personal Agent**。本地优先、隐私不出设备、个人任务与安全边界，和“personal agent”最接近。
- 当前状态：**报名表已打开并确认字段**；字段包括 First Name、Last Name、Email、Phone、Nationality、Residency、Age、Gender、Occupation。真实个人信息缺失，未提交。
- 结论：这是当前最值得优先完成的报名。只差真实个人资料；材料已备。

### 2.2 Open Agentic Web Challenge

- 官方：<https://worldwideagenticweb.org/>
- 运行：Devpost，2026-11-12 至 **2027-01-11**；奖金 $13,000。
- 两条 track：agentifying existing websites；building technology components。
- 要求：公开可访问、可互操作的 agentic website；个人/团队均可；需符合 specs。
- 小袁定位：把项目页做成可被 agent 发现的公开站点（agent-card.json、llms.txt、openapi.json），并提交“agentifying a project site”方向。
- 当前状态：公开 GitHub 仓库、项目页、浏览器 Agent 站点（manifest + network + runtime）和 captioned demo 已建；Devpost 已注册，项目草稿已建，项目详情/附加信息已填，待补赛事要求的本人讲解视频后提交。
- 结论：已完成公开上架与报名，剩余唯一硬门槛是“本人讲解、非 AI 生成”的 YouTube/Vimeo 视频。

### 2.3 Kaggle Gemma 4 Developer Agent Competition

- 官方：<https://www.kaggle.com/competitions/gemma-4-developer-agent/overview>
- 时间线：2026-09-23 开始；Entry/Team Merger **2026-11-25**；Final Submission **2026-12-02**。
- 奖金：总 $110,000；主赛 $65,000；Paper Track $35,000；Small Model Bonus $10,000。
- 要求：post-train Gemma 4；提交 `submission.zip`，根 `agent.yaml`，可选 prompts/tools/skills/LoRA；所有 agent 必须同一 Gemma 4 基座；每任务 12 小时；PASS/FAIL patch 评测。
- 允许基座：`gemma-4-31b-it-qat-w4a16-ct`、`gemma-4-12b-it-qat-w4a16-ct`、`gemma-4-e4b-it-qat-w4a16-ct`、`gemma-4-e2b-it-qat-w4a16-ct`。
- 小袁现状：Qwen2.5 14B，不是 Gemma 4；不能原样提交。
- 结论：如果要把小袁的架构层迁到 Gemma 4 12B/E4B，需要新建一个独立分支和完整 agent.yaml；当前未做，不能写成已参赛。

### 2.4 Neo4j Relate Hackathon 2026

- 时间：2026-11-11 至 **2026-12-11**；Devpost。
- 要求：使用 Relate 嵌入式图数据库构建 Agent/应用；提交公开 GitHub repo + 1–2 分钟 demo；必须是新工作。
- 奖品：Mac Studio / Mac mini 等。
- 小袁现状：没有用 Relate 的新项目；现有代码不能原样提交。
- 结论：可在 3 周内做一个“小袁记忆图谱”分支（把多轮约束/场景路由存成图），但这是新开发，不是现有项目直接上架。

### 2.5 HackerRank Orchestrate – Holiday Edition

- 官方：<https://www.hackerrank.com/hackerrank-orchestrate-december26>
- 时间：**2026-12-12 18:00 IST** 开始，24 小时；个人线上。
- 奖金：$2,400（1st $1,200；2nd–5th 各 $300）。
- 提交：code ZIP + output + AI chat transcript；30 分钟 AI 面试。
- 评分：Code 30%、Output 30%、Interview 30%、Transcript 10%。
- 小袁现状：不是提前提交现有项目；比赛当天现场构建。可登记/备赛，但不能现在“提交小袁”。
- 结论：可报名，但真正参赛需要本人在 12 月 12 日在线 24 小时。

### 2.6 其他仍开放但适配度较低

| 赛事 | 截止 | 为什么暂不优先 |
|---|---|---|
| Steerability Challenge（IBM Research） | 2026-11-21 | 需 `.spipe` steering pipeline、降低 sycophancy；时间只剩 4 天，且需专门实验 |
| AMD AI League | 2026-12-01 | 个人赛、AMD GPU、web-navigation agent；硬件/赛道不匹配 |
| Kiroween 2026（Kiro/AWS） | 2026-12-04 | 需用 Kiro 新建万圣节主题项目；现有小袁不能原样 |
| Alipay Agent Emergence Award | 2026-12-06 | 需支付宝 Agent 支付栈、创业/产品主体；非当前形态 |
| Agents for Impact（Google Cloud） | 2026-12-08 | 线下 Sunnyvale/New York；地域不匹配 |
| Concordium Trusted Agents | 2026-12-09 | 需链上身份 + 新项目 |
| IBM AI Builders Challenge NA | 2026-12-10 | 仅北美参与者；用户所在地不在范围 |
| Microsoft Agent-a-Thon | 2026-12-10 | 需 Microsoft agent stack；细节未确认 |
| AWS MSP AI Hackathon | 2026-12-11 | 需 AWS AgentCore、MSP 场景、新项目 |
| AI Agents for Founders（HETIC） | 2026-12-18 | 限高等教育学生；用户非学生 |
| Codegeist 2026（Atlassian） | 2026-12-23 | 需 Atlassian Forge/Rovo/MCP 新项目 |
| Lablab.ai recurring | 2026-12-31 | 每 2–3 周一个新赛事；需逐场看主题和技术栈 |
| Verifiable Quantum Circuit Compilation | 2027-01-20 | 量子电路压缩 + 经典验证器；完全不匹配 |

## 3. 榜单/排名：哪些能上，哪些不能

| 榜单 | 入口/机制 | 小袁能否直接上 | 真实门槛 |
|---|---|---|---|
| OpenCompass / CompassArena | 官方榜单，2026-11-17 更新 | 不能直接“点一下上架” | 需模型/API 接入与官方评测；外部自助提交入口未确认 |
| SuperCLUE | 中文榜单，2026-11 更新 | 不能直接提交架构层 | 需模型接入；未确认外部提交入口与费用 |
| C-Eval | 官方已停止维护排行榜（2025-07-26 公告） | 不能 | 不再接受新提交 |
| LMArena | 竞技场式榜单 | 不能 | 需公开模型 endpoint；未确认提交流程 |
| GAIA | 官方 benchmark | 不能 | 需跑 private test set，提交 json-line 结果 |
| HF Open LLM Leaderboard | Hugging Face | 不能 | 资料称为 archived，不再接受新提交 |
| IBM/HF Open Agent Leaderboard | HF dataset PR 相关流程 | **可作为 Agent 系统候选** | 需 HF 账号、完整 6 项 benchmark、公开 endpoint；评测成本高（公开报道约 $20,000） |
| VAKRA（IBM Research） | GitHub issue 模板提交 | **可作为 Agent 系统候选** | 需跑 benchmark、validate output、提供 agent 描述/代码/系统链接；8,000+ API、60+ 领域、3–7 步推理 |

## 4. 当前实际动作清单

| 动作 | 状态 | 证据/位置 |
|---|---|---|
| 建公开 GitHub 仓库 | 已完成 | <https://github.com/1292215273loveseeker-dotcom/xiaoyuan-14b-agent> |
| 写 README / agent-card / llms.txt / openapi | 已完成 | 本目录 |
| 建公开项目页（GitHub Pages） | 已完成 | <https://1292215273loveseeker-dotcom.github.io/xiaoyuan-14b-agent/> |
| 建公开浏览器 Agent 站点 + captioned demo | 已完成 | <https://1292215273loveseeker-dotcom.github.io/xiaoyuan-14b-agent/agent/>；<https://1292215273loveseeker-dotcom.github.io/xiaoyuan-14b-agent/agent/demo.html> |
| 迪拜报名 | 材料已备，未提交 | 报名表要求真实个人信息；不能编造 |
| Open Agentic Web Challenge | 已注册；项目草稿已建；未提交 | Devpost 项目 1309636；待补本人讲解视频 |
| Kaggle Gemma 4 | 不适配当前基座 | 需 Gemma 4 分支 |
| Neo4j Relate | 不适配现有项目 | 需 Relate 新项目 |
| HackerRank Orchestrate | 未登记 | 需 HackerRank 账号；12-12 当天参赛 |
| 榜单提交 | 未提交 | 无 HF/Kaggle 登录态、无公开 endpoint、无官方 benchmark |

## 5. 不能伪造的硬约束

- 赛事要求真人姓名、邮箱、电话、年龄、性别、国籍、学生身份、公司主体时，不能用项目名或 AI 身份替代。
- 不能用他人账号、他人邮箱、他人学生证或伪造的 GitHub/ Kaggle/HF 资料。
- 不能把“材料已准备”写成“已提交/已参赛”。
- 不能把本地自评 89/100 写成官方分数或名次。
- 不能把 Qwen2.5 架构层直接提交到要求 Gemma 4/其他指定基座的赛道。
- 不能绕过 Devpost/Cloudflare 人机验证；需要用户接管或用户自己的账号。
