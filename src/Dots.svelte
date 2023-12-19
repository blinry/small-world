<script>
    import {onMount} from "svelte"

    export let n
    let canvas

    onMount(() => {
        let displayScale = 1
        if (n < 10000) {
            displayScale = 2
        }

        let width = 2 * Math.sqrt(n)
        let height = width
        canvas.width = width * displayScale
        canvas.height = height * displayScale
        canvas.style.width = width * displayScale + "px"
        canvas.style.height = height * displayScale + "px"
        if (n == 100_000) {
            // load from 100-thousand.png
            let img = new Image()
            img.src = "100-thousand.png"
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                let ctx = canvas.getContext("2d")
                ctx.drawImage(img, 0, 0)
            }
        } else {
            let ctx = canvas.getContext("2d")
            ctx.fillStyle = "black"
            for (let x = 0; x < width; x += 2) {
                for (let y = 0; y < height; y += 2) {
                    ctx.fillRect(
                        x * displayScale,
                        y * displayScale,
                        1 * displayScale,
                        1 * displayScale,
                    )
                }
            }
        }
    })
</script>

<canvas bind:this={canvas} />

<style>
    canvas {
        display: inline;
        margin: 5px;
        image-rendering: pixelated;
    }
</style>
