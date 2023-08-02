<script>
    import Number from "./Number.svelte"

    import {parseValue} from "./helpers.js"

    const searchEngines = [
        {
            name: "Google",
            url: "https://www.google.com/search?q=",
        },
        {
            name: "DuckDuckGo",
            url: "https://duckduckgo.com/?q=",
        },
        {
            name: "Wikipedia",
            url: "https://en.wikipedia.org/w/index.php?search=",
        },
    ]

    let question

    let answer

    let error

    function encode(question) {
        return encodeURIComponent(question)
    }
</script>

<h3>Step 1: Write down your question!</h3>

<p>
    What do you want to know? Type it into this textbox. Especially questions
    that start with "How many…" work well!
</p>

<input type="text" bind:value={question} />

<h3>Step 2: Research the number for the real world!</h3>

<p>
    Press one or more of these buttons to do an internet search for your
    question:
</p>

{#each searchEngines as engine}
    <a
        class="button"
        href="{engine.url}{encode(question + ' in the world')}"
        target="_blank"
    >
        {engine.name}
    </a>
{/each}

<p>
    If you have found an answer that seems plausible to you, enter it here! If
    the value has a unit like "kg", "$" or "light years", also enter it into the
    box!
</p>

<input bind:value={answer} />

<h3>Step 3: See the converted value</h3>

{#if answer}
    In the small world, that would be: <Number {...parseValue(answer)} />
{/if}

{#if error}
    <p>{error}</p>
{/if}

<style>
    .button {
        display: inline-block;
        padding: 0.5em 1em;
        margin: 0.5em;
        background-color: #eee;
        border-radius: 0.5em;
        text-decoration: none;
        color: #000;
    }
</style>
