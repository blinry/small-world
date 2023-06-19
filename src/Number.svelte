<script>
    import {defaultScale} from "./stores.js"

    export let value = 0
    export let unit
    export let scale
    $: usedScale = scale || $defaultScale

    let scaledValue
    let scaledUnit
    let result
    let actualResult
    $: {
        if (unit === "km") {
            // Special case: We want areas to scale proportionally, so their edge lenghts scale with the square root of the scale.
            scaledValue = value / Math.sqrt(usedScale)
        } else {
            scaledValue = value / usedScale
        }

        scaledUnit = unit
        if (scaledValue < 0.1 && unit === "km") {
            scaledValue = scaledValue * 1000
            scaledUnit = "m"
        } else if (scaledValue < 0.01 && unit === "km²") {
            scaledValue = scaledValue * 1000 * 1000
            scaledUnit = "m²"
        }

        if (scaledValue == 0) {
            result = "0"
        } else {
            let zeroesAfterDecimal = Math.floor(Math.log10(scaledValue))
            let precision = Math.max(0, -zeroesAfterDecimal)
            result = scaledValue.toFixed(precision)
        }

        if (result.endsWith("000")) {
            result = result.slice(0, -3) + "k"
        }

        if (scaledUnit) {
            result += ` ${scaledUnit}`
        }

        actualResult = `${value}`
        if (unit) {
            actualResult += ` ${unit}`
        }
    }
</script>

<span title="Actually: {actualResult}">{result}</span>

<style>
    span {
        font-weight: 600;
        font-size: 120%;
    }
</style>
