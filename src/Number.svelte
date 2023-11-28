<script>
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import UnscaledRoundedNumber from "./UnscaledRoundedNumber.svelte"
    import {defaultScale} from "./stores.js"
    import {humanReadable, humanReadableSmall} from "./helpers.js"

    export let data = {}

    export let value = data.value
    export let unit = data.unit
    export let source = data.unit

    export let factor = 1
    export let inverse = false

    let shrinkApplied = false

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

    function clicked() {
        shrinkApplied = true
        data.shrinkApplied = true
        data = data
    }
</script>

{#if shrinkApplied}
    <b>
        <UnscaledRoundedNumber
            value={scaledValue}
            {unit}
            {factor}
            {comment}
            {source}
        />
    </b>
{:else}
    <span on:click={clicked}>
        <UnscaledNumber {value} {unit} {factor} />
    </span>
{/if}

<style>
    span {
        cursor: pointer;
    }
</style>
