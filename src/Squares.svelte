<script>
    export let values
    // values = [{earth:{value: 1, color: "red"}}]

    let maxArea = 300 ** 2 // px

    $: {
        let max = 0
        for (let [key, value] of Object.entries(values)) {
            if (value.value > max) {
                max = value.value
            }
        }
        for (let [key, value] of Object.entries(values)) {
            value.scaledValue = (value.value / max) * maxArea
            value.width = Math.sqrt(value.scaledValue)
            value.height = Math.sqrt(value.scaledValue)
        }
    }
</script>

<div id="box">
    {#each Object.entries(values) as [key, value]}
        <span
            style="width: {value.width}px; height: {value.height}px; background-color: {value.color};"
        >
            {key}
        </span>
    {/each}
</div>

<style>
    span {
        display: inline-block;
    }
</style>
