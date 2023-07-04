<script>
    import {humanReadable} from "./helpers.js"
    export let value
    export let unit
    export let comment = "This is the actual value on the real Earth."
    export let factor = 1

    let betterValue
    let betterUnit

    let roundedValue
    $: {
        let factoredValue = value * factor
        betterValue = factoredValue
        betterUnit = unit
        if (factoredValue < 0.1 && unit === "km") {
            betterValue = factoredValue * 1000
            betterUnit = "m"
        } else if (factoredValue < 0.1 && unit === "tons") {
            betterValue = factoredValue * 1000
            betterUnit = "kg"
        } else if (factoredValue < 0.01 && unit === "km²") {
            betterValue = factoredValue * 1000 * 1000
            betterUnit = "m²"
        } else if (factoredValue < 0.01 && unit === "km³") {
            betterValue = factoredValue * 1000 * 1000 * 1000
            betterUnit = "m³"
        }

        if (betterValue == 0) {
            roundedValue = 0
        } else {
            if (betterValue < 750) {
                let zeroesAfterDecimal = Math.floor(Math.log10(betterValue))
                let precision = Math.max(0, -zeroesAfterDecimal)
                roundedValue = betterValue.toFixed(precision)
            } else {
                roundedValue = humanReadable(betterValue)
            }
        }
    }
</script>

<span title={comment}
    >{roundedValue}{#if betterUnit}{" " + betterUnit}{/if}
</span>

<style>
    span {
        font-size: 120%;
    }
</style>
