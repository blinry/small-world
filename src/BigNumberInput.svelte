<script>
    let mantissa

    let factors = [
        "(pick multiplier)",
        "1,000 (thousand)",
        "1,000,000 (million)",
        "1,000,000,000 (billion)",
        "1,000,000,000,000 (trillion)",
    ]
</script>

<input type="number" bind:value={mantissa} />
<select>
    {#each factors as factor}
        <option>{factor}</option>
    {/each}
</select>
