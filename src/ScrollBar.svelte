<script>
    let scroll = 0

    let sections = []

    function watchScroll() {
        const {scrollHeight, clientHeight, scrollTop} = document.documentElement
        const height = scrollHeight - clientHeight
        scroll = scrollTop / height

        sections = [...document.querySelectorAll("#app > h2")].map((h2) => {
            const {offsetTop, offsetHeight} = h2
            const progress = Math.max(
                0,
                Math.min(1, (offsetTop - clientHeight / 2) / height),
            )
            //const emoji = h2.textContent.replaceAll(
            //    /[^\p{Extended_Pictographic}]/gu,
            //    "",
            //)
            const emoji = h2.textContent.split(" ")[0]
            return {name: h2.textContent, emoji, progress}
        })
    }

    function scrollTo(percent) {
        const {scrollHeight, clientHeight} = document.documentElement
        const height = scrollHeight - clientHeight
        const scrollTop = percent * height
        window.scrollTo({top: scrollTop})
    }
</script>

<div id="bar">
    <div id="progress" style="--scroll: {scroll}" />
    {#each sections as section}
        <div
            class="section"
            style="--scroll: {section.progress}"
            on:click={() => {
                scrollTo(section.progress)
            }}
        >
            {section.emoji}
        </div>
    {/each}
</div>

<svelte:window on:scroll={watchScroll} on:load={watchScroll} />

<style>
    #bar {
        z-index: 10;
        box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.3);
    }

    #bar,
    #progress {
        position: fixed;
        top: 0;
        left: 0;
        background: #ccc;
        width: 100vw;
        height: 1.4em;
    }

    #progress {
        width: calc(var(--scroll) * 100vw);
        background: steelblue;
    }

    .section {
        position: fixed;
        top: 0;
        left: calc(var(--scroll) * 100vw);
        cursor: pointer;
        transform: translate(-50%, 0);
        text-shadow: 0 0 0.5em rgba(0, 0, 0, 0.3);
    }
</style>
