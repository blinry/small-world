<script>
    import Number from "./Number.svelte"
    import EmojiPicker from "./EmojiPicker.svelte"
    import EmojiBox from "./EmojiBox.svelte"

    import {parseQuantity as parseValue} from "./helpers.js"

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

    let emoji = "🌍"

    let parsedData = {}
    $: {
        if (answer && answer !== "") {
            try {
                parsedData = parseValue(answer)
                error = ""
            } catch (e) {
                error = e.message
            }
        }
    }

    function encode(question) {
        return encodeURIComponent(question)
    }

    function emojiChanged(e) {
        emoji = e.detail.emoji
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
    Press one or more of these buttons to do an Internet search for your
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
    If you have found an answer that seems plausible to you, enter it in the box
    below! Some examples:
</p>

<ul>
    <li>1 billion pumpkins</li>
    <li>14900000000 USD</li>
    <li>2.5e8 kg</li>
</ul>

<input type="text" bind:value={answer} />

<EmojiPicker on:change={emojiChanged} />
{emoji}

<h3>Step 3: See the converted value</h3>

{#if answer}
    <p>In the small world, there are <Number {...parsedData} {emoji} />!</p>
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
    input[type="text"] {
        width: 70%;
        font-size: 1.1em;
        padding: 0.5em;
    }
</style>
