<script>
    import {defaultScale} from "./stores.js"

    $: logScale = Math.log10($defaultScale)
</script>

<div id="top-bar">
    <input
        type="range"
        min="7"
        max="10"
        step="0.1"
        list="steplist"
        value={logScale}
        on:input={(e) =>
            defaultScale.update(() => Math.pow(10, e.target.value))}
    />
    <datalist id="steplist">
        {#each Array(14)
            .fill(0)
            .map((_, i) => i + 3) as step}
            <option value={step} />
        {/each}
    </datalist>
    <button on:click={() => defaultScale.update(() => 1e8)}
        >Reset to 100 million</button
    >
    <input type="number" bind:value={$defaultScale} />
</div>

<style>
    #top-bar {
        position: fixed;
        top: 0;
        padding: 1rem;
        background-color: #eee;
        z-index: 1;
    }
</style>
