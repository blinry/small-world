<script>
    import Number from "./Number.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import EmojiGraph from "./EmojiGraph.svelte"
    import {defaultScale} from "./stores.js"

    const values = {
        humans: 8e9,
        humansBornPerYear: 140e6,
        humansDiePerYear: 60e6,
        humansEurope: 750e6,
        humansAfrica: 1.3e9,
        humansAsia: 4.6e9,
        humansChina: 1.4e9,
        humansIndia: 1.4e9,
        humansNorthAmerica: 580e6,
        humansSouthAmerica: 430e6,
        humansAntarctica: 0,
        humansEverLived: 108e9,
        extremePoverty: 700e6,
        cannotRead: 750e6,
        christians: 2.382e9, // https://en.wikipedia.org/wiki/List_of_religious_populations
        muslims: 1.907e9,
        atheists: 1.193e9,
        hindus: 1.161e9,
        buddhists: 506e6,
        chineseTraditionalReligions: 394e6,
        depression: 264e6,
        overweight: 1.9e9,
        humansKilledByBlackDeath: 200e6,
        bikes: 1e9,
        cars: 1.5e9,
        flightsPerYear: 38e6,
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
        energyPerYear: 2373e9, // kWh
        allMoney: 48.9e12, // USD (M1 supply) https://www.gobankingrates.com/money/economy/how-much-money-is-in-the-world/
        jeffBezos: 193e9, // USD
        millionaires: 56e6,
        starsInMilkyWay: 250e9,
        galaxiesInUniverse: 7e9,
        co2CarPerKM: 0.2, //kg https://www.quarks.de/umwelt/klimawandel/co2-rechner-fuer-auto-flugzeug-und-co/
        co2PerBitcoinTransaction: 398.86, //kg https://digiconomist.net/bitcoin-energy-consumption
        kWhPerBoilingLiter: 184, //Wh https://discovergy.com/blog/energiesparen-haushalt
        smartphoneBatteryCapacity: 4.5, //Ah https://www.androidauthority.com/smartphone-battery-size-poll-results-1221015/
        marsBarWh: 300, //Wh https://talybontenergy.co.uk/education/a-cubs-guide-to-energy-in-mars-bars/
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

<input type="number" bind:value={$defaultScale} />

<h1>Small World</h1>

<p>
    Welcome to our small world! It's like the Earth, but scaled down by a factor
    of
    <b>{$defaultScale}</b>. Let's explore it!
</p>

<h2>Planet</h2>

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

<h2>Demographics</h2>

<p>
    There are <Number value={values.humans} /> people on Earth. (<Number
        value={values.humansEverLived}
    /> have ever lived.)
    <Number value={values.humansBornPerYear} /> are born every year, and <Number
        value={values.humansDiePerYear}
    /> die.
</p>

<EmojiBox count={values.humans} emoji="🧑" />

<p>This is how much our people earn per month:</p>

<EmojiGraph
    count={values.humans}
    emoji="🧑"
    barEmoji="💵"
    unit="$"
    distribution={(percentile) =>
        Math.round((1.207 / (1 - percentile) + 4.285) * 30)}
/>
<!--distribution={(percentile) =>
        Math.round(Math.pow(136.535, percentile) * 30)}-->

<p><Number value={values.humansEurope} /> of these people live in Europe.</p>
<EmojiBox count={values.humansEurope} emoji="🇪🇺" />

<p><Number value={values.humansAfrica} /> live in Africa.</p>
<EmojiBox count={values.humansAfrica} emoji="🌍" />

<p>
    <Number value={values.humansAsia} /> live in Asia (including <Number
        value={values.humansChina}
    /> in China and <Number value={values.humansIndia} /> in India).
</p>
<EmojiBox count={values.humansAsia} emoji="🌏" />

<p><Number value={values.humansNorthAmerica} /> live in North America.</p>
<EmojiBox count={values.humansNorthAmerica} emoji="🌎" />

<p><Number value={values.humansSouthAmerica} /> live in South America.</p>
<EmojiBox count={values.humansSouthAmerica} emoji="🌎" />

<p>And <Number value={values.humansAntarctica} /> live in Antarctica.</p>

<p>
    <Number value={values.depression} /> of these people suffer from depression.
</p>

<EmojiBox count={values.depression} emoji="😔" />

<p>
    <Number value={values.humansKilledByBlackDeath} /> people died from the Black
    Death in the 14th century.
</p>

<EmojiBox count={values.humansKilledByBlackDeath} emoji="☠️" />

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

<p><Number value={values.cannotRead} /> people cannot read.</p>
<EmojiBox count={values.cannotRead} />

<p><Number value={values.christians} /> are Christians.</p>
<EmojiBox count={values.christians} emoji="✝️" />

<p><Number value={values.muslims} /> are Muslims.</p>
<EmojiBox count={values.muslims} emoji="☪️" />

<p><Number value={values.atheists} /> are non-religious.</p>
<EmojiBox count={values.atheists} emoji="🕊️" />

<p><Number value={values.hindus} /> are Hindus.</p>
<EmojiBox count={values.hindus} emoji="🕉️" />

<p><Number value={values.buddhists} /> are Buddhists.</p>
<EmojiBox count={values.buddhists} emoji="☸️" />

<p>
    <Number value={values.chineseTraditionalReligions} /> follow Chinese traditional
    religions.
</p>
<EmojiBox count={values.chineseTraditionalReligions} emoji="🈷️" />

<h2>Transport</h2>

<p>
    There are <Number value={values.bikes} /> bikes in the world, and <Number
        value={values.cars}
    /> cars.
</p>

<EmojiBox count={values.bikes} emoji="🚲" />

<EmojiBox count={values.cars} emoji="🚗" />

<p>
    There are <Number value={values.flightsPerYear} /> flights per year. (Actually,
    <Number value={values.flightsPerYear / 365 / 60 / 60} scale={1} /> per minute.)
</p>

<h2>Animals</h2>

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

<h2>Greenhouse gases</h2>

<p>
    We are producing <Number value={values.co2EmissionsPerYear} unit="tons" /> of
    CO₂ per year, which is <Number
        value={values.co2EmissionsPerYear / 365}
        unit="tons"
    /> per day, or <Number
        value={values.co2EmissionsPerYear / 365 / values.humans}
        unit="tons"
        scale={1}
    /> per person per day.
</p>
<p>
    This is about the same amount for each person as a <Number
        value={((values.co2EmissionsPerYear / 365 / values.humans) * 1000) /
            values.co2CarPerKM}
        unit="km"
        scale={1}
    /> car ride or <Number
        value={((values.co2EmissionsPerYear / 365 / values.humans) * 1000) /
            values.co2PerBitcoinTransaction}
        unit=""
        scale={1}
    /> Bitcoin transactions
</p>

<h2>Energy</h2>

<p>
    The world is consuming <Number value={values.energyPerYear} unit="kWh" /> of
    energy per year, which is <Number
        value={values.energyPerYear / 365}
        unit="kWh"
    /> per day, or <Number
        value={(values.energyPerYear / 365 / values.humans) * 1000}
        unit="Wh"
        scale={1}
    /> per person per day.
</p>
<p>
    This daily use per person is equivalent to charging <Number
        value={((values.energyPerYear / 365 / values.humans) * 1000) /
            (values.smartphoneBatteryCapacity * 5)}
        unit=""
        scale={1}
    /> smartphones or boiling <Number
        value={((values.energyPerYear / 365 / values.humans) * 1000) /
            values.kWhPerBoilingLiter}
        unit="l"
        scale={1}
    />
    of water.
</p>
<p>
    <EmojiBox count={( values.energyPerYear / 365 / values.humans * 1000 ) / ( values.smartphoneBatteryCapacity * 5 )} emoji="📱" scale={1} />
    <EmojiBox count={( values.energyPerYear / 365 / values.humans * 1000 ) / ( values.kWhPerBoilingLiter )} emoji="🫖" scale={1} />
</p>

<h2>Money</h2>

<p>
    There is <Number value={values.allMoney} unit="USD" /> in the world (money in
    circulation, plus in checks and demand deposits). <Number
        value={values.jeffBezos}
        unit="USD"
    /> of that belongs to the richest person. There are <Number
        value={values.millionaires}
    /> "centionaires" (people with a net worth of at least <Number
        value={1e6}
        unit="USD"
    />).
</p>

<h2>The Universe</h2>

<p>
    The Milky Way contains <Number value={values.starsInMilkyWay} /> stars, and the
    entire universe contains <Number value={values.galaxiesInUniverse} /> galaxies.
</p>
