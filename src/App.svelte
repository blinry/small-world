<script>
    import EmojiBox from "./EmojiBox.svelte"

    let factor = 100_000_000

    const values = {
        humans: 8e9,
        humansBornPerYear: 140e6,
        humansDiePerYear: 60e6,
        depression: 264e6,
        overweight: 1.9e9,
        bikes: 1e9,
        cars: 1.5e9,
        chickens: 21e9,
        chickensKilledPerYear: 37e9,
        farms: 570e6,
        cropland: 11e6, // km^2 https://ourworldindata.org/land-use
        livestockland: 37e6, // km^2 https://ourworldindata.org/land-use
        surfaceOfEarth: 510e6, // km^2 https://en.wikipedia.org/wiki/Earth
    }

    let scaled = {}
    $: {
        for (const [key, value] of Object.entries(values)) {
            scaled[key] = value / factor
        }
    }

    $: format = (value) => {
        let scaledValue = value / 1
        let zeroesAfterDecimal = Math.floor(Math.log10(scaledValue))
        let precision = Math.max(0, -zeroesAfterDecimal)
        let result = scaledValue.toFixed(precision)
        return `<b style="font-size: 120%">${result}</b>`
    }
</script>

<input type="range" min="1" max="8000000000" step="1" bind:value={factor} />
{factor}
<button
    on:click={() => {
        factor = 100_000_000
    }}>Reset to 100 million</button
><br />

<p>
    Welcome to our small world! The surface of Earth is {@html format(
        scaled.surfaceOfEarth
    )} km² (an area of {@html format(Math.sqrt(scaled.surfaceOfEarth))}^2 km).
</p>

<p>
    There are {@html format(scaled.humans)} people on Earth. {@html format(
        scaled.humansBornPerYear
    )} are born every year, and {@html format(scaled.humansDiePerYear)} die.
</p>

<EmojiBox count={scaled.humans} emoji="🧑" />

<p>
    {@html format(scaled.depression)} people suffer from depression. {@html format(
        scaled.overweight
    )} are overweight.
</p>

<EmojiBox count={scaled.depression} emoji="😔" />

<EmojiBox count={scaled.overweight} emoji="🤰" />

<p>
    There are {@html format(scaled.bikes)} bikes, and {@html format(
        scaled.cars
    )} cars.
</p>

<EmojiBox count={scaled.bikes} emoji="🚲" />

<EmojiBox count={scaled.cars} emoji="🚗" />

<p>
    There are {@html format(scaled.chickens)} chickens. {@html format(
        scaled.chickensKilledPerYear
    )} are killed every year ({@html format(scaled.chickensKilledPerYear / 365)}
    per day).
</p>

<EmojiBox count={scaled.chickens} emoji="🐔" />

<p>
    There are {@html format(scaled.farms)} farms. {@html format(
        scaled.cropland
    )} km² of land is used for crops, and {@html format(scaled.livestockland)} km²
    is used for livestock.
</p>
