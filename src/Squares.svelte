<script>
    import {renderEmoji} from "./helpers.js"

    export let total
    export let values

    let maxArea = 800 ** 2 // px

    $: {
        total.scaledValue = maxArea
        total.width = Math.sqrt(total.scaledValue)
        total.height = Math.sqrt(total.scaledValue)
        for (let [key, value] of Object.entries(values)) {
            value.scaledValue = (value.value / total.value) * maxArea
            value.width = Math.sqrt(value.scaledValue)
            value.height = Math.sqrt(value.scaledValue)
        }
    }
</script>

<div
    id="box"
    style="width: {total.width}px; height: {total.height}px; background-color: {total.color};"
>
    {#each Object.entries(values) as [key, value]}
        <span
            style="width: {value.width}px; height: {value.height}px; background-color: {value.color};"
        >
            {@html renderEmoji(value.label || key)}
        </span>
    {/each}
</div>

<style>
    #box {
        box-sizing: border-box;
        padding: 1em;
    }
    span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 150%;
        margin: 1em;
    }
</style>
