<script>
    import {defaultScale} from "./stores.js"

    let limit = 2000

    export let count = 0
    export let scale
    let scaledCount
    let zeroesAfterDecimal
    let precision
    $: {
        scaledCount = scale ? count / scale  : count / $defaultScale
        zeroesAfterDecimal = Math.floor(Math.log10(scaledCount))
        precision = Math.max(0, -zeroesAfterDecimal)
        scaledCount = scaledCount.toFixed(precision)
    }

    export let emoji = "❓"
    export let distribution = undefined

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
                    x: padding + Math.random() * (width - padding * 2),
                    y: padding + Math.random() * (height - padding * 2),
                }
                if (distribution) {
                    newInstance.value = distribution((i + 0.5) / scaledCount)
                }
                instances.push(newInstance)
            }
        }
    }
</script>

<div id="box" bind:clientWidth style="width: {width}px; height: {height}px;">
    {#if scaledCount > limit}
        (A lot of {emoji}s, which I won't render, because it would crash your
        browser.)
    {:else}
        {#each instances as instance}
            <div
                style="position: absolute; left: {instance.x}px; top: {instance.y}px;"
                class="emoji"
            >
                {emoji}
                {#if instance.value}
                    <div
                        style="position: absolute; top: 100%; left: 50%; transform: translate(-50%, 0);"
                    >
                        {instance.value}
                    </div>
                {/if}
            </div>
        {/each}
    {/if}
</div>

<style>
    #box {
        position: relative;
    }
    .emoji {
        transform: translate(-50%, -50%);
        font-size: 1.5em;
    }
</style>
