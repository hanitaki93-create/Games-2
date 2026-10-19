# Games-2 — CRASH LAB Independent Support Studio

Public workspace for **original level design, sound generation, useful tests and focused Codex handoffs**. The existing Unity game is developed in the private [Games](https://github.com/hanitaki93-create/Games) repository; **Games-2 is not a replacement game, and none of its concepts are silently merged into Unity.**

## Latest: Chapter 24–31 · illustrated new-level concepts

**[Browse all eight new level designs and diagrams](design/chapter-24-31/README.md)**

Levels 24–31 feature weight-driven switches, held gates, deliberately slower routes, dual-purpose ink, two-subject cooperation, vertical lift machinery and a gate/airflow finale. Each concept includes a diagram, the player's core insight, likely wrong attempt, solution families, critical risks and explicit acceptance gates.

- [Open the standalone interactive design gallery](design/chapter-24-31/gallery.html) — download HTML to view locally
- [Codex handoff and integration order](design/chapter-24-31/CODEX_HANDOFF.md)
- [Machine-readable level candidate schema](design/chapter-24-31/levels.json)
- [Concept-only automated QA](.github/workflows/level-concepts-check.yml)

**Important:** diagrams are *hypotheses*, not verified Unity physics or finished levels. Introduce shared machinery through one tested level at a time; keep 1–23 unchanged. No new Pip design.

## Original audio work

- [Sound Lab v0.1](audio/README.md): 24 original procedurally synthesized candidate effects, offline A/B browser audition tool and exportable WAV archive.
- [Audio generator](tools/generate-sfx.mjs) and [successful format/reproducibility CI](https://github.com/hanitaki93-create/Games-2/actions/workflows/audio-check.yml).

Audio assets have **not** been integrated into production; phone speaker balance and actual play experience remain unverified.

## Research library

- [License-aware public Unity repository shortlist](research/2026-10-19-public-repo-shortlist.md).

## Studio rules

- Preserve the established game: one stroke, release to simulate, physics-driven consequences, Pip character, original lab look and existing 23 chambers.
- No needless feature bloat; new chapters should teach **one meaningful decision at a time**, with a funny breather after difficult puzzles.
- Do not publish private production code, paid/copyrighted assets, APKs, secrets, device data or signing files to this public repo.
- Reuse current components and import only small approved deliverables, through explicit Codex handoffs.
- Automated checks are for format and testable invariants; only Unity simulation plus **real Android playtesting** establishes whether layouts are physically sound or enjoyable.

Game baseline inspected: `hanitaki93-create/Games@codex/crash-lab-mobile-v2-levels08-23` (2026-10-19). Levels 24–31 exist **only here as candidate designs** until independently validated and integrated.
