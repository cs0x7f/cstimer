# cstimer-trainer
Type: Cloned Repository
Source: https://github.com/JStaRFilms/cstimer-trainer
Date: 2026-04-02

powershell -ExecutionPolicy Bypass -File .\scripts\serve-local.ps1 -Port 5433

powershell -ExecutionPolicy Bypass -File .\scripts\verify.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\test-trainer-export-roundtrip.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\test-trainer-cloud-sync.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\preview-local.ps1


https://github.com/cs0x7f/cstimer

All right, so here's the thing, right? I used to cube, I mean, I joined a cube bar, yeah. I used to cube back in the day, and I haven't cubed in a long while. And now I want to come back, but I don't want to come back and just start spamming solves. I want to have a structured plan, right? I want to be able to practice algorithms, be able to have like a bunch of stuff added to the CS timer. So CS timer is the timer that we all use globally, and I use, but since I'm a dev, I have the ability to actually work on the code and add new features, right? Recently on CS timer, you have the ability to do like custom, like code and practice modes, right? Under the VCA, you would click, you would say, oh, you want to practice PLLs, you want to practice OLLs, you want to do all these things. But I want to take it one step further. I'm actually building like a trainer into the app, kind of like the data, for example, and the Chinese guys are the ones leading in this whole cubing competition scene right now with the skins, by the way. Now, one thing I, one thing, one hypothesis I have is that, okay, when they teach them how to solve the cube, like, because they're very young, their brains are super refreshed, teach them how to solve the cube, they teach them, okay, this is beginner's method. You make sure that they get that before they start wailing in with time and learning bad habits. They teach them C-forms, C-form immediately. That way, their brains are opened and when they get to the last layer, instead of just teaching them OLL and PLL, they teach them to variants of CB, CBLs, with our variations, some other variations, CULs, and a bunch of things like that. So what I want to see is if I can build the most optimal way for this thing across, because I just have a few cubes, 3x3 and 4x4, and then maybe one-handed. Now another way we can actually get our sources, I know what is actually right, is by looking at YouTube and looking at things that other creators have set up, optimal ways to solve certain things, right? I know that Philip Examdex has a website where he has a bunch of algorithms, which is actually a very great data set. And JFEB has his own with a bunch of finger trips and whatnot. So long story short is that, I don't, now that I've come back cubing, I still remember how to cube, but I want it to be that, oh, maybe I'll have some drills like, oh, do 5 across some solves, right? Then in the middle, It's been fun, bro. It's been fun. So instead of me having to think about that one manually, it just does it. And I just follow the routes and it's like, this goal is training. And to some extent, even though we're not using like an IQV smart cube, we'll be able to say things like, oh, during this kind of cross situations, this is my success rate. Or maybe if we're planning to set target states, we'll be like, oh, anytime we set it up, let's say we are doing a last layer training now, we find out that, oh, APRM is actually a PLM that I'm slowing down a lot with. So the system is able to automatically adjust to maybe give me more APRMs in the whole session to practice with and then give me stats and a bunch of other things like that. Do you understand? So, yeah, what I'm really ranting is, what do you think of this idea? And can you maybe, let's have a bit of back and forth, like a planned mode session, right? And then at the end of everything, we would have this much more concrete plan that I can then give to my AI agents, right? Because I would fork the repo. I'm thinking of either creating a new project entirely, so I'm focusing the repo and making a new project entirely. Not because I don't want to contribute to the main projects that already exist, but just because I feel like they might not merge it. But you know what? We can try. I will do both, right? I would do mine and I would also see if they would agree to this stuff like that. Do you understand what I'm saying? So, yeah.

---

Yes — this is a **very good** idea, and the best version of it is not “another timer.” It is a **training layer on top of csTimer**.

csTimer already gives you the raw ingredients: official and substep scrambles, case-filtered training for things like OLL/PLL/ZBLL, solver tools, split timing, lots of sessions, and even offline/PWA behavior. The repo also has a `src` tree, an `experiment` area, an npm-exported module path, and a “latest/new” deployment flow for testing features before they hit main. That makes it a solid base for adding coaching logic instead of rebuilding timing, scramble generation, and persistence from zero. ([csTimer][1])

And your instinct is right: most people “come back to cubing” by just spamming solves. That works, but it is sloppy. A coach-like system that schedules drills, tracks weak cases, and biases future sessions toward those weak cases would be much closer to how good training should feel. Existing cubing resources already split practice by method stage and case family — for example J Perm exposes separate trainers and alg libraries for OLL, PLL, CLL, Winter Variation, OH algs, and 4x4 last-layer material. ([J Perm][2])

My strong opinion: **forking csTimer for your own version is smart**, but you should still design it so the smallest useful pieces could be upstreamed later. csTimer’s maintainer already ships features gradually via the “latest/new” branch flow, so small modular additions have a better chance than one giant “replace the app with my philosophy” PR. ([GitHub][3])

## What you should build

Not “trainer mode.”

Build **Training OS for cubing** with 3 layers:

### 1. Drill engine

This decides what the user should do next.

Examples:

* 5 normal solves
* 8 PLL drills, weighted toward missed cases
* 6 cross-only solves on white/yellow
* 10 F2L case drills with forced no-rotation
* 4 timed last-layer solves
* parity burst for 4x4
* OH spam block with only specific PLLs

### 2. Skill model

This tracks where the user is actually weak.

For each case or subskill, track things like:

* attempts
* recent avg
* recognition delay
* execution delay
* DNF / major pause rate
* confidence score
* decay over time
* “deserves more reps” weight

This is the sauce. The app stops being a timer and becomes a system that says:

> “You think your PLL is fine. It isn’t. Your A perms are disproportionately bad this week.”

### 3. Session planner

This turns drills into a structured workout.

Example:

* Warmup: 5 normal solves
* Skill block A: weak PLLs
* Skill block B: cross color-neutral reps
* Integration block: full solves
* Review block: hardest 3 cases repeated
* Cooldown: 3 untimed solves focusing lookahead

That is the part that makes your return to cubing feel intentional instead of random.

## The right product direction

You actually have **two possible products** here.

### Path A — csTimer+ Coach

A lightweight enhancement inside csTimer.

Best for:

* quicker shipping
* real users faster
* lower maintenance
* possible upstream contribution

What it adds:

* training plans
* weighted case selection
* weakness stats
* scheduled sessions
* drill queue UI

### Path B — new project using csTimer ideas/data

A cleaner modern app with your own UX.

Best for:

* bigger ambition
* cleaner architecture
* future mobile/native/smart-cube support

You can see this direction in newer cube apps too: kitsune-cube already positions itself around analyzer/trainer ideas, csTimer import, smart cube support, and broader training features. That tells me there is room in the market for “training-first” cubing software, not just timers. ([GitHub][4])

My recommendation:
**Do both, but in order.**

1. Build the engine as a modular layer.
2. Integrate a minimal version into your fork of csTimer.
3. Later extract it into its own prettier product if the idea proves itself.

## Best first target users

Do not target “all cubers.”

Target these 3 first:

* returning cubers like you
* intermediate CFOP solvers stuck in messy plateaus
* 4x4 solvers who need parity/edge-pairing discipline

Why? Because those people benefit most from structure and already know enough to use a trainer seriously.

## What not to do first

Do **not** start with:

* smart cube integrations
* AI-generated algorithm discovery
* full solve video analysis
* “optimal method for all humans”
* trying to encode all Chinese training systems from day one

That is how the project becomes a cool corpse.

Start with something brutally practical:
**“Given the user’s recent solves and selected method, what should they drill next?”**

## Your MVP

If I were scoping v1, I’d make it this:

### v1 features

* Training Plan entity
* Drill Queue entity
* Case performance storage
* Weighted random case selection
* Session templates
* Post-session summary

### v1 supported content

* 3x3 PLL
* 3x3 OLL
* 3x3 cross drills
* 4x4 parity drills
* OH PLL/OLL optional

### v1 user flow

1. User chooses goal:

   * return to cubing
   * improve last layer
   * improve lookahead
   * improve 4x4
2. App creates a weekly plan
3. User starts session
4. App serves drills in sequence
5. Stats update after each attempt
6. Weak cases get promoted automatically
7. End of session shows what got better and what still stinks

That alone is already valuable.

## The data model I’d use

At a product level:

```ts
type SkillKey =
  | "3x3:PLL:Ua"
  | "3x3:PLL:Ab"
  | "3x3:OLL:27"
  | "3x3:CROSS:white"
  | "4x4:PARITY:OLL"
  | "OH:PLL:Jb";

interface SkillStats {
  skillKey: SkillKey;
  attempts: number;
  successRate: number;
  avgMs: number;
  rollingAvgMs: number;
  lastPracticedAt: string;
  confidence: number;      // how sure we are this stat is real
  weaknessScore: number;   // higher = show more often
  recognitionScore?: number;
  executionScore?: number;
}

interface Drill {
  id: string;
  type: "full_solve" | "case_drill" | "cross_drill" | "parity_drill";
  skillKeys: SkillKey[];
  reps: number;
  targetMetric?: "time" | "consistency" | "recognition";
  rules?: Record<string, unknown>;
}

interface TrainingPlan {
  id: string;
  name: string;
  goal: string;
  level: "returning" | "intermediate" | "advanced";
  drills: Drill[];
}
```

And the important function:

```ts
function computeWeaknessScore(stats: SkillStats): number {
  // higher if slow, inconsistent, low confidence, or not practiced recently
  // lower if strong and recently reinforced
}
```

That one function becomes the heart of adaptive practice.

## How the app should think

The planner should not only ask:

> what cases exist?

It should ask:

> what gives the user the most improvement per minute right now?

That means ranking drills by:

* weakness
* frequency in real solves
* transfer value
* boredom penalty
* recency

So if your A perms are bad, but your cross is catastrophic, the system may still decide cross work is the better use of time.

That is the jump from “algorithm trainer” to “coach.”

## A practical first training philosophy

Since you’re returning, I’d structure the actual cubing side like this:

### Phase 1 — rebuild clean fundamentals

* full solves, but low volume
* cross planning
* F2L smoothness
* only re-learn essential last layer cleanly
* 4x4 reduction fundamentals and parity recognition

### Phase 2 — controlled speed

* targeted PLL/OLL drilling
* time-blocked full solves
* split-based sessions
* weak-case biasing
* OH and 4x4 specialization blocks

### Phase 3 — adaptive optimization

* planner changes workload weekly
* weak cases surface automatically
* session intensity changes based on fatigue/performance
* method expansion only when fundamentals are stable

That is much better than “learn 50 fancy things because top cubers know them.”

## Feature ideas worth doing later

These are actually exciting:

### 1. Case debt

A case accumulates “debt” when ignored too long or when recent performance drops.
The planner pays down debt over time.

### 2. Training presets by archetype

* comeback mode
* comp prep mode
* last-layer grind mode
* OH mode
* 4x4 parity cleanup mode

### 3. Integrated algorithm notes

Not just “here is the alg.”
Store:

* preferred alg
* alternate alg
* fingertrick note
* regrip count
* lefty/righty variant
* OH variant

### 4. Skill transfer map

Example:

* drilling U perms helps recognition flow into broader PLL confidence
* drilling cross+1 gives better full-solve transfer than naked cross reps alone

### 5. Weekly coach report

“Your biggest time leak this week was PLL execution, not F2L.”

## Architecture call

If you stay inside csTimer first, I’d keep it like this:

* **existing csTimer scramble/stat engine** remains intact
* add a **training domain layer**
* add a **planner service**
* add a **session orchestration UI**
* store plan/skill data separately from raw solves if possible

Do not hardwire everything into timer logic. Keep the trainer as a near-independent module.

That way:

* you can PR small chunks upstream
* you can later extract it into your own app
* you avoid turning the codebase into spaghetti

## Suggested implementation order

### Milestone 1

* Add custom training plans
* Add drill queue
* Add weighted case picker

### Milestone 2

* Persist per-case stats
* Add weakness scoring
* Add post-session review

### Milestone 3

* Add predefined plans:

  * returning cuber
  * PLL polish
  * 4x4 parity cleanup
  * OH fundamentals

### Milestone 4

* Add optional algorithm metadata import
* Add smarter recommendations

### Milestone 5

* Add exports/imports for training profiles

## The concrete PR/fork strategy

I’d split the work like this:

### Upstream-friendly pieces

* generic drill queue
* session templates
* per-case metadata storage
* weighted trainer selection

### Fork-only / product-differentiator pieces

* adaptive coach
* comeback plan generator
* weekly reports
* skill graph / weakness map
* opinionated training philosophy

That lets you play both games.

## My blunt take on the “Chinese training system” angle

Useful inspiration, dangerous obsession.

Yes, elite systems likely emphasize very clean progression and early structure. But if you chase “the exact hidden optimal Chinese curriculum,” you may waste months mythologizing instead of shipping.

Your smarter move:

* borrow what is obvious and defensible
* encode clean progression
* let data from your own sessions shape the rest

Build a system that becomes more correct as it observes you.

## What I’d name it

Inside csTimer fork:

* csTimer Coach
* csTrainer
* csTimer Training Lab

Standalone later:

* CubeOS
* Cube Coach
* DrillCube
* Cubing Dojo

## Final verdict

You are not just describing a feature.
You are describing a **new layer of cubing software** that sits between:

* timer
* alg sheet
* coach
* deliberate practice planner

That is a legitimate product direction.

The smartest immediate move is:
**fork csTimer, build an adaptive drill/session planner on top of existing scramble and stats infrastructure, and keep the trainer engine modular so it can either be upstreamed or extracted later.** csTimer already supports a lot of the training substrate you need, so you can focus your effort on planning, adaptation, and UX instead of rebuilding the basics. ([csTimer][1])

The next best step is for me to turn this into a **proper build spec**: repo strategy, feature breakdown, architecture, data schema, UI screens, and a phased roadmap your AI agents can execute.

[1]: https://cstimer.net/ " csTimer - Professional Rubik's Cube Speedsolving/Training Timer "
[2]: https://jperm.net/ "J Perm | Speedcubing Tutorials"
[3]: https://github.com/cs0x7f/cstimer "GitHub - cs0x7f/cstimer: Professional Speedcubing/Training Timer · GitHub"
[4]: https://github.com/gisketch/kitsune-cube "GitHub - gisketch/kitsune-cube · GitHub"

---

so I should contriubute to their repo or just fork it and build on it and then ship it seperately you konw the stuff is open source and what not
or you think I should contribute to the repo for now and then they might later merge my stuff

What I was thinking was like if I fork the repo, you know, I now have my own personal copy. I can do whatever I want to do. I can even change the whole thing to like, I don't know, convex or something like that. So I would like multiplayer mode and whatnot. But then I could also like make a PR and merge back to main. I know if I do something like change the database drastically, that would cause issues, right? But like, yeah. Or I could do that. I also merge back to main, and then I also have my own copy that I can now distribute to everybody or something like that. So either they merge my code or they don't merge my code with my source to use it.

---

Do **both**, but not in the same way.

My recommendation is:

**Fork it now, build in your fork, and only upstream the clean modular pieces.**

That is the highest-leverage move.

Why I’m saying that:

csTimer is open source under GPL-3.0, the repo is active, and the project already has a flow where new features land in the master/latest version first and only later get promoted to the main release after testing and user feedback. That means contributions are possible, but it also means you should expect conservatism around big architectural changes. ([GitHub][1])

Also, the repo is clearly a mature, long-lived codebase with over a thousand commits, separate `src`, `dist`, `experiment`, `lib`, and `npm_export` areas, plus existing deployment workflows. That usually means maintainers are much more likely to merge focused features than “I reworked the whole app into my platform vision.” ([GitHub][1])

So the real answer is:

## What you should do

### 1. Fork immediately

Use the fork as your real playground.

That gives you freedom to:

* move faster
* redesign UI
* add opinionated training flows
* experiment with multiplayer or heavier persistence
* ship whenever you want, without waiting on maintainer approval

That part is huge. If you build directly “for upstream first,” you will subconsciously design around what they *might* accept instead of what the product actually needs.

### 2. Keep your major new system as a module/layer

Even inside your fork, do not rewrite everything at once.

Build:

* training engine
* drill planner
* weakness scoring
* session orchestration
* optional persistence layer

as isolated as possible from core timing and scramble generation.

That way, later, you can upstream pieces like:

* weighted case practice
* drill queue
* per-case stats
* training session presets

without needing them to accept your whole product philosophy.

### 3. Only PR the pieces that feel native to csTimer

csTimer today is a timer/training utility, not a multiplayer training platform. The repo already supports lots of training-related behavior and has user requests for more device/training support, so training enhancements are much more “mergeable” than a full app-direction pivot. ([GitHub][2])

So yes:

* adaptive drill selection? maybe
* better practice mode? likely plausible
* trainer queue UI? plausible
* Convex-backed accounts, social features, multiplayer ladders? probably fork territory

## The decision rule

Use this simple filter:

### Upstream candidate

If the feature:

* improves csTimer for normal users
* does not require a backend overhaul
* preserves existing local/offline behavior
* feels like “better training,” not “new product category”

then PR it.

### Fork-only feature

If the feature:

* changes storage architecture heavily
* depends on accounts / sync / real-time backend
* changes core UX philosophy
* adds competitive social / multiplayer / cloud-first behavior

keep it in your fork.

That is the clean split.

## About the “what if they merge it later?” part

That’s exactly why the fork-first path is so good.

You do **not** need to choose between:

* “build my thing”
* “contribute upstream”

You can build in your fork first, prove it works, then cherry-pick the cleanest commits back into PRs.

That is way better than building directly in upstream style from day one, because:

* you get to move with less fear
* you can test the UX properly
* you can trim the PR down to something maintainable

Think of it like this:

**Your fork is the lab.**
**Their repo is the museum.**

Do not try to live in the museum.

## My blunt take on Convex / major DB changes

If you want Convex, multiplayer, shared training plans, live rooms, club challenges, cloud profiles — that is a separate product direction.

Cool idea, but that is **not** the first PR you send to csTimer.

csTimer already warns that some functions are domain-dependent and that third-party deployments can have issues outside `cstimer.net`, with some online import/export behavior tied to callback verification. That is another hint that backend-sensitive changes will get tricky fast. ([GitHub][1])

So yes, drastic database or online architecture changes would make upstreaming much harder.

## The smartest rollout strategy

### Phase 1

Fork repo.

### Phase 2

Build a self-contained training subsystem in your fork:

* plans
* drills
* weighted weak-case practice
* per-case stats
* session summary

### Phase 3

Ship your fork to real cubers and use it yourself.

### Phase 4

Open PRs for the cleanest upstream-friendly chunks:

* generic drill queue
* trainer presets
* case weighting
* additional practice stats

### Phase 5

Keep the more ambitious stuff exclusive to your version:

* multiplayer
* accounts
* cloud sync
* social competition
* “coach mode”

That gives you maximum upside with minimum political friction.

## So which side am I picking?

If you force me to choose one sentence:

**Fork it and build your vision there first; contribute back only the parts that can stand alone cleanly.**

That is the grown-up answer.

Not because upstream is bad.
Because your idea is bigger than a normal feature, and you should not let maintainer merge risk become your product manager.

If you want, I’ll map this into a concrete repo strategy next:
branch plan, folder/module layout, what stays upstream-safe, what becomes fork-only, and how to avoid painting yourself into a corner.

[1]: https://github.com/cs0x7f/cstimer?utm_source=chatgpt.com "cs0x7f/cstimer: Professional Speedcubing/Training Timer"
[2]: https://github.com/cs0x7f/cstimer/issues?utm_source=chatgpt.com "cs0x7f/cstimer"

---

So I'm thinking, right, because like I'm really trying to think, right, these features I want to add, do you think, I know that technically I could actually just walk it out and make sure that we still keep the OCSL architecture as closely as possible. Like it's not that hard. You yourself, you can do that if you have to do it, but I'm just really thinking, like... Do I, because like, for example, in the report, right now I've created branches where, oh, this one is like a drastic change and this one is like, oh, things that can easily be upstreamed, or do I, because I don't know, man, because I'm just really thinking, do I really want to go through that stress of trying to think about two at the same time? Or am I about thinking this whole thing and is that one that I don't I start?

---

You’re not overthinking the architecture.

You’re underestimating the **mental tax of serving two masters too early**.

My advice: **do not start with two parallel product tracks in your head**. Start with **one main build path** and a rule for what gets upstreamed later.

Why I’m saying that: csTimer is an active, mature repo with 1,295 commits, separate source/dist/experiment areas, a `master` branch that feeds the “latest/source” site, and a `released` branch that feeds the main production site after testing and user feedback. It also stores user data locally in browser storage and warns that third-party deployments can break some online import/export behavior outside `cstimer.net`. All of that says “stable long-lived project with real constraints,” not “free sandbox for giant product pivots.” ([GitHub][1])

So the clean answer is:

## Don’t run two strategies at once

Do **not** wake up every coding session asking:

* “Is this the upstream-safe version?”
* “Or is this the separate product version?”
* “Should I shape this for their style or mine?”

That split-brain workflow is how you slow down and eventually ship neither.

Instead, pick **one** of these operating modes:

### Mode 1 — product-first

Build your fork as your real product.
Then later extract small clean PRs from it.

### Mode 2 — contribution-first

Build only what has a realistic chance of merging.
No big architecture drift, no major product detours.

For **your** case, I strongly prefer **Mode 1**.

Because the thing you want is not just “a feature.”
It is a training philosophy, planner, and possibly eventually cloud/social/multiplayer stuff. That is bigger than a normal repo contribution.

## The best workflow

Not two branches for two futures.

Use **one trunk for your fork**, then branch features off that.

Something like:

* `main` → your product direction
* `feat/training-engine`
* `feat/drill-queue`
* `feat/weakness-stats`
* `feat/upstream-case-weighting`
* `spike/cloud-sync` or `spike/multiplayer`

Then use one label in your head:

**upstreamable** or **fork-only**

That’s it.

So instead of maintaining:

* one drastic branch
* one upstream-clean branch

You maintain:

* one real codebase
* feature branches
* and a habit of keeping some commits modular enough to cherry-pick later

That is much lighter mentally.

## The exact rule I’d use

When building a feature, ask:

**Can this still make sense in vanilla csTimer with local storage and current UX expectations?**

If yes:

* build it cleanly
* keep it modular
* maybe upstream later

If no:

* stop worrying about upstream
* build it for your fork only

Examples:

### Likely upstreamable

* drill queue
* weighted case selection
* extra practice presets
* better per-case stats
* session review summaries

### Probably fork-only

* Convex backend
* accounts
* multiplayer
* club rooms
* cloud coaching
* major UX redesign around training OS

That one rule removes most of the stress.

## So should you create two branches now?

No.

At least not as “two competing product futures.”

That is premature complexity.

Create:

* one main fork direction
* normal feature branches
* maybe a `spike/` branch when you want to test wild ideas

But do **not** architect your whole life around upstream compatibility from day one.

You can always cherry-pick later.
You cannot easily recover lost momentum.

## The practical decision

I’d tell you to do this:

### Step 1

Fork csTimer.

### Step 2

Treat the fork as the real product.

### Step 3

Build the training system in a modular way anyway.

Not for upstream’s sake.
For **your own sanity**.

### Step 4

After something works, look at the commit history and ask:

* which commits are generic enough for PRs?

Then upstream only those.

That way you are not “thinking about two at the same time.”
You are building once and selectively donating later.

## My blunt take

Trying to optimize for both “my ambitious fork” and “their maybe-mergeable repo” from the start is fake productivity.

It feels responsible.
It usually just creates hesitation.

You need momentum more than purity.

So the move is:

**Build your fork like it’s yours.**
**Keep code modular where convenient.**
**Only think about upstream after the feature is real and useful.**

That is the least stressful path and the most likely to actually ship.

If you want, I’ll turn that into a concrete Git workflow next — exact branch naming, commit discipline, and how to structure files so upstreamable features stay easy to extract later.

[1]: https://github.com/cs0x7f/cstimer "GitHub - cs0x7f/cstimer: Professional Speedcubing/Training Timer · GitHub"

---

All right, so the question now is, when I start building features and I kind of get this optimize, not just by what I think, but like real stuff that maybe people like Jeff and other YouTube legends have talked about, I can just simply go to their YouTube pages, get like a transcript or use Gemini or something like that to extract what the main insights are and then implement that into the, I'll just give the agent like, oh, this is what happened in this video. How do you think if I implement it into the code or something like that? That's what you think, right? Do you think that's good for developers to know that would be a good better work for?

---

Yes — that’s a good workflow, **with one big upgrade**:

Do **not** feed your agent “this video said X, implement it.”
Feed it **structured training claims**.

That is the difference between vibe-dev and building something solid.

## The better pipeline

Take each video, post, guide, or algorithm page and turn it into this:

### 1. Source

* creator
* title
* link
* topic
* date

### 2. Claims

Each useful idea becomes one short claim.

Example:

* “Returning cubers should rebuild cross planning before spamming LL algs.”
* “A-perms are often recognition-clean but execution-sloppy.”
* “For OH, some standard 2H algs should be replaced with OH-specific variants.”
* “4x4 parity should be drilled in isolation before full-solve reintegration.”

### 3. Type of claim

Label it:

* technique
* drill idea
* algorithm preference
* training philosophy
* UX idea
* metric idea

### 4. Confidence

* strong evidence
* creator opinion
* anecdotal
* controversial
* needs testing

### 5. Product implication

What should the software do because of that claim?

Example:

* add “cross planning block” session type
* add weighted A-perm repetition
* add OH alg preference profile
* add isolated parity drill mode

That is the gold.

## Why this is better

Because creators say a lot of smart things, but not all of it should go straight into code.

Some things belong as:

* default presets
* optional coaching hints
* algorithm notes
* experimental features
* not implemented at all

If you dump raw summaries into the agent, it may overfit to one person’s style and build nonsense with too much confidence.

If you convert insights into **claims + implications**, then your agent can reason properly.

## Best rule

Treat cubing creators as:

* **excellent heuristic sources**
* not automatic truth

So if Jeff, J Perm, Philip, CubeHead, or whoever says something smart, great.
But before baking it deeply into the app, ask:

* Is this universal or personal preference?
* Is this for beginners, intermediates, or elite solvers?
* Is this a training principle or just a nice tip?
* Should this be hardcoded, configurable, or just shown as advice?

That thinking will save you from building a trainer that secretly reflects one YouTuber’s personal taste.

## What developers should actually know

Your dev system should know **three layers**:

### Layer 1 — domain facts

Stuff like:

* PLL cases
* OLL cases
* case groupings
* 4x4 parity categories
* OH mode differences
* drill types

### Layer 2 — training heuristics

Stuff like:

* weak cases should recur more often
* full solves should be mixed with isolated drills
* returning cubers need fundamentals before optimization
* too much narrow drilling can hurt transfer

### Layer 3 — product decisions

Stuff like:

* how to score weakness
* when to insert review blocks
* how much repetition before boredom
* whether a claim becomes default behavior or optional preset

That is what you want the agent to operate on.

## Best practical setup

Make a simple knowledge file like:

```md id="7yw01x"
# training_insights.md

## Source
Creator: J Perm
Topic: Returning to cubing / PLL / training
Confidence: medium

### Claim 1
Returning cubers benefit more from rebuilding fundamentals than from immediately grinding advanced alg sets.
Type: training philosophy
Implication: Add a "comeback mode" preset with cross, F2L, and limited LL blocks.

### Claim 2
Specific PLLs often lag behind others and should be drilled disproportionately.
Type: metric idea
Implication: Add weighted weak-case repetition in PLL sessions.
```

Then your agent reads **that**, not messy transcript soup.

## Even better

Have a JSON or TS format too:

```json id="re44j7"
{
  "source": "YouTube creator/video",
  "claims": [
    {
      "text": "Weak cases should appear more often in practice sessions.",
      "type": "training_heuristic",
      "confidence": "medium",
      "implication": "Implement weighted case selection."
    }
  ]
}
```

Now your agents can use it cleanly.

## My opinion

This is a smart workflow **only if you distill first**.

Raw transcript -> agent -> code
is sloppy.

Transcript -> extracted claims -> normalized knowledge -> code decisions
is strong.

That way you’re not just building from vibes.
You’re building from a growing cubing knowledge base your software can actually reason with.

The best part is that over time, your trainer becomes not just “features I had ideas for,” but a real **codified training system**.

Next move: create a tiny schema for `sources`, `claims`, `confidence`, and `product implications`, and make that the only format your coding agents consume.

---

anything I should do here?

---

Yeah — a few tweaks.

**I’d change 3 things:**

**1. Repo name**
`csTrainer` is fine, but I’d make it a bit clearer and safer:

* `cstimer-coach`
* `cstimer-trainer`
* `cubetrainer`
* `cstrainer-app`

Why: `csTrainer` is okay, but it feels a little generic and slightly easy to confuse later.

**2. Description**
Your current one is okay, but I’d make it sharper:
`Adaptive cubing trainer built on csTimer`
or
`Training-first fork of csTimer for structured speedcubing practice`

That immediately explains what makes it different.

**3. “Copy the master branch only”**
Leave it **checked**.

That’s the right move here. You do not need every branch from upstream for this. You want a clean start, not branch clutter.

## What I would use

**Repository name:** `cstimer-trainer`
**Description:** `Adaptive cubing trainer built on csTimer`

That’s clean and obvious.

## One extra thing

After forking, do this early:

* keep the original repo as `upstream`
* keep your fork as `origin`

So locally you’ll have:

* `origin` → your fork
* `upstream` → original csTimer repo

That makes syncing and cherry-picking much easier later.

## My take on the current screen

You’re basically good to go already.
The only thing I’d really push is **rename the repo before creating it** so you don’t end up stuck with a name that feels slightly off a week from now.

Best pick from this screen:
**`cstimer-trainer`** with **master branch only checked**.

---

so ill create new brances or what exactly are you saying?
"origin → your fork
upstream → original csTimer repo"

---

Yes — you’ll still create new branches.

`origin` and `upstream` are **not branches**. They are **git remotes**.

Think of it like this:

* `origin` = your GitHub fork
* `upstream` = the original csTimer repo
* branches = your actual work lines like `feat/training-engine`

## So your setup becomes

### Remotes

* `origin` → `JStaRFilms/cstimer-trainer`
* `upstream` → `cs0x7f/cstimer`

### Branches

In your repo, you make branches like:

* `main`
* `feat/training-engine`
* `feat/drill-queue`
* `feat/weakness-stats`
* `spike/multiplayer`

## Why this matters

Because later you may want to:

* pull new changes from the original csTimer project
* keep your fork updated
* build your own features separately
* maybe submit a PR from one clean branch

That only works cleanly if you know the difference between:

* where code comes from (`origin`, `upstream`)
* what line of work you’re on (branches)

## Very practical example

After you fork and clone:

```bash
git clone https://github.com/JStaRFilms/cstimer-trainer.git
cd cstimer-trainer
git remote add upstream https://github.com/cs0x7f/cstimer.git
git remote -v
```

Then you’ll see something like:

```bash
origin    https://github.com/JStaRFilms/cstimer-trainer.git
upstream  https://github.com/cs0x7f/cstimer.git
```

Now you create a feature branch:

```bash
git checkout -b feat/training-engine
```

You work there, commit there, and push there:

```bash
git push -u origin feat/training-engine
```

## Normal workflow

### When starting a feature

```bash
git checkout main
git pull origin main
git checkout -b feat/drill-queue
```

### When upstream changes and you want them

```bash
git fetch upstream
git checkout main
git merge upstream/master
```

or rebase if you prefer.

Then push updated main to your fork:

```bash
git push origin main
```

## The simplest mental model

* `origin` = your house
* `upstream` = the neighbor you copy updates from
* branches = rooms where you build stuff

## What you should do right after creating the fork

1. Create the fork
2. Clone your fork locally
3. Add `upstream`
4. Keep your main branch clean
5. Build every feature in its own branch

## Branch strategy I’d recommend

Keep it simple:

* `main` → stable state of your fork
* `feat/...` → real features
* `fix/...` → bug fixes
* `spike/...` → experimental stuff you may throw away

Example:

* `feat/training-engine`
* `feat/planner-ui`
* `feat/adaptive-drills`
* `fix/session-stats-bug`
* `spike/cloud-sync`

So yes, you’ll create new branches — just don’t confuse them with `origin` and `upstream`.

If you want, next I can give you the exact first 10 git commands to run after you click **Create fork**.
