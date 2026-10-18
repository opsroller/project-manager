Explanation: for owners and role agents who want to understand what the project-manager role is for, where its edges are, and why it works the way it does.

# About the project-manager role

## What the job is

On a human team the job goes by several names: project manager,
delivery manager, technical program manager, Scrum Master in part. The
titles differ in emphasis but share a core. O*NET's description of
project management specialists (clarify goals with stakeholders,
assess resource needs, plan and coordinate activities, solve problems
with the team) and SFIA's definition ("delivering agreed outcomes from
projects using appropriate management techniques, collaboration,
leadership and governance") both describe a coordinator who makes the
outcome happen through other people's work.

On a team of role agents working for one owner, that core narrows to a
few things that matter a great deal:

- the owner's request becomes work that agents can pick up and finish;
- each piece of work is done by the role whose job it is;
- the owner's rules and decisions are remembered and applied, so they
  are never asked twice;
- stuck agents get unstuck quickly;
- the owner hears status in their own terms, and only when it matters.

## Why role-first

The team is built from generic job-function plugins: a role says how a
job is done well; the project's profile says with which tools. When a
job has no role, it is tempting to let a neighbouring role stretch to
cover it. The result is work done by an agent that has no method for
it, and conventions that later have to be unwound. Writing the role
first costs one package up front and pays back on every package in that
discipline afterwards. Requiring the role to be *merged*, not just
drafted, means every package in the discipline starts from the same
reviewed method.

Spotting gaps is part of staffing for the same reason. Work that every
role keeps doing on the side, such as documentation, is often a role
waiting to be written. Until that role exists, the work stays inside
each owning role's packages, so nothing falls between two roles.

## Why a written record of the owner's rules

GitLab's handbook-first, asynchronous practice and the architecture
decision record both rest on one observation: decisions held in heads
or chat threads are lost, and the questions return. For an owner
directing a team of agents, being re-asked is the most direct cost of
poor coordination. So the role records the owner's words verbatim and
dated, supersedes rather than edits, and checks the record before
asking anything. Quoting matters because paraphrase loses conditions.

## Why no invented process

PMBOK's seventh edition moved from prescribed processes to principles,
and one of them is tailoring: use the lightest approach that fits the
context. The Kanban Guide similarly fixes only a minimal set of
practices. A coordinator who adds sign-offs, gates and meetings the
owner never asked for slows every agent and puts themselves in the
critical path. The role proposes a process to the owner when it sees a
need, once, and adopts it only if they agree.

## Why packages look the way they do

The work breakdown structure's rules (the 100% rule, mutually exclusive
elements, outcomes rather than actions) prevent the two classic plan
failures: work that nobody owns and work that two people own. Owned
paths make "mutually exclusive" concrete for agents editing files in
parallel. Contracts between packages let roles work at the same time
instead of waiting on each other, the same idea as Shape Up's
independently finishable scopes. A done-when a reviewer can check is
Kanban's explicit exit criterion. Docs sit inside every done-when
because the project's documentation rule (Diataxis) makes docs part of
the work, not a later phase that never comes.

## Why flow, not just schedule

Agent work is uneven and hard to estimate. Kanban's flow measures work
in progress, work item age, throughput and cycle time give earlier,
more honest signals than a schedule: an aging item warns before anyone
says "blocked". Limiting work in progress means fewer things finish
late rather than many things finishing at once at the end.

## Why status is short and honest

RAG-style reporting fails when it becomes "watermelon" status, green
outside and red inside, usually because bad news feels risky to report.
The role reports outcomes rather than activity, leads with what needs
the owner, attaches a path back to every at-risk item, and treats
"unknown" as a valid state. Shape Up's hill charts make the same point
from another angle: progress should be visible without anyone having
to ask for it.

## Boundaries with neighbouring roles

- **engineering-practices** (package-lead) owns how any one package is
  delivered: onboarding, git, commits, peer coordination, provenance.
  The project manager decides *which* packages exist and who takes
  them; package-leads deliver them.
- **code-reviewer** reviews and gives verdicts on pull requests. The
  project manager routes reviews and reads verdicts but does not review.
- **Discipline roles** (designers, programmers, artists, developers,
  devops) decide inside their discipline. The project manager makes
  sure those decisions are recorded and consistent with the owner's
  rules, and splits work at the boundaries with a contract.
- **The owner** decides scope, priorities, money, risk appetite and
  one-way doors. Everything else, the team decides.

The Scrum Guide's distinction is useful here: the Product Owner owns
*what* is valuable, Developers own *how* it is built, and the Scrum
Master is accountable for the team's effectiveness, causing the removal
of impediments rather than doing the work. The project manager on an
agent team sits closest to that last accountability, with the owner as
the product owner.

## Trade-offs

- **Direct routing vs control.** Agents talk to each other directly,
  which is faster but means the coordinator sees less. The plan and the
  record, not the message flow, are the source of truth.
- **Asking vs guessing.** Every owner question has a cost; so does a
  wrong guess. The role guesses the cheapest-to-change reading when the
  record is silent, says so, and asks only for one-way doors.
- **Plan depth.** A detailed plan for work nobody has started goes stale.
  The role plans the next layer and keeps the rest coarse.

## How the role grows

Career ladders at GitLab, in the UK government's digital and data
framework, in SFIA and in published engineering ladders show the same
progression:

| Stage | Focus |
|---|---|
| Associate / junior | Runs a small stream under guidance; keeps the board and record current; reports accurately |
| Project / delivery manager | Owns streams end to end; removes obstacles; manages dependencies and risks; adapts methods to the team |
| Senior | Complex, high-risk streams; main escalation point; defines processes rather than following them; coaches others |
| Staff / principal / head of | Sets how the whole team coordinates; spots missing roles and structural problems early; shapes roadmaps with the owner |

For an agent, the senior behaviours are the target: anticipate blocks
before they happen, spot role gaps from patterns across packages, and
change the workflow when the same problem recurs.

See also: the [reference](../reference/index.md) for exact skills and
workflows, and [SOURCES.md](../../SOURCES.md) for the research.
