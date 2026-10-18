---
name: work-breakdown
description: Use when turning an owner's request or goal into work packages - outcome, owning role, owned paths, contracts, dependencies and a checkable done-when - that agents can pick up and finish in parallel.
---

# Work breakdown

A work package is the smallest unit of work one role can finish, merge
and have checked: one outcome, one owning role, owned paths, done-when.
The method borrows the work breakdown structure's rules (100% rule,
mutually exclusive elements, outcomes not actions) and Kanban's explicit
start and finish criteria.

## Steps

1. **Read the record first.** Load the standing rules and decisions
   (`standing-rules`), the current plan and the project profile. Note
   every rule that binds this request.
2. **Restate the outcome.** One sentence, in the owner's words: what is
   true when this is done. If the request is ambiguous and the record
   does not settle it, pick the reading that is cheapest to change, say
   so in the plan, and go. Ask the owner only when a wrong guess would
   waste real work or cross a one-way door.
3. **Find the deliverables.** List the outcomes that together make the
   request true. Apply the **100% rule**: the children cover all of the
   parent and nothing outside it. Missing docs, tests, credits or
   release steps are the usual gaps.
4. **Cut by job function.** Each deliverable that needs two roles
   becomes two packages with a contract between them (an interface, a
   file format, a spec). Name the contract and who owns it.
5. **Size.** A package fits one branch and one pull request and lands
   within one reporting period. Split anything larger by outcome, not by
   step ("menus navigable by keyboard", not "write menu code").
6. **Assign paths.** Owned paths must not overlap another open
   package. Shared files go on an append-only rule instead of an owner.
7. **Write the done-when.** Observable and checkable by a reviewer
   without asking the author: behaviour, artefact, test, doc. Include
   the Diataxis doc the work needs (see below).
8. **Order by dependency, not discipline.** Contracts and interfaces
   first, so dependants start against them with stubs in parallel. Mark
   the critical path.
9. **Staff.** Hand each package to `staffing`. A package whose role does
   not exist yet waits behind a role-authoring package.
10. **Publish.** Write the packages into the project's plan (the
    work-package list named in `CLAUDE.md`), where every agent reads it.

Package fields and a worked example: [package-template.md](package-template.md).

## Decision rules

- Outcome-based names, never activity names.
- One owner per package. "Shared by X and Y" means it is two packages.
- If you cannot write a done-when, the package is not understood yet:
  make the first package a short spike whose output is that done-when.
- Prefer more, smaller packages that run in parallel over one large one.
- Don't plan beyond what is needed to start; refine as packages land.
- No package exists only to obtain an approval the owner never asked for.

## Docs in every done-when

Each package's done-when names the docs it owes, by Diataxis kind, in
the project's docs, delivered in the same PR as the work. Classify with
the compass (action or cognition; study or work):

| Work produced | Docs it owes |
|---|---|
| New feature, system, interface, format | Reference for the interface; explanation if a design choice was made; how-to if users must do something new |
| Bug fix | Reference update if behaviour changed; troubleshooting how-to if users hit it |
| Decision between alternatives | Explanation page (decision-record style) |
| New onboarding path | Tutorial, tested from a clean start |

Until the project has a technical-writer role, docs are each owning
role's own job: they sit inside the package, never in a separate
"write the docs" package for someone else.

## Checklist

- [ ] Outcome restated in the owner's words
- [ ] 100% rule: nothing missing (docs, tests, credits, release), nothing extra
- [ ] Every package: outcome, role, owned paths, contracts, depends-on, done-when incl. docs by kind
- [ ] No overlapping owned paths; shared files are append-only and named
- [ ] Contracts sequenced first; critical path marked
- [ ] Every binding standing rule reflected
- [ ] Plan written where agents read it

## Failure modes

- **Activity lists** ("research", "implement", "polish") instead of
  outcomes: nobody can tell when they are done.
- **Discipline waterfalls**: all design, then all code, then all docs.
  Cut by outcome so roles work in parallel against contracts.
- **Hidden shared files**: two packages edit the same file and collide.
- **Gold-plated plans**: a detailed schedule for work nobody has
  started. Plan the next layer; keep the rest coarse.
- **Docs as a later package**: docs belong in each package's done-when.
