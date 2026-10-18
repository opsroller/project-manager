Reference: for anyone running or reading the output of the `close-stream` workflow.

# close-stream

File: `workflows/close-stream.js`.

## Arguments

| Arg | Required | Meaning |
|---|---|---|
| `stream` | yes | The owner request or stream name to close |
| `plan` | no | Path to the work-package plan; default: the plan named in `CLAUDE.md` |

Missing `stream` returns a usage string.

## Phases

| Phase | Agents | Does | Skills |
|---|---|---|---|
| Gather | 1 | Stream outcome in the owner's words; its packages with done-when, owed docs, PR | - |
| Verify | 1 per package, read-only | Merged, unmet done-when lines, docs one kind per page and linked, shared records present | `close-out` |
| Close | 1 | Docs Plan (affected kinds), Do (plan done with links, unrecorded rules, lessons, docs pages), Check (one kind per page, titles) | `close-out`, `standing-rules` |
| Report | 1 | Short done message to the owner | `status-reporting` |

If any package is unmerged, has an unmet done-when line, or lacks its
docs, the workflow stops before Close and returns `blocked`. A failed
verifier counts as unverified, which blocks.

## Output

| Field | Meaning |
|---|---|
| `status` | `closed`, `blocked`, or `verified, not closed` |
| `open_items` | (blocked) the packages and what is missing |
| `outcome` | The stream's outcome in the owner's words |
| `report` | (closed) message to the owner |
| `close_notes` | (closed) pages touched and lessons recorded |
