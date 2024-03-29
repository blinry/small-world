<script>
    import Popup from "./Popup.svelte"

    import {defaultScale} from "./stores.js"
    import {renderEmoji} from "./helpers.js"

    let limit = 2000

    export let count = 0
    export let scale
    export let bucketSize = 10
    export let bucketLabel
    export let source

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

    let buckets
    let labeledBuckets
    let lastValue = 0
    $: {
        buckets = [[]]
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

        console.log(bucketLabel)
        if (bucketLabel) {
            buckets = buckets.flat(Infinity)
            labeledBuckets = []
            for (let [label, value] of Object.entries(bucketLabel)) {
                labeledBuckets.push(
                    buckets.filter(
                        (e) =>
                            e.value <= value &&
                            !labeledBuckets.flat().includes(e),
                    ),
                )
            }
        }

        console.log("labeled", labeledBuckets)
    }
</script>

<Popup>
    <div id="box">
        {#if scaledCount > limit}
            (A lot of {emoji}s, which I won't render, because it would crash
            your browser.)
        {:else if labeledBuckets}
            {#each labeledBuckets as bucket, index}
                <h3>{Object.keys(bucketLabel)[index]}:</h3>
                {#each bucket as instance}
                    <span
                        class="emoji"
                        style="position: relative; left: {instance.offsetX}px; top: {instance.offsetY}px;"
                    >
                        {@html renderEmoji(instance.emoji)}
                    </span>
                    {#if instance.value !== undefined}
                        <span>
                            {Math.floor(instance.value)}
                        </span>
                    {/if}
                {/each}
                <br />
            {/each}
        {:else}
            {#each buckets as bucket}
                {#each bucket as instance}
                    <span
                        class="emoji"
                        style="position: relative; left: {instance.offsetX}px; top: {instance.offsetY}px;"
                    >
                        {@html renderEmoji(instance.emoji)}
                    </span>
                    {#if instance.value !== undefined}
                        <span>
                            {Math.floor(instance.value)}
                        </span>
                    {/if}
                {/each}
                <br />
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
    #box {
        position: relative;
    }
    .emoji {
        font-size: 1.5em;
        margin: 0 0 0 0.1rem;
    }
</style>
