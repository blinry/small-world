<script>
    export let t

    let answerShown = false
</script>

<div on:click={() => (answerShown = !answerShown)}>
    💭 <b>{t}</b>

    <div class:hidden={!answerShown}><slot /></div>
</div>

<style>
    div {
        background: lightblue;
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem 0;
        cursor: pointer;
    }
    .hidden {
        display: none;
    }
</style>
