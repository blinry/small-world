<script>
    export let t

    let answerShown = false
</script>

{#if answerShown}
    <slot />
{:else}
    <div on:click={() => (answerShown = !answerShown)}>
        ⚠️ <b>{t}</b>
    </div>
{/if}

<style>
    div {
        background: lightblue;
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem 0;
        cursor: pointer;
    }
</style>
