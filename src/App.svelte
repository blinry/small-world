<script>
    import Number from "./Number.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import {scale} from "./stores.js"

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

    function number() {
        return ""
    }
</script>

<input
    type="range"
    min="1"
    max="8e9"
    value={$scale}
    on:input={(e) => scale.update(() => e.target.value)}
/>
<button on:click={() => scale.update(() => 1e8)}>Reset to 100 million</button>

{$scale}

<p>
    Welcome to our small world! The surface of Earth is <Number
        value={values.surfaceOfEarth}
        unit="km²"
    /> (a square with edge lengths of <Number
        value={Math.sqrt(values.surfaceOfEarth)}
        unit="km"
    />).
</p>

<p>
    There are <Number value={values.humans} /> people on Earth. <Number
        value={values.humansBornPerYear}
    /> are born every year, and <Number value={values.humansDiePerYear} /> die.
</p>

<EmojiBox count={values.humans} emoji="🧑" />

<p>
    <Number value={values.depression} /> people suffer from depression. <Number
        value={values.overweight}
    /> are overweight.
</p>

<EmojiBox count={values.depression} emoji="😔" />

<EmojiBox count={values.overweight} emoji="🤰" />

<p>
    There are <Number value={values.bikes} /> bikes, and <Number
        value={values.cars}
    /> cars.
</p>

<EmojiBox count={values.bikes} emoji="🚲" />

<EmojiBox count={values.cars} emoji="🚗" />

<p>
    There are <Number value={values.chickens} /> chickens. <Number
        value={values.chickensKilledPerYear}
    /> are killed every year (<Number
        value={values.chickensKilledPerYear / 365}
    /> per day).
</p>

<EmojiBox count={values.chickens} emoji="🐔" />

<p>
    There are <Number value={values.farms} /> farms. <Number
        value={values.cropland}
        unit="km²"
    /> of land is used for crops, and <Number
        value={values.livestockland}
        unit="km²"
    /> is used for livestock.
</p>
