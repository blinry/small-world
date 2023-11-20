<script>
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import {defaultScale} from "./stores.js"
    import {humanReadable, humanReadableSmall} from "./helpers.js"

    export let value
    export let unit = null
    export let factor = 1
    export let source = null
    export let inverse = false

    let scaledValue
    let comment
    $: {
        if (inverse) {
            scaledValue = $defaultScale / value
            comment =
                "Well, actually: " +
                humanReadableSmall((1.0 * factor) / value, "months")
        } else {
            scaledValue = value / $defaultScale
            comment = "Well, actually: " + humanReadable(value * factor)
            if (unit) {
                comment += " " + unit
            }
        }
    }
</script>

<b>
    <UnscaledNumber value={scaledValue} {unit} {factor} {comment} {source} />
</b>

<style>
    a {
        color: inherit;
        text-decoration: none;
    }
</style>
