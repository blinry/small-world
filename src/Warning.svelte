<script>
    export let t

    let answerShown = false
</script>

<div><slot /></div>

<style>
    div {
        background: #f8878a;
        border-radius: 1rem;
        font-size: 1.1em;
        padding: 1rem;
        margin: 1rem 0;
        cursor: pointer;
    }
    .hidden {
        display: none;
    }
</style>
