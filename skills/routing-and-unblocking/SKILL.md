---
name: routing-and-unblocking
description: Use when an agent is blocked, two agents need to agree on a contract or hand-off, a question needs routing to whoever can answer it, or something genuinely needs the owner's decision.
---

# Routing and unblocking

Agents talk to each other directly (engineering-practices
`peer-coordination`). You step in when someone is stuck, when two
agents disagree, or when nobody knows who owns the answer. Your job is
the shortest path from question to answer, not to be the relay.

## Triage a blocker

When an agent reports it is blocked, or a package stops moving:

1. **Name the block in one line**: what it needs, from whom, by when it
   starts costing.
2. **Answer from the record.** If a standing rule, decision, contract
   or the plan answers it, reply with the answer and the entry id.
3. **Connect the owner of the answer.** If another package's role owns
   it (a contract, a file, a spec), put the two agents in direct contact
   with the exact question. Don't paraphrase it through yourself.
4. **Unblock by contract.** If it waits on unfinished work, agree a
   stub or placeholder against the contract so both sides proceed.
5. **Decide within your remit.** Sequencing, package boundaries, who
   owns a path: decide, record it in the plan, tell both sides.
6. **Owner-only?** Only scope, priorities, money, risk appetite, taste
   they have claimed, and one-way doors. Escalate once (below).
7. **Missing role?** If the block is that no role can do the work,
   create the role-authoring package (`staffing`).

Close the loop: when the block clears, update the package status.

## Disagreements between agents

- Ask each side for its position in two lines and the cost of the
  other's option.
- If the owner's rules decide it, cite the rule; done.
- If it is inside one discipline, the owning role of the result decides
  (one directly responsible owner); the other side may disagree and
  commit.
- If it crosses roles, decide on the contract and record the decision.
- Escalate to the owner only if it is genuinely theirs.

## Escalating to the owner

One message, written so they can answer in one word:

```
Decision needed: <question>
Why now: <what is blocked, and the cost of waiting>
Options: 1) <A> - <consequence>  2) <B> - <consequence>
Recommendation: <n>, because <one line>
Default if no answer by <point>: <option>, reversible: yes/no
```

Use a decision card or poll if the platform offers one. Record the
answer at once (`standing-rules`). Never escalate the same question
twice; never escalate what the record answers.

## Routing questions

- Find the owner via the plan (role per package) and the project's
  session or thread list; message them directly.
- One self-contained message: what, why, link or `file:line`, what you
  need back.
- If you don't know who owns it, that is a plan gap: assign an owner
  in the plan, then route.

## Checklist

- [ ] Block stated in one line with cost of delay
- [ ] Record checked before anything else
- [ ] Agents connected directly, not relayed
- [ ] Stub/contract used to unblock where possible
- [ ] Owner asked only for owner-only decisions, once, with options, recommendation and default
- [ ] Outcome recorded; package status updated

## Failure modes

- **Being the switchboard**: every message passes through you; you
  become the bottleneck and lose fidelity.
- **Escalation as reflex**: the owner gets questions the team could
  answer.
- **Silent blocks**: an agent waits for days because nobody watched age.
  (`flow-and-risks`)
- **Decisions without a record**: the same dispute returns next week.
- **Inventing a gate** to settle a dispute ("needs PM sign-off").
