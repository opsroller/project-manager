How-to guide: for a project manager whose request looks finished and needs closing.

# How to close a finished request

This guide shows you how to verify and close a stream with the
`close-stream` workflow.

1. Run it with the stream named as the owner named it:
   ```
   Run the project-manager close-stream workflow with args { stream: "<owner's request>" }
   ```
2. If `status` is `blocked`, read `open_items`. For each:
   - unmerged: route it to its owner and the reviewer;
   - unmet done-when line or missing docs: reopen the package or add a
     follow-up package with its own done-when;
   - unverified: check it by hand.
   Run the workflow again once they are done.
3. If `status` is `closed`, send the `report` to the owner once.
4. Read `close_notes` and make sure each lesson became something: a
   recorded rule, a workflow change, a role proposal or a how-to.
5. Resolve the stream's threads only when nothing waits on anyone.

See the [close-stream reference](../reference/workflows/close-stream.md).
