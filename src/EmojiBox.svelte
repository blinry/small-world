<script>
    import {defaultScale} from "./stores.js"
    import Emoji from "./Emoji.svelte"

    let limit = 2500

    export let count
    export let scale
    export let factor = 1
    export let unscaled = false
    export let dialog = []

    let scaledCount
    let zeroesAfterDecimal
    let precision
    $: {
        if (unscaled) {
            scaledCount = count * factor
        } else {
            scaledCount = scale
                ? (count / scale) * factor
                : (count / $defaultScale) * factor
        }
        zeroesAfterDecimal = Math.floor(Math.log10(scaledCount))
        precision = Math.max(0, -zeroesAfterDecimal)
        scaledCount = scaledCount.toFixed(precision)
    }

    export let emoji = "❓"
    export let distribution = undefined

    function hash(i) {
        return Math.sin(i ** 7)
    }

    let instances
    $: {
        instances = []
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

                if (dialog.length) {
                    newInstance.speech =
                        dialog[Math.floor(Math.random() * dialog.length)]
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
            <span
                class="emoji"
                style="position: relative; left: {instance.offsetX}px; top: {instance.offsetY}px;"
            >
                <Emoji emoji={instance.emoji} speech={instance.speech} />
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
        margin: 2em 0;
    }
    .emoji {
        font-size: 1.5em;
    }
</style>
