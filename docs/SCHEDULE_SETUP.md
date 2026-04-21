# Setting up the daily `/schedule` trigger

The ideaFactory runs unattended via a **Claude Code remote scheduled trigger** — no server, no GH Actions for the generator, no separate API bill. The trigger fires at **09:00 IST daily** and writes a new `ideas/*.md` file (if any candidate scores ≥ 70) straight to `main`.

## One-time setup

### 1. Prerequisites

- Claude Code CLI installed and logged in on this machine (the one that runs `/schedule` to create the trigger — the trigger itself runs on Anthropic's infra, not this machine)
- This repo cloned locally with `git remote -v` pointing at the GitHub remote you want commits pushed to
- A GitHub Personal Access Token with `repo` scope, exported as `GITHUB_TOKEN` in the trigger environment — the trigger needs it to `git push`
- Git user configured on the trigger:
  ```bash
  git config --global user.email "bot@ideafactory.local"
  git config --global user.name  "ideaFactory bot"
  ```

### 2. Create the trigger

From inside this repo (`cd /Users/asmishra/ideaFactory`), launch Claude Code and run:

```
/schedule
```

When prompted, configure as follows:

| Field            | Value                                                                |
|------------------|----------------------------------------------------------------------|
| Name             | `ideafactory-daily`                                                  |
| Cron (UTC)       | `30 3 * * *`  (= 09:00 IST)                                          |
| Model            | `claude-sonnet-4-6`                                                  |
| Max thinking     | `0` (disable extended thinking)                                      |
| Working directory| `/Users/asmishra/ideaFactory` (the remote clone lives here on infra) |
| Prompt           | **paste the body of `generator/TRIGGER_PROMPT.md` verbatim**         |

The trigger will:
1. Clone/pull this repo on Anthropic's scheduled-agent infra
2. Execute the prompt with file + web + bash tools available
3. Commit + push any new `ideas/*.md` to `main`
4. Exit

### 3. Verify it runs

After creating, run:

```
/schedule list
```

…to confirm `ideafactory-daily` shows up with the next fire time.

To run once immediately without waiting for the cron fire:

```
/schedule run ideafactory-daily
```

Check `git log --oneline -5` afterwards — a successful run adds exactly one commit from `ideaFactory bot`.

## Quota & cost expectations

| Measure                | Target             |
|------------------------|--------------------|
| Tokens per run         | ≤ 15,000           |
| Model                  | Sonnet 4.6         |
| Frequency              | 1×/day             |
| Publish rate           | ~40-60% of days    |
| Monthly Claude Code usage | ~450k tokens    |

The `TRIGGER_PROMPT.md` enforces these limits at the instruction level. If you notice daily runs consistently exceeding budget, shorten the trigger prompt first; don't upgrade to Opus.

## Modifying the trigger

- **Change the prompt body:** edit `generator/TRIGGER_PROMPT.md` in the repo, then run `/schedule update ideafactory-daily` and re-paste.
- **Change the cron:** `/schedule update ideafactory-daily` and pick a new schedule.
- **Pause it:** `/schedule disable ideafactory-daily`.
- **Kill it:** `/schedule delete ideafactory-daily`.

## Fallback plan (if you ever want to migrate off `/schedule`)

`.github/workflows/generate-fallback.yml.example` (commented out by default) contains a GitHub Actions cron that would do the same job via the Anthropic public API. Only enable if you move off Claude Code plan and are ready to pay per-token.

## Troubleshooting

| Symptom                                 | Cause                                      | Fix                                                              |
|-----------------------------------------|--------------------------------------------|------------------------------------------------------------------|
| Trigger errors with `dirty-repo`        | You pushed local changes that weren't in trigger's last pull | Wait one run; or force-pull on the trigger via `/schedule run` with `git reset --hard origin/main` first |
| No commits for ≥ 3 days                 | Every candidate is scoring < 70            | Inspect via `/schedule logs ideafactory-daily` — may need to relax rubric or broaden trend sources |
| Duplicate ideas appearing               | Last-10 check isn't catching paraphrases   | Tighten `ideas/*.md` comparison in Step 1 of trigger prompt      |
| Commit but no push                      | `GITHUB_TOKEN` missing or wrong scope       | Regenerate PAT with `repo` scope; update trigger env             |
