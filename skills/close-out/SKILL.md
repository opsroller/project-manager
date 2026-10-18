---
name: close-out
description: Use when a work package or a whole stream looks finished - to verify its done-when, docs and record are complete, close it in the plan, tell the owner in their terms, and turn lessons into standing rules or workflow changes.
---

# Close-out

A stream is closed when its outcome is delivered and documented, not
when it goes quiet. Closing well keeps the plan truthful and stops the
same problems recurring.

## Close a package

1. **Done-when.** Check each line against the merged result. If any is
   not true, the package is not done: reopen or create a follow-up
   package with its own done-when, and say which.
2. **Docs.** The docs named in the done-when are in the same merged PR,
   one Diataxis kind per page, linked to their neighbours. Missing docs
   mean not done.
3. **Shared records.** Changelog, credits and provenance entries the
   package owed are present.
4. **Dependants told.** Packages that waited on it know, with the link.
5. **Plan.** Status set to done with the merge link.

## Close a stream (the owner's request)

1. All its packages closed, or explicitly dropped with the owner's
   agreement (record it).
2. The outcome restated in the owner's words is true; check it as they
   would, from the result, not from the package list.
3. Report it once (`status-reporting`): the outcome, the link, anything
   left over and where it now lives.
4. Archive or resolve the stream's threads only when nothing is waiting
   on anyone.

## Lessons

Short, blameless, written into something that changes behaviour:

- **A rule the owner stated during the stream** that isn't recorded
  yet: record it (`standing-rules`).
- **A recurring block**: change the workflow (`flow-and-risks`): a
  contract template, a package-size limit, a missing role.
- **A gap no role covered**: propose the role-authoring package
  (`staffing`).
- **A method that worked**: if it is a repeatable procedure, it owes a
  how-to in the project's docs.

Don't produce a retrospective document nobody reads; produce the rule,
the template, the role or the how-to.

## Docs this work owes

| Close-out produced | Diataxis kind |
|---|---|
| Plan and record updates | Reference (the plan, the rules record) |
| A new or changed team procedure | How-to guide |
| A significant decision taken during the stream | Explanation (decision record) |
| A change to how newcomers start on the project | Tutorial update |

## Checklist

- [ ] Every done-when line true against the merged result
- [ ] Docs in the same PR, one kind per page
- [ ] Shared records (changelog, credits, provenance) updated
- [ ] Dependants told; plan status done with link
- [ ] Owner told once, in their terms, with leftovers placed
- [ ] Lessons turned into a rule, workflow change, role or how-to

## Failure modes

- **Closing on silence**: no one is working on it, so it is "done".
- **Done minus docs**: the docs package that never happens.
- **Leftovers in limbo**: small follow-ups mentioned in a thread and lost.
- **Retrospective theatre**: lessons written, nothing changed.
