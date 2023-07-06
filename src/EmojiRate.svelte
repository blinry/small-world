<script>
    import {onMount} from "svelte"
    import {defaultScale} from "./stores.js"

    let startTime
    onMount(() => {
        startTime = Date.now()
    })

    let limit = 2000

    export let value
    export let factor = 1

    // Default rate: value per year

    let scaledValuePerYear
    let scaledValuePerSecond
    let zeroesAfterDecimal
    let precision
    $: {
        scaledValuePerYear = (value / $defaultScale) * factor
        scaledValuePerSecond = scaledValuePerYear / (365 * 24 * 60 * 60)
    }

    let scaledCount = 0
    setInterval(() => {
        scaledCount = ((Date.now() - startTime) / 1000) * scaledValuePerSecond
    }, 1000 / 30)

    export let emoji = "❓"
    export let distribution = undefined

    function hash(i) {
        return Math.sin(i ** 7)
    }

    let instances
    $: {
        instances = []
        if (scaledCount >= 0 && scaledCount <= limit) {
            for (let i = 0; i < Math.ceil(scaledCount); i++) {
                let offsetAmount = 2
                let newInstance = {
                    offsetX: offsetAmount * hash(i),
                    offsetY: offsetAmount * hash(i * 23),
                }
                if (distribution) {
                    newInstance.value = distribution((i + 0.5) / scaledCount)
                }
                if (typeof emoji === "function") {
                    newInstance.emoji = emoji(newInstance.value)
                } else {
                    newInstance.emoji = emoji
                }
                instances.push(newInstance)
            }
            if (instances.length > 0) {
                let lastInstance = instances[instances.length - 1]
                lastInstance.share = scaledCount % 1
            }
        }
    }
</script>

<div id="box">
    {#if scaledCount > limit}
        (A lot of {emoji}s, which I won't render, because it would crash your
        browser.)
    {:else}
        {#each instances as instance}
            <span
                class="emoji"
                style="position: relative; left: {instance.offsetX}px; top: {instance.offsetY}px;"
            >
                {instance.emoji}{#if instance.share}
                    <!-- add a white box, covering 0 to 100% of the emoji -->
                    <div class="cover" style="--share: {instance.share};" />
                {/if}</span
            >{/each}
    {/if}
</div>

<style>
    #box {
        position: relative;
    }
    .emoji {
        font-size: 1.5em;
        position: relative;
    }
    .cover {
        position: absolute;
        top: 0;
        right: 0;
        width: calc(100% - var(--share) * 100%);
        background: white;
        height: 100%;
        transform: scale(0.9);
    }
</style>
