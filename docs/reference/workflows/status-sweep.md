Reference: for anyone running or reading the output of the `status-sweep` workflow.

# status-sweep

File: `workflows/status-sweep.js`.

## Arguments

| Arg | Required | Meaning |
|---|---|---|
| `plan` | no | Path to the work-package plan; default: the plan named in `CLAUDE.md` |
| `audience` | no | Who the report is for; default: the owner |

## Phases

| Phase | Agents | Does | Skills |
|---|---|---|---|
| Read | 1 | Lists open packages with stream, role, status, PR, dependencies | - |
| Inspect | 1 per package, read-only | Real state from branch/PR/CI/thread: state, evidence, age, block, done-when met, docs present | `flow-and-risks` |
| Triage | 1 | WIP, oldest first, critical path, blockers; actions, owner decisions, risks, plan updates | `flow-and-risks`, `routing-and-unblocking` |
| Record | 1 | Docs Plan (reference only), Do (one edit to plan and risks), Check (one kind, format kept) | `flow-and-risks` |
| Report | 1 | Owner report in their terms | `status-reporting` |

A failed inspection marks the package `unknown`; it is never dropped or guessed.

## Output

| Field | Meaning |
|---|---|
| `report` | Status report text |
| `actions` | Routing and unblocking actions to take |
| `owner_decisions` | Escalations in the decision format |
| `plan_recorded` | `yes` or `no` |
| `unverified` | Package ids whose state is unknown |

No open packages returns a one-line message.

## Run modes

Run modes v2. Besides its own args, the workflow takes the optional `run` arg defined in the engineering-practices
[workflow run modes reference](https://github.com/opsroller/engineering-practices/blob/main/docs/reference/workflow-run-modes.md):
`run: { mode: "inline" }` runs every phase in the calling session with no subagents, `run.only` runs chosen phases or steps,
and `run.from` with `run.results` resumes a stopped run. Without `run`, the workflow and its outputs are as above.
See [how to run a workflow inline](https://github.com/opsroller/engineering-practices/blob/main/docs/how-to/how-to-run-a-workflow-inline.md).

Step labels, for `run.only` and `run.results`: `read-plan`, `<package id>` (one per open package), `triage`, `record`, `report`.

Independent steps: none.
