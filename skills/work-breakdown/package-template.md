# Work package template

Copy one block per package into the project's plan.

```
WP-<id>  <outcome, as a short noun phrase>
Outcome:     <what is true when this is done, one sentence>
Role:        <role plugin name>   (role merged: yes / no -> blocked by WP-<id>)
Owned paths: <paths this package alone may change>
Contracts:   <interfaces/specs read or changed, with owner>
Depends on:  <WP ids, or "none"; say "stub against <contract>" when allowed>
Done when:   <observable checks a reviewer can verify>
Docs:        <Diataxis kind and location, e.g. reference + explanation in docs/>
Rules:       <standing rules that bind it, by id>
Status:      todo | in progress | in review | blocked (<on what>) | done (<link>)
```

## Example (generic)

Request: "Players should be able to remap controls."

```
WP-12  Input binding contract
Outcome:     A documented format for action-to-input bindings exists.
Role:        gameplay-programmer   (merged: yes)
Owned paths: docs/contracts/input-bindings.md
Contracts:   input-bindings (owner: gameplay-programmer)
Depends on:  none
Done when:   Contract lists actions, input kinds, defaults, persistence; reviewed.
Docs:        reference (the contract itself)
Rules:       R-3 (keyboard and gamepad both supported)

WP-13  Remapping screen
Outcome:     Players can view and change bindings from the settings menu.
Role:        ui-developer   (merged: yes)
Owned paths: <ui settings paths from the profile>
Contracts:   input-bindings (reads)
Depends on:  WP-12 (stub against the contract until it lands)
Done when:   Every action rebindable by keyboard and gamepad; focus order
             works without a mouse; conflicts are shown; tests pass.
Docs:        how-to "Change your controls" in the player docs
Rules:       R-3, R-7 (accessibility)
```

Two roles, two packages, one contract between them; the screen starts
in parallel against the contract.
