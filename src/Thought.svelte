<script>
    export let t

    let answerShown = false
</script>

<div class="container" on:click={() => (answerShown = !answerShown)}>
    💭 <b>{t}</b>
    <div class="arrow"></div>

    <div class:hidden={!answerShown}><slot /></div>
</div>

<style>
    .container {
        background: lightblue;
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem 0;
        cursor: pointer;
        position: relative;
    }
    .hidden {
        display: none;
    }
    .arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        position: absolute;
        right: 1rem;
        top: 1.2rem;
    }
</style>
