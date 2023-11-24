<script>
    import {defaultScale} from "./stores.js"
    import Popup from "./Popup.svelte"
    import {renderEmoji} from "./helpers.js"
    import {onMount} from "svelte"

    export let segments = 50
    export let probabilities = []
    export let source

    let wheelScale = 1
    let wheelWidthAtScale1 = 1200 // px, not super precise way of doing it...

    let width = "40"
    let rotation = 0
    let rotationSpeed = 0
    let rotationAcceleration = 0
    let friction = 1

    let centerEmoji = ""
    let centerLabel = " "
    let description = " "

    const dt = 1 / 30 // seconds

    let intervalID
    function start() {
        clearInterval(intervalID)
        rotationAcceleration = 5 + Math.random() * 5
        friction = 1
        centerEmoji = ""
        centerLabel = "​"
        description = "​"
        setTimeout(() => {
            rotationAcceleration = 0
            friction = 0.95
        }, 1000)
        intervalID = setInterval(() => {
            rotationSpeed += rotationAcceleration * dt
            rotationSpeed *= friction
            rotation += rotationSpeed * dt

            const segmentIndex =
                Math.round(
                    segmentInstances.length +
                        (1 - (rotation % (Math.PI * 2)) / (Math.PI * 2)) *
                            segmentInstances.length
                ) % segmentInstances.length
            centerEmoji = segmentInstances[segmentIndex].emoji
            if (rotationSpeed <= 0.01) {
                centerLabel = segmentInstances[segmentIndex].label
                description = segmentInstances[segmentIndex].description
                clearInterval(intervalID)
            }
        }, dt * 1000)
    }

    let segmentInstances
    $: {
        segmentInstances = []
        let summedOther = 0

        // Map to number of segments.
        let segmentCounts = probabilities.map((p) => {
            return [Math.round(p[0] / (100.0 / segments)), p[1]]
        })
        console.log(segmentCounts)

        let remainingSegments =
            segments - segmentCounts.reduce((acc, p) => acc + p[0], 0)
        segmentCounts.push([
            remainingSegments,
            {emoji: "❓", label: "Other causes",
            description: "including: " + probabilities.filter(p => Math.round(p[0] / (100.0 / segments)) == 0).map(p => p[1].label).slice(0, 5).join(", ") + ", ..."
            },
        ])

        segmentCounts.forEach((p) => {
            for (let i = 0; i < p[0]; i++) {
                segmentInstances.push({
                    emoji: p[1].emoji,
                    label: p[1].label,
                    description: p[1].description,
                })
            }
        })
        // Add other
        //for (let i = 0; i < (summedOther / 100) * segments; i++) {
        //    segmentInstances.push({
        //        emoji: "❓",
        //        label: "Other",
        //    })
        //}

        // Distribute angles
        for (let i = 0; i < segmentInstances.length; i++) {
            segmentInstances[i].angle = (i * 360) / segmentInstances.length
            segmentInstances[i].x =
                width / 2 +
                (Math.cos((segmentInstances[i].angle / 180) * Math.PI) *
                    width) /
                    2
            segmentInstances[i].y =
                width / 2 +
                (Math.sin((segmentInstances[i].angle / 180) * Math.PI) *
                    width) /
                    2
        }
    }

    function onResize() {
        let currentBodyWidth = document.body.clientWidth
        wheelScale = currentBodyWidth / wheelWidthAtScale1
    }

    onMount(() => {
        window.addEventListener("resize", onResize)
        onResize()
    })
</script>

<div id="container" style="--scale: {wheelScale}">
    <div id="wheel" style="--rotation: {(rotation * 180) / Math.PI}deg">
        {#each segmentInstances as segment}
            <div
                class="segment"
                style="top: {segment.y}rem; left: {segment.x}rem; transform: translate(-0.8rem, -1rem) rotate({segment.angle}deg) "
                title={segment.label}
                on:click={() => {
                    centerEmoji = segment.emoji
                    centerLabel = segment.label
                    description = segment.description
                    rotationSpeed = 0
                    rotationAcceleration = 0
                    rotation = -(segment.angle / 180) * Math.PI
                }}
            >
                {@html renderEmoji(segment.emoji)}
            </div>
        {/each}
        <div id="center" style="--rotation: {-(rotation * 180) / Math.PI}deg">
            <Popup>
            <div>
            <span style="font-size: 1200%">{@html renderEmoji(centerEmoji)}</span><br
            /><span style="font-size: 150%">{centerLabel}</span><br>
            {#if description}
            {#if description == " " || description == "" || description == "​"}
                <span style="font-size: 100%">{description}</span>
            {:else}
                <span style="font-size: 100%">({description})</span>
                {/if}
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
        </div>
    </div>
    <div id="arrow" on:click={start}>⬅️</div>
</div>

<style>
    #container {
        display: flex;
        align-items: center;
        transform: scale(var(--scale));
        transform-origin: top left;
        min-width: 50rem;
        min-height: 40rem;
    }
    #wheel {
        min-width: 40rem;
        min-height: 40rem;
        position: relative;
        transform: rotate(var(--rotation));
        background: #eee;
        border-radius: 50%;
        border: 2rem solid #eee;
    }
    .segment {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 150%;
        cursor: pointer;
    }
    #arrow {
        font-size: 500%;
        cursor: pointer;
    }
    #center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(var(--rotation));
        text-align: center;
        font-size: 150%;
    }
</style>
