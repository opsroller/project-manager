// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'status-sweep',
  description: 'Sweep every open work package: read state, age and blocks in parallel, triage blockers, update the plan and risks, and draft the owner status report in their terms. Use when the owner asks for status or on their cadence. args: { plan: "<path to work-package plan, optional>", audience: "<who the report is for, optional>" }',
  phases: [
    { title: 'Read', detail: 'open packages from the plan' },
    { title: 'Inspect', detail: 'one read-only check per package' },
    { title: 'Triage', detail: 'blocks, aging, WIP, risks' },
    { title: 'Record', detail: 'update plan and risks; Diataxis check' },
    { title: 'Report', detail: 'owner status in their terms' },
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
    if (has(results, key)) { out[key] = results[key]; return Promise.resolve(results[key]) }
    if (!picked(ph, base)) { skipped.push(key); return Promise.resolve(null) }
    if (mode === 'agents') {
      return realAgent(prompt, opts).then((r) => { if (r !== null && r !== undefined) out[key] = r; return r })
    }
    next.push({ key, phase: ph, prompt, schema: op.schema || null })
    if (!halting) {
      halting = true
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
        how: 'Do each brief in next yourself, in order: follow its prompt in this session (it may tell you to edit files, commit or push), and shape your answer to its schema when one is given. Add each answer to results under its key, then run this workflow again with the same args and run.results set to the merged results. Repeat until status is "done".',
      }
    }
    return { run: mode, status: 'done', result: value, results: out, skipped, logs }
  }
  return { agent, phase, log, finish, halted, error }
})(typeof args === 'undefined' ? undefined : args, agent, phase, log)
if (RUN.error) return RUN.error
const RUN_OUT = await Promise.race([RUN.halted, (async (agent, phase, log) => {
// --- run-modes v1 end (workflow body follows; close it with the tail line) ---

const planPath = (args && args.plan) || "the project's work-package plan named in CLAUDE.md"
const audience = (args && args.audience) || 'the owner'

const OPEN = { type: 'object', properties: { packages: { type: 'array', items: { type: 'object', properties: {
  id: { type: 'string' }, outcome: { type: 'string' }, role: { type: 'string' }, stream: { type: 'string' },
  status: { type: 'string' }, branch_or_pr: { type: 'string' }, depends_on: { type: 'array', items: { type: 'string' } },
}, required: ['id', 'outcome', 'status'] } } }, required: ['packages'] }

const STATE = { type: 'object', properties: {
  id: { type: 'string' }, state: { type: 'string', enum: ['todo', 'in progress', 'in review', 'blocked', 'done', 'unknown'] },
  evidence: { type: 'string' }, age: { type: 'string' }, blocked_on: { type: 'string' },
  done_when_met: { type: 'boolean' }, docs_present: { type: 'boolean' },
}, required: ['id', 'state', 'evidence'] }

const TRIAGE = { type: 'object', properties: {
  actions: { type: 'array', items: { type: 'string' } },
  owner_decisions: { type: 'array', items: { type: 'string' } },
  risks: { type: 'array', items: { type: 'string' } },
  plan_updates: { type: 'array', items: { type: 'string' } },
}, required: ['actions', 'owner_decisions', 'plan_updates'] }

phase('Read')
const open = await agent(`Follow engineering-practices project-onboarding. Read ${planPath} and list every package not marked done: id, outcome, role, the stream (the owner request it serves, in the owner's words), recorded status, branch or PR, dependencies.`, { schema: OPEN, phase: 'Read', label: 'read-plan' })
if (!open) return 'status-sweep stopped: could not read the plan.'
if (!open.packages.length) return 'No open packages in the plan; nothing to report.'

const states = await pipeline(open.packages, p => agent(`Read-only. Following the project-manager flow-and-risks skill, find the real state of this package from its branch, PR, CI and thread (not from what the plan claims). Give evidence (links), how long it has been in its state, what it is blocked on if anything, whether its done-when is met and whether the docs named in it are present. Edit nothing.\n${JSON.stringify(p)}`, { schema: STATE, phase: 'Inspect', label: p.id }))
const inspected = open.packages.map((p, i) => states[i] || { id: p.id, state: 'unknown', evidence: 'inspection failed; unverified' })

phase('Triage')
const triage = await agent(`Follow the project-manager flow-and-risks and routing-and-unblocking skills. For these packages: check WIP per role, look at the oldest items first, walk the critical path, and triage every blocked item (answer from the record, connect agents directly, stub against a contract, decide within your remit, or owner-only). Items marked unknown stay unknown; do not guess them. Return concrete actions (who messages whom about what), owner-only decisions written in the skill's escalation format, live risks (one line each with owner), and the plan status changes to make.\n${JSON.stringify(inspected)}`, { schema: TRIAGE, phase: 'Triage', label: 'triage' })
if (!triage) return { status: 'untriaged', inspected }

phase('Record')
const recorded = await agent(`Docs plan: this sweep changes reference docs only (the work-package plan statuses and the risk list). Do: apply these status changes to ${planPath} and update the risk list beside it, in one edit, describing state only (no narrative). Then check (Diataxis guide section 6): the touched pages hold one kind (reference), keep their existing format, and link to related pages. Report pages touched.\n${JSON.stringify({ plan_updates: triage.plan_updates, risks: triage.risks || [] })}`, { phase: 'Record', label: 'record' })

phase('Report')
const report = await agent(`Follow the project-manager status-reporting skill. Write the status report for ${audience}. First line: what needs them (or "Nothing needs you"). Then one line per stream, named in the owner's words, never package ids, branch names or tool names; state in plain words; a link as evidence for each done; a path back for each at-risk or off-track; unknown streams said as unknown. Only risks that touch the owner's goals. Owner decisions: ${JSON.stringify(triage.owner_decisions)}. Streams: ${JSON.stringify(open.packages.map((p, i) => ({ stream: p.stream || p.outcome, ...inspected[i] })))}. Return only the report text.`, { phase: 'Report', label: 'report' })

return {
  report: report || 'report drafting failed; see inspected states',
  actions: triage.actions,
  owner_decisions: triage.owner_decisions,
  plan_recorded: recorded ? 'yes' : 'no (record step failed)',
  unverified: inspected.filter(s => s.state === 'unknown').map(s => s.id),
}
})(RUN.agent, RUN.phase, RUN.log)]); return RUN.finish(RUN_OUT)
