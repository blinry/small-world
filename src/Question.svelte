<script>
    import BigNumberInput from "./BigNumberInput.svelte"

    export let q
    export let dropdown = false

    let answerShown = false
    let userAnswer
</script>

<div>
    <b>{q}</b>
    {#if dropdown}
        <BigNumberInput />
    {:else}
        <input
            type="text"
            bind:value={userAnswer}
            on:keypress={(e) => e.key === "Enter" && (answerShown = true)}
        />
    {/if}

    {#if answerShown}
        <slot />
    {:else}
        <button on:click={() => (answerShown = true)}>Show answer</button>
    {/if}
</div>

<style>
    div {
        background: lightblue;
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem 0;
    }
</style>
