<script>
    import {scale} from "./stores.js"

    export let value = 0
    export let unit

    let scaledValue
    let result
    $: {
        if (unit === "km") {
            // Special case: We want areas to scale proportionally, so their edge lenghts scale with the square root of the scale.
            scaledValue = value / Math.sqrt($scale)
        } else {
            scaledValue = value / $scale
        }

        let zeroesAfterDecimal = Math.floor(Math.log10(scaledValue))
        let precision = Math.max(0, -zeroesAfterDecimal)
        result = scaledValue.toFixed(precision)

        if (unit) {
            result += ` ${unit}`
        }
    }
</script>

<b style="font-size: 120%">{result}</b>
