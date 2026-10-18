Reference: for anyone running or reading the output of the `plan-and-staff` workflow.

# plan-and-staff

File: `workflows/plan-and-staff.js`.

## Arguments

| Arg | Required | Meaning |
|---|---|---|
| `request` | yes | The owner's request, quoted in their words |
| `plan` | no | Path to the work-package plan; default: the plan named in the project's `CLAUDE.md` |

Missing `request` returns a usage string.

## Phases

| Phase | Agents | Does | Skills |
|---|---|---|---|
| Read | 1 | Restates the outcome; lists binding rules, role catalog with merged status, open owned paths, owner-only open questions | `standing-rules` |
| Break down | 1 | Packages with job title, paths, contracts, dependencies, done-when, docs by Diataxis kind | `work-breakdown` |
| Staff | 1 per package | Role, exists, merged, gap, brief | `staffing` |
| Check | 1 | Rules, overlaps, role-first (adds role-authoring packages), docs in done-when, no invented gates | `standing-rules`, `staffing`, `work-breakdown` |
| Publish | 2 | Writes plan and new rules (docs Do step); Diataxis one-kind check (docs Check step) | `work-breakdown`, `standing-rules` |

Docs Plan step: Publish names the reference pages affected (the plan; the rules record).

## Output

| Field | Meaning |
|---|---|
| `status` | `published`, `unchecked` (checker failed; nothing published), or `not published` |
| `outcome` | The request restated in the owner's words |
| `packages` | Corrected, staffed packages |
| `role_packages_added` | Role-authoring packages created for gaps |
| `problems` | Issues the check found |
| `owner_questions` | Owner-only questions the record does not answer |
| `docs_check` | `ok`, a list of fixes, or `unverified` |

A package with no staffing result is kept and marked unstaffed.
