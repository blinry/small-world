<script>
    import Popup from "./Popup.svelte"
    import {humanReadable} from "./helpers.js"
    export let value
    export let unit
    export let comment = "This is the actual value on the real Earth."
    export let factor = 1
    export let source

    let betterValue
    let betterUnit

    let roundedValue
    $: {
        let factoredValue = value * factor
        betterValue = factoredValue
        betterUnit = unit
        if (factoredValue < 0.5 && unit === "km") {
            betterValue = factoredValue * 1000
            betterUnit = "m"
        } else if (factoredValue < 0.1 && unit === "tonnes") {
            betterValue = factoredValue * 1000
            betterUnit = "kg"
        } else if (factoredValue < 1 && unit === "km²") {
            betterValue = factoredValue * 100
            betterUnit = "hectares"
        } else if (factoredValue < 0.01 && unit === "km²") {
            betterValue = factoredValue * 1000 * 1000
            betterUnit = "m²"
        } else if (factoredValue < 0.01 && unit === "km³") {
            betterValue = factoredValue * 1000 * 1000 * 1000
            betterUnit = "m³"
        }

        if (betterValue < 0.05) {
            roundedValue = 0
        } else if (betterValue < 0.7) {
            roundedValue = betterValue.toFixed(1)
        } else if (betterValue < 1.4) {
            roundedValue = Math.round(betterValue)
        } else if (betterValue < 1.6) {
            roundedValue = betterValue.toFixed(1)
        } else if (betterValue < 750) {
            let zeroesAfterDecimal = Math.floor(Math.log10(betterValue))
            let precision = Math.max(0, -zeroesAfterDecimal)
            roundedValue = betterValue.toFixed(precision)
        } else {
            roundedValue = humanReadable(betterValue)
        }
    }
</script>

<Popup>
    <span title={comment}
        >{roundedValue}{#if betterUnit}{" " + betterUnit}{/if}</span
    >
    <div slot="popup">
        <p id="comment">{comment}</p>
        {#if source}
            <p>
                Source: <a href={source} target="_blank">{source}</a>
            </p>
        {/if}
    </div>
</Popup>

<style>
    #comment {
        font-size: 140%;
    }
    span {
        font-size: 120%;
    }
</style>
