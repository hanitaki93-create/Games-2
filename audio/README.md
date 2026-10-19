# CRASH LAB — Original Sound Lab v0.1

Created 2026-10-19. **Working deliverables:** 24 original playable WAV effects packaged in [CrashLab-SFX-v0.1.zip](CrashLab-SFX-v0.1.zip), a [self-contained browser audition app](soundlab.html), a machine-readable [manifest](manifest.json), and the dependency-free [reproducible Node generator](../tools/generate-sfx.mjs).

### Try it
Download `soundlab.html` using GitHub's Raw/Download button and open it in Chrome or Edge. Preview, assign A/B, compare, and export chosen WAVs. No service, Unity, installation, or internet required. Download the ZIP to receive all 24 WAVs directly. To regenerate WAVs, run `node tools/generate-sfx.mjs` from the repo root (Node 18+).

### What this is not
The 23-level production Unity branch already contains a working `LabSound` class, synthesized sounds, pitch variations, release anticipation, near-miss handling, UI, stars and retries. **Nothing in this kit was imported, enabled or installed into the production APK.** Do not duplicate the audio manager or trigger every new clip simultaneously.

### Integration order
1. Blind-listen existing sound vs one proposed alternative on actual Android hardware.
2. Start with `ink_release_a/b` and `soft_bonk_a/b`. Compare bounce/metal only where collision event differentiation is meaningful.
3. Compare Pip's reaction sounds without changing his identity. Only add near-miss sound if actual near-miss classification is reliable.
4. Test sound mix with music/ambience and mute/pause; avoid clipping and repeated layered effects.
5. After approval, Codex adds only selected WAVs into the existing sound playback path. No change to puzzle solutions or physics.

### Acceptance
20 consecutive retries without overlapping stale sounds; no audio when muted or paused; clear outcomes; no excessive drawing-tick fatigue; distinct light/hard impacts; legible sound on phone speakers; compare to original before accepting.

All sound assets and generator are original procedural creations released under CC0 1.0. The CRASH LAB game/brand and original private Unity code are not part of that license.
