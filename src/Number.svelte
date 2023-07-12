<script>
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import {defaultScale} from "./stores.js"
    import {humanReadable} from "./helpers.js"

    export let value
    export let unit
    export let factor = 1
    export let source
    export let year

    let scaledValue
    let comment
    $: {
        scaledValue = value / $defaultScale
        comment = "Well, actually: " + humanReadable(value * factor)
        if (unit) {
            comment += " " + unit
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
