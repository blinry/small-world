<script>
    import {defaultScale} from "./stores.js"

    let limit = 2000

    export let count = 0
    export let scale
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

    let instances
    $: {
        instances = []
        if (scaledCount >= 1 && scaledCount <= limit) {
            for (let i = 0; i < scaledCount; i++) {
                let newInstance = {}
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
        }
    }
</script>

<div id="box">
    {#if scaledCount > limit}
        (A lot of {emoji}s, which I won't render, because it would crash your
        browser.)
    {:else}
        {#each instances as instance}
            <span class="emoji">
                {instance.emoji}
                {#if instance.value}
                    <span>
                        {Math.round(instance.value)}
                    </span>
                {/if}
            </span>
        {/each}
    {/if}
</div>

<style>
    #box {
        position: relative;
    }
    .emoji {
        font-size: 1.5em;
    }
</style>
