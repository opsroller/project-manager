# Project manager

A role plugin for coordinating a team of role agents on behalf of an
owner. The project manager turns each request into work packages with
an outcome, an owning role, owned paths and a checkable done-when;
staffs every package role-first, so no discipline starts before its
role plugin is merged; records the owner's rules and decisions in their
own words so the owner is never asked twice; routes and unblocks agents;
and reports status in the owner's terms. It does not do the hands-on
work, and it adds no approval steps the owner did not ask for.

This is a generic job function. The project it works on supplies the
specifics (plan location, rules record, tools) in its `CLAUDE.md` and
project profile.

## Install

```
/plugin marketplace add opsroller/claude-plugins
/plugin install project-manager@opsroller
```

It builds on `engineering-practices`; install that too.

## Documentation

**Start here.** [Plan and staff your first request](docs/tutorials/first-task.md)
walks through one request from rule to published plan.

**Doing the job.** Task guides for a project manager at work:
[plan and staff a request](docs/how-to/how-to-plan-and-staff-a-request.md),
[record an owner's rule](docs/how-to/how-to-record-an-owners-rule.md),
[staff a job no role covers](docs/how-to/how-to-staff-a-job-no-role-covers.md),
[unblock an agent](docs/how-to/how-to-unblock-an-agent.md),
[report status to the owner](docs/how-to/how-to-report-status-to-the-owner.md) and
[close a finished request](docs/how-to/how-to-close-a-finished-request.md).

**Looking things up.** The [reference](docs/reference/index.md) describes
the agent, the seven skills and the three workflows (`plan-and-staff`,
`status-sweep`, `close-stream`) with their arguments and outputs.

**Understanding it.** [About the project-manager role](docs/explanation/about-the-role.md)
covers what the job is, why role-first, why a written rules record, its
boundaries with neighbouring roles, and how the role grows. The research
behind it is in [SOURCES.md](SOURCES.md).

## License

Copyright (C) 2026 the contributors. Licensed under the GNU General Public License v2.0 or later (`GPL-2.0-or-later`); see `LICENSE`.
