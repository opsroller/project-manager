---
name: staffing
description: Use when choosing which role plugin does a work package, briefing the agent that takes it, or when a job has no role yet and the role itself must be written first (role-first).
---

# Staffing

Staff by **job function**: who would do this on any team? That role's
plugin does the package. The project supplies the tools; the role
supplies how the job is done well.

## Role-first rule

No discipline starts before its role plugin exists and is merged.

1. Check the team's role catalog (the installed marketplace, or the
   list in the project profile). Is there a role whose job function
   covers this package?
2. **Yes, merged:** staff it. The agent loads that plugin before work.
3. **Yes, but not merged** (open PR, draft): the package is blocked by
   that PR. Say so in the plan. Route review to the code reviewer; do
   not start the work under a half-made role.
4. **No role covers it:** the first package is *writing that role*:
   a generic job-function plugin (agent, skills, workflows, docs)
   researched from real sources. Every package in that discipline
   depends on it. Do not borrow a neighbouring role "for now".
5. If an existing role covers most of the job but not a recurring part,
   the package is a change to that role, not a new role.

### Is it a new role or a project detail?

| Signal | It is |
|---|---|
| A person could be hired for it on any team | a role |
| It names a tool, engine, language, vendor or product | a project detail: profile, not role |
| It is a one-off task inside an existing discipline | a package for that role |
| It recurs and no role's skills describe it | a new skill in the closest role, or a new role |

Roles stay generic. Anything specific to this project goes in the
project's own profile, never in the role.

### Spotting jobs no role covers

Run this on every plan, not only when something feels missing:

- For each package, name the job title a team would hire for it. If
  that title is not in the catalog, it is a gap.
- Look for work every package keeps doing "on the side" (docs,
  localization, release notes, accessibility audits). Recurring side
  work across roles is often a role waiting to be written.
- Look for packages with no natural owner, or that two roles each
  assume the other has.
- Record each gap in the plan with what currently covers it. Say it to
  the owner once as a proposed role-authoring package; don't block
  work on a gap that an existing role already covers well enough.

Example: a technical-writer role may be planned. Until it exists and is
merged, docs stay each owning role's own job, written in the same
package as the work. When it lands, re-staff only new docs-heavy
packages; don't move docs out of other roles' done-when.

## Matching

- Match on the **outcome**, not the files touched. A shader for a 3D
  asset is the technical artist's; the renderer that runs it is the
  graphics programmer's.
- At a boundary between two roles, split the package and put a contract
  between them (`work-breakdown`).
- One package, one owning role. Contributors can be named; the owner
  decides within the package.
- Prefer the role that will own the result after it ships.

## Briefing an agent

Write the brief so the agent could start without asking you anything:

```
Package:    WP-<id> <outcome>
Asked for:  <the owner's own words, quoted, with date>
Done when:  <checks>
Owned paths / contracts: <...>; neighbours: <role -> paths>
Binding rules and decisions: <ids + one line each>
Depends on: <WP ids, stub allowed?>
Docs:       <Diataxis kind and where>
Load first: engineering-practices (project-onboarding), <role plugin>
```

Leave out history, other packages' details and your reasoning. Point to
the record instead of paraphrasing it.

## Checklist

- [ ] Role chosen by job function; merged plugin exists
- [ ] Gaps scanned: every package has a hireable job title in the catalog
- [ ] Missing role -> role-authoring package created first and dependants blocked on it
- [ ] No project specifics pushed into a role
- [ ] Brief has owner's words, done-when, paths, rules, neighbours, docs
- [ ] Plan shows role and merged status per package

## Failure modes

- **Staffing by technology** ("the scripting agent") instead of job.
- **Stretching a neighbour**: the UI developer writes the sound mix
  because no sound role exists yet. Write the role first.
- **Starting under a draft role**: the work bakes in whatever the
  unmerged plugin said that week.
- **Over-briefing**: a wall of context hides the done-when.
- **Role pollution**: project paths or tools written into a role plugin.
