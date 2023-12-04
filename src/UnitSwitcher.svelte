<script lang="ts">
    import {useMetric} from "./stores.js"

    function setMetric(value) {
        $useMetric = value
    }
</script>

<div id="wrapper">
    <span on:click={() => setMetric(true)} class:active={$useMetric}
        >metric</span
    >
    /
    <span on:click={() => setMetric(false)} class:active={!$useMetric}
        >imperial</span
    >
</div>

<style>
    #wrapper {
        position: fixed;
        top: 2em;
        right: 1em;
    }
    span {
        cursor: pointer;
    }
    .active {
        font-weight: bold;
    }
</style>
