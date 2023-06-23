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
        scaledValue = value / Math.sqrt($defaultScale)
    }
</script>

<UnscaledNumber
    value={scaledValue}
    {unit}
    {factor}
    comment="Well, actually: {value} {unit}. Source: {source} ({year})."
/>
