<script>
    import {defaultScale} from "./stores.js"

    let limit = 2000

    export let count = 0
    export let scale
    export let bucketSize

    let scaledCount
    let zeroesAfterDecimal
    let precision
    $: {
        scaledCount = scale ? count / scale : count / $defaultScale
        zeroesAfterDecimal = Math.floor(Math.log10(scaledCount))
        precision = Math.max(0, -zeroesAfterDecimal)
        scaledCount = scaledCount.toFixed(precision)
    }

    export let emoji = "❓"
    export let distribution = undefined

    function hash(i) {
        return Math.sin(i ** 7)
    }

    let buckets = [[]]
    let lastValue = 0
    $: {
        if (scaledCount >= 0.5 && scaledCount <= limit) {
            for (let i = 0; i < Math.round(scaledCount); i++) {
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

                if (
                    Math.floor(newInstance.value / bucketSize) >
                    Math.floor(lastValue / bucketSize)
                ) {
                    buckets.push([])
                }
                buckets[buckets.length - 1].push(newInstance)

                lastValue = newInstance.value
            }
        }
    }
</script>

<div id="box">
    {#if scaledCount > limit}
        (A lot of {emoji}s, which I won't render, because it would crash your
        browser.)
    {:else}
        {#each buckets as bucket}
            {#each bucket as instance}
                <span
                    class="emoji"
                    style="position: relative; left: {instance.offsetX}px; top: {instance.offsetY}px;"
                >
                    {instance.emoji}
                </span>
                {#if instance.value}
                    <span>
                        {Math.round(instance.value)}
                    </span>
                {/if}
            {/each}
            <br />
        {/each}
    {/if}
</div>

<style>
    #box {
        position: relative;
    }
    .emoji {
        font-size: 1.5em;
        margin: 0 0 0 0.1rem;
    }
</style>
