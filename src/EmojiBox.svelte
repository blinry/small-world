<script>
    let limit = 2000

    export let count = 0
    export let emoji = "❓"

    const pixelsPerEntity = 80 ** 2
    let width
    let height
    $: {
        if (count > limit) {
            height = 50
        } else {
            height = (pixelsPerEntity * count) / width
        }
    }
    let padding = 20

    let instances
    $: {
        instances = []
        if (count >= 1 && count <= limit) {
            for (let i = 0; i < count; i++) {
                instances.push({
                    x: padding + Math.random() * (width - padding * 2),
                    y: padding + Math.random() * (height - padding * 2),
                })
            }
        }
    }
</script>

<div
    id="box"
    bind:clientWidth={width}
    style="width: {width}px; height: {height}px;"
>
    {#if count > limit}
        (A lot of {emoji}s, which I won't render, because it would crash your
        browser.)
    {:else}
        {#each instances as instance}
            <div
                style="position: absolute; left: {instance.x}px; top: {instance.y}px;"
                class="emoji"
            >
                {emoji}
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
