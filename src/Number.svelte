<script>
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import Popup from "./Popup.svelte"
    import {defaultScale} from "./stores.js"
    import {humanReadable, humanReadableSmall} from "./helpers.js"

    //entered via spreading
    export let value
    export let unit
    export let source
    export let emoji
    export let dialog = []

    export let factor = 1
    export let inverse = false

    export let shrunk = false
    export let circular = false

    let context = new window.AudioContext()

    function loadSample(url) {
        return fetch(url)
            .then((response) => response.arrayBuffer())
            .then((buffer) => context.decodeAudioData(buffer))
    }

    function playSample(sample) {
        console.log(sample)
        const source = context.createBufferSource()
        source.buffer = sample
        source.playbackRate.value = 0.8 + Math.random() * 0.4
        source.connect(context.destination)
        source.start(0)
    }

    let samplePromise = loadSample("pop.wav")

    let scaledValue
    let comment
    $: {
        if (inverse) {
            scaledValue = $defaultScale / value
            comment =
                "Well, actually: " +
                humanReadableSmall((1.0 * factor) / value, "months")
        } else {
            scaledValue = value / $defaultScale
            comment = "Well, actually: " + humanReadable(value * factor)
            if (unit) {
                comment += " " + unit
            }
        }
    }

    async function clicked() {
        shrunk = true

        if (emoji) {
            new EmojiBox({
                target: this.parentElement,
                props: {
                    count: value,
                    emoji: emoji,
                    dialog: dialog,
                },
            })
        }
        let sample = await samplePromise
        playSample(sample)
    }
</script>

{#if shrunk}
    <b class:circular>
        <Popup>
            <UnscaledNumber
                value={scaledValue}
                {unit}
                {factor}
                {comment}
                {source}
            />

            <div slot="popup">
                <p id="comment">{comment}</p>
                {#if source}
                    <p>
                        Source: <a href={source} target="_blank">{source}</a>
                    </p>
                {/if}
            </div>
        </Popup>
    </b>
{:else}
    <span on:click={clicked}>
        {#if inverse}
            <span style="font-size:120%"
                >{humanReadableSmall((1.0 * factor) / value, "months")}</span
            >
        {:else}
            <UnscaledNumber {value} {unit} {factor} rounded={true} />
        {/if}
    </span>
{/if}

<style>
    span {
        cursor:
            url("/custom-emoji/wand.svg") 0 0,
            pointer;
        font-size: 83%;
        background-color: #ddd;
        padding: 0.1em 0.2em;
        border-radius: 0.3em;
    }
    .circular {
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        padding: 1em;
        width: 1.5em;
        height: 1.5em;
        text-align: center;
        margin-bottom: -1em;
    }
</style>
