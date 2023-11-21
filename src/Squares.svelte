<script>
    import {renderEmoji} from "./helpers.js"
    import Popup from "./Popup.svelte"
    import Number from "./Number.svelte"
    import Length from "./Length.svelte"

    export let total
    export let values
    export let source

    let maxArea = 800 ** 2 // px

    let areaOriginalWidth = 369 // px
    let areaOriginalHeight = 1832 // px
    let areaOriginalArea = areaOriginalWidth * areaOriginalHeight // px^2
    let scaleDownFactor = maxArea / areaOriginalArea / 1.5 // TODO: Magic number: world = 1.5 * central park
    let targetMapHeight = areaOriginalHeight * Math.sqrt(scaleDownFactor)

    let oceanHeight = targetMapHeight
    let oceanWidth = maxArea / oceanHeight

    $: {
        total.scaledValue = maxArea
        total.width = Math.sqrt(total.scaledValue)
        total.height = Math.sqrt(total.scaledValue)
        for (let [key, value] of Object.entries(values)) {
            value.scaledValue =
                (value.value.value / total.value.value) * maxArea
            value.width = Math.sqrt(value.scaledValue)
            value.height = Math.sqrt(value.scaledValue)
        }
    }
</script>

<div id="container">
    <div
        id="ocean"
        style="width: {oceanWidth}px; height: {oceanHeight}px; background-color: {total.color};"
    >
        {#each Object.entries(values) as [key, value]}
            <Popup>
                <span
                    style="width: {value.width}px; height: {value.height}px; background-color: {value.color};"
                >
                    {@html renderEmoji(value.label || key)}
                </span>
                <div slot="popup">
                    <p>
                        {value.description}: <Number {...value.value} /> (a square with an edge length of
                        <Length
                            value={Math.sqrt(value.value.value)}
                            unit="km"
                        />)
                    </p>
                    <p>
                        Source: <a href={source} target="_blank">{source}</a>
                    </p>
                </div>
            </Popup>
        {/each}
    </div>
    <img src="/images/central-park.png" style="height: {targetMapHeight}px" />
</div>

<style>
    #container {
        display: flex;
        gap: 1em;
    }
    #ocean {
        box-sizing: border-box;
        padding: 1em;
    }
    span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 150%;
        margin: 0.5em;
    }
</style>
