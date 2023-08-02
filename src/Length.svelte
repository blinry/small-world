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
        // Special case: We want areas to scale proportionally, so their edge lenghts scale with the square root of the scale.
        scaledValue = value / Math.sqrt($defaultScale)
        comment = "Well, actually: " + humanReadable(value)
        if (unit) {
            comment += " " + unit
        }
        comment +=
            " (note that all lengths scale with a factor of " +
            humanReadable(Math.sqrt($defaultScale)) +
            ")"
    }
</script>

<b>
    <UnscaledNumber value={scaledValue} {unit} {factor} {comment} {source} />
</b>

<style>
    b {
        background: #cbebbc;
        border-radius: 5px;
        padding: 2px;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
</style>
