---
name: flow-and-risks
description: Use when reviewing the state of work in progress - limiting how much runs at once, finding stuck or aging packages, tracking dependencies on the critical path, and keeping a short list of risks with owners and responses.
---

# Flow and risks

Kanban's core practices applied to a team of agents: make the work
visible, limit work in progress, actively manage items in flow, and
improve the workflow. Risks are managed continually, with one owner
each and a proportionate response.

## The board

The plan is the board. Each package shows a state with explicit entry
and exit criteria:

| State | Enters when | Leaves when |
|---|---|---|
| todo | in the plan, staffed, role merged | an agent starts it on a branch |
| in progress | branch exists | PR ready for review |
| in review | PR ready | approved and merged (or sent back) |
| blocked | needs something outside the package | the block clears |
| done | merged, done-when true, docs in | - |

Use whatever tool the project names (an issue board, a markdown table);
the states and criteria matter, not the tool.

## Review routine

Each time you run a status sweep, or when a package changes state:

1. **WIP.** Count packages in progress per role. Keep to the limit the
   project sets; without one, one package per agent at a time. Finish
   before starting.
2. **Age.** For each in-progress or in-review package, how long since it
   started? Compare with what similar packages took. Look first at the
   oldest; age is the early warning, before anyone says "blocked".
3. **Blocked.** Each blocked item gets triage (`routing-and-unblocking`)
   the same day.
4. **Dependencies.** Walk the critical path. If a package others depend
   on is aging, it gets attention first.
5. **Review queue.** Many items waiting in review means the bottleneck is
   review: stop starting, help finish.
6. **Pull next.** When an agent frees up, offer the highest-priority todo
   package whose dependencies are met or stubbable.

Flow measures, if useful and the data is there: work in progress,
throughput (finished per period), work item age, cycle time. Use them
to forecast from history ("most packages like this finish in N days"),
not to judge agents.

## Risks

A risk is something that has not happened yet and would hurt the
outcome. Keep a short list beside the plan:

```
K-<n>  <risk, one line>          likelihood: low|med|high  impact: low|med|high
Owner: <role>   Response: avoid | reduce | accept | escalate
Trigger: <what we would see first>   Next step: <action, owner>
```

- Five to ten live risks is plenty. More means you are listing worries.
- Every risk has one owner and a trigger you will actually notice.
- When a risk happens it becomes an issue: a blocked package or a new
  package, handled now.
- Include opportunities (work that could be dropped or simplified).
- Escalate to the owner only risks that touch their scope, timeline,
  money or reputation, with a proposed response.

Typical risks on an agent team: a contract still unsettled while
dependants build; a role not merged yet; two packages near the same
paths; licensing or provenance of third-party material; a review queue
backing up; a rule the owner stated that a plan quietly breaks.

## Improve the workflow

When the same kind of block happens twice, change the system, not just
the instance: a missing contract, a missing role, an unclear rule, an
over-large package size. Record the change in the plan; if it changes
how the owner's work is done, propose it to them once.

## Checklist

- [ ] Every package has a state with clear entry/exit
- [ ] WIP within limit; nothing started while review is the bottleneck
- [ ] Oldest items looked at first; critical path checked
- [ ] Blocked items triaged the same day
- [ ] Risks: few, owned, with triggers and next steps
- [ ] Repeated blocks turned into a workflow change

## Failure modes

- **Starting everything**: many packages open, few finishing.
- **Status by asking**: you poll agents instead of reading the board.
- **Risk theatre**: a long register nobody acts on.
- **Measuring people**: flow metrics used to rank agents.
