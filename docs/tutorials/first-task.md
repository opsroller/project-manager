Tutorial: for someone new to the project-manager plugin who wants to see it plan and staff one real request from start to finish.

# Plan and staff your first request

In this tutorial we will take one request from an owner, record the
rule it contains, turn it into staffed work packages, and publish the
plan. We will use a small, made-up project that has a website and a
`frontend-web-developer` role installed, but no technical-writer role.

The request we will plan is:

> "Add a changelog page to the website. From now on, every release
> gets a changelog entry."

## Before we start

We need a project repository with a `CLAUDE.md` that names a
work-package plan (for example `docs/reference/work-packages.md`) and a
rules record (for example `docs/reference/decisions.md`), and the
`engineering-practices` and `project-manager` plugins installed.

## 1. Record the rule first

The request contains a standing rule: "every release gets a changelog
entry". We record it before planning anything.

Ask the project-manager agent:

```
Record the owner's rule from this message, then stop:
"From now on, every release gets a changelog entry."
```

The agent follows `standing-rules` and adds one entry to the record.
The output should look like this:

```
R-4  Changelog entry per release        status: live
Said:   "From now on, every release gets a changelog entry."  (<date>, <where>)
Scope:  project
Applies to: release packages; changelog file
```

Notice that the owner's words are quoted exactly, with the date.

## 2. Run plan-and-staff

Now we plan the rest of the request:

```
Run the project-manager plan-and-staff workflow with args { request: "Add a changelog page to the website." }
```

The workflow moves through Read, Break down, Staff, Check and Publish.
In the Read phase, notice that R-4 appears in the list of binding rules.

## 3. Read the packages

When the workflow returns, look at `packages`. We should see something
close to this:

```
WP-1  Changelog page
Role:        frontend-web-developer   (merged: yes)
Done when:   /changelog lists releases newest first, links from the
             footer, passes the site's accessibility check.
Docs:        how-to "How to add a changelog entry" in docs/how-to/
Rules:       R-4
```

Notice that the docs are inside the package's done-when, not a separate
package. The project has no technical-writer role yet, so the docs are
the web developer's job.

## 4. Check the result

Open the plan file named in `CLAUDE.md`. The new package block is there,
with its role and status `todo`. Open the rules record: R-4 is there.

Look at the workflow's `owner_questions`. It should be empty, because
the request and the record answer everything.

## What we did

We recorded an owner rule in their own words, turned a request into a
staffed package whose done-when includes its docs, and published both
where every agent reads them. The owner said it once.

Next: [How to plan and staff a request](../how-to/how-to-plan-and-staff-a-request.md)
covers real requests with several roles and missing roles. To
understand why the role works this way, read
[About the project-manager role](../explanation/about-the-role.md).
