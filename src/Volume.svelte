<script>
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import {defaultScale} from "./stores.js"
    import {humanReadable} from "./helpers.js"

    export let value
    export let unit
    export let factor
    export let source
    export let year

    let scaledValue
    let comment
    $: {
        // Special case: Volumes
        scaledValue = value / ($defaultScale * Math.sqrt($defaultScale))
        comment = "Well, actually: " + humanReadable(value)
        if (unit) {
            comment += " " + unit
        }
        comment +=
            " (note that all volumes scale with a factor of " +
            humanReadable($defaultScale * Math.sqrt($defaultScale)) +
            ")"
    }
</script>

<b>
    <UnscaledNumber value={scaledValue} {unit} {factor} {comment} {source} />
</b>

<style>
    b {
        background: lightred;
        border-radius: 5px;
        padding: 2px;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
</style>
