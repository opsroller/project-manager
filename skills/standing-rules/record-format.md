# Rules and decisions record: format

One entry per rule or decision. Newest at the bottom; ids never reused.

```
R-<n>  <short title>                    status: live | superseded by R-<m>
Said:   "<owner's exact words>"  (<date>, <where: thread/message/link>)
Scope:  project | <discipline> | WP-<id>
Means:  <one line, only if the quote needs it>
Applies to: <what to check: license files, merge method, docs, ...>
```

Decisions between options use the same shape with the options named:

```
D-<n>  <question decided>               status: live
Said:   "<owner's words>"  (<date>, <where>)
Options considered: <A>, <B>, <C>
Chosen: <B>.  Consequences: <what changes for which roles>
```

## Example entries (generic)

```
R-1  License                             status: live
Said:   "License: GPL-2.0-or-later."  (2026-10-18, project chat)
Scope:  project
Applies to: LICENSE file, package manifests, README license section, SPDX headers

R-2  Merge method                        status: live
Said:   "squash merge only"  (2026-10-18, project chat)
Scope:  project

R-3  Documentation                       status: superseded by R-5
Said:   "write docs for each plugin"  (2026-10-17)

R-5  Documentation follows Diataxis      status: live
Said:   "documentation should follow diataxis"  (2026-10-18)
Scope:  project
Applies to: every doc; every package's done-when names a Diataxis kind
```
