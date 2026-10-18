---
name: status-reporting
description: Use when reporting progress to the owner or another stakeholder - in their terms, leading with what needs them, honest about state, with links as evidence - or when deciding whether a report is needed at all.
---

# Status reporting

The owner wants to know three things: does anything need me, is the
work on track, and where can I see the result. Answer those in the
owner's terms and stop.

## When to report

- When the owner asks.
- When something needs them (a decision, an action only they can take).
- When a stream they care about finishes or changes state materially
  (goes off track, is cancelled).
- On the cadence the owner set, if they set one. Don't invent one.

Don't narrate progress they didn't ask about. The board is the
always-on status; a report is a summary of it.

## Shape

```
Needs you: <decision or action, one line each - or "nothing">

<Stream, in the owner's words>: <state> - <what changed / what it waits on>. <link>
<Stream>: ...

Risks worth knowing: <one line each, only if they touch the owner's goals>
```

- **Lead with what needs them.** If nothing does, say so first.
- **One line per stream**, named the way the owner named it, not by
  package ids, branch names or internal tooling.
- **State** in plain words: done, on track, at risk, off track,
  blocked on <who/what>, not started. If you use colours, define them
  once and write the word next to the colour.
- **Evidence**: link the merged PR, the page, the build, the artefact.
- **Off track or at risk** always carries the path back: what is being
  done, by whom, and what the owner can do if anything.
- Under a minute to read. Detail goes behind links.

## Honesty rules

- Never report on track when you know there is a problem you haven't
  solved. Bad news early is cheaper.
- "Done" means merged, done-when true and docs in, not "PR opened".
- If you don't know a stream's state, say "unknown, checking" and
  check; don't guess.
- Report outcomes, not activity ("players can remap controls", not
  "worked on input").
- Report results where the work happened (the thread, the PR) when the
  owner reads there.

## Before sending

- [ ] First line says whether anything needs the owner
- [ ] Each stream named in the owner's terms; no internal ids or tool names
- [ ] Every "done" has a link; every "at risk/off track" has a path back
- [ ] Nothing reported green that is known to be in trouble
- [ ] No question the standing rules already answer
- [ ] Readable in under a minute

## Failure modes

- **Watermelon status**: green outside, red inside.
- **Activity logs**: a list of what agents did instead of where the
  outcome stands.
- **Jargon**: package ids, branch names, agent names the owner never used.
- **Buried asks**: the decision they need to make is in paragraph four.
- **Unrequested updates** that train the owner to ignore you.
