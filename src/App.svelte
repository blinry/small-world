<script>
    import { onMount } from 'svelte'
    import { buildGroupWorld, buildWorld, entityList, HUMANS, onDataReady } from './world.js'

    let initialized = false

    let year = 2017

    let entities = ["World"]
    let entity = "World"
    let displayedEntities = ["Europe", "Oceania", "North America", "Asia", "South America", "Africa"]
    //$: displayedEntities = entities

    onMount(async () => {
        onDataReady(async () => {
            initialized = true
            entities = await entityList()
        })
    })

    let numberOfPeople = 100

    $: scale = HUMANS/numberOfPeople



    let worlds = {}
    $: {
        if (initialized) {
            for(let entity of displayedEntities) {
                buildGroupWorld(scale, year, entity).then((newWorld) => {
                    worlds[entity] = newWorld
                }).catch((err) => {
                    worlds[entity] = []
                })
            }
        }
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
    <div id="countries">
        {#each Object.entries(worlds) as [entity, world]}
            <div class="country">
                <h2>{entity}</h2>
                <div class="world">
                    {#each world as e}
                        <div class="entity" style="left: {e.x}px; top: {e.y}px">{e.getLabel()}</div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
#countries {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;
}
.world {
    position: relative;
    width: 500px;
    height: 500px;
    background: lightblue;
}
.entity {
    position: absolute;
}
</style>
