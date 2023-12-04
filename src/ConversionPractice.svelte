<script>
    import Number from "./Number.svelte"
    import EmojiPicker from "./EmojiPicker.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import html2canvas from "html2canvas"
    //import * as htmlToImage from 'html-to-image';
    //import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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

    function saveInfo() {
        html2canvas(document.getElementById("futureImage")).then(
            function (canvas) {
                var link = document.createElement("a")
                link.download = "smallworld.png"
                link.href = canvas.toDataURL()
                link.click()
            },
        )

        /*htmlToImage.toSvg(document.getElementById('futureImage'))
        .then(function (dataUrl) {
            //download(dataUrl, 'my-node.png');
            var link = document.createElement("a")
                link.download = "smallworld.svg"
                link.href = dataUrl
                link.click()
                
                var img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        })
        */
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

<button on:click={saveInfo}>Save my Result</button>

<div id="futureImage">
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
        padding: 0.5em;
        position: fixed;
    }
</style>
