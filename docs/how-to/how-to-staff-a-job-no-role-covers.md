How-to guide: for a project manager who finds work that no installed role plugin covers.

# How to staff a job no role covers

This guide shows you how to apply role-first when the team has no role
for a job.

1. Name the job title a team would hire for the work ("technical
   writer", "localization specialist"). If it names a tool or product,
   it is a project detail for the profile, not a role.
2. Check the role catalog. If an existing role covers most of the job,
   the package is a change to that role instead; stop here.
3. Add a role-authoring package as the first package in that
   discipline:
   - Outcome: "a generic `<role>` plugin is merged".
   - Done when: agent, 4-8 skills, 1-3 workflows, Diataxis docs, license,
     research sources; validated; reviewed; merged.
4. Make every package in that discipline depend on it. Mark them
   blocked in the plan with the reason.
5. Tell the owner once, in one line, that the role is being written and
   what waits on it.
6. Until the role is merged, don't stretch a neighbouring role to do the
   work. Where the work is part of every role's job anyway (docs, for
   example, before a technical-writer role exists), keep it inside each
   owning role's packages.
7. When the role merges, unblock its packages and staff them with it.
