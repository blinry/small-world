<script>
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import UnscaledRoundedNumber from "./UnscaledRoundedNumber.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import {defaultScale} from "./stores.js"
    import {humanReadable, humanReadableSmall} from "./helpers.js"

    //entered via spreading
    export let value
    export let unit
    export let source
    export let emoji

    export let factor = 1
    export let inverse = false

    export let shrunk = false
    export let circular = false

    const audioPop = new Audio("pop.wav")

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

    function clicked() {
        shrunk = true

        if (emoji) {
            new EmojiBox({
                target: this.parentElement,
                props: {
                    count: value,
                    emoji: emoji,
                },
            })
        }
        audioPop.playbackRate = 1 + Math.random() * 0.4 - 0.2
        audioPop.play()
    }
</script>

{#if shrunk}
    <b class:circular>
        <UnscaledRoundedNumber
            value={scaledValue}
            {unit}
            {factor}
            {comment}
            {source}
        />
    </b>
{:else}
    <span on:click={clicked}>
        {#if inverse}
            <span style="font-size:120%"
                >{humanReadableSmall((1.0 * factor) / value, "months")}</span
            >
        {:else}
            <UnscaledNumber {value} {unit} {factor} />
        {/if}
    </span>
{/if}

<style>
    span {
        cursor:
            url("/images/wand.svg") 0 0,
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
