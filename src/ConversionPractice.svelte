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

    let answer = ""

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

    function calcFontSize(value) {
        let smallValue = value / 100000000
        if (smallValue <= 10) return 2
        if (smallValue <= 100) return 1.8
        if (smallValue <= 200) return 1.35
        if (smallValue <= 600) return 1
        return 0.6
    }

    function saveInfo() {
        var s = new XMLSerializer().serializeToString(
            document.getElementById("exportsvg"),
        )
        var encodedData = btoa(unescape(encodeURIComponent(s)))

        let img = new Image()
        let canvas = document.createElement("canvas")
        canvas.width = 1180
        canvas.height = 820

        img.onload = function () {
            let ctx = canvas.getContext("2d")
            ctx.rect(0, 0, 1180, 820)
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.drawImage(img, 50, 50)
            var dataURL = canvas.toDataURL("image/png", 1.0)
            var a = document.createElement("a")
            a.href = dataURL
            a.download = "smallworld.png"
            document.body.appendChild(a)
            a.click()
            document.getElementById("canvtest").appendChild(canvas)
        }
        img.src = `data:image/svg+xml;base64,${encodedData}`
        console.log(`data:image/svg+xml;base64,${encodedData}`)
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

{#if error}
    <p>{error}</p>
{/if}

{#if question != undefined && parsedData.value > 0}
    <svg width="1080" height="720" id="exportsvg">
        <foreignObject x="0" y="0" width="1080" height="720">
            <style>
                #futureImage {
                    font-family: sans-serif;
                }
            </style>

            <div
                id="futureImage"
                style="font-size: {calcFontSize(parsedData.value)}em;"
            >
                <h3>{question}</h3>
                <p>
                    In the small world, there are <Number
                        {...parsedData}
                        {emoji}
                        shrunk={true}
                    />!
                </p>
                <EmojiBox count={parsedData.value} {emoji}></EmojiBox>
                <p>Want to know more? Visit Small World at XXXXXXX.com!</p>
            </div>
        </foreignObject>
    </svg>

    {#if parsedData.value > 100000000 && parsedData.value < 200000000000}
        <button on:click={saveInfo}>Save my Result</button>
    {/if}
{/if}

<div id="canvtest"></div>

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
    #futureImage {
        display: flex;
        flex-direction: column;

        height: 100%;
    }
</style>
