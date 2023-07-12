<script>
    import {defaultScale} from "./stores.js"
    import confetti from "canvas-confetti"
    import {renderEmoji} from "./helpers.js"

    export let segments = 50
    export let probabilities = []

    let width = "40"
    let rotation = 0
    let rotationSpeed = 0
    let rotationAcceleration = 0
    let friction = 1

    let centerEmoji = ""
    let centerLabel = " "

    const dt = 1 / 30 // seconds

    let intervalID
    function start() {
        clearInterval(intervalID)
        rotationAcceleration = 5 + Math.random() * 5
        friction = 1
        centerEmoji = ""
        centerLabel = "​"
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
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {y: 0.6},
                })
                clearInterval(intervalID)
            }
        }, dt * 1000)
    }

    let segmentInstances
    $: {
        segmentInstances = []
        probabilities.forEach((p) => {
            for (let i = 0; i < p[0] * segments; i++) {
                segmentInstances.push({
                    emoji: p[1].emoji,
                    label: p[1].label,
                })
            }
        })
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
</script>

<div id="container" on:click={start}>
    <div id="wheel" style="--rotation: {(rotation * 180) / Math.PI}deg">
        {#each segmentInstances as segment}
            <div
                class="segment"
                style="top: {segment.y}rem; left: {segment.x}rem; transform: translate(-0.8rem, -1rem) rotate({segment.angle}deg) "
                title="{segment.label}"
            >
                {@html renderEmoji(segment.emoji) }
            </div>
        {/each}
        <div id="center" style="--rotation: {-(rotation * 180) / Math.PI}deg">
            <span id="center-emoji">{@html renderEmoji(centerEmoji) }</span><br />{centerLabel}
        </div>
    </div>
    <div id="arrow">⬅️</div>
</div>

<style>
    #wheel {
        cursor: pointer;
        width: 40rem;
        height: 40rem;
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
    }
    #container {
        display: flex;
        align-items: center;
    }
    #arrow {
        font-size: 200%;
    }
    #center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(var(--rotation));
        text-align: center;
        font-size: 150%;
    }
    #center-emoji {
        font-size: 800%;
    }
</style>
