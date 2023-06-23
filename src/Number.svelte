<script>
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import {defaultScale} from "./stores.js"

    export let value
    export let unit
    export let factor
    export let source
    export let year

    let scaledValue
    $: {
        if (unit === "km") {
            // Special case: We want areas to scale proportionally, so their edge lenghts scale with the square root of the scale.
            scaledValue = value / Math.sqrt($defaultScale)
        } else {
            scaledValue = value / $defaultScale
        }
    }
</script>

<UnscaledNumber
    value={scaledValue}
    {unit}
    {factor}
    comment="Well, actually: {value} {unit}. Source: {source} ({year})."
/>
