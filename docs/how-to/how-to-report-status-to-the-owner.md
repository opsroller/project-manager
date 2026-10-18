How-to guide: for a project manager who needs to tell the owner where the work stands.

# How to report status to the owner

This guide shows you how to produce an honest, one-minute status report
with the `status-sweep` workflow.

1. Run:
   ```
   Run the project-manager status-sweep workflow.
   ```
   Add args `{ audience: "<name>" }` if the report is for someone other than
   the owner.
2. Do the `actions` first: routing messages and unblocks can change the
   report.
3. Check `unverified`. For each id, find the state yourself or leave it
   as "unknown, checking" in the report. Never guess.
4. Read the `report`. Before sending, check:
   - the first line says whether anything needs the owner;
   - streams use the owner's words, not package ids or tool names;
   - every done has a link; every at-risk item has a path back.
5. Put `owner_decisions` at the top of the report if they aren't there.
6. Send it where the owner reads, once.

If you report without the workflow, follow `flow-and-risks` to read the
board, then `status-reporting`. See the [status-sweep reference](../reference/workflows/status-sweep.md).
