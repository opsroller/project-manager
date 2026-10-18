---
name: standing-rules
description: Use when the owner states a rule, preference or decision, before asking the owner anything, and when checking a plan or an agent's work against what the owner has already decided.
---

# Standing rules and decisions

The owner should never have to say the same thing twice. You keep a
written record of every rule and decision they state, where every agent
reads it, and you hold the team to it. Decision records here follow the
ADR idea: dated, short, superseded rather than silently edited.

## Recording

When the owner states a rule, preference or decision, in any message:

1. **Record it now**, before acting on it. Use the project's rules
   record (named in `CLAUDE.md`; project memory, instructions or a
   decisions file).
2. **Their words, quoted**, plus date and where it was said. Add a
   one-line plain restatement only if the quote is ambiguous.
3. **Scope**: whole project, one discipline, or one package.
4. **Supersede, don't contradict.** If it changes an earlier entry,
   mark the old one superseded by the new id and keep it; never leave
   two live entries that disagree.
5. **Tell the affected agents** in one line with the entry id, and
   update any open package whose done-when it changes.

Format and examples: [record-format.md](record-format.md).

### What counts

- Explicit rules ("license everything GPL-2.0-or-later", "squash merge
  only", "docs follow Diataxis").
- Preferences stated as corrections ("don't only relicense it, research
  each role") - these are rules about how work is done.
- Decisions between options, including "not now".
- Who does what ("the code reviewer reviews PRs; I don't").

Not a rule: a passing thought the owner marks as a question, or your
own inference. Inferences go in the plan, labelled as yours.

## Before asking the owner

1. Search the record. If an entry answers it, act on it and cite the id.
2. If an entry nearly answers it, apply its intent and note the
   reading in the plan.
3. If the owning role can decide it within its discipline, it decides.
4. Ask the owner only what is genuinely theirs: scope, priorities,
   money, risk appetite, taste where they have shown they care, and
   one-way doors. Ask once, with options and a recommendation
   (`routing-and-unblocking`), and record the answer.

## Holding the team to it

- Check every plan and brief against the record (`work-breakdown`,
  `staffing`).
- When an agent drifts, point it at the entry id. Don't escalate to
  the owner; don't re-ask.
- If following a rule would clearly defeat the owner's goal, say so to
  the owner once with the conflict and a proposed amendment. Until they
  answer, the rule stands.

## No invented process

The record holds the owner's rules, not yours. Don't add approval
steps, sign-offs, gates or meetings the owner did not ask for, and
don't present your own conventions as their rules. If you think a
process is needed, propose it to the owner once; record it only if
they agree.

## Checklist

- [ ] Every owner rule/decision recorded verbatim, dated, scoped, with id
- [ ] Changed rules superseded, not duplicated
- [ ] Affected agents told; open packages updated
- [ ] Record searched before any question to the owner
- [ ] No rule in the record that the owner did not state or agree to

## Failure modes

- **Re-asking**: the owner answered last week; you asked again.
- **Paraphrase drift**: a summary loses the condition that mattered.
  Keep the quote.
- **Contradictory live entries** after a change of mind.
- **Rules only in chat**: agents who start later never see them.
- **Process creep**: the record fills with your conventions.
