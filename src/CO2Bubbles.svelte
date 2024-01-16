<script>
    import Popup from "./Popup.svelte"
    import {humanReadable} from "./helpers"

    export let sectors
    export let count = 0

    let sectorBubbles = []
    $: {
        sectorBubbles = []
        let accountedFor = 0
        for (let sector of sectors) {
            let newSectorBubbles = []
            let sectorCount = Math.round((count * sector.percent) / 100)
            accountedFor += sectorCount
            for (let i = 0; i < sectorCount; i++) {
                newSectorBubbles.push({
                    emoji: sector.emoji,
                    name: sector.name,
                    description: sector.description,
                    value: (sector.percent / 100) * count,
                    source: sector.source,
                })
            }
            if (newSectorBubbles.length > 0) {
                sectorBubbles.push(newSectorBubbles)
            }
        }
        let remainder = Math.round(count - accountedFor)
        let remainingSectorBubbles = []
        for (let i = 0; i < remainder; i++) {
            remainingSectorBubbles.push({
                emoji: "❓",
                name: "Other sectors",
                description: "from sources not included in the above sectors",
                value: (1 / remainder) * count,
            })
        }
        sectorBubbles.push(remainingSectorBubbles)
    }
</script>

{#each sectorBubbles as bubbles}
    {#each bubbles as bubble}
        <Popup>
            <span class="bubble">
                ⚫
                <span class="emoji">{bubble.emoji}</span>
            </span>
            <div slot="popup">
                <p>
                    {humanReadable({value: bubble.value, unit: "kg"})}:
                    <strong>{bubble.name}</strong>, {bubble.description}.
                </p>
                {#if bubble.source}
                    <p>
                        Source: <a href={bubble.source} target="_blank"
                            >{bubble.source}</a
                        >
                    </p>
                {/if}
            </div>
        </Popup>
    {/each}
{/each}

<style>
    .bubble {
        position: relative;
        font-size: 2em;
    }
    .emoji {
        position: absolute;
        font-size: 0.6em;
        letter-spacing: -0.5em;
        top: 0.4em;
        left: -0.7em;
        width: 3em;
        text-align: center;
        vertical-align: middle;
    }
</style>
