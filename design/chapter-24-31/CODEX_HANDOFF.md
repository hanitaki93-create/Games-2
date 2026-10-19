# Codex handoff · CRASH LAB 24–31

**Scope:** This packet is design input, NOT a command to implement all eight immediately. The primary Unity project is private `hanitaki93-create/Games`, branch `codex/crash-lab-mobile-v2-levels08-23`, at 5ff4ae4 when inspected. Do not assume an older branch remains head; inspect before edits. **Games-2 is public and must never receive copied private game code or signed APKs.**

## Proposed implementation boundaries

First integrate **one prototype chamber: level 24**. Add two small data-driven reusable components to LabLevel/level construction: `LabPlate {rect, channel, activationMode}` and `LabGate {rect, channel, travelDirection}`. Use pressure-contact sensors observing dynamic bodies, visible circuit lamp/cable and a gate collider whose retract path never blocks the pod. Introduce anti-crush occupancy rule. Keep prior 1–23 level data unchanged.

Gate plate A: **hold to power**. Requires physical contact, updates promptly, and powers gate while held (no unseen timers). Gate may defer closing if subject overlaps volume; it must never crush Pip. Use hold from 24–28, 31. A motor plate in 29–30 should look different and **latch ride start** after an observed contact; avoid pretending the same plate means two incompatible behaviors.

Only after 24 passes, test **25/26**, reusing identical switch/gate. If these feel repetitive, reject 25 or 26 before adding another batch. Next attempt **27** (two purposes for one stroke), **28** (cooperative intern; rescue both or reject). Then introduce one vertical lift for **29**, reuse it in **30**, and finish **31** by combining gate with existing wind. No portals, new materials, procedural solver or animation overhaul.

## Prototype order / stop rule

**Slice A:** 24–26. Compare activation / sustained contact / arrival ordering. Max one new mechanical family: plate + gate.

**Slice B:** 27–28. First dual-use ink then two-subject cooperation. No new mechanical types. If 28's intern must be magically teleported away from the switch, stop and redesign.

**Slice C:** 29–30. First vertical lift from current kinematic carrier pattern, then control from steel block. Max one new family: lift.

**Slice D:** 31. Gate + existing air. Must be less chaotic than levels 20/23 visually, not just more objects.

## Reference coordinate conventions

Schematic `levels.json`: 900×720, top-left origin, +Y down; pod near floor around y=565; rails defined by pairs of design-space endpoints. These are **visual hypotheses**, not valid baked level data or proven input solutions. The cyan dashed stroke in each SVG illustrates a function, not an exact answer. Codex must tune placement, collision bounds, timing, InkUsed budgets, 3-star pars and contact safety with Unity's real Physics2D.

### Completion protocol for each level

1. Write one sentence: why the decision differs from 1–23 and previous new levels; remove duplicates.
2. Implement using current scene/presentation language: enamel rails, safety-glass frame, amber lamp, brass cable, open pod, original Pip; don't switch art direction.
3. Prove three distinct successful one-stroke finger-width paths, including a 10–15 design-unit perturbation; identify the failure cause from what actually moves.
4. Reject geometry needing hairline precision, unexplained waits, accidental bypasses or a second input action.
5. Validate all needed subjects physically reach pod and no gate/lift clips them. Resume/Retry must reset plate, gate, passenger and audio states.
6. Run prior levels 1–23 regression and real Android touch test. Report what changed, what was tested, and what remains unverified.
7. Promote an implemented level only after approval; do not claim 24–31 playable on design documentation alone.

## Product guardrails

Don't change one-stroke mechanic, physics on release, the existing 23 chambers, Pip art, lab identity, camera composition, audio architecture, monetization or progression. Use machine sounds already in project or candidates from Games-2 audio package only if approved. No backend, SDK or unrelated refactor.

The new ideas should make the *player smarter*, not merely make the game visually noisier or require more gestures.
