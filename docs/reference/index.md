Reference: for anyone using or staffing the project-manager plugin who needs the exact parts, fields and arguments.

# Project-manager reference

The plugin has three kinds of parts. The agent is the role itself. The
skills are the methods it follows. The workflows run its multi-agent jobs.

## Agent

- [project-manager agent](agent.md): mission, responsibilities, quality bar, boundaries.

## Skills

Planning and staffing:
- [work-breakdown](skills/work-breakdown.md): request to work packages.
- [staffing](skills/staffing.md): role-first staffing, gap spotting, briefs.
- [standing-rules](skills/standing-rules.md): the owner's rules and decisions record.

Running the work:
- [routing-and-unblocking](skills/routing-and-unblocking.md): blockers, disputes, escalation.
- [flow-and-risks](skills/flow-and-risks.md): board states, WIP, age, risks.
- [status-reporting](skills/status-reporting.md): owner status reports.
- [close-out](skills/close-out.md): closing packages and streams; lessons.

## Workflows

- [plan-and-staff](workflows/plan-and-staff.md): new request to a published, staffed plan.
- [status-sweep](workflows/status-sweep.md): inspect, triage, record, report.
- [close-stream](workflows/close-stream.md): verify and close a finished request.

## Manifest

`.claude-plugin/plugin.json`:

| Field | Value |
|---|---|
| `name` | `project-manager` |
| `version` | `0.3.0` |
| `description` | one-line summary of the role |
| `author.name` | `opsroller` |
| `repository` | `https://github.com/opsroller/project-manager` |
| `license` | `GPL-2.0-or-later` |
| `keywords` | `role`, `job-function`, `project-management`, `delivery-management`, `coordination` |

## Sources

The research behind the plugin is listed in [SOURCES.md](../../SOURCES.md).
