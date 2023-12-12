<script>
    import {useMetric} from "./stores.js"
    import {humanReadable} from "./helpers.js"

    export let value
    export let unit = null
    export let comment = "This is the actual value on the real Earth."
    export let factor = 1
    export let rounded = true

    $: quantity = {
        value: value * factor,
        unit: unit,
    }
</script>

<span title={comment}>{humanReadable(quantity, $useMetric, rounded)}</span>

<style>
    span {
        font-size: 120%;
    }
</style>
