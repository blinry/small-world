<script>
    import { onMount } from 'svelte'
    import { buildWorld, entityList, HUMANS } from './world.js'

    let year = 2017
    let entity = "World"

    let entities = []
    onMount(async () => {
        entities = await entityList()
        console.log(entities)
    })

    let numberOfPeople = 100

    $: scale = HUMANS/numberOfPeople

    $: {
        console.log("rebuilding with year " + year + " and entity " + entity)

        buildWorld(scale, year, entity).then((newWorld) => {
            world = newWorld
        }).catch((err) => {
            world = []
        })
    }

    let world = []
</script>

<main>
    <input type="range" min="1950" max="2100" step="1" bind:value={year} /> {year}<br>
    <input type="range" min="1" max="1000" step="1" bind:value={numberOfPeople} /> {numberOfPeople} <button on:click={() => {numberOfPeople = 100}}>Reset to 100</button><br>
    <select bind:value={entity}>
        {#each entities as e}
            <option value={e}>{e}</option>
        {/each}
    </select>
    <div id="world">
        {#each world as entity}
            <div class="entity" style="left: {entity.x}px; top: {entity.y}px">{entity.getLabel()}</div>
        {/each}
    </div>
</main>

<style>
#world {
    position: relative;
    width: 100%;
    height: 90vh;
    background: lightblue;
}
.entity {
    position: absolute;
}
</style>
