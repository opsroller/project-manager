// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'plan-and-staff',
  description: 'Turn an owner request into staffed work packages (role-first, docs in every done-when), checked against the standing rules, and publish the plan. Use for any new request. args: { request: "<owner request, quoted>", plan: "<path to work-package plan, optional>" }',
  phases: [
    { title: 'Read', detail: 'standing rules, plan, profile, role catalog' },
    { title: 'Break down', detail: 'packages with docs by Diataxis kind' },
    { title: 'Staff', detail: 'one staffing check per package; spot role gaps' },
    { title: 'Check', detail: 'rules, overlaps, role-first, docs' },
    { title: 'Publish', detail: 'write plan and record; Diataxis check' },
  ],
}

const request = args && args.request
if (!request) return 'Usage: plan-and-staff with args { request: "<the owner request, quoted>", plan: "<optional path to the work-package plan>" }'
const planPath = (args && args.plan) || "the project's work-package plan named in CLAUDE.md"

const CONTEXT = { type: 'object', properties: {
  outcome: { type: 'string' },
  rules: { type: 'array', items: { type: 'string' } },
  roles: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, merged: { type: 'boolean' } }, required: ['name', 'merged'] } },
  open_paths: { type: 'array', items: { type: 'string' } },
  owner_questions: { type: 'array', items: { type: 'string' } },
}, required: ['outcome', 'rules', 'roles'] }

const PKGS = { type: 'object', properties: { packages: { type: 'array', items: { type: 'object', properties: {
  id: { type: 'string' }, outcome: { type: 'string' }, job_title: { type: 'string' },
  paths: { type: 'array', items: { type: 'string' } }, contracts: { type: 'array', items: { type: 'string' } },
  depends_on: { type: 'array', items: { type: 'string' } }, done_when: { type: 'string' },
  docs: { type: 'array', items: { type: 'string' } },
}, required: ['id', 'outcome', 'job_title', 'done_when', 'docs'] } } }, required: ['packages'] }

const STAFF = { type: 'object', properties: {
  id: { type: 'string' }, role: { type: 'string' }, role_exists: { type: 'boolean' }, role_merged: { type: 'boolean' },
  gap: { type: 'string' }, brief: { type: 'string' },
}, required: ['id', 'role', 'role_exists', 'role_merged', 'brief'] }

const CHECK = { type: 'object', properties: {
  packages: { type: 'array', items: { type: 'object' } },
  role_packages_added: { type: 'array', items: { type: 'string' } },
  problems: { type: 'array', items: { type: 'string' } },
  owner_questions: { type: 'array', items: { type: 'string' } },
}, required: ['packages', 'problems'] }

phase('Read')
const ctx = await agent(`Follow engineering-practices project-onboarding, then the project-manager standing-rules skill. Read the rules and decisions record, ${planPath}, the project profile and the role catalog (installed role plugins and whether each is merged). Restate the outcome of this request in the owner's words, list every recorded rule that binds it (id + one line), list paths owned by open packages, and list only questions the record does not answer AND that are owner-only (scope, priorities, money, risk, one-way doors). Request:\n${request}`, { schema: CONTEXT, phase: 'Read', label: 'read-record' })
if (!ctx) return 'plan-and-staff stopped: could not read the rules record, plan or role catalog.'

phase('Break down')
const plan = await agent(`Follow the project-manager work-breakdown skill. Outcome: ${ctx.outcome}\nBinding rules: ${ctx.rules.join('; ') || 'none'}\nPaths owned by open packages (do not overlap): ${(ctx.open_paths || []).join(', ') || 'none'}\nBreak it into packages. For each give the job title a team would hire for it, owned paths, contracts, dependencies, a checkable done-when, and the docs it owes by Diataxis kind (compass: action/cognition x study/work), e.g. "reference: docs/reference/x.md". Docs are inside each package's done-when, never a separate package. Do not write the plan file yet.`, { schema: PKGS, phase: 'Break down', label: 'breakdown' })
if (!plan || !plan.packages || !plan.packages.length) return 'plan-and-staff stopped: breakdown produced no packages.'

const catalog = ctx.roles.map(r => `${r.name}${r.merged ? '' : ' (NOT merged)'}`).join(', ')
const staffed = await pipeline(plan.packages, p => agent(`Follow the project-manager staffing skill. Role catalog: ${catalog}.\nPick the role plugin for this package by job function. Say whether it exists and whether it is merged. If no role covers the job, set role to the missing role's name, role_exists false, and describe the gap. Write the brief exactly in the skill's brief format.\n${JSON.stringify(p)}`, { schema: STAFF, phase: 'Staff', label: p.id }))

const unstaffed = plan.packages.filter((p, i) => !staffed[i]).map(p => p.id)
const staffing = staffed.filter(Boolean)

phase('Check')
const checked = await agent(`Follow the project-manager standing-rules, staffing and work-breakdown skills. Check this plan:\n- every recorded rule is respected (${ctx.rules.join('; ') || 'none'});\n- no two packages own the same path, and none overlaps open packages;\n- role-first: for each package whose role does not exist, add a role-authoring package first (generic job function, researched, agent + skills + workflows + Diataxis docs) and make the package depend on it; for a role that exists but is not merged, mark the package blocked on that role's PR;\n- every done-when names its docs by Diataxis kind;\n- no approval steps, sign-offs or gates the owner did not ask for.\nPackages with no staffing result (mark them unstaffed, do not drop them): ${unstaffed.join(', ') || 'none'}.\nReturn the corrected packages (with role and status), the role packages added, problems found, and owner-only questions still open.\n${JSON.stringify({ packages: plan.packages, staffing })}`, { schema: CHECK, phase: 'Check', label: 'check' })
if (!checked) return { status: 'unchecked', note: 'The checker failed; the plan below is NOT verified and was not published.', packages: plan.packages, staffing, unstaffed }

phase('Publish')
const published = await agent(`Follow the project-manager work-breakdown skill (Publish step) and standing-rules. Docs plan: this work changes reference docs (the work-package plan; the rules record if the request stated new rules). Do: write these packages into ${planPath} using the package template, one block per package, with role, merged status and status; record any new owner rule from the request verbatim with date. Classify every user-visible change in this work with the Diataxis compass (action/cognition x study/work). For each, update or add exactly one page of that kind under docs/<kind>/, keep each page to one kind, title it by the project pattern, and link to the related pages of the other kinds. Report pages touched and any change you left undocumented and why.\n${JSON.stringify(checked.packages)}`, { phase: 'Publish', label: 'publish' })
if (!published) return { status: 'not published', packages: checked.packages, problems: checked.problems, owner_questions: checked.owner_questions || [] }

const verdict = await agent(`Docs check (Diataxis guide section 6): for the pages just touched in ${planPath} and the rules record, confirm each page holds one kind only (the plan and the record are reference: describe, no instructions or rationale), titles follow the project patterns, and links connect the kinds. Return "ok" or the list of fixes needed.`, { phase: 'Publish', label: 'docs-check' })

return {
  status: 'published',
  outcome: ctx.outcome,
  packages: checked.packages,
  role_packages_added: checked.role_packages_added || [],
  problems: checked.problems,
  owner_questions: [...new Set([...(ctx.owner_questions || []), ...(checked.owner_questions || [])])],
  docs_check: verdict || 'unverified (docs check failed to run)',
}
