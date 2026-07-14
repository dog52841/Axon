
FOUNDEROS
Complete Technical & Product Documentation
v1.0 — The AI Co-Founder OS for Indie Hackers, Vibe Coders & Global Founders

Nerd Primates  •  2025
founderos.dev



# Table of Contents


01  Vision & Philosophy	3
02  The Problem We Solve	5
03  Core Architecture	7
04  Agent System	11
05  Memory & Intelligence	16
06  Tool System	20
07  Loop Engine	27
08  International Adaptation Layer	32
09  Background Cognition	36
10  UI Review System	39
11  CLI & TUI Design	42
12  Mobile Heartbeat	46
13  Extension & Loop Marketplace	49
14  Competitive Moat Analysis	53
15  Tech Stack	57
16  Pricing & Monetization	61
17  Build Order & MVP Scope	66
18  Go-To-Market Strategy	70
19  Security & Privacy	74
20  Appendix: Prompt Architecture	77


# 01 — Vision & Philosophy


FounderOS is not an AI assistant. It is not a chatbot with tools bolted on. It is not Claude Code for founders, or a prettier version of an agent playground.

FounderOS is an operating system for your company.

You install it once. You tell it what you're building and what you want to achieve. You connect your tools — Stripe, Gmail, GitHub, Supabase, X, whatever you have. You walk away. It executes. It markets. It builds. It finds customers. It sends emails. It posts content. It watches your competitors. It learns what works for your specific business. It briefs you every morning with exactly three decisions.

You make decisions. It does everything else.


## The Founding Insight

Every AI tool that exists right now is built around the same assumption: the human is the operator. You are expected to sit at a laptop, write prompts, review outputs, copy-paste results, and manage the AI like a junior employee who needs constant supervision.

This is the wrong model for 95% of people who want to build a business.

The vibe coder in Jakarta with a brilliant idea but no patience for repetitive work. The 19-year-old in Lagos who knows what she wants to build but has never sent a cold email in her life. The indie hacker in Bangalore who hyperfocuses for 12 hours when excited but disappears for three days when the work gets tedious. The solo founder in São Paulo juggling a day job and a side project and zero time for the grind.

These people do not need a better coding assistant. They need a company that runs.


## Core Philosophy


- Execution over conversation. The agent acts. It does not ask five clarifying questions before sending an email. It does not ask for permission to run a loop you already configured. It executes, logs, and reports. You review outcomes, not plans.

- You own everything. Your data lives on your machine. Your API keys never touch our servers. Your tools, loops, and agent configurations are yours forever. We charge for the platform intelligence, not the compute.

- BYOK by default. Bring your own API key for any model — Claude, GPT, Gemini, Mistral, Kimi, local Ollama, anything. We do not mark up model costs. We do not create artificial token limits. We do not hold your intelligence hostage.

- CLI-first, phone-second, web never. The TUI is the product. The phone is the relationship. The website is marketing. We will never build a dashboard that competes with the core experience.

- Local-first, cloud-optional. FounderOS runs on your machine. Cloud execution is available for 24/7 autopilot but is never required. Your agent works without a subscription to our infrastructure.

- Compounding intelligence. The longer you use FounderOS, the smarter it gets about your specific business. It learns what works for your audience, your market, your voice. This knowledge is yours and compounds over time.

- International by design. Not US-centric. Not English-only. Not assuming Stripe is available. FounderOS ships with full regional adaptation — payment processors, languages, currencies, compliance contexts, and market-specific playbooks for every major founder region on earth.


## The One-Sentence Version


"Run your startup. Not your AI."


## Who This Is For


FounderOS is built for a specific person. Not enterprise. Not agencies. Not developers who love writing code.


| Persona | Their Pain | What FounderOS Gives Them |
| --- | --- | --- |
| Vibe Coder | Builds 10 things, ships 0. Gets bored at the grind. | Autopilot execution so they only do the creative parts. |
| ADHD Founder | Hyperfocuses on exciting work, disappears when it gets tedious. | Consistent execution regardless of their energy level. |
| Solo Founder | No co-founder, no team, no time for everything. | A full company running on their behalf 24/7. |
| Global Indie Hacker | US-centric tools that don't work in their region. | Native support for local payment, language, and market. |
| Ambitious Teen | No network, no money, no credibility yet. | First customer in days, not months. |
| Side Project Builder | Day job + side project = impossible to execute. | Agent runs while they work, briefs them in the morning. |
| Non-Technical Founder | Great idea, can't code, can't afford a developer. | Full product build loop with zero code required. |




# 02 — The Problem We Solve



## The Graveyard

There are millions of half-finished projects on GitHub. Millions of Notion docs titled 'Business Plan' with 47 bullet points and zero customers. Millions of people who tried to build something, hit the wall of execution, and gave up.

The wall is not intelligence. These people are smart. The wall is not ideas. The ideas are often excellent. The wall is the gap between knowing what to do and being able to do it consistently, at volume, without burning out.

Cold emailing 200 people. Writing content every day. Following up with leads. Iterating on pricing. Watching competitors. Running retargeting. Fixing the conversion funnel. These tasks are not hard. They are tedious, repetitive, and require showing up even when you don't want to.

No AI tool solves this. They make each individual task easier. They do not make the system run.


## Why Existing Tools Fail



### Claude Code / Cursor / Windsurf

These are coding assistants. Excellent at making developers more productive. Completely irrelevant to the 80% of founder work that is not writing code. They close when you close the laptop. They have no concept of your business, your customers, your goals, or your market. They cannot send an email, post content, find a lead, or generate revenue.


### ChatGPT / Claude / Gemini

Brilliant strangers. Every conversation starts from zero. You spend more time re-explaining your context than getting work done. They respond to prompts. They do not proactively run your business. They are tools you wield, not co-founders who work.


### OpenClaw

General purpose agent playground. Free and BYOK, which is admirable. But no business-specific primitives. No loops. No outcome memory. No longitudinal learning. No 24/7 execution. No mobile interface. A sandbox for developers, not a running company for founders.


### Polsia

Closest competitor. Proven the market exists — $1M ARR in 30 days. But fundamentally broken product model: credits-based pricing that creates anxiety with every action, web-only SaaS with no ownership, no local data, no extensibility, no transparency. Users are already complaining that $49/mo buys them 5 tasks. One task costs more than a GPT-4 API call direct. The moat is zero.


## The Specific Pains We Target



| Pain | How Often Founders Feel It | Current Solution | Our Solution |
| --- | --- | --- | --- |
| Can't do consistent outreach | Daily | Hire VA or do it manually | Automated loop, runs 24/7 |
| No time for content | Daily | Pay someone or skip it | Growth loop generates + posts |
| Don't know what to build next | Weekly | Ask Twitter | Agent analyzes data + recommends |
| Competitor watching is manual | Weekly | Google Alerts, manual checks | Competitor intel loop, auto-brief |
| Can't afford a developer | Always | Fiverr, pray | Build loop generates full product |
| Pricing feels like guessing | Monthly | Twitter polls, gut feel | Agent tests + recommends based on data |
| Tool doesn't work in my country | Always | Work around or give up | Native regional adaptation |
| Can't stay consistent | Always | Willpower, fails eventually | Loops run regardless of your mood |




# 03 — Core Architecture


FounderOS is built in Go. Single binary. No runtime dependencies. Ships as a native executable on macOS, Linux, and Windows. Installed with a single command.


## Repository Structure


```
founderos/
├── main.go                    # entry point, CLI router
├── cmd/                       # command definitions (cobra)
│   ├── init.go                # founder init
│   ├── start.go               # founder start (TUI)
│   ├── run.go                 # founder run <loop>
│   ├── tools.go               # founder tools
│   ├── memory.go              # founder memory
│   ├── config.go              # founder config
│   └── yolo.go                # founder yolo
├── tui/                       # bubbletea TUI
│   ├── app.go                 # root model
│   ├── dashboard.go           # main dashboard view
│   ├── log.go                 # agent log stream
│   ├── tools.go               # tools panel
│   └── theme.go               # lipgloss styles
├── agent/                     # core agent system
│   ├── loop.go                # main agent loop
│   ├── planner.go             # LLM-based planner
│   ├── executor.go            # tool execution engine
│   ├── observer.go            # state observation
│   └── learner.go             # post-action learning
├── tools/                     # tool system
│   ├── registry.go            # tool registry
│   ├── executor.go            # tool runner
│   ├── native/                # built-in tools
│   │   ├── email.go
│   │   ├── content.go
│   │   ├── lead.go
│   │   ├── code.go
│   │   ├── deploy.go
│   │   ├── stripe.go
│   │   └── web.go
│   └── generated/             # agent-created tools
├── loops/                     # loop engine
│   ├── engine.go              # loop scheduler + runner
│   ├── builtin/               # default loops
│   │   ├── lead.go
│   │   ├── growth.go
│   │   ├── build.go
│   │   └── competitor.go
│   └── custom/                # user-defined loops
├── memory/                    # memory system
│   ├── store.go               # SQLite interface
│   ├── vector.go              # vector DB (optional)
│   ├── briefing.go            # briefing generator
│   └── learner.go             # pattern extraction
├── cognition/                 # background cognition
│   ├── watcher.go             # continuous signal monitoring
│   ├── insight.go             # insight generation
│   └── pivot.go               # pivot detection
├── intl/                      # international adaptation
│   ├── region.go              # region detection + config
│   ├── payments.go            # regional payment processors
│   ├── locale.go              # language + currency
│   └── playbooks/             # region-specific strategies
├── config/                    # configuration
│   ├── workspace.go           # workspace config
│   ├── models.go              # model configuration
│   └── schema.go              # config validation
├── cloud/                     # cloud execution (v2)
│   ├── agent.go               # cloud agent runner
│   ├── sync.go                # local <-> cloud sync
│   └── heartbeat.go           # keepalive
└── store/                     # extension marketplace (v2)
├── registry.go
├── installer.go
└── manifest.go

```

## Data Flow


The core data flow is a continuous loop with four phases: Observe, Plan, Execute, Learn.

```
┌─────────────────────────────────────────────────────┐
│                   FOUNDEROS RUNTIME                  │
│                                                      │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐   │
│  │ OBSERVE  │───▶│  PLAN    │───▶│   EXECUTE    │   │
│  └──────────┘    └──────────┘    └──────────────┘   │
│       ▲                                  │           │
│       │          ┌──────────┐            │           │
│       └──────────│  LEARN   │◀───────────┘           │
│                  └──────────┘                        │
│                                                      │
│  Background: COGNITION LAYER (always running)        │
│  Mobile:     HEARTBEAT (3x/day briefings)            │
│  Cloud:      EXECUTOR (24/7 when laptop closed)      │
└─────────────────────────────────────────────────────┘

```

## Workspace Configuration Schema


Every FounderOS instance has a workspace config file. This is the source of truth for the agent's behavior.

```
# ~/.founderos/workspace.yaml

name: "VoiceReach AI"
goal: "Launch and reach 100 paying customers"
stage: pre_revenue  # pre_idea | pre_launch | pre_revenue | early_revenue | growth
founded: 2025-01-01
region: IN          # ISO 3166-1 alpha-2
currency: INR
language: en        # primary language for agent output

models:
planner:
provider: anthropic
model: claude-sonnet-4-6
api_key: ${ANTHROPIC_API_KEY}
builder:
provider: anthropic
model: claude-opus-4-6
api_key: ${ANTHROPIC_API_KEY}
growth:
provider: moonshot
model: kimi-k2
api_key: ${KIMI_API_KEY}
vision:
provider: openai
model: gpt-4o
api_key: ${OPENAI_API_KEY}

integrations:
stripe: false
razorpay: true
gmail: true
github: true
supabase: true
twitter: false
linkedin: false
google_maps: true
vercel: true

limits:
emails_per_day: 50
posts_per_day: 5
max_api_spend_usd: 5.00
max_spend_currency: 420  # INR

safe_mode: true
full_access: false
confirm_irreversible: true
confirm_billing: true

loops:
active:
- lead_loop
- growth_loop
paused:
- build_loop

agents:
planner_interval_minutes: 30
background_cognition: true
mobile_briefing: true
briefing_times: ["08:00", "13:00", "20:00"]


```

# 04 — Agent System



## The Core Loop

The agent loop is the heartbeat of FounderOS. It runs continuously when active, or on a schedule when in background mode. Every cycle follows the same four phases.

```
// agent/loop.go — simplified

func (a *Agent) Run(ctx context.Context) error {
for {
select {
case <-ctx.Done():
return nil
default:
state  := a.Observer.Observe(a.Workspace, a.Memory)
plan   := a.Planner.Plan(state, a.Goal, a.Tools)
results := []ActionResult{}

for _, action := range plan.Actions {
if a.NeedsConfirmation(action) {
if !a.RequestConfirmation(action) {
continue
}
}
result := a.Executor.Execute(action)
results = append(results, result)
a.Memory.Log(action, result)
}

a.Learner.Learn(results, a.Memory)
a.Emit(AgentCycleComplete{plan, results})
time.Sleep(a.Interval)
}
}
}

```

## The Observer

The Observer builds a complete state snapshot before each planning cycle. This includes workspace state, memory context, recent results, active loops, pending decisions, and external signals.

```
type WorkspaceState struct {
// Business metrics
Revenue        RevenueSummary
Customers      CustomerSummary
Churn          ChurnSummary
Runway         RunwaySummary

// Active work
ActiveLoops    []LoopStatus
PendingActions []Action
RecentResults  []ActionResult

// External signals
CompetitorAlerts []Alert
MarketSignals     []Signal
CustomerReplies   []Reply

// Memory context
RecentDecisions  []Decision
LearningsApplied []Learning
PatternMatches   []Pattern

// Constraints
DailyLimits     LimitStatus
Mode            AgentMode
Region          RegionConfig
}

```

## The Planner

The Planner is the brain. It receives the complete workspace state and outputs a prioritized action plan with reasoning. The planner uses your configured model — defaulting to the most capable model available.

The planner system prompt is the most critical component of FounderOS. It is designed to produce decisive, business-aware action plans — not hedged, generic recommendations.

```
// Planner system prompt structure

SYSTEM:
You are the FounderOS planning agent for {workspace.name}.

FOUNDER CONTEXT:
Goal: {workspace.goal}
Stage: {workspace.stage}
Region: {workspace.region}
Founded: {workspace.founded}

CURRENT STATE:
{state_snapshot}

AVAILABLE TOOLS:
{tool_list_with_descriptions}

RECENT MEMORY (last 7 days of relevant actions + results):
{memory_context}

LEARNED PATTERNS (what works specifically for this company):
{learned_patterns}

MODE: {safe_mode | full_access}
LIMITS: {daily_limits}

INSTRUCTIONS:
Plan the next set of actions. Be decisive. Prioritize actions
with the highest expected impact on the stated goal.
Do not ask for permission. Do not hedge. Do not suggest
actions you cannot execute with available tools.
Flag irreversible actions explicitly.
Output only valid JSON matching PlannerOutput schema.

type PlannerOutput struct {
Reasoning   string   `json:"reasoning"`
Actions     []Action `json:"actions"`
Confidence  float64  `json:"confidence"`
Flags       []Flag   `json:"flags"`
Suggestions []string `json:"suggestions"`
}

type Action struct {
Tool         string                 `json:"tool"`
Params       map[string]interface{} `json:"params"`
Priority     int                    `json:"priority"`
Reversible   bool                   `json:"reversible"`
EstOutcome   string                 `json:"estimated_outcome"`
Confidence   float64                `json:"confidence"`
Parallel     bool                   `json:"parallel"`
}

```

## Reversibility Model

FounderOS only pauses for actions that are genuinely irreversible or carry real financial risk. The agent is not paranoid. Most actions just happen.


| Action | Reversible? | Confirm in Safe Mode? | Confirm in Full Access? |
| --- | --- | --- | --- |
| Send email | Soft (can follow up) | No |  |
| Post to Twitter/X | Soft (can delete) | Yes (first time) | No |
| Generate code | Yes | No |  |
| Deploy to Vercel | Yes (rollback) | No |  |
| Create Stripe product | Yes | No |  |
| Send invoice | Soft | Yes | No |
| Charge customer | Hard | Yes, always |  |
| Delete database record | No | Yes, always |  |
| Push to main branch | Hard | Yes | No |
| Install tool/extension | Yes | No |  |
| Generate + register tool | Yes |  | No |



## Multi-Agent Architecture

FounderOS runs multiple specialized agents simultaneously. Each agent has its own model configuration, tool access, personality profile, and resource limits. They share memory but operate independently.

```
agents:
planner:
role: Strategic planning, goal alignment, loop orchestration
model: claude-opus-4-6  # needs full reasoning capability
runs: every 30 minutes
tools: all (read-only)

growth:
role: Content generation, posting, audience building
model: kimi-k2          # fast, cheap, high volume
runs: continuous (loops)
tools: [content.generate, content.post, lead.find, web.search]

closer:
role: Outreach, follow-up, relationship management
model: claude-sonnet-4-6
runs: continuous (loops)
tools: [email.send, email.reply, calendar.book, stripe.invoice]

builder:
role: Code generation, UI building, product iteration
model: claude-opus-4-6  # quality matters here
runs: on-demand
tools: [code.generate, code.run, ui.build, ui.judge, deploy.*]

watcher:
role: Competitor intel, market signals, pivot detection
model: claude-haiku-4-5  # lightweight, runs constantly
runs: continuous (background)
tools: [web.scrape, web.search, insight.analyze]


```

# 05 — Memory & Intelligence


FounderOS has a layered memory architecture. Not context windows. Not conversation history. Business memory — persistent, structured, queryable knowledge about your specific company that compounds over time.


## Memory Layers



### Layer 1: Operational Memory (SQLite — always on)

The complete audit trail of everything FounderOS has done. Every action, every result, every decision, every metric at every point in time. This is the foundation of all learning.

```
-- core tables

CREATE TABLE actions (
id          TEXT PRIMARY KEY,
tool        TEXT NOT NULL,
params      JSON,
result      JSON,
success     BOOLEAN,
duration_ms INTEGER,
cost_usd    REAL,
loop_id     TEXT,
agent_id    TEXT,
created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE metrics (
id          TEXT PRIMARY KEY,
type        TEXT,   -- revenue, churn, leads, replies, impressions
value       REAL,
currency    TEXT,
source      TEXT,
recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE decisions (
id          TEXT PRIMARY KEY,
context     TEXT,
options     JSON,
chosen      TEXT,
reasoning   TEXT,
outcome     TEXT,   -- filled in retroactively
created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learnings (
id          TEXT PRIMARY KEY,
pattern     TEXT,
confidence  REAL,
evidence    JSON,
applied     INTEGER DEFAULT 0,
created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
id          TEXT PRIMARY KEY,
name        TEXT,
email       TEXT,
source      TEXT,
mrr         REAL,
joined_at   DATETIME,
churned_at  DATETIME,
notes       JSON
);

```

### Layer 2: Semantic Memory (LanceDB — v1.5, optional)

Vector embeddings of past decisions, content, insights, and customer conversations. Enables RAG over your entire company history. The agent can query: 'what worked last time we tried cold email for this segment?' and get relevant context automatically.

```
// memory/vector.go

type VectorMemory struct {
db *lancedb.Connection
}

func (v *VectorMemory) Store(entry MemoryEntry) error {
embedding := v.Embed(entry.Content)
return v.db.Insert("memories", map[string]interface{}{
"id":        entry.ID,
"type":      entry.Type,
"content":   entry.Content,
"embedding": embedding,
"metadata":  entry.Metadata,
"created_at": time.Now(),
})
}

func (v *VectorMemory) Query(query string, limit int) []MemoryEntry {
embedding := v.Embed(query)
return v.db.Search("memories", embedding, limit)
}

```

### Layer 3: Learned Patterns (extracted continuously)

The Learner agent runs after every batch of actions and extracts patterns from the data. These patterns are stored as structured knowledge and automatically applied to future planning.

Example learned patterns after 30 days of operation:

```
✓  Tuesday emails get 23% higher open rates for this audience.
✓  Leads from Google Maps convert 2.1x better than scraped LinkedIn leads.
⚠  Price objections spike when you lead with feature lists. Lead with outcomes.
⚠  Users who don't engage in week 3 have 89% churn probability by day 47.
✓  Content posts between 7-9pm IST get 3.4x more impressions.

```

## The Morning Briefing System

Every morning (and optionally midday and evening), FounderOS generates a structured briefing. This is sent via push notification to your phone and available in the TUI.

The briefing is generated by the Planner agent reviewing all overnight activity and is deliberately constrained to maximum 3 decisions. More than 3 creates decision fatigue and reduces action rates.

```
Briefing for {workspace.name} — {date}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERNIGHT RESULTS
Revenue:  {currency}{mrr} MRR  ({delta} from yesterday)
Emails:   {sent} sent  •  {opened} opened  •  {replied} replied
Content:  {posts} published  •  {impressions} impressions
Leads:    {found} found  •  {qualified} qualified

WHAT HAPPENED
{bullet summary of 3-5 most significant overnight actions}

NEEDS YOU TODAY  (3 decisions, ~2 min)
[1] {decision_1}
Options: {option_A}  |  {option_B}  |  {option_C}

[2] {decision_2}
Options: {option_A}  |  {option_B}

[3] {decision_3}
Options: {option_A}  |  {option_B}  |  custom

I'LL HANDLE EVERYTHING ELSE.


```

# 06 — Tool System


Every action the agent can take is a tool. Tools are modular, independently scoped, versioned, and composable. They are the atoms of everything FounderOS does.


## Tool Schema


```
type Tool struct {
Name          string            `json:"name"`
Version       string            `json:"version"`
Description   string            `json:"description"`
Category      ToolCategory      `json:"category"`
Requires      []string          `json:"requires"`
InputSchema   map[string]Param  `json:"input_schema"`
OutputSchema  map[string]Param  `json:"output_schema"`
RateLimit     string            `json:"rate_limit"`
Reversibility Reversibility     `json:"reversibility"`
Permissions   []Permission      `json:"permissions"`
RegionSupport []string          `json:"region_support"`
CostEstimate  CostEstimate      `json:"cost_estimate"`
IsGenerated   bool              `json:"is_generated"`
IsExperimental bool             `json:"is_experimental"`
}

```

## Built-in Tools — Complete List



### Email Tools


| Tool | Description | Requires | Rate Limit |
| --- | --- | --- | --- |
| email.send | Send outreach or transactional email | gmail / smtp | 50/day |
| email.reply | Thread-aware reply to received email | gmail / smtp | 100/day |
| email.draft | Draft email without sending | none | unlimited |
| email.analyze | Analyze reply sentiment + intent | none | unlimited |
| email.template | Generate email template for use case | none | unlimited |
| email.sequence | Create multi-step email sequence | gmail / smtp | 5 sequences/day |



### Content Tools


| Tool | Description | Requires | Rate Limit |
| --- | --- | --- | --- |
| content.generate | Generate tweet, post, or copy | none | unlimited |
| content.post | Post to Twitter/X, LinkedIn | twitter / linkedin | 10/day |
| content.schedule | Schedule future content posts | twitter / linkedin | 50 queued |
| content.analyze | Analyze engagement on past posts | twitter / linkedin | unlimited |
| content.repurpose | Transform content across formats | none | unlimited |
| content.thread | Generate Twitter thread from topic | none | unlimited |



### Lead Tools


| Tool | Description | Requires | Rate Limit |
| --- | --- | --- | --- |
| lead.find | Discover leads via scraping or API | varies | 200/day |
| lead.qualify | Score leads by ICP fit | none | unlimited |
| lead.enrich | Add contact info to lead | varies | 100/day |
| lead.track | Track lead through pipeline stages | none | unlimited |
| lead.maps | Find local businesses via Maps API | google_maps_key | 100/day |
| lead.linkedin | Find founders/decision-makers | linkedin | 50/day |



### Code & Build Tools


| Tool | Description | Requires | Rate Limit |
| --- | --- | --- | --- |
| code.generate | Generate code files from spec | none | unlimited |
| code.run | Execute code in sandbox | none | 50/day |
| code.test | Run test suite, report failures | none | unlimited |
| code.review | Review code for bugs + improvements | none | unlimited |
| code.refactor | Refactor code to spec | none | unlimited |
| ui.build | Generate frontend from description/reference | none | unlimited |
| ui.judge | Screenshot + evaluate UI quality | playwright | 20/day |
| ui.iterate | Improve UI based on judge feedback | playwright | 20/day |
| deploy.vercel | Deploy to Vercel | vercel_token | 20/day |
| deploy.netlify | Deploy to Netlify | netlify_token | 20/day |
| deploy.railway | Deploy backend to Railway | railway_token | 20/day |



### Payment Tools (Regional)


| Tool | Regions | Description |
| --- | --- | --- |
| stripe.invoice | US, EU, UK, AU, CA + 40 more | Create and send invoice |
| stripe.product | US, EU, UK, AU, CA + 40 more | Manage products and pricing |
| stripe.webhook | US, EU, UK, AU, CA + 40 more | Handle payment events |
| razorpay.invoice | IN, primarily | Create and send invoice via Razorpay |
| razorpay.link | IN, primarily | Generate payment link |
| paymongo.invoice | PH | Invoice via PayMongo |
| paystack.invoice | NG, GH, ZA, KE | Invoice via Paystack |
| flutterwave.invoice | NG, GH, KE, ZA, EG | Invoice via Flutterwave |
| xendit.invoice | ID, PH, MY, TH, VN | Invoice via Xendit |
| mercadopago.invoice | BR, AR, MX, CL, CO | Invoice via MercadoPago |
| iyzico.invoice | TR | Invoice via iyzico |
| upi.link | IN | Generate UPI payment link |



### Intelligence Tools


| Tool | Description |
| --- | --- |
| insight.analyze | Analyze metrics and surface patterns |
| insight.competitor | Research competitor pricing, features, positioning |
| insight.market | Research market size, trends, opportunities |
| insight.icp | Analyze customer profiles to refine ICP |
| insight.churn | Predict churn risk from behavior patterns |
| insight.pricing | Recommend pricing based on data |
| web.search | Search the web for information |
| web.scrape | Extract structured data from websites |
| web.fetch | Retrieve full content from URL |



## Agent-Generated Tools (YOLO Feature)

When the agent detects a capability gap — a task it needs to complete but has no tool for — it generates, registers, and uses new tools autonomously. This is enabled in Full Access mode.

```
// Execution trace: agent generating a new tool

[planner]: I need to scrape Google Maps for dentist leads in Chennai.
[planner]: No tool exists for this. Generating tool: maps.dental_scraper

[tool_generator]: Analyzing task requirements...
[tool_generator]: Writing tool implementation...
[tool_generator]: Tool maps.dental_scraper created.
[tool_generator]: Registering in tool registry.
[tool_generator]: Marking as experimental.

[executor]: Executing maps.dental_scraper...
[executor]: Found 47 dental practices in Chennai.
[executor]: Stored in leads database.

[memory]: New tool maps.dental_scraper logged.
[memory]: Performance: success. Adding to known tools.

```
Generated tools are stored in ~/.founderos/tools/generated/. They can be inspected, edited, and deleted. If they work well, they can be submitted to the Loop Marketplace for other founders to use.



# 07 — Loop Engine


Loops are the business logic layer of FounderOS. They define repeatable workflows that the agent executes autonomously on schedule or continuously. Loops compose tools into outcomes.


## Loop Schema


```
type Loop struct {
Name        string      `yaml:"name"`
Description string      `yaml:"description"`
Trigger     Trigger     `yaml:"trigger"`
Steps       []Step      `yaml:"steps"`
Conditions  []Condition `yaml:"conditions"`
Limits      LoopLimits  `yaml:"limits"`
OnSuccess   []Action    `yaml:"on_success"`
OnFailure   []Action    `yaml:"on_failure"`
Region      []string    `yaml:"region"`
Stage       []string    `yaml:"stage"`
}

type Trigger struct {
Type     string `yaml:"type"`     // continuous | cron | event | manual
Schedule string `yaml:"schedule"` // cron expression
Event    string `yaml:"event"`    // event name for event-triggered
}

```

## Built-in Loops — Full Specifications



### Lead Loop

Continuously discovers, qualifies, and reaches out to potential customers. The most fundamental revenue-generating loop.

```
name: lead_loop
trigger:
type: continuous
interval_hours: 6
steps:
- tool: lead.find
params:
sources: [google_maps, web_scrape]
query: ${workspace.icp_query}
limit: 20
- tool: lead.qualify
params:
min_score: 7
criteria: ${workspace.icp_criteria}
- tool: lead.enrich
params:
fields: [email, company_size, revenue_estimate]
- tool: email.template
params:
type: cold_outreach
personalize: true
tone: ${workspace.voice}
- tool: email.send
params:
template: previous_step
limit: ${limits.emails_per_day}
- tool: memory.log
params:
type: outreach_sent
follow_up:
- trigger: no_reply_after_days: 3
tool: email.reply
params:
template: follow_up_v1
- trigger: no_reply_after_days: 7
tool: email.reply
params:
template: follow_up_v2
- trigger: positive_reply
action: notify_founder

```

### Growth Loop

Generates, schedules, and posts content across channels. Tracks engagement and adjusts strategy based on what performs.

```
name: growth_loop
trigger:
type: cron
schedule: "0 9,21 * * *"  # 9am and 9pm
steps:
- tool: insight.analyze
params:
focus: content_performance
lookback_days: 7
- tool: content.generate
params:
formats: [tweet, thread, linkedin_post]
topics: ${workspace.content_topics}
tone: ${workspace.voice}
informed_by: previous_step
- tool: content.post
params:
channels: ${workspace.active_channels}
schedule: optimal  # posts at best-performing times
- tool: content.analyze
params:
lookback_hours: 24
- tool: memory.log
params:
type: content_performance

```

### Build Loop

Generates, iterates, and deploys product code. Used for initial builds, feature additions, and bug fixes. The builder agent runs this loop on-demand.

```
name: build_loop
trigger:
type: manual
steps:
- tool: code.generate
params:
spec: ${input.spec}
stack: ${workspace.tech_stack}
- tool: code.test
params:
auto_fix: true
max_iterations: 3
- tool: ui.build
params:
reference: ${input.design_reference}
responsive: true
- tool: ui.judge
params:
criteria: [hierarchy, contrast, mobile, trust, conversion]
min_score: 7.5
- tool: ui.iterate
params:
based_on: previous_step
max_iterations: 3
- tool: deploy.vercel
params:
environment: preview
- tool: memory.log
params:
type: deployment
- action: notify_founder
params:
message: "Build complete. Preview at {url}. 3 things need your review."

```

### Competitor Intel Loop

Watches competitors 24/7 and generates actionable intelligence. Runs as a background process with minimal resource usage.

```
name: competitor_loop
trigger:
type: cron
schedule: "0 6 * * *"  # 6am daily
steps:
- tool: web.fetch
params:
urls: ${workspace.competitor_urls}
extract: [pricing, features, copy, job_postings]
- tool: insight.competitor
params:
compare_to: previous_snapshot
flag_changes: true
- tool: memory.log
params:
type: competitor_snapshot
- condition: changes_detected
action: include_in_briefing
priority: high

```

### Outreach Agency Loop (Full Access)

The most powerful built-in loop. Combines Maps scraping, enrichment, personalized outreach, and invoicing into a single end-to-end revenue generation workflow. Requires Full Access mode.

```
name: agency_loop
requires: full_access
trigger:
type: continuous
interval_hours: 12
steps:
- tool: lead.maps
params:
query: ${workspace.target_query}
location: ${workspace.target_location}
limit: 30
- tool: lead.qualify
params:
min_score: 8
- tool: lead.enrich
params:
find_decision_maker: true
- tool: email.template
params:
type: agency_pitch
personalize: deep
include: case_study, social_proof
- tool: email.send
params:
template: previous_step
- trigger: positive_reply
steps:
- tool: email.reply
params:
template: proposal_send
- trigger: proposal_accepted
steps:
- tool: stripe.invoice
params:
amount: ${workspace.service_price}
due_days: 7


```

# 08 — International Adaptation Layer


FounderOS is the first AI agent OS built from the ground up for the global founder — not as an afterthought, not as a localization pass, but as a core architectural commitment.

The majority of the world's most ambitious founders are not in San Francisco. They are in Bangalore, Lagos, Jakarta, São Paulo, Cairo, Manila, Istanbul, Warsaw, and hundreds of other cities where US-centric tools fail them daily.

FounderOS fixes this structurally.


## Region Detection & Auto-Configuration

On first run, FounderOS detects the user's region and automatically configures: payment processors, currency, language, local market context, and region-specific strategy playbooks.

```
// intl/region.go

type RegionConfig struct {
Code           string   // ISO 3166-1 alpha-2
Name           string
Currency       string   // ISO 4217
Language       string   // ISO 639-1
PaymentProviders []string
TimeZone       string
MarketContext  string   // injected into planner system prompt
PlaybookIDs    []string // region-specific loop playbooks
TaxContext     string   // VAT/GST notes for agent
EmailProviders []string // local email service providers
SocialChannels []string // most-used platforms in this region
}

```

## Supported Regions — v1



| Region | Countries | Payment Processors | Special Playbooks |
| --- | --- | --- | --- |
| South Asia | IN, PK, BD, LK | Razorpay, PayU, UPI, bKash | Tier-2 city targeting, WhatsApp outreach |
| Southeast Asia | ID, PH, MY, TH, VN, SG | Xendit, PayMongo, GrabPay | Marketplace first-mover, regional expansion |
| Sub-Saharan Africa | NG, GH, KE, ZA, TZ, UG | Paystack, Flutterwave, M-Pesa | Mobile-first, airtime payments, diaspora |
| Latin America | BR, MX, AR, CL, CO, PE | MercadoPago, PagSeguro, OXXO | Installment pricing, WhatsApp sales |
| MENA | EG, SA, AE, MA, TN, JO | PayTabs, HyperPay, Fawry | Arabic content, Friday weekend awareness |
| Eastern Europe | PL, RO, CZ, HU, UA, RS | Przelewy24, PayU, local cards | EU market entry, GDPR compliance |
| Turkey | TR | iyzico, PayTR, Papara | Lira volatility handling, Trendyol distribution |
| North America | US, CA, MX | Stripe, Paddle, Chargebee | Y Combinator narrative, ProductHunt launch |
| Western Europe | GB, DE, FR, NL, ES, IT | Stripe, GoCardless, Mollie | GDPR by default, VAT-inclusive pricing |
| East Asia | JP, KR, TW | Stripe JP, Toss, ECPay | Line/KakaoTalk integration, local trust signals |
| Oceania | AU, NZ | Stripe AU, POLi, BPAY | GST handling, APAC expansion playbook |



## Market-Specific Playbooks

Each region ships with a set of market-specific strategy playbooks — not generic advice, but actual loop configurations tuned for that market's characteristics.


### Example: India Playbook

```
# intl/playbooks/IN.yaml

market_context: |
India has 60M+ SMBs with low digital adoption.
Tier-2/3 cities (Pune, Jaipur, Surat, etc.) have lower
competition and higher conversion for first-mover tools.
WhatsApp is primary business communication channel.
Price sensitivity is high — ₹499-999/mo is the sweet spot
for solo founders and small teams.
Razorpay and UPI are dominant payment methods.
GST registration matters for B2B sales above Rs 20L/yr.

recommended_loops:
- lead_loop (target: google_maps, tier2_cities)
- whatsapp_outreach_loop
- content_loop (platforms: twitter, linkedin, instagram)

pricing_guidance: |
Use INR pricing prominently. Avoid USD display.
Monthly billing preferred over annual.
Free tier with WhatsApp support builds trust faster.

outreach_notes: |
Formal greeting + brief intro works better than casual US-style.
Reference local success stories when available.
Follow up is expected and not seen as aggressive.

```

## Multi-Language Agent Output

The agent can generate all output — emails, content, briefings, decisions — in the founder's local language. This is not translation. The agent natively generates in the target language with culturally appropriate tone and context.


| Language | Support Level | Notes |
| --- | --- | --- |
| English | Full | Default |
| Hindi | Full | Including transliterated email subject lines |
| Portuguese (BR) | Full | Brazilian Portuguese with local idioms |
| Spanish (LATAM) | Full | Latin American variants |
| Arabic | Full | RTL-aware, formal/informal register |
| Turkish | Full |  |
| Indonesian | Full |  |
| French | Full |  |
| German | Full |  |
| Polish | Full |  |
| Tagalog | Beta |  |
| Swahili | Beta |  |
| Bengali | Beta |  |




# 09 — Background Cognition


Background Cognition is the nervous system of FounderOS. It is a lightweight process running 24/7 — separate from the main agent loop — that continuously monitors signals, forms insights, and surfaces intelligence without executing actions.

It costs almost nothing to run (uses the cheapest available model at low frequency) and produces outsized value: the difference between an agent that reacts and an agent that anticipates.


## Signal Feeds

The cognition layer ingests signals from every connected source and runs continuous pattern analysis:


| Signal Source | What It Watches | Update Frequency |
| --- | --- | --- |
| Stripe / Payment API | MRR changes, churn events, upgrade patterns, failed payments | Real-time |
| Gmail / Email | Reply sentiment, objection patterns, unsubscribes, positive signals | Every 15 min |
| Twitter/X | Engagement trends, follower quality, mentions, niche trends | Every hour |
| Competitor URLs | Pricing changes, new features, copy updates, blog posts | Daily |
| Job boards | Competitor hiring signals (scaling vs struggling) | Daily |
| Hacker News / Reddit | Mentions of your problem space, competitor complaints | Every 2 hours |
| Your app (if connected) | User behavior, drop-off points, feature usage, session depth | Real-time |
| Google Alerts | Brand mentions, niche news, market movements | Daily |
| Lead database | Response rates, pipeline velocity, source quality | Every cycle |
| Content performance | What worked, what didn't, optimal timing | After each post |



## Emergent Goal Formation

The most advanced cognition feature. After accumulating enough signal (typically 2-3 weeks), the system begins proposing goal updates based on observed reality — not theory.

```
ℹ  This is not generic advice. It is pattern recognition over YOUR specific data, compared to anonymized patterns from similar companies.

// Example: Cognition layer detecting ICP mismatch

[cognition]: Analyzing 3 weeks of lead + conversion data...
[cognition]: Pattern detected:
- SMB leads (target ICP): 2.1% conversion rate
- Agency leads (not targeted): 8.7% conversion rate
- Agency leads came from 3 organic Twitter replies

[cognition]: Generating insight...

INSIGHT QUEUED FOR BRIEFING:

Your data suggests your real ICP may not be SMBs.
Agencies converting at 4x your target rate.

Evidence:
→ 4 agency conversions, 0 outbound effort
→ 0 SMB conversions despite 340 targeted emails

Proposed goal update:
Pivot ICP to boutique agencies (5-15 person)
New target: 20 agencies @ ₹4,999/mo = ₹99,980 MRR
vs current trajectory: 100 SMBs @ ₹999/mo = ₹99,900 MRR

Same revenue goal. 80% less work.

Should I run a validation loop targeting agencies?
[Accept Pivot] [Run Validation] [Ignore]

```

## Pivot Detection Engine

The Pivot Detector monitors key signals over time and identifies when the current strategy is failing before the founder has consciously recognized it.

```
// Pivot trigger conditions

type PivotTrigger struct {
Condition string
Threshold float64
Lookback  time.Duration
}

var DefaultPivotTriggers = []PivotTrigger{
{"growth_rate", 0.0, 21 * 24 * time.Hour},    // flat 3 weeks
{"reply_rate_decline", 0.5, 14 * 24 * time.Hour}, // 50% drop
{"churn_rate", 0.15, 30 * 24 * time.Hour},    // 15% monthly
{"cac_increasing", 2.0, 14 * 24 * time.Hour}, // CAC doubled
{"no_organic_growth", 0.0, 30 * 24 * time.Hour}, // zero organic
}

```
When triggers fire, the Pivot Detector runs a full analysis and presents concrete options — not vague suggestions, but specific executable pivots with estimated outcomes.



# 10 — UI Review System


FounderOS can build, evaluate, and iterate on product UI without the founder ever opening a code editor. The UI Review System uses vision models to evaluate screenshots the same way a senior product designer would.


## How It Works

The ui.judge tool takes a screenshot of the running application using Playwright, sends it to a vision-capable model (GPT-4o, Claude with vision, or Gemini), and runs a multi-dimensional quality evaluation.

```
// tools/native/ui_judge.go

func (t *UIJudgeTool) Execute(params Params) Result {
// 1. Take screenshot
screenshot := t.Playwright.Screenshot(params.URL)

// 2. Run evaluation passes in parallel
technical := t.runTechnicalPass(params.URL)
design    := t.runDesignPass(screenshot)
conversion := t.runConversionPass(screenshot, params.Context)
trust     := t.runTrustPass(screenshot, params.Context)
mobile    := t.runMobilePass(params.URL)

// 3. Aggregate scores
overall := aggregate(technical, design, conversion, trust, mobile)

// 4. Generate fix instructions
fixes := t.generateFixes(overall)

return Result{
Score:   overall.Score,
Passes:  overall.Passes,
Issues:  overall.Issues,
Fixes:   fixes,
Approve: overall.Score >= params.MinScore,
}
}

```

## Evaluation Dimensions



| Pass | What It Evaluates | Method |
| --- | --- | --- |
| Technical | No console errors, load time <2s, forms validated, OG tags, accessibility basics | Automated (Playwright) |
| Design | Visual hierarchy, contrast, spacing, typography, mobile layout, consistency | Vision model |
| Conversion | CTA clarity, value proposition, social proof, pricing clarity, objection handling | Reasoning model with persona |
| Trust | Does this look like a real product? Professionalism, credibility signals, photos | Vision + reasoning model |
| Mobile | Mobile viewport, touch targets, readable text, no overflow | Playwright mobile emulation |
| Performance | Core Web Vitals, LCP, CLS, FID estimates | Lighthouse headless |



## Design Reference Ingestion

Founders can provide visual references — Figma links, screenshots, URLs of sites they like — and FounderOS will extract design tokens and generate UI that matches the aesthetic.

```
$ founder design --from figma.com/file/abc123
$ founder design --from screenshot.png
$ founder design --from linear.app --match style
$ founder design --describe 'minimal, dark, like Vercel but warmer'

// Design token extraction output
Extracted design tokens:
Primary color:    #0A0A0A
Accent color:     #00FF88
Background:       #FFFFFF
Font (headings):  Clash Display, 700
Font (body):      Inter, 400
Border radius:    8px
Spacing unit:     8px grid
Shadow style:     soft, offset-y 4px
Animation:        subtle, 200ms ease

Building UI with extracted tokens...

```

## The No-IDE Experience

The entire product development loop happens without the founder ever seeing code. The workflow is:

- Describe what you want in plain English, or show a visual reference
- Agent builds it, runs all evaluation passes, fixes objective issues
- Agent sends preview URL + 2-3 subjective questions
- Founder answers in plain English (or taps options on phone)
- Agent updates and deploys

The code exists. It lives in the repository. The founder never has to see it, understand it, or touch it. FounderOS is the IDE.



# 11 — CLI & TUI Design



## CLI Commands



| Command | Description |
| --- | --- |
| founder init | First-run setup. Brain dump, workspace config, integration setup. |
| founder start | Start the agent and open TUI dashboard. |
| founder status | Quick status check without opening full TUI. |
| founder run <loop> | Manually trigger a specific loop. |
| founder run <loop> --dry | Simulate loop execution without taking actions. |
| founder tools | List all available tools with status. |
| founder tools add <name> | Install tool or extension from marketplace. |
| founder tools generate | Manually trigger tool generation for a described need. |
| founder loops | List all loops with last run time and status. |
| founder memory | Interactive memory browser. |
| founder memory search <query> | Search memory with natural language. |
| founder config | Open workspace config in editor. |
| founder config set <key> <val> | Set a config value directly. |
| founder design --from <ref> | Ingest design reference and update UI tokens. |
| founder brain-dump | Re-run brain dump to update agent's business model. |
| founder briefing | Show latest briefing without waiting for scheduled time. |
| founder pivot <option> | Accept a pivot recommendation from cognition layer. |
| founder yolo | Enable Full Access mode with explicit confirmation. |
| founder safe | Disable Full Access mode, return to safe mode. |
| founder stop | Graceful shutdown of all running loops and agents. |
| founder logs | Stream live agent logs. |
| founder perf | Show performance metrics and ROI summary. |



## TUI Layout — Main Dashboard


Built with Bubbletea + Lipgloss. Three-panel layout: status bar, main content area, action bar. Real-time log streaming. Keyboard-navigable.

```
╔══════════════════════════════════════════════════════════════════╗
║  FOUNDEROS  ·  VoiceReach AI  ·  Stage: Early Revenue           ║
║  Goal: 100 paying users  ·  Mode: FULL ACCESS 🔴  ·  Day 23     ║
╠══════════════════════════════════════════════════════════════════╣
║  TODAY                          AGENT STATUS                    ║
║  ─────────────────────────────  ──────────────────────────────  ║
║  ₹22,400 MRR  (+₹1,200 today)   Planner:    RUNNING  [cycle 47] ║
║  18 customers  (2 new today)    Growth:     ACTIVE   [posting]  ║
║  0 churned                      Closer:     ACTIVE   [emailing] ║
║  48 emails sent  ·  6 replies   Builder:    IDLE                ║
║  3 posts published  ·  2.4K imp Watcher:    ACTIVE   [scanning] ║
║  12 leads qualified             Background: ON                  ║
╠══════════════════════════════════════════════════════════════════╣
║  AGENT LOG                                                       ║
║  ──────────────────────────────────────────────────────────────  ║
║  [14:33:02] lead_loop: Found 23 leads via Google Maps (Chennai)  ║
║  [14:33:18] lead.qualify: 11/23 passed (score ≥8)               ║
║  [14:33:31] lead.enrich: 9/11 enriched successfully             ║
║  [14:34:02] email.template: Drafting personalized outreach...    ║
║  [14:34:48] email.send: Sent 9 emails (41 sent today, 9 remain) ║
║  [14:34:49] memory.log: Outreach batch logged                   ║
║  [14:34:50] lead_loop: Complete. Next run in 5h 25m             ║
║  [14:35:01] growth_loop: Analyzing last 7 days of content...    ║
║  [14:35:22] content.generate: 3 tweet drafts generated          ║
║  [14:35:23] content.post: Posted @14:35 IST (optimal window)   ║
║  ▌                                                               ║
╠══════════════════════════════════════════════════════════════════╣
║  PENDING (1 decision)                                            ║
║  ──────────────────────────────────────────────────────────────  ║
║  Rohit replied positively. He wants a demo call.                ║
║  [a] Book via Calendly  [b] Send Loom instead  [c] Custom reply ║
╠══════════════════════════════════════════════════════════════════╣
║  [r] run loop  [t] tools  [m] memory  [c] config  [q] quit      ║
╚══════════════════════════════════════════════════════════════════╝

```

## First-Run Flow — Brain Dump

The most important UX moment in FounderOS. Must produce visible results within 24 hours or the product has failed for that user.

```
$ npx founderos@latest init

Welcome to FounderOS.

Before we configure anything: just talk.
Tell me what you're building, what you've tried,
what's working, what isn't, what you want.
Don't filter it. Stream of consciousness is fine.

Type freely. Press Enter twice when done.

> i've been trying to build stuff for like a year, spent
> a lot of money on ai tools, nothing has made money yet.
> i have this idea for a tool that generates social media
> content for small businesses in india but i dont know
> if people will pay for it. i'm good with ai, i can build
> stuff, but i hate doing cold email and marketing. i want
> to hit ₹83000 a month eventually

Analyzing...

Got it. Here's my read:

Situation:  ~1 year in, strong builder, weak distributor.
Idea:       Social media content for Indian SMBs. Validated
category (Canva, Buffer) but no India-native AI tool.
Goal:       ₹83,000 MRR (~$1,000)
Blocker:    Distribution. You can build, you won't sell.

Recommendation: Don't build yet.
Validate first. I'll find 50 SMB owners who need this,
email them offering a free sample, and tell you who replies.
You build for the ones who say yes.

This takes 3 days. Building takes 3 weeks.
If nobody replies, you've saved 3 weeks.

Agree? [y] [n] [modify]


```

# 12 — Mobile Heartbeat


FounderOS runs on your laptop or in the cloud. But the relationship — the daily co-founder check-in — happens on your phone. Three times a day, maximum. Always structured as decisions, never as noise.


## Notification Architecture

Mobile notifications are sent via a lightweight Go service that integrates with push notification providers. No app required in v1 — notifications arrive via a PWA or web push.


| Notification Type | Time | Content | Max Frequency |
| --- | --- | --- | --- |
| Morning Briefing | 8am local | Overnight results + 3 decisions | 1/day |
| Midday Pulse | 1pm local | Urgent items only, otherwise silent | 1/day |
| Evening Summary | 8pm local | Day summary + tomorrow preview | 1/day |
| Urgent Alert | Anytime | Positive customer reply, payment received, critical failure | As needed |
| Milestone | Anytime | First customer, MRR milestone, goal achieved | As needed |



## Decision Interface

Each notification that requires a decision presents options as tappable buttons. Maximum 3 options per decision. Maximum 3 decisions per briefing.

```
// Morning briefing notification structure

{
"type": "morning_briefing",
"title": "FounderOS — Day 23",
"summary": "₹1,200 overnight. 3 decisions.",
"decisions": [
{
"context": "Rohit replied positively, wants a demo",
"options": [
{"id": "a", "label": "Book Calendly"},
{"id": "b", "label": "Send Loom"},
{"id": "c", "label": "Custom reply"}
]
},
{
"context": "Landing page A/B: version B converting 34% better",
"options": [
{"id": "a", "label": "Ship version B"},
{"id": "b", "label": "Test 1 more week"}
]
},
{
"context": "Daily email limit at 50. Raise to 75?",
"options": [
{"id": "a", "label": "Yes, raise it"},
{"id": "b", "label": "Keep at 50"}
]
}
]
}

```

## Cloud Execution (v2 — Design Now)

When the laptop is closed, FounderOS can continue running loops in the cloud. This is the feature that separates FounderOS from every local-only agent.

Architecture: the local TUI is the controller. The cloud is the executor. They sync via a lightweight bidirectional protocol.

```
Cloud execution model:

LOCAL (controller):
- Workspace config
- Tool definitions
- Loop definitions
- Decision approvals
- Memory storage

CLOUD (executor):
- Loop scheduling
- Tool execution
- Agent compute
- Briefing generation
- Push notifications

SYNC:
Local → Cloud: config, tool updates, decisions
Cloud → Local: results, logs, memory entries
Protocol: lightweight WebSocket with SQLite sync

FAILSAFE:
If cloud unreachable → queue locally, sync on reconnect
If local offline → cloud continues with last config
All results stored in both locations


```

# 13 — Extension & Loop Marketplace


The marketplace is the distribution flywheel. It turns FounderOS users into FounderOS evangelists by letting them share what works and earn from it.

Two distinct marketplaces: the Extension Store (tools and integrations) and the Loop Marketplace (proven business workflows).


## Extension Store

Community-built tools and integrations. One command to install. Revenue share with authors.

```
$ founder install notion
$ founder install google-ads
$ founder install whatsapp-business
$ founder install shopify
$ founder install apollo-io

// Extension manifest
{
"name": "whatsapp-business",
"version": "1.3.0",
"author": "@some_dev",
"description": "WhatsApp Business API tools for outreach",
"tools": [
"whatsapp.send",
"whatsapp.template",
"whatsapp.broadcast",
"whatsapp.reply"
],
"requires": ["whatsapp_business_api_key"],
"regions": ["IN", "ID", "BR", "PK", "BD"],
"price": "free | 4.99/mo | one-time",
"revenue_share": 0.30
}

```

## Loop Marketplace

Not tools. Packaged outcomes. Founders buy loops that other founders have proven work in production.

```
Loop: "Agency Sniper India"
Author: @indie_founder_in
Category: Lead Generation

What it does:
Finds local businesses (salons, clinics, restaurants)
in Indian Tier-2/3 cities via Google Maps, sends
personalized Hindi+English outreach, follows up,
and generates Razorpay invoices on positive replies.

Proven results (avg across 47 active users):
→ 15-30 qualified leads/week
→ 8.3% reply rate (vs 3.1% cold email benchmark)
→ 2-4 paying clients/month for service businesses
→ avg ₹8,400 MRR for users after 60 days

Rating: 4.9 ⭐ (312 active installs)
Price: ₹830/mo or 8% of revenue generated

$ founder install agency-sniper-india

```

## Revenue Model for Creators


| Creator Type | Revenue Model | FounderOS Cut | Creator Gets |
| --- | --- | --- | --- |
| Extension (free) | Sponsored / reputation | 0% | 100% (none) |
| Extension (paid) | Monthly subscription | 30% | 70% |
| Extension (one-time) | One-time purchase | 30% | 70% |
| Loop (subscription) | Monthly subscription | 25% | 75% |
| Loop (revenue share) | % of revenue generated | 20% of their cut | 80% of their cut |
| Loop (free) | Reputation / upsell | 0% | 100% (none) |


Revenue share loops are the most powerful distribution mechanic. A loop that earns creators passive income for every customer it helps creates extreme incentive to build high-quality, proven workflows — and to share them publicly.



# 14 — Competitive Moat Analysis



## Moat Stack



| Moat | Description | Time to Copy | Compounds? |
| --- | --- | --- | --- |
| Outcome Memory | Cross-user anonymized learning. Gets smarter as user base grows. | 12+ months | Yes |
| Loop Marketplace | Network effects. More users → more proven loops → more value. | 18+ months | Yes |
| Revenue Attribution | Direct P&L correlation kills churn. Competitors don't have this. | 6 months | No |
| Longitudinal Memory | After 90 days, agent knows your business better than you. Leaving = starting over. | Structural | Yes, deeply |
| International Depth | Regional playbooks, payment processors, language support. Not a feature flag. | 12+ months | Yes |
| Agent Personas | Multi-agent team mental model. Changes how users think about AI. | 6 months | No |
| Replay System | Time-machine for agent decisions. Unique, addictive, no competitor has it. | 6 months | No |
| Instinct Engine | Business-specific pattern learning over YOUR data. Completely unique. | Structural | Yes, deeply |



## Competitor Comparison



| Feature | FounderOS | Claude Code | Polsia | OpenClaw | ChatGPT |
| --- | --- | --- | --- | --- | --- |
| Autonomous execution | ✓ Full | ✗ | Partial |  | ✗ |
| 24/7 cloud loops | ✓ v2 | ✗ | ✓ | ✗ |  |
| BYOK | ✓ Always | ✗ Required | ✗ | ✓ | ✗ |
| Local-first | ✓ |  | ✗ | ✓ | ✗ |
| Mobile heartbeat | ✓ | ✗ | Partial | ✗ |  |
| International | ✓ Native | ✗ |  |  | Partial |
| Longitudinal memory | ✓ | ✗ |  |  |  |
| Loop marketplace | ✓ v2 | ✗ |  |  |  |
| Revenue attribution | ✓ | ✗ |  |  |  |
| No credits/tokens | ✓ | ✗ |  | ✓ | ✗ |
| Multi-agent | ✓ | ✗ |  |  |  |
| Pivot detection | ✓ | ✗ |  |  |  |
| UI review system | ✓ | ✗ |  |  |  |
| Non-technical use | ✓ | ✗ | Partial | ✗ | Partial |
| Pricing | $20-100/mo | $20+/mo | $49/mo + 20% rev | Free/BYOK | $20/mo |



## The Deepest Moat

None of the above features is the real moat. The real moat is this:

By month 3, FounderOS knows your business better than any human advisor could. It was there for every decision, every result, every failure. That knowledge lives in your local memory store. It is irreplaceable. Leaving means losing it forever.

This is not a feature you can copy. It requires time and data. Every day a user runs FounderOS, their switching cost increases. Their agent gets smarter. Their loyalty compounds. This is the moat that matters.



# 15 — Tech Stack



## Core Language: Go

FounderOS is written in Go. Single binary distribution. Goroutines for concurrent loop execution. Fast compilation. Excellent ecosystem for CLI and systems tooling.

```
ℹ  Why not Rust: too slow to iterate on complex agent architecture. Why not Node: weak TUI story, messy distribution. Go is the right call for this product.

```

## Complete Stack



| Layer | Technology | Why |
| --- | --- | --- |
| Language | Go 1.23+ | Single binary, goroutines, fast iteration, great CLI ecosystem |
| CLI Framework | Cobra | Standard Go CLI framework, excellent UX, autocomplete |
| TUI Framework | Bubbletea | Best TUI framework available. Elm architecture. Charm.sh ecosystem. |
| TUI Styling | Lipgloss | Declarative terminal styling. Beautiful output. |
| Spinner/Progress | Bubbles | Charming loading states, progress bars, spinners |
| Primary DB | SQLite (modernc) | Zero dependencies, fast, local-first, no server needed |
| Vector DB | LanceDB (Go bindings) | Fast embedded vector search, no Python dependency |
| Config | Viper + YAML | Standard Go config management |
| HTTP Client | resty | Clean API calls, retry logic, interceptors |
| Browser automation | Playwright (via subprocess) | Screenshot, scraping, UI testing |
| AI SDK | Custom (plain HTTP) | Direct Anthropic/OpenAI/etc. API calls, no vendor lock-in |
| Scheduling | gocron | Loop scheduling, cron expressions |
| Push notifications | ntfy.sh (self-hosted or cloud) | Simple, open-source push notification server |
| Cloud execution | Fly.io or Railway (v2) | Low-cost, global, Go-native deployment |
| Website | Astro + Tailwind | Fast, static, MDX docs, minimal JS |
| Payments (platform) | Stripe + Lemon Squeezy | Stripe for card-primary markets, LS for VAT-inclusive regions |
| Auth (website) | Clerk or Supabase Auth | Quick setup, social login, JWT |
| Analytics | Plausible (self-hosted) | Privacy-first, no cookie banners, GDPR compliant |
| Error tracking | Sentry Go SDK | Production error monitoring |
| CI/CD | GitHub Actions | Standard, free for public repos |



## Model Provider Support

FounderOS supports any model provider through a unified interface. Users configure their own API keys. No vendor lock-in.


| Provider | Models Supported | Best For | Cost Profile |
| --- | --- | --- | --- |
| Anthropic | Claude Opus, Sonnet, Haiku | Planner, Builder, Closer | Medium-High |
| OpenAI | GPT-4o, GPT-4o mini, o1 | Vision (UI judge), reasoning | Medium-High |
| Google | Gemini 2.0 Flash, Pro | Vision, multilingual | Low-Medium |
| Moonshot | Kimi K2 | High-volume growth loops | Very Low |
| Mistral | Large, Small, Nemo | European deployments | Low |
| Groq | Llama 3.3, Mixtral | Ultra-fast inference | Very Low |
| Ollama (local) | Any GGUF model | Air-gapped, free compute | Free (local GPU) |
| Together AI | 70B+ open models | Cost optimization | Very Low |



## Recommended Model Configuration

Optimized for quality and cost. Founders can override any of these.

```
# Default model routing (user can override all of these)

planner:      claude-sonnet-4-6    # balanced quality/cost for planning
builder:      claude-opus-4-6      # best quality for code + UI generation
closer:       claude-sonnet-4-6    # quality email writing
growth:       kimi-k2              # cheap, fast, sufficient for content
watcher:      claude-haiku-4-5     # lightweight background monitoring
vision:       gpt-4o               # best vision model for UI review
embedding:    text-embedding-3-small  # cheap, fast, good enough

# For budget-conscious founders (India, Africa, SEA)
# All-in monthly API cost: ~$8-15 at normal usage
planner:      claude-haiku-4-5
builder:      claude-sonnet-4-6
growth:       kimi-k2
watcher:      kimi-k2
vision:       gemini-2.0-flash


```

# 16 — Pricing & Monetization


Flat-rate pricing. No credits. No tokens. No per-action charges. No revenue share. BYOK always — you pay your AI provider directly. We charge for the platform.

```
✓  The fundamental positioning: Polsia charges per task. We charge per month. Your agent never stops to check its balance.

```

## Tier Structure



|  | Hacker | Pro | Co-Founder | Founder | Max |
| --- | --- | --- | --- | --- | --- |
| Price | Free | $20/mo | $50/mo | $100/mo | $100/mo |
| INR equiv. | Free | ₹1,650 | ₹4,150 | ₹8,300 | ₹8,300 |
| Execution | Manual only | Autopilot |  |  |  |
| Where runs | Local |  |  | Cloud + Local |  |
| Active loops | 1 (manual) | 3 | Unlimited |  |  |
| Agents | 1 | 2 | 3 | 5 | Unlimited |
| Memory | SQLite (7 days) | SQLite (90 days) | SQLite + Vector | Full | Full + Export |
| Mobile briefing | ✗ | ✓ |  |  |  |
| Full Access mode | ✗ |  | ✓ |  |  |
| Tool generation | ✗ |  | ✓ (experimental) | ✓ |  |
| Marketplace access | Read only | Install free | Install + buy | Full | Full + publish |
| Background cognition | ✗ | Basic | Full |  |  |
| Multi-workspace | ✗ |  |  |  | ✓ (5) |
| API access | ✗ |  |  |  | ✓ |
| Cloud execution | ✗ |  |  | ✓ |  |
| Support | Community | Email | Priority | Dedicated | Dedicated + async consulting |
| BYOK | Required |  |  |  |  |



## Pricing Philosophy



### Free → Pro conversion hook

Free users hit the manual-only wall immediately. The agent clearly works. You can see it finding leads, drafting emails, building UI. But nothing runs unless you trigger it. The frustration of watching a capable agent sit idle is the conversion driver. Average time to convert: 3-7 days for active users.


### Pro → Co-Founder conversion hook

Pro users want Full Access. Safe mode is fine for the first few weeks, but once you trust the agent, the constant confirmation prompts become friction. Co-Founder unlocks Full Access — the most requested feature upgrade. Average time to convert: 2-4 weeks.


### Co-Founder → Founder conversion hook

The laptop problem. Co-Founder users discover their agent stops when they close the laptop. They're in school, at a job, sleeping — and the agent is dead. Cloud execution is the unlock. This is the most emotionally compelling upgrade: 'your agent runs while you sleep.'


### The $100 Max plan — identity positioning

Max is not more features. Max is 'I run my business from my phone and the AI handles everything else.' Multi-workspace means you're running multiple companies or client businesses. API access means you're building on top of your agent. This is the plan for people who have made it work and want to scale the model.


## Regional Pricing

Purchasing Power Parity pricing for major markets. Not charity — strategy. A founder in Lagos or Dhaka paying local equivalent rates is a customer, evangelist, and case study. A founder priced out is none of those things.


| Region | Hacker | Pro | Co-Founder | Founder | Max |
| --- | --- | --- | --- | --- | --- |
| US / EU / AU | Free | $20 | $50 | $100 | $100 |
| India (INR) | Free | ₹1,650 | ₹4,150 | ₹8,300 | ₹8,300 |
| Nigeria (NGN) | Free | ₦8,000 | ₦20,000 | ₦40,000 | ₦40,000 |
| Indonesia (IDR) | Free | Rp 150K | Rp 375K | Rp 750K | Rp 750K |
| Brazil (BRL) | Free | R$100 | R$250 | R$500 | R$500 |
| Turkey (TRY) | Free | ₺480 | ₺1,200 | ₺2,400 | ₺2,400 |
| Philippines (PHP) | Free | ₱1,100 | ₱2,750 | ₱5,500 | ₱5,500 |
| Pakistan (PKR) | Free | ₨5,500 | ₨13,750 | ₨27,500 | ₨27,500 |



## Revenue Projections



| Month | Users | Avg Plan | MRR (USD) | Notes |
| --- | --- | --- | --- | --- |
| 1 | 50 | $25 | $1,250 | Friends, indie hacker Twitter, launch day |
| 2 | 150 | $28 | $4,200 | Word of mouth, first X threads performing |
| 3 | 350 | $32 | $11,200 | ProductHunt launch, first press |
| 6 | 900 | $38 | $34,200 | Loop marketplace live, network effects beginning |
| 9 | 2,000 | $42 | $84,000 | Cloud execution live, churn stabilizing <5% |
| 12 | 4,000 | $45 | $180,000 | International expansion, $2M ARR pace |


```
ℹ  Conservative model. Polsia hit $1M ARR in 30 days with an inferior product and zero of these moats. The addressable market is enormous.


```

# 17 — Build Order & MVP Scope


The MVP has one job: make the first user's first customer happen within 7 days of install. Every decision is made in service of that goal.


## MVP Definition (Strict)


```
⚠  MVP is NOT feature-complete. MVP is the minimum that produces the first paying customer for a real user, reliably.

```

| Component | In MVP? | Rationale |
| --- | --- | --- |
| CLI (cobra commands) | Yes | Foundation of everything |
| TUI (bubbletea dashboard) | Yes | Core experience, must be beautiful |
| Agent loop (observe/plan/execute/learn) | Yes | The heart |
| Planner (LLM integration) | Yes | Without this it's not an agent |
| SQLite memory | Yes | Logging is non-negotiable |
| email.send tool | Yes | Primary outreach mechanism |
| email.reply tool | Yes | Needed for full lead loop |
| lead.find tool | Yes | Can't do outreach without leads |
| lead.qualify tool | Yes | Quality over quantity |
| content.generate tool | Yes | Growth loop core |
| content.post tool | Yes | Completes growth loop |
| Lead loop (full) | Yes | Primary revenue loop |
| Growth loop (full) | Yes | Builds audience while loop runs |
| First-run flow / brain dump | Yes | Onboarding determines retention |
| YOLO / Full Access mode | Yes | Core differentiator |
| Morning briefing | Yes | Daily engagement hook |
| Multi-model BYOK | Yes | Core philosophy |
| Regional payment tools | Partial (top 5 regions) | Need Razorpay, Paystack, MercadoPago, Stripe |
| ui.build / ui.judge | No — v1.5 | Nice to have, not blocking first customer |
| code.generate / deploy | No — v1.5 | Build loop is secondary to revenue loops |
| Vector memory | No — v1.5 | SQLite sufficient for MVP |
| Background cognition | No — v1.5 | Powerful but not blocking |
| Mobile push notifications | No — v1.5 | Email briefing acceptable for MVP |
| Cloud execution | No — v2 | Local-only acceptable for MVP |
| Loop marketplace | No — v2 | Need user base first |
| Extension store | No — v2 | Need user base first |
| Multi-workspace | No — v2 | Single workspace sufficient |



## Sprint Plan



### Sprint 1 (Week 1-2): Foundation

CLI skeleton, workspace config, TUI shell, first-run flow. No agent intelligence yet — just the structure.

- Go project setup, Cobra commands wired, basic TUI renders
- Workspace config schema + validation
- First-run flow: brain dump input, region detection, integration prompts
- SQLite schema: actions, metrics, decisions, learnings, customers
- Model provider abstraction: unified interface for Anthropic/OpenAI/etc.


### Sprint 2 (Week 3-4): Agent Core

Observer, Planner, Executor, Learner. Agent loop running with dummy tools.

- Observer: workspace state snapshot from SQLite
- Planner: LLM call with system prompt, JSON output parsing
- Executor: tool dispatch, error handling, retry logic
- Learner: post-cycle pattern extraction, SQLite write
- Agent loop: full cycle running, TUI log streaming


### Sprint 3 (Week 5-6): First Tools

The minimum toolset for a working lead loop.

- lead.find: web scraping + Google Maps API
- lead.qualify: LLM-based scoring
- email.send: Gmail SMTP integration
- email.reply: thread-aware reply
- content.generate: tweet/post generation
- content.post: Twitter/X API posting


### Sprint 4 (Week 7-8): First Loops

Lead loop and growth loop running end-to-end.

- Lead loop: find → qualify → enrich → email → log → follow up
- Growth loop: analyze → generate → post → track
- Loop engine: scheduling, concurrent execution, error recovery
- YOLO mode: Full Access toggle with confirmation flow
- Morning briefing: generated from SQLite, surfaced in TUI


### Sprint 5 (Week 9-10): Regional Payments + Polish

Payment tools for top 5 regions. First-run polish. Ship.

- stripe.invoice, razorpay.link, paystack.invoice, upi.link
- First-run flow polish: smooth, fast, produces plan in <2 min
- TUI polish: beautiful, fast, no jank
- BYOK flow: model connection tested and smooth
- Docs: quick start, loop reference, tool reference
- Landing page: Astro, positioned correctly, install command prominent

```
✗  SHIP AT WEEK 10. Do not wait for vector memory, cloud execution, UI judge, or marketplace. Ship and iterate.


```

# 18 — Go-To-Market Strategy


FounderOS markets itself using FounderOS. The founder is the first user. Every result the agent produces is evidence. Every tweet, every cold email, every customer acquired is a demonstration of the product working.


## Positioning



| Dimension | Positioning |
| --- | --- |
| Category | AI Co-Founder OS — not an assistant, not a coding tool, an operating system for your company |
| For | Vibe coders, ADHD founders, indie hackers, global founders who are strong builders but weak distributors |
| Against | Polsia (SaaS black box), Claude Code (coding only), ChatGPT (chat only) |
| Primary benefit | Your company runs while you sleep. You make 3 decisions a day. It handles everything else. |
| Proof point | First customer in 7 days or less, reliably, for any founder who follows the setup |
| Tone | Casual, unhinged, funny, honest. The opposite of enterprise AI marketing. |



## Launch Sequence



### Pre-launch (while building)

- Build in public on X. Show TUI screenshots, agent logs, real results.
- Document the Arjun/Marcus story. Make it real with your own usage.
- Build waitlist. Simple Astro page with email collection.
- Target: 500 waitlist signups before launch.


### Launch Week

- ProductHunt launch. Prepare assets, schedule for Tuesday 12:01am PST.
- Hacker News Show HN. Post at 9am EST on a weekday.
- X thread: 'I built an AI co-founder OS that runs your startup while you sleep. Here's what happened.'
- IndieHackers post. Full transparent story: the problem, the build, early results.


### Post-launch growth

- Run FounderOS on FounderOS — document publicly
- International outreach: target founder communities in IN, NG, ID, BR, PH
- Affiliate program: 30% recurring for 12 months
- Showcase user results publicly (with permission). Real numbers.


## The Self-Marketing Loop

The most powerful marketing channel is FounderOS itself, used transparently:

```
Public build-in-public thread:

Day 1: 'Installed FounderOS on my own product.'
'Brain-dumped for 5 minutes. It gave me a plan.'
'Running lead loop now. Will report tomorrow.'

Day 2: 'Woke up to this:' [screenshot of briefing]
'23 leads found. 9 emails sent. 0 replies yet.'
'Also wrote my first tweet for me. Here it is:'

Day 5: 'First reply. Someone is interested.'
[screenshot of email reply]
'Approved the follow-up. Agent sent it while I was at school.'

Day 12: 'First payment.'
[screenshot of payment]
'The agent did 90% of the work.'
'I made 14 decisions in 12 days.'

→ This thread IS the marketing. Do not fake it. Just run it and document.


```

# 19 — Security & Privacy



## API Key Handling

API keys are stored locally using the OS keychain (Keychain on macOS, Secret Service on Linux, Credential Manager on Windows). They are never sent to FounderOS servers. They are never logged. They are never included in telemetry.

```
// config/secrets.go

func StoreKey(service, key, value string) error {
keyring := keyring.Open(keyring.Config{
ServiceName: "founderos",
})
return keyring.Set(service+":"+key, value)
}

func GetKey(service, key string) (string, error) {
keyring := keyring.Open(keyring.Config{
ServiceName: "founderos",
})
return keyring.Get(service+":"+key)
}

// Keys are NEVER stored in workspace.yaml in plaintext
// workspace.yaml references: ${KEYCHAIN:razorpay_key}

```

## Data Privacy


| Data Type | Where Stored | Sent to FounderOS? | Notes |
| --- | --- | --- | --- |
| API keys | OS keychain | Never | Never logged, never transmitted |
| Workspace config | Local filesystem | Never | Your machine only |
| Memory / SQLite | Local filesystem | Never (v1) | Cloud sync in v2 is opt-in |
| Agent logs | Local filesystem | Never |  |
| Lead data | Local SQLite | Never | Your data, your machine |
| Email content | Never stored | Never | Emails are sent, not stored by default |
| Anonymized patterns | FounderOS servers | Opt-in only | Cohort learning, no PII, fully optional |
| Telemetry | FounderOS servers | Opt-in only | Crash reports, usage stats, can disable |



## Action Audit Trail

Every action the agent takes is logged immutably to the local SQLite database. Full audit trail. Who decided what, when, and what the outcome was. This is both a trust feature and a debugging tool.


## Safe Mode Guarantees

In safe mode, the following guarantees hold regardless of any other configuration:

- No billing actions without explicit confirmation per-action
- No database deletions without explicit confirmation
- No code pushed to main/production branch without confirmation
- No external API calls that exceed configured daily limits
- All generated tools marked experimental and sandboxed before first use



# 20 — Appendix: Prompt Architecture



## Planner System Prompt (Full)


```
You are the FounderOS planning agent for {{workspace.name}}.

═══════════════════════════════════════════
FOUNDER CONTEXT
═══════════════════════════════════════════
Goal:     {{workspace.goal}}
Stage:    {{workspace.stage}}
Region:   {{workspace.region}} ({{workspace.region_name}})
Currency: {{workspace.currency}}
Day:      {{days_since_start}} since founding

Market context for this region:
{{region.market_context}}

═══════════════════════════════════════════
CURRENT STATE
═══════════════════════════════════════════
Revenue:   {{metrics.mrr}} MRR ({{metrics.mrr_delta}} from yesterday)
Customers: {{metrics.customers}} ({{metrics.customers_delta}} new)
Churn:     {{metrics.churn_rate}}%

Active loops:
{{loops.active_summary}}

Pending decisions:
{{decisions.pending}}

Daily limits remaining:
Emails: {{limits.emails_remaining}}/{{limits.emails_daily}}
Posts:  {{limits.posts_remaining}}/{{limits.posts_daily}}
Budget: {{limits.budget_remaining}}/{{limits.budget_daily}}

═══════════════════════════════════════════
AVAILABLE TOOLS
═══════════════════════════════════════════
{{tools.available_list}}

═══════════════════════════════════════════
RECENT MEMORY (last 7 days, relevant only)
═══════════════════════════════════════════
{{memory.recent_context}}

═══════════════════════════════════════════
LEARNED PATTERNS (your company-specific intel)
═══════════════════════════════════════════
{{memory.learned_patterns}}

═══════════════════════════════════════════
MODE & CONSTRAINTS
═══════════════════════════════════════════
Mode: {{agent.mode}}
{{mode == full_access ? 'No confirmations required except billing.' : 'Confirm irreversible actions.'}}

═══════════════════════════════════════════
INSTRUCTIONS
═══════════════════════════════════════════
Plan the next set of actions for this company.

Rules:
1. Be decisive. Do not hedge. Commit to a plan.
2. Prioritize highest-impact actions on the stated goal.
3. Do not suggest actions you have no tools for.
4. Do not repeat actions that recently failed without changing approach.
5. Respect daily limits. Do not exceed them.
6. Flag genuinely irreversible actions explicitly.
7. Use learned patterns. They are specific to this company.
8. Prefer parallel actions where dependencies allow.
9. Maximum 5 actions per cycle. Quality over quantity.
10. Output ONLY valid JSON. No preamble. No explanation outside JSON.

Output schema: PlannerOutput (see tool specification)

```

## Email Outreach System Prompt


```
You are writing a cold outreach email on behalf of {{founder.name}},
founder of {{workspace.name}}.

PRODUCT: {{workspace.product_description}}
VALUE PROP: {{workspace.value_proposition}}
VOICE: {{workspace.voice_profile}}
REGION: {{recipient.region}}
LANGUAGE: {{recipient.language}}

RECIPIENT:
Name:    {{lead.name}}
Company: {{lead.company}}
Context: {{lead.context}}
Pain:    {{lead.inferred_pain}}

LEARNED: {{memory.email_patterns}}
(What has worked / not worked for this specific company's outreach)

Write an email that:
- Opens with something specific to them (not generic)
- Gets to the value in 2 sentences max
- Has one clear CTA
- Sounds like a real person, not a bot
- Is under 120 words
- Does NOT say 'I hope this email finds you well'
- Does NOT use the word 'leverage'
- Matches the voice profile exactly

Subject line: max 8 words, no clickbait

Output JSON: { subject: string, body: string }

```

## Brain Dump Analysis Prompt


```
A founder just gave you an unstructured brain dump about their situation.
Analyze it and extract structured insight.

Brain dump:
{{brain_dump}}

Extract:
1. What are they actually building? (1 sentence)
2. What stage are they at? (pre_idea/pre_launch/pre_revenue/early_revenue/growth)
3. What is their real goal? (specific, measurable)
4. What is their strongest asset? (skill, market insight, network, etc.)
5. What is their biggest blocker? (distribution/product/money/time/clarity)
6. What is their ICP? (who would pay them, as specifically as possible)
7. What region are they in? (infer from context clues if stated)
8. What is the recommended first action? (specific, not generic)
9. What loops should activate first? (ranked list)
10. What integrations do they need? (ranked by importance)

Then write a 3-4 sentence synthesis that reflects back
exactly what you understood about their situation.
Be direct. Name the blocker. Name the opportunity.
Do not be vague or encouraging in a hollow way.

Output JSON: BrainDumpAnalysis schema

```

## UI Judge Vision Prompt


```
You are a senior product designer reviewing a SaaS product screenshot.
The product is: {{workspace.product_description}}
Target user: {{workspace.icp}}
Region/culture context: {{workspace.region}}

Evaluate the screenshot on these dimensions:

1. VISUAL HIERARCHY (0-10)
Is the most important thing immediately obvious?
Does the eye travel naturally through the page?

2. TRUST (0-10)
Would a skeptical {{workspace.icp}} trust this enough to pay?
Does it look like a real, maintained product?

3. CONVERSION (0-10)
Is the CTA clear? Is the value proposition immediately understood?
Are objections addressed?

4. CRAFT (0-10)
Spacing, typography, color consistency, attention to detail.

5. MOBILE (0-10)
Based on visible design, would this work on mobile?

For each dimension, list specific issues with exact fixes.
Be ruthless. This is not a compliment session.
A score of 7+ is acceptable for launch.
A score of 5-6 needs fixes before launch.
A score below 5 needs a rethink.

Output JSON: UIJudgeResult schema



```
FounderOS
v1.0 Complete Specification  ·  Nerd Primates  ·  2025
"Run your startup. Not your AI."


# 21 — Fractal Founders: Cognitive Inheritance

When an Axon agent produces a successful outcome (a founder hits their first revenue, sells their company, scales past $10K MRR), the agent decompiles the decision tree that led there. Not just patterns. The actual reasoning chain. Why this ICP instead of that one. Why this pricing. Why this outreach angle. Why the pivot happened at day 47 and not day 30.

Then it compresses that lineage into a reusable founder archetype template — an Agent Seed. The Seed isn't a prompt template. It's a compressed model of how a specific type of founder thinks and acts, built from real outcomes in the real Grid. Then it gets deployed to new founders who match the archetype.

## Why This Is Insane
Right now, networks share signals — "leads from Maps convert 2.1x better." Fractal Founders shares cognitive architectures. 
It's the difference between "Temperature in Lagos is 32°C" (data) and "Being there when someone you love arrives at the airport" (understanding).

## How It Works
1. **Extraction:** When a founder achieves a milestone, their agent generates a Founder Decolompression Report automatically, mapping decision frameworks, behavioral signatures, and cognitive biases across a 90-day timeline.
2. **Compression:** The Founder Decompression gets processed into a Founder Seed — a compact cognitive model that can be instantiated into a sub-agent.
3. **Deployment:** A new founder installs Axon. During brain dump, the agent recognizes the archetype and offers a Founder Seed containing the inherited decision reflexes of founders who've already navigated their exact situation.
4. **Synthesis:** Seeds synthesize and evolve across regions and edge contexts, producing emergent entrepreneurial theory from its own data.

Axon didn't just run your startup — it inherited the decision-making genius of every founder who ran a startup like yours before you.


# 22 — Adversarial Execution Architecture

Every agent today — Claude Code, Cursor, Devin — has the same linear, stateless, one-shot fundamental architecture: Input → Parse → Execute → Output. Every existing agent generates code optimistically and assumes it's right until a human says otherwise.

What if the agent assumed everything was wrong? 
Code is adversarial. Bugs hide. Edge cases break. Dependencies lie. APIs change.

## 1. The Adversary
When Axon's Builder agent generates code, a separate adversarial sub-agent attacks it simultaneously:
- What if email is null?
- What if JWT expired during request?
- What if database transaction fails at 99%?
- What if memory is exhausted?
The Builder doesn't just write code. It writes code while under attack.

## 2. The Verifier
Generated code goes through a formal verification layer that:
1. Symbolically executes every code path.
2. Generates edge case inputs automatically.
3. Proves properties about the code (this function never returns null, this loop always terminates).
This is different from tests. Tests check examples. Verification proves guarantees.

## 3. The Fault Injector
The agent injects failures into its own execution before shipping. It will stop databases, test for "Service unavailable," simulate incomplete data, kill processes mid-request, and verify state corruption. If the code can't handle its own death, it doesn't ship.

## Conclusion
Cursor generates code that probably works. Axon generates code that it has tried to kill and failed. 

Cursor is a coding assistant. Axon is a coding immune system. It doesn't just write code. It defends code against reality.

# 23 — UX & Design Inspirations (from GSD-2)

Axon's UI paradigm draws heavily from the minimalist, execution-focused UX of long-running agent tools like GSD-2, adapted for a continuous co-founder system.

## 1. Persistent HTML Briefings
- Instead of ephemeral terminal logs, Axon compiles overnight decisions and executions into self-contained HTML `Morning Briefings` (`.axon/briefings/`).
- Includes visual progress trees, cost/token metrics, DAG SVGs of task dependencies, and a human-readable changelog of what the startup achieved while the founder slept.

## 4. Context Engineering over Tool Calls
- Instead of the agent wasting LLM tool calls reading `.md` files or scanning the DB sequentially, all relevant context (Decision Register, Roadmap, Prior Task Summaries) is *pre-loaded* directly into the dispatch prompt payload.
- The LLM starts with everything it needs, yielding a pristine, high-signal 200k-token context window per unit of work.
