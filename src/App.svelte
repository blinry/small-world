<script>
    import { onMount } from 'svelte'
    import { buildWorld, entityList } from './world.js'

    let year = 2017
    let entity = "World"

    let entities = []
    onMount(async () => {
        entities = await entityList()
        console.log(entities)
    })

    //let scale = 1e6 // 1 million people per game-person
    //let scale = 1e7 // 10 million people per game-person
    let scale = 1e8 // 100 million people per game-person
    //let scale = 8e9 / 100 // 100-people village

    $: {
        console.log("rebuilding for entity " + entity)
        rebuild()
    }

    function rebuild() {
        console.log("rebuilding with year " + year + " and entity " + entity)
        buildWorld(scale, year, entity).then((newWorld) => {
            world = newWorld
        }).catch((err) => {
            world = []
        })
    }

    let world = []
    rebuild()
</script>

<main>
    <input type="range" min="1950" max="2022" step="1" on:change={rebuild} bind:value={year} /> {year}
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
