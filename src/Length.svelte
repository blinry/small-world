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
    }
</script>

<b>
    {#if source}
        <a href={source} target="_blank">
            <UnscaledNumber value={scaledValue} {unit} {factor} {comment} />
        </a>
    {:else}
        <UnscaledNumber value={scaledValue} {unit} {factor} {comment} />
    {/if}
</b>

<style>
    a {
        color: inherit;
        text-decoration: none;
    }
</style>
