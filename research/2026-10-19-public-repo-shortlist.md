# CRASH LAB — Targeted Public Repository Study
Date: 2026-10-19
Status: research only; no third-party code or assets copied

## Scope and verified game baseline

Inspected private repository hanitaki93-create/Games at branch codex/crash-lab-mobile-v2-levels08-23, commit 5ff4ae4f325a10e270496e2aedc1d4d3639850ed. Source has 23 implemented puzzle levels, not 50. Development notes say mobile touch and UI automation passed but real finger, Android gesture, audio balance and sustained device testing are still pending. The latest locally installed APK was not opened or tested in this research session.

The current code contains:
- CrashLabGame.cs: one-stroke point input and simplification; LineRenderer preview and EdgeCollider2D final solid ink; 0.12s release delay; impact threshold/cooldown; failure classes, near-miss distance trigger, direct retry, star ratings.
- CrashLabPresentation.cs: LabAvatar expressions/release/fall/impact/near-miss/pod/fail/success; LabBurst particles; LabSound with synthesized clips, several pitch variations, independently mixed ambience/music/reactive layers.
- Chapter plan: human playtesting, current chapter 1-23 and conceptual 24-50, no saved progression system or monetization SDK.

Consequently: do not replace the input stack, build an alternate physics solver, duplicate near-miss detection or add a second audio manager. Study references and target observed weaknesses.

## Recommended public repositories and assets (ranked)

| Priority | Resource and canonical URL | Verified license | What CRASH LAB gains | Reuse decision / limits |
|---|---|---|---|---|
| A | CandyCoded/HapticFeedback — https://github.com/CandyCoded/HapticFeedback | MIT | Existing Unity Android+iOS API for light/medium/heavy tactile feedback | **Evaluate for integration.** Verify Unity 6 + handset behavior and respect a user preference for optional/reduced haptics. Last upstream push 2021; test rather than assume all devices behave identically. |
| A | Kenney Impact Sounds — https://kenney.nl/assets/impact-sounds | CC0 | 130 impact sounds for softer rolls, metal/clamps, heavy landings, comic collisions | **Usable commercial audio source.** Select a small number, avoid giant sample bloat, normalize to current LabSound mixer, preserve sound-off and ducking. Check exact downloaded pack license. |
| A | Kenney Interface Sounds — https://opengameart.org/content/interface-sounds | CC0 | 100 lightweight confirmation/button sounds | **Usable** for retry, rating stars, intro/next prompts. Original pack/license also reproduced at https://github.com/Calinou/kenney-interface-sounds ; prefer official creator source when downloading. |
| A | chr15m/jsfxr — https://github.com/chr15m/jsfxr | Unlicense | Procedural creation/export of original short SFX (squeaks, magic ink, beeps), usable without Unity | **Use as sound-design tool** to author WAV variants, not as a JS runtime dependency in Unity. Compare produced clips with existing C# synths; do not replace good ones gratuitously. |
| B | jeffreylanters/unity-tweens — https://github.com/jeffreylanters/unity-tweens | MIT | Reusable easing for success star stagger, result panel, button squash, chapter tease | **Optional integration**, not necessary until we have measured feedback timings. Use within an isolated adapter and keep animations reversible/skip-friendly. Upstream last push 2025. |
| B | game-ci/unity-test-runner — https://github.com/game-ci/unity-test-runner | MIT | EditMode/PlayMode repeatable regression tests after integration | **Useful when production Unity project is available in CI**. Does not run Unity on an empty research repository. Needs compatible Unity license/activation and engine installation. |
| B | game-ci/unity-builder — https://github.com/game-ci/unity-builder | MIT | Automated Android builds of the real project from a pinned revision | **Future automation** in the original game repo or a secure working checkout; never upload private Unity credentials to public Games-2. Verify Unity 6.x/Pipeline and license workflow first. |
| C | yunhan0/LineRiderReplica — https://github.com/yunhan0/LineRiderReplica | MIT | Tiny prior art for drawn stroke -> physical collision -> simulation | **Reference/limited adaptation only.** Built for Unity 5.5 (2017), not a drop-in for our Unity 6 input and collider pipeline. Retain license/attribution if adapting code. |
| C | Nikhil9182/Line-Drifter — https://github.com/Nikhil9182/Line-Drifter | No license detected in repository metadata | Level, drawing, shop and advertising architecture lessons, and examples of UI progression | **Read/study only.** Do not copy code or artwork; public visibility is not permission to redistribute. Older project with minimal external validation. |

References were checked against GitHub repository API and/or visible license files on 2026-10-19. MIT/CC0/Unlicense are permissive, but notices must be preserved where required. A third-party asset's own terms supersede assumptions drawn from a container project's license.

## Interesting but deliberately excluded

- PrimeTween (https://github.com/KyryloKuzyk/PrimeTween): excellent high-performance tween examples, but a **custom license**. Allows commercial binary use; forbids redistributing source inside a derivative public repository. If eventually selected, install as documented NPM dependency directly in the private Unity project and do not vendor into Games-2. Our preferred starter for publicly distributable helper code is MIT unity-tweens.
- MMFeedbacks original/public fork (https://github.com/alex-drachen/MMFeedbacks): appealing architecture, but published CC BY-NC 4.0 / restrictions on redistributing parts. **Study patterns only**; do not vendor or build the support kit around it.
- isirode/WaterPuzzleGame2D (https://github.com/isirode/WaterPuzzleGame2D): roughly 40 puzzle levels but **AGPL-3.0**, complex dependencies and reported scene/UI bugs. Study level structure if useful; **do not adapt its code** into this commercial app without a separate compliance decision.
- Any repo without a license: study descriptions/demos, do not import code/assets.

## Seven-game-feel opportunities grounded in current code

| Existing work | Actual gap worth evaluating | Independent supporting deliverable |
|---|---|---|
| Ink glint and drawing audio already present | Does stroke visually track real fingers without jitter or obvious latency? Is drawing sound comfortable across 50 retries? | Trace/stroke visual comparison method; 2-3 optional sample tones, no changed physics |
| Release delay ~0.12 s, avatar release pose, sound cue | Does the player perceive anticipation, or does it feel like lag? | Short storyboard with three alternative 0.08-0.20s timing recipes; compare to current |
| Impact reaction, burst, sound, pitch variation, screen punch | Differentiate light bounce, hard collision, metal vs soft material; prevent overwhelming volume | Tagged 12-18 clip shortlist and a severity-to-feedback matrix |
| Near-miss text/avatar branch based on bestGoalDistance | Detect *meaningful* near misses instead of any close path; avoid unearned praise | Read-only failure taxonomy, replay event schema, thresholds to validate |
| Retry button and LoadLevel already work | Thumb target, first-frame readiness, and no accidental carry-over | Device test sheet with timing and 20 consecutive retry trials |
| Victory stars/chime/pod animation already present | Rhythm and readability; star appearance and next affordance | UI motion recipe and low-motion alternative; sound mix A/B spec |
| No verified persisted chapter progress | Stars/unlocks/level selection may reset after app restart | Independent save DTO + 23-level fixture tests as a *subsequent* implementation sprint |

## Proposed split after research approval (not implemented here)

1. **Sound and tactile study first.** Produce 3 audio palettes: restrained, playful, exaggerated (5-7 clips each), with listening previews and licenses; paired on/off haptic recipes; compare to current synthesized baseline. Avoid unnecessary extra sounds.
2. **Feel timing specification.** Release/impact/near-miss/victory with explicit timing and severity thresholds. Design effects as *opt-in layers* over current LabAvatar/LabSound/CrashLabGame.
3. **Progression module.** Pure C# domain state records max stars per level, unlocked state and completion with migration/round-trip tests. Unity persistence adapter at integration. Testing Skip must NOT earn stars/unlock chapters.
4. **Validation protocol.** For all 23 chambers, exercise success/failure, finger trace, restart, Back/resume, sound toggles, state transitions, 16:9 and long-phone ratios; report latency, first-frame readiness, FPS and user confusion separately. Automation checks invariants; humans judge fun.
5. **Codex integration handoff.** Packages stay scoped and optional; no broad overhaul of existing 2,616-line gameplay or 1,252-line presentation classes. Integrate one category at a time on a fresh branch of the actual source and confirm build/hash/device gates.

## Acceptance / rejection criteria

- Existing chamber 1-23 solutions and physics remain reproducible; no extra touches needed beyond one stroke/release.
- Normal sound mix leaves Pip's voice and outcome legible, no harsh clipping/repeated piercing tick, and mute/pause still work.
- No screen effect obscures hazard, drawn ink, allowed glass, pod or future motion. Reduced-motion/haptic-disabled mode remains playable.
- 20 rapid retries in succession produce 20 clean Ready states; no duplicate triggers or stale audio.
- Progress is durable after restart; stars are monotonic (best score wins), unlocked levels never relock on lower replays, skips do not grant rewards.
- Tests do not assert “fun” or retention merely because they passed a deterministic physics replay.

## Working boundaries

Research-and-content repo Games-2 is **public and independent**. Do not push APKs, copyrighted assets absent reuse rights, private project source, app signing credentials, Android device data, Unity tokens, or paid/proprietary packages to this repo.

Original project retains ownership of the Unity scene, physics, game state, audio playback architecture, Android packaging and final visual integration. Games-2 owns research notes, self-created or legally reusable sources, original small decoupled libraries, fixture-driven checks, licensing ledger, and a concise integration manifest.

### Inspection notes and sources
- Private inspected game branch: https://github.com/hanitaki93-create/Games/tree/codex/crash-lab-mobile-v2-levels08-23
- Baseline commit: 5ff4ae4f325a10e270496e2aedc1d4d3639850ed
- Production files: Assets/CrashLab/Scripts/CrashLabGame.cs, CrashLabPresentation.cs and Docs/LabChapterPlan.md inside games/crash-lab-unity/
- License references: https://github.com/CandyCoded/HapticFeedback/blob/main/LICENSE ; https://github.com/chr15m/jsfxr/blob/master/UNLICENSE ; https://github.com/jeffreylanters/unity-tweens/blob/master/LICENSE.md ; https://github.com/game-ci/unity-test-runner/blob/main/LICENSE ; https://github.com/KyryloKuzyk/PrimeTween/blob/main/LICENSE ; https://kenney.nl/assets/impact-sounds
