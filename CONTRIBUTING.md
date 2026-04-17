# Contributing Guide

## Branching Strategy

```
main       ← always deployable, protected
develop    ← integration branch
feature/*  ← new work
fix/*      ← bug fixes
docs/*     ← documentation only
experiment/* ← ML experiments (may not merge)
```

Branch names use kebab-case and include the issue ID:
```
feature/FRF-12-multi-stream-cnn
fix/FRF-27-forecast-timezone-bug
```

## Commit Messages (Conventional Commits)

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`
**Scopes:** `ml`, `backend`, `frontend`, `gis`, `infra`, `docs`

**Examples:**
```
feat(ml): add multi-stream CNN-LSTM architecture
fix(backend): correct mm/hr to mm/day conversion
docs(readme): document PAGASA data source
test(ml): add unit tests for spatial stream
chore(deps): bump tensorflow to 2.17
```

## Pull Request Process

1. Create a branch from `develop`
2. Make changes, commit using the convention above
3. Push and open a PR to `develop`
4. Fill in the PR template (what, why, screenshots if UI)
5. Request review from at least one teammate
6. Ensure CI passes (lint, tests, build)
7. Squash-merge once approved

Weekly: `develop` is merged into `main` after validation.

## Code Review Checklist

- [ ] Does it solve the issue in scope?
- [ ] Are there tests for new logic?
- [ ] Does it follow the existing patterns?
- [ ] Are there secrets or credentials leaked?
- [ ] Is documentation updated?
- [ ] For ML changes: are MLflow runs logged?

## Development Setup

See [`docs/setup-guide.md`](docs/setup-guide.md) for full local setup instructions.

## Pre-commit Hooks

```bash
pip install pre-commit
pre-commit install
```

This runs `ruff`, `prettier`, and basic checks before each commit.
