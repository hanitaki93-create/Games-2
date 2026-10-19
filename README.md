# Games-2 — CRASH LAB support laboratory

Independent, public workspace for **research, experiments, reusable modules, generated assets, validation specifications and integration handoffs** supporting CRASH LAB.

**Primary game source:** private `hanitaki93-create/Games`, Unity branch `codex/crash-lab-mobile-v2-levels08-23`. That branch—not the `Games` default branch—is the 23-chamber development baseline as inspected on 2026-10-19. Games-2 is **not** a second game, a replacement Unity project or a live production branch.

## Rules
- Research first. Do not change the original game without a scoped integration handoff and approval.
- Never copy private production code, proprietary assets, APKs, signing materials, keys or secrets into this **public** repository.
- Verify each external repository's actual license, including redistributability and third-party asset licenses. A public GitHub repository does not automatically grant reuse rights.
- Build small, versioned, testable packages and compare them against existing behavior before integration; preserve one-stroke drawing, physics-on-release, current 23 chambers and easy retries.
- Physics and touch feel must ultimately be tested with Unity on real Android hardware; generic GitHub Actions checks do not substitute for playtesting.

## Current research
- [Targeted public repository study — 2026-10-19](research/2026-10-19-public-repo-shortlist.md)

**Status:** Documentation/research only; no third-party source or assets vendored, no Unity files changed.
