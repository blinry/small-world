<script>
    import Popup from "./Popup.svelte"

    import {defaultScale} from "./stores.js"
    import {renderEmoji} from "./helpers.js"

    let limit = 2000
    let maxBarCount = 35

    export let count = 0
    $: scaledCount = Math.round(count / $defaultScale)
    export let emoji = "❓"
    export let barEmoji = "❓"
    export let barEmojiNegative = barEmoji
    export let distribution
    export let unit = ""
    export let source = null

    const pixelsPerEntity = 80 ** 2
    let clientWidth
    $: width = Math.min(clientWidth, scaledCount * 100, 1200)
    let height
    $: {
        if (scaledCount > limit) {
            height = 50
        } else {
            height = Math.max(100, (pixelsPerEntity * scaledCount) / width)
        }
    }
    let padding = 20

    let instances
    $: {
        instances = []
        if (scaledCount >= 1 && scaledCount <= limit) {
            for (let i = 0; i < scaledCount; i++) {
                let newInstance = {
                    value: distribution(i / scaledCount, (i + 1) / scaledCount),
                }
                instances.push(newInstance)
            }
            let max = 0
            for (let instance of instances) {
                if (instance.value > max) {
                    console.log(instance.value)
                    max = instance.value
                }
            }
            let scale = maxBarCount / max
            for (let instance of instances) {
                if (instance.value >= 0) {
                    instance.bar = barEmoji.repeat(
                        Math.round(instance.value * scale),
                    )
                } else {
                    instance.bar = barEmojiNegative.repeat(
                        -Math.round(instance.value * scale),
                    )
                }
            }
        }
    }
</script>

<Popup>
    <div id="box">
        {#if scaledCount > limit}
            (A lot of {emoji}s, which I won't render, because it would crash
            your browser.)
        {:else}
            {#each instances as instance}
                <div>
                    {@html renderEmoji(emoji)}
                    {Math.round(instance.value)}
                    {unit}
                    {instance.bar}
                </div>
            {/each}
        {/if}
    </div>
    <div slot="popup">
        {#if source}
            <p>
                Source: <a href={source} target="_blank">{source}</a>
            </p>
        {/if}
    </div>
</Popup>

<style>
</style>
