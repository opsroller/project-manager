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

// --- run-modes v1 begin ---
const RUN = ((a, realAgent, realPhase, realLog) => {
  const opted = !!(a && typeof a === 'object' && a.run && typeof a.run === 'object')
  const c = opted ? a.run : {}
  const mode = c.mode === 'inline' ? 'inline' : 'agents'
  const results = c.results && typeof c.results === 'object' ? c.results : {}
  const only = Array.isArray(c.only) && c.only.length ? c.only.map(String) : null
  const from = c.from ? String(c.from) : null
  const titles = typeof meta !== 'undefined' && meta && Array.isArray(meta.phases) ? meta.phases.map((p) => p.title) : []
  const unknown = titles.length ? (from ? [from] : []).filter((t) => !titles.includes(t)) : []
  const error = c.mode && !['agents', 'inline'].includes(c.mode)
    ? `run.mode must be "agents" or "inline", got "${c.mode}"`
    : unknown.length ? `run.from names no phase: ${unknown.join(', ')}. Phases: ${titles.join(', ')}` : null
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k)
  // An answer must carry every required key of its schema, as the runtime
  // enforces for agents; returns the missing keys, or null when it fits.
  const missing = (v, schema) => {
    if (v === null || v === undefined) return 'an answer'
    if (!schema || schema.type !== 'object') return null
    if (typeof v !== 'object' || Array.isArray(v)) return 'a JSON object'
    const gap = (schema.required || []).filter((k) => !has(v, k) || v[k] === undefined)
    return gap.length ? gap.join(', ') : null
  }
  const seen = {}
  const out = {}
  const skipped = []
  const next = []
  const logs = []
  let current = ''
  let reached = !from
  let halting = false
  let release = () => {}
  const halted = new Promise((r) => { release = r })
  const picked = (ph, label) => reached && (!only || only.some((s) => s === ph || s === label || label.startsWith(s + ':')))
  const agent = (prompt, opts) => {
    const op = opts || {}
    const ph = op.phase || current
    const base = op.label || ph || 'agent'
    seen[base] = (seen[base] || 0) + 1
    const key = seen[base] > 1 ? `${base}#${seen[base]}` : base
    let note = null
    if (has(results, key)) {
      const gap = missing(results[key], op.schema)
      if (!gap) { out[key] = results[key]; return Promise.resolve(results[key]) }
      note = `answer missing ${gap}; answer this brief again`
    }
    if (!picked(ph, base)) { skipped.push(key); return Promise.resolve(null) }
    if (mode === 'agents') {
      return realAgent(prompt, opts).then((r) => { if (r !== null && r !== undefined) out[key] = r; return r })
    }
    next.push(note ? { key, phase: ph, prompt, schema: op.schema || null, note } : { key, phase: ph, prompt, schema: op.schema || null })
    if (!halting) {
      halting = true
      // Wait 200 microtask turns before pausing, so every sibling in a
      // parallel() or pipeline() fan-out queues its brief into this pause.
      ;(async () => { for (let i = 0; i < 200; i++) await null; release('__run_halted__') })()
    }
    return new Promise(() => {})
  }
  const phase = (t) => { current = t; if (from && t === from) reached = true; return realPhase(t) }
  const log = (m) => { logs.push(String(m)); return realLog(m) }
  const finish = (value) => {
    if (!opted) return value
    if (value === '__run_halted__') {
      return {
        run: 'inline', status: 'next', next, results: out, skipped, logs,
        how: 'Do each brief in next yourself, in order: follow its prompt in this session (it may tell you to edit files, commit or push), and shape your answer to its schema when one is given, with every required field. A brief with a note was answered before without the fields it names. Add each answer to results under its key, then run this workflow again with the same args and run.results set to the merged results. Repeat until status is "done".',
      }
    }
    return { run: mode, status: 'done', result: value, results: out, skipped, logs }
  }
  return { agent, phase, log, finish, halted, error }
})(typeof args === 'undefined' ? undefined : args, agent, phase, log)
if (RUN.error) return RUN.error
const RUN_OUT = await Promise.race([RUN.halted, (async (agent, phase, log) => {
// --- run-modes v1 end (workflow body follows; close it with the tail line) ---

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
})(RUN.agent, RUN.phase, RUN.log)]); return RUN.finish(RUN_OUT)
