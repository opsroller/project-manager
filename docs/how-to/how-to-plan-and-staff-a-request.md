How-to guide: for a project manager (person or agent) who has a new owner request to turn into staffed work.

# How to plan and staff a request

This guide shows you how to turn an owner's request into a published,
staffed plan with the `plan-and-staff` workflow.

1. Record any rule or decision in the request first
   (see [How to record an owner's rule](how-to-record-an-owners-rule.md)).
2. Run the workflow with the owner's words quoted:
   ```
   Run the project-manager plan-and-staff workflow with args { request: "<owner's words>" }
   ```
   If the project keeps its plan somewhere other than the path in
   `CLAUDE.md`, add `plan: "<path>"`.
3. Read `owner_questions`. If it is empty, go on. If not, ask the owner
   once, in the escalation format of `routing-and-unblocking`, and
   record the answer before staffing starts.
4. Read `role_packages_added`. If any role is missing, staff that
   role-authoring package now; every package in that discipline waits
   for its merge (see [How to staff a job no role covers](how-to-staff-a-job-no-role-covers.md)).
5. Read `problems`. Fix overlaps or rule breaks in the plan by hand if
   the check could not.
6. If `status` is `unchecked`, nothing was published: rerun, or check
   the plan yourself against the `work-breakdown` checklist.
7. If `docs_check` lists fixes, make them in the plan file.
8. Send each staffed agent its brief, or let the agents pick up their
   packages from the plan.

If you plan without the workflow, follow the `work-breakdown` skill's
steps and then `staffing`. See the [plan-and-staff reference](../reference/workflows/plan-and-staff.md)
for all fields.
