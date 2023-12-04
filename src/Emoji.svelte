<script>
    import {renderEmoji} from "./helpers.js"
    export let emoji = "❓"
    export let speech = null

    let speechOpacity = 0

    function click() {
        speechOpacity = 1
        setTimeout(() => {
            speechOpacity = 0
        }, 2000)
    }
</script>

<span>
    <span id="emoji" on:click={click}>{@html renderEmoji(emoji)}</span>
    {#if speech}
        <div class="speech-bubble" style="opacity: {speechOpacity}">
            {@html speech}
        </div>
    {/if}
</span>

<style>
    span {
        position: relative;
    }
    .speech-bubble {
        pointer-events: none;

        font-size: 1.1rem;
        display: inline-block;
        position: absolute;
        white-space: nowrap;
        left: 1.5em;
        top: -2em;

        background-color: #f5f5f5;
        border-radius: 50%;
        box-shadow: 0 1px 0.5rem rgba(0, 0, 0, 0.5);
        z-index: 1;
        padding: 1rem;
        text-align: center;
        font-family: Comic Sans MS;
    }
</style>
