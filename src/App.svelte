<script>
    import { buildWorld } from './world.js'

    //let scale = 1e6 // 1 million people per game-person
    //let scale = 1e7 // 10 million people per game-person
    //let scale = 1e8 // 100 million people per game-person
    let scale = 8e9 / 100 // 100-people village

    let world = []
    ;(async () => {
        world = await buildWorld(scale)
        console.log(world)
    })()
</script>

<main>
    {#each world as entity}
        <div class="entity" style="left: {entity.x}px; top: {entity.y}px">{entity.getLabel()}</div>
    {/each}
</main>

<style>
.entity {
    position: absolute;
}
</style>
