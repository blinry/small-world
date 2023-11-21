<script>
    import {defaultScale} from "./stores.js"
    import Number from "./Number.svelte"

    export let emoji = "❓"

    export let europe
    export let asia
    export let africa
    export let northamerica
    export let southamerica
    export let oceania

    export let source

    let clusterDefinitions = {
        europe: {
            center: [0.5, 0.13],
        },
        asia: {
            center: [0.7, 0.28],
        },
        northamerica: {
            center: [0.17, 0.2],
        },
        southamerica: {
            center: [0.27, 0.65],
        },
        africa: {
            center: [0.5, 0.45],
        },
        oceania: {
            center: [0.84, 0.75],
        },
    }

    let clusters
    $: {
        clusters = []
        clusters.push({
            count: europe,
            ...clusterDefinitions.europe,
        })
        clusters.push({
            count: asia,
            ...clusterDefinitions.asia,
        })
        clusters.push({
            count: africa,
            ...clusterDefinitions.africa,
        })
        clusters.push({
            count: northamerica,
            ...clusterDefinitions.northamerica,
        })
        clusters.push({
            count: southamerica,
            ...clusterDefinitions.southamerica,
        })
        clusters.push({
            count: oceania,
            ...clusterDefinitions.oceania,
        })
        clusters.forEach((cluster) => {
            cluster.scaledCount = Math.round(cluster.count / $defaultScale)
        })
    }
</script>

<div id="container">
    <img src="/continents.svg" />

    {#each clusters as cluster}
        <div
            class="cluster"
            style="
                left: {cluster.center[0] * 100}%;
                top: {cluster.center[1] * 100}%;
            "
        >
            <span class="number"><Number value={cluster.count} source={source} /></span>
            <hr />
            {#each Array(cluster.scaledCount) as _}
                <span class="emoji">{emoji}</span>
            {/each}
        </div>
    {/each}
</div>

<style>
    img {
        width: 100%;
    }
    #container {
        position: relative;
        width: 100%;
        height: 100%;
        color: black;
    }
    .number {
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cluster {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        font-size: 140%;
    }
    hr {
        width: 100%;
        margin: 0.5rem 0 0 0;
        padding: 0;
        background: black;
        border: none;
    }
    @media (max-width: 1000px) {
        .emoji {
            font-size: 60%;
        }
        .cluster {
            width: 170px;
        }
    }
    @media (max-width: 800px) {
        .emoji {
            font-size: 40%;
        }
        .cluster {
            width: 140px;
        }
    }
    @media (max-width: 600px) {
        .emoji {
            font-size: 20%;
        }
        .cluster {
            width: 100px;
        }
    }
</style>
