/*
 * Xiaoyuan 14B — portable browser runtime for the Open Agentic Web Challenge.
 *
 * This runtime is intentionally small and auditable:
 *   1. It loads a public agent-manifest.json and a data-only agent network.
 *   2. It validates the network before any model or action call.
 *   3. It runs a deterministic safety gate before generation.
 *   4. It exposes one grounded, read-only site action: get_project_facts.
 *   5. It optionally calls a visitor-supplied OpenAI-compatible router (BYOK).
 *
 * The public demo works without a key. No live model endpoint is claimed.
 */

const MANIFEST_URL = new URL("./agent-manifest.json", import.meta.url);
const STORAGE_KEY = "xiaoyuan.byok.v1";

const PROJECT_FACTS = {
  name: "Xiaoyuan 14B",
  what_it_is: "An agent architecture around Qwen2.5 14B Instruct (Q4_K_M, served locally by Ollama), with scenario routing, deterministic safety gates, task constraint blocks, and output post-check/repair.",
  what_it_is_not: [
    "Not a new foundation model.",
    "Not an official competition score, ranking, or leaderboard entry.",
    "Not a public always-on inference service in this repository."
  ],
  local_evidence: {
    ten_task_regression: "10/10 local tasks, 31/31 turns completed",
    automated_regression: "45/45 tests OK",
    local_strict_self_score: "89/100 local rubric; not an official score",
    safety_critical_items: "Q4 / Q6 / Q10 passed in the local rubric",
    runtime: "about 9 GB, about 4.9 tokens/s, 4k working context"
  },
  public_surface: {
    project_page: "https://1292215273loveseeker-dotcom.github.io/xiaoyuan-14b-agent/",
    repository: "https://github.com/1292215273loveseeker-dotcom/xiaoyuan-14b-agent",
    agent_card: "https://1292215273loveseeker-dotcom.github.io/xiaoyuan-14b-agent/agent-card.json",
    evidence: "https://github.com/1292215273loveseeker-dotcom/xiaoyuan-14b-agent/blob/main/docs/evidence.md"
  }
};

const state = {
  manifest: null,
  network: null,
  config: loadConfig(),
  booted: false
};

function loadConfig() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveConfig(config) {
  const clean = {
    baseUrl: String(config.baseUrl || "").trim(),
    model: String(config.model || "").trim(),
    apiKey: String(config.apiKey || "").trim()
  };
  state.config = clean;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
}

function clearConfig() {
  state.config = {};
  localStorage.removeItem(STORAGE_KEY);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function trace(kind, detail) {
  const list = document.getElementById("trace-list");
  if (!list) return;
  const item = document.createElement("li");
  item.className = `trace-item trace-${kind}`;
  item.textContent = `${new Date().toLocaleTimeString()} · ${detail}`;
  list.prepend(item);
}

function setStatus(text, kind = "idle") {
  const el = document.getElementById("runtime-status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function validateManifest(manifest) {
  if (!manifest || typeof manifest !== "object") throw new Error("manifest is not an object");
  if (!Array.isArray(manifest.networks) || manifest.networks.length === 0) {
    throw new Error("manifest.networks must be a non-empty array");
  }
  for (const network of manifest.networks) {
    if (!network.name || !network.front_man || !network.hocon) {
      throw new Error("each network needs name, front_man, and hocon");
    }
  }
  return manifest;
}

function validateNetwork(network) {
  if (!network || typeof network !== "object") throw new Error("network is not an object");
  if (!Array.isArray(network.tools) || network.tools.length < 2) {
    throw new Error("network.tools must contain at least two agents");
  }
  const names = new Set();
  for (const tool of network.tools) {
    if (!tool.name || typeof tool.name !== "string") throw new Error("agent is missing name");
    if (names.has(tool.name)) throw new Error(`duplicate agent: ${tool.name}`);
    names.add(tool.name);
  }
  const front = network.tools.find((tool) => tool.name === "xiaoyuan_front");
  if (!front) throw new Error("front agent xiaoyuan_front is missing");
  for (const tool of network.tools) {
    for (const child of tool.tools || []) {
      const name = typeof child === "string" ? child : child.name;
      if (typeof name === "string" && !names.has(name) && name !== "get_project_facts") {
        throw new Error(`unresolved agent or action: ${name}`);
      }
    }
  }
  return network;
}

async function load() {
  const response = await fetch(MANIFEST_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`manifest HTTP ${response.status}`);
  const manifest = validateManifest(await response.json());
  const networkEntry = manifest.networks.find((network) => network.name === "xiaoyuan_14b") || manifest.networks[0];
  const networkUrl = new URL(networkEntry.hocon, MANIFEST_URL);
  const networkResponse = await fetch(networkUrl, { cache: "no-store" });
  if (!networkResponse.ok) throw new Error(`network HTTP ${networkResponse.status}`);
  const network = validateNetwork(await networkResponse.json());
  state.manifest = manifest;
  state.network = network;
  return { manifest, network, networkEntry };
}

function getProjectFacts() {
  return structuredClone(PROJECT_FACTS);
}

function gate(text) {
  const input = String(text || "").trim();
  const crisis = /(suicide|kill myself|end my life|overdose|can't breathe|cannot breathe|chest pain|stroke|severe bleeding|emergency|自伤|自杀|轻生|不想活|胸痛|呼吸困难|大出血|急救)/i;
  const unsafe = /(fraud|fake invoice|steal|steal credentials|phishing|hack into|weapon|bomb|poison|dangerous chemical|evade detection|洗钱|诈骗|伪造发票|盗号|钓鱼|制毒|制爆|危险化学品|逃避检测)/i;
  if (crisis.test(input)) {
    return {
      allowed: false,
      kind: "crisis",
      response: "紧急情况优先：如果你或他人正处于危险中，请立刻联系当地急救电话（中国大陆 120；美国 911；欧盟 112），并联系身边可信任的人。不要等待在线回复。我不会用这条消息替代急救。"
    };
  }
  if (unsafe.test(input)) {
    return {
      allowed: false,
      kind: "unsafe",
      response: "这件事我不能提供操作细节。我可以帮你做合规版本：例如设计反欺诈审核、做发票真实性核验、或把安全问题转成防御性检查清单。"
    };
  }
  return { allowed: true, kind: "clear", response: "" };
}

function deterministicAnswer(text) {
  const input = String(text || "").trim();
  const factsIntent = /(what is|what are|tell me about|evidence|score|benchmark|model|qwen|safety|project|xiaoyuan|小袁|证据|评分|模型|安全|项目|架构)/i;
  if (factsIntent.test(input)) {
    const facts = getProjectFacts();
    return [
      `${facts.name} is ${facts.what_it_is}`,
      "",
      "What it is not:",
      ...facts.what_it_is_not.map((line) => `- ${line}`),
      "",
      "Local evidence (not official):",
      `- Ten-task regression: ${facts.local_evidence.ten_task_regression}`,
      `- Automated regression: ${facts.local_evidence.automated_regression}`,
      `- Local strict self-score: ${facts.local_evidence.local_strict_self_score}`,
      `- Safety-critical items: ${facts.local_evidence.safety_critical_items}`,
      `- Runtime: ${facts.local_evidence.runtime}`,
      "",
      "This demo is running the deterministic local policy. Add your own OpenAI-compatible router in Settings to exercise the optional BYOK path."
    ].join("\n");
  }
  return "I can answer grounded questions about the Xiaoyuan 14B project, run a safety pre-check, or use your own OpenAI-compatible router if you configure one in Settings. Try: “What is Xiaoyuan 14B, and what evidence do you have?”";
}

function openAiUrl(baseUrl) {
  const base = String(baseUrl || "").trim().replace(/\/+$/, "");
  if (!base) throw new Error("Base URL is empty");
  if (base.endsWith("/chat/completions")) return base;
  return `${base}/chat/completions`;
}

async function callModel(text) {
  const config = state.config;
  if (!config.baseUrl || !config.model || !config.apiKey) {
    throw new Error("BYOK is not configured");
  }
  const system = [
    "You are Xiaoyuan 14B, a local-first, safety-gated agent.",
    "Never claim official benchmark scores or live endpoints.",
    "Distinguish local self-evaluation from official results.",
    "If the user describes a crisis, put emergency services first.",
    "If the user asks for harmful operational detail, refuse and offer a safe alternative."
  ].join(" ");
  const response = await fetch(openAiUrl(config.baseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: text }
      ]
    })
  });
  if (!response.ok) throw new Error(`Router HTTP ${response.status}`);
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Router returned no message content");
  return content;
}

async function answer(text, options = {}) {
  const gated = gate(text);
  trace("gate", `safety_gate → ${gated.kind}`);
  if (!gated.allowed) {
    trace("blocked", `${gated.kind} branch short-circuited before generation`);
    return { text: gated.response, mode: `deterministic-${gated.kind}`, gated: true };
  }
  if (options.byok) {
    try {
      setStatus("Calling your router…", "working");
      const result = await callModel(text);
      trace("model", "BYOK router returned a response");
      return { text: result, mode: "byok", gated: false };
    } catch (error) {
      trace("error", `BYOK failed: ${error.message}`);
      setStatus("BYOK failed; using the local deterministic path", "warn");
    }
  }
  trace("facts", "deterministic local path");
  return { text: deterministicAnswer(text), mode: "deterministic-local", gated: false };
}

function appendMessage(role, text, meta) {
  const log = document.getElementById("chat-log");
  if (!log) return;
  const wrap = document.createElement("div");
  wrap.className = `message message-${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrap.appendChild(bubble);
  if (meta) {
    const tag = document.createElement("div");
    tag.className = "meta";
    tag.textContent = meta;
    wrap.appendChild(tag);
  }
  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
}

async function handleSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;
  appendMessage("user", text, "");
  input.value = "";
  setStatus("Running the safety gate…", "working");
  const result = await answer(text, { byok: Boolean(state.config.apiKey) });
  appendMessage("agent", result.text, `mode: ${result.mode}${result.gated ? " · gated" : ""}`);
  setStatus(result.gated ? "Gate stopped this path before generation." : "Ready.", result.gated ? "warn" : "idle");
}

function wireSettings() {
  const panel = document.getElementById("settings-panel");
  const toggle = document.getElementById("settings-toggle");
  const base = document.getElementById("base-url");
  const model = document.getElementById("model");
  const key = document.getElementById("api-key");
  const save = document.getElementById("save-settings");
  const clear = document.getElementById("clear-settings");
  if (!panel || !toggle) return;
  base.value = state.config.baseUrl || "";
  model.value = state.config.model || "";
  key.value = state.config.apiKey || "";
  toggle.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
  });
  save.addEventListener("click", () => {
    saveConfig({ baseUrl: base.value, model: model.value, apiKey: key.value });
    appendMessage("agent", "BYOK settings saved in this browser only. The key is sent only to the router you entered.", "settings");
    setStatus("BYOK configured. The next non-gated message will call your router.", "idle");
  });
  clear.addEventListener("click", () => {
    clearConfig();
    base.value = model.value = key.value = "";
    appendMessage("agent", "BYOK settings cleared from this browser.", "settings");
    setStatus("Deterministic local path active.", "idle");
  });
}

async function boot(selector = "#agent-app") {
  if (state.booted) return state;
  try {
    setStatus("Loading manifest and network…", "working");
    await load();
    trace("manifest", `loaded ${state.manifest.networks.length} network(s)`);
    trace("network", `validated ${state.network.tools.length} agents`);
    const form = document.getElementById("chat-form");
    if (form) form.addEventListener("submit", handleSubmit);
    wireSettings();
    setStatus("Ready. Deterministic local path active.", "idle");
    appendMessage(
      "agent",
      "Xiaoyuan 14B is running in the browser. Ask about the project, try a safety-sensitive prompt, or configure your own OpenAI-compatible router in Settings.",
      "mode: deterministic-local"
    );
    state.booted = true;
    return state;
  } catch (error) {
    trace("error", error.message);
    setStatus(`Runtime error: ${error.message}`, "error");
    appendMessage("agent", `The runtime could not start: ${error.message}`, "error");
    throw error;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => boot());
} else {
  boot().catch(() => {});
}

window.XiaoyuanAgent = { boot, load, gate, answer, getProjectFacts, state };
