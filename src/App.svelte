<script>
    import Number from "./Number.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import {defaultScale} from "./stores.js"

    const values = {
        humans: 8e9,
        humansBornPerYear: 140e6,
        humansDiePerYear: 60e6,
        humansEurope: 750e6,
        humansAfrica: 1.3e9,
        humansAsia: 4.6e9,
        humansNorthAmerica: 580e6,
        humansSouthAmerica: 430e6,
        humansAntarctica: 0,
        extremePoverty: 700e6,
        depression: 264e6,
        overweight: 1.9e9,
        bikes: 1e9,
        cars: 1.5e9,
        chickens: 21e9,
        chickensKilledPerYear: 73e9,
        otherAnimals: 1e9,
        farms: 570e6,
        cropland: 11e6,
        livestockland: 37e6,
        surfaceOfEarth: 510e6, // km^2
        surfaceOfCentralPark: 3.41,
        oceanSurface: 361e6,
        co2EmissionsPerYear: 36e9, // tons
        allMoney: 48.9e12, // USD
        jeffBezos: 193e9, // USD
    }

    function number() {
        return ""
    }
</script>

<input
    type="range"
    min="1"
    max="8e9"
    value={$defaultScale}
    on:input={(e) => defaultScale.update(() => e.target.value)}
/>
<button on:click={() => defaultScale.update(() => 1e8)}
    >Reset to 100 million</button
>

{$defaultScale}

<h1>Small World</h1>

<p>
    Welcome to our small world! It's like the Earth, but scaled down by a factor
    of
    <b>{$defaultScale}</b>. Let's explore it!
</p>

<p>
    The surface of our small world is <Number
        value={values.surfaceOfEarth}
        unit="km²"
    /> (a square with edge lengths of <Number
        value={Math.sqrt(values.surfaceOfEarth)}
        unit="km"
    />, or <Number
        value={values.surfaceOfEarth /
            $defaultScale /
            values.surfaceOfCentralPark}
        scale={1}
    /> times the area of Central Park in New York City). <Number
        value={values.oceanSurface}
        unit="km²"
    /> of that is ocean.
</p>

<p>
    There are <Number value={values.humans} /> people on Earth. <Number
        value={values.humansBornPerYear}
    /> are born every year, and <Number value={values.humansDiePerYear} /> die.
</p>

<EmojiBox count={values.humans} emoji="🧑" />

<p>
    <Number value={values.humansEurope} /> of these people live in Europe, <Number
        value={values.humansAfrica}
    /> in Africa, <Number value={values.humansAsia} /> in Asia, <Number
        value={values.humansNorthAmerica}
    /> in North America, <Number value={values.humansSouthAmerica} /> in South America,
    and <Number value={values.humansAntarctica} /> in Antarctica.
</p>

<EmojiBox count={values.humansEurope} emoji="🇪🇺" />
<EmojiBox count={values.humansAfrica} emoji="🌍" />
<EmojiBox count={values.humansAsia} emoji="🌏" />
<EmojiBox count={values.humansNorthAmerica} emoji="🇺🇸" />
<EmojiBox count={values.humansSouthAmerica} emoji="🌎" />

<p>
    <Number value={values.depression} /> of these people suffer from depression.
</p>

<EmojiBox count={values.depression} emoji="😔" />

<p>
    <Number value={values.overweight} /> are overweight.
</p>

<EmojiBox count={values.overweight} emoji="🤰" />

<p>
    And <Number value={values.extremePoverty} /> live in extreme poverty, on less
    than $1.90 per day, or the equivalent amount after converting currencies and
    adjusting for price differences between countries.
</p>

<EmojiBox count={values.extremePoverty} emoji="🥺" />

<p>
    There are <Number value={values.bikes} /> bikes in the world, and <Number
        value={values.cars}
    /> cars.
</p>

<EmojiBox count={values.bikes} emoji="🚲" />

<EmojiBox count={values.cars} emoji="🚗" />

<p>
    There are approximately <Number value={values.otherAnimals} /> each of cattle,
    sheep, goats, and pigs alive right now.
</p>
<p>
    <EmojiBox count={values.otherAnimals} emoji="🐄" />
    <EmojiBox count={values.otherAnimals} emoji="🐑" />
    <EmojiBox count={values.otherAnimals} emoji="🐐" />
    <EmojiBox count={values.otherAnimals} emoji="🐖" />
</p>
<p>
    There are <Number value={values.chickens} /> chickens alive right now. <Number
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

<p>
    We are producing <Number value={values.co2EmissionsPerYear} unit="tons" /> of
    CO₂ per year, which is <Number
        value={values.co2EmissionsPerYear / 365}
        unit="tons"
    /> per day.
</p>

<p>
    There is <Number value={values.allMoney} unit="USD" /> in the world (money in
    circulation, plus in checks and demand deposits). <Number
        value={values.jeffBezos}
        unit="USD"
    /> of that belongs to the richest person.
</p>
