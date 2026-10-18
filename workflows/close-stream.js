// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'close-stream',
  description: 'Close an owner request when its packages look finished: verify every done-when and its docs, close the plan entries, capture lessons as rules or workflow changes, and draft the one-line report to the owner. args: { stream: "<owner request or stream name>", plan: "<path to work-package plan, optional>" }',
  phases: [
    { title: 'Gather', detail: 'packages of the stream' },
    { title: 'Verify', detail: 'one verifier per package: done-when and docs' },
    { title: 'Close', detail: 'plan, record, lessons; Diataxis check' },
    { title: 'Report' },
  ],
}

const stream = args && args.stream
if (!stream) return 'Usage: close-stream with args { stream: "<owner request or stream name>", plan: "<optional path to the work-package plan>" }'
const planPath = (args && args.plan) || "the project's work-package plan named in CLAUDE.md"

const LIST = { type: 'object', properties: {
  outcome: { type: 'string' },
  packages: { type: 'array', items: { type: 'object', properties: {
    id: { type: 'string' }, done_when: { type: 'string' }, docs: { type: 'string' }, pr: { type: 'string' },
  }, required: ['id', 'done_when'] } },
}, required: ['outcome', 'packages'] }

const VERIFY = { type: 'object', properties: {
  id: { type: 'string' }, merged: { type: 'boolean' },
  unmet: { type: 'array', items: { type: 'string' } },
  docs_ok: { type: 'boolean' }, docs_issues: { type: 'array', items: { type: 'string' } }, link: { type: 'string' },
}, required: ['id', 'merged', 'unmet', 'docs_ok'] }

phase('Gather')
const list = await agent(`Follow engineering-practices project-onboarding. In ${planPath}, find every package serving this stream and the stream's outcome in the owner's words. Return each package's done-when, the docs it owes and its PR.\nStream: ${stream}`, { schema: LIST, phase: 'Gather', label: 'gather' })
if (!list) return 'close-stream stopped: could not read the plan.'
if (!list.packages.length) return `No packages found for stream: ${stream}`

const results = await pipeline(list.packages, p => agent(`Read-only. Follow the project-manager close-out skill (Close a package, steps 1-3). Check this package against its merged result: is it merged, which done-when lines are not true, are the docs it owes present in the same PR with one Diataxis kind per page and linked to their neighbours, are owed changelog/credits/provenance entries present. Edit nothing.\n${JSON.stringify(p)}`, { schema: VERIFY, phase: 'Verify', label: p.id }))
const verified = list.packages.map((p, i) => results[i] || { id: p.id, merged: false, unmet: ['unverified: verifier failed'], docs_ok: false })
const open = verified.filter(v => !v.merged || v.unmet.length || !v.docs_ok)

if (open.length) {
  return { status: 'blocked', stream, outcome: list.outcome, open_items: open, note: 'Stream not closed. Create follow-up packages or finish these, then run again.' }
}

phase('Close')
const closed = await agent(`Follow the project-manager close-out and standing-rules skills. Docs plan: closing changes reference docs (plan statuses; rules record if the stream produced owner rules not yet recorded) and, if a repeatable procedure emerged, a how-to; a significant decision taken during the stream owes an explanation page. Do: in one edit, mark these packages done with their links in ${planPath}; record any unrecorded owner rule verbatim with date; turn lessons into a rule proposal, workflow change, role-authoring proposal or how-to. Classify every user-visible change in this work with the Diataxis compass (action/cognition x study/work). For each, update or add exactly one page of that kind under docs/<kind>/, keep each page to one kind, title it by the project pattern, and link to the related pages of the other kinds. Report pages touched and any change you left undocumented and why. Check: each touched page holds one kind only and titles follow the patterns.\n${JSON.stringify(verified)}`, { phase: 'Close', label: 'close' })
if (!closed) return { status: 'verified, not closed', stream, verified, note: 'The close step failed; plan not updated.' }

phase('Report')
const report = await agent(`Follow the project-manager status-reporting skill. Write a short message to the owner that this stream is done: the outcome in their words ("${list.outcome}"), the link(s) where they can see it, and anything left over and where it now lives. No package ids or tool names. Return only the message.\n${JSON.stringify(verified.map(v => v.link).filter(Boolean))}`, { phase: 'Report', label: 'report' })

return { status: 'closed', stream, outcome: list.outcome, report: report || 'report drafting failed', close_notes: closed }
