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

    let shrinkApplied = false

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
        shrinkApplied = true

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

{#if shrinkApplied}
    <b>
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
        <UnscaledNumber {value} {unit} {factor} />
    </span>
{/if}

<style>
    span {
        cursor: pointer;
    }
</style>
