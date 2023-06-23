<script>
    import TopBar from "./TopBar.svelte"
    import Number from "./Number.svelte"
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import EmojiGraph from "./EmojiGraph.svelte"
    import Squares from "./Squares.svelte"
    import Question from "./Question.svelte"
    import {defaultScale} from "./stores.js"
    import {humanReadable} from "./helpers.js"

    const values = {
        humans: {
            value: 8.05e9,
            year: 2023,
            source: "https://ourworldindata.org/grapher/population-by-age-group-with-projections",
        },
        surfaceOfEarth: {
            value: 510e6,
            unit: "km²",
        },
        oceanSurface: {
            value: 361e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        habitableSurface: {
            value: 106e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        forestSurface: {
            value: 40e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        builtupSurface: {
            value: 1.5e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        freshwaterSurface: {
            value: 1.5e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        glaciersSurface: {
            value: 15e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        croplandSurface: {
            value: 11e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        barrenSurface: {
            value: 28e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        shrubSurface: {
            value: 17e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        livestockSurface: {
            value: 37e6,
            unit: "km²",
            source: "https://ourworldindata.org/land-use",
        },
        milkyWayDiameter: {
            value: 87400,
            unit: "light years",
            source: "https://en.wikipedia.org/wiki/Milky_Way",
        },
        ownedCats: {
            value: 220e6,
            source: "https://en.wikipedia.org/wiki/Cat",
        },
        strayCats: {
            value: 480e6,
            source: "https://en.wikipedia.org/wiki/Cat",
        },
        cats: {
            value: 700e6,
            source: "https://en.wikipedia.org/wiki/Cat",
        },
        ownedDogs: {
            value: 900e6 * 0.2,
            source: "https://en.wikipedia.org/wiki/Free-ranging_dog",
        },
        strayDogs: {
            value: 900e6 * 0.8,
            source: "https://en.wikipedia.org/wiki/Free-ranging_dog",
        },
        dogs: {
            value: 900e6,
            source: "https://en.wikipedia.org/wiki/Free-ranging_dog",
        },
    }

    const values2 = {
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
        surfaceOfCentralPark: 3.41,
        co2EmissionsPerYear: 36e9, // tons
        energyPerYear: 2373e9, // kWh
        allMoney: 48.9e12, // USD (M1 supply) https://www.gobankingrates.com/money/economy/how-much-money-is-in-the-world/
        jeffBezos: 193e9, // USD
        millionaires: 56e6,
        starsInMilkyWay: 250e9,
        galaxiesInUniverse: 200e9, // https://en.wikipedia.org/wiki/Galaxy
        co2CarPerKM: 0.2, //kg https://www.quarks.de/umwelt/klimawandel/co2-rechner-fuer-auto-flugzeug-und-co/
        co2PerBitcoinTransaction: 398.86, //kg https://digiconomist.net/bitcoin-energy-consumption
        kWhPerBoilingLiter: 184, //Wh https://discovergy.com/blog/energiesparen-haushalt
        smartphoneBatteryCapacity: 4.5, //Ah https://www.androidauthority.com/smartphone-battery-size-poll-results-1221015/
        marsBarWh: 300, //Wh https://talybontenergy.co.uk/education/a-cubs-guide-to-energy-in-mars-bars/
    }

    for (const [key, value] of Object.entries(values2)) {
        values[key] = {
            value,
        }
    }
</script>

<TopBar />

<h1>Small World 🌍</h1>

<p>
    The Earth is big. Really, really big. So unimaginable big that it can be
    hard to wrap our heads around it.
</p>

<p>
    In an attempt to make it easier to grasp, let's scale it down! This is the
    factor we'll use:
</p>

<p class="wow">{humanReadable($defaultScale)}</p>

<p>
    Quite a number, right? It means that instead of <UnscaledNumber
        {...values.cats}
    /> cats on the real Earth, on our small world there are only <Number
        {...values.cats}
    /> cats!
</p>

<EmojiBox count={values.cats.value} emoji="🐈" />

<p>
    Here's a cool trick: If I tell you that there are <Number
        {...values.dogs}
    /> dogs on our small world, you can convert back to the actual number!
</p>

<EmojiBox count={values.dogs.value} emoji="🐕" />

<Question q="How many dogs are there on the real Earth?">
    <p>
        There are <UnscaledNumber {...values.dogs} /> dogs on the real Earth.
    </p>
</Question>

<p>
    Spend some time on our small world, and get a better understanding of the
    real Earth!
</p>

<h2>Planet</h2>

<p>
    The surface of our small world is <Number {...values.surfaceOfEarth} /> (a square
    with edge lengths of <Number
        value={Math.sqrt(values.surfaceOfEarth.value)}
        unit="km"
    />, or <Number
        value={values.surfaceOfEarth.value / values.surfaceOfCentralPark.value}
    /> times the area of Central Park in New York City). <Number
        {...values.oceanSurface}
    /> of that is ocean.
</p>

<p style="font-size: 8rem; text-align: center; margin: 2rem 0;">🌏</p>

<!--
<Squares
    values={{
        habitable: {
            value: values.habitableSurface.value,
            color: "green",
        },
        ocean: {
            value: values.oceanSurface.value,
            color: "blue",
        },
    }}
/>
-->

<p>
    Of the <Number {...values.habitableSurface} /> of habitable land, <Number
        {...values.forestSurface}
    /> is forest, <Number {...values.glaciersSurface} /> is covered by glaciers,
    and <Number {...values.builtupSurface} /> is urban and built-up land.
</p>

<Squares
    values={{
        forest: {
            value: values.forestSurface.value,
            color: "darkgreen",
        },
        glaciers: {
            value: values.glaciersSurface.value,
            color: "lightgray",
        },
        urban: {
            value: values.builtupSurface.value,
            color: "gray",
        },
        freshwater: {
            value: values.freshwaterSurface.value,
            color: "lightblue",
        },
        shrubland: {
            value: values.shrubSurface.value,
            color: "yellowgreen",
        },
        livestock: {
            value: values.livestockSurface.value,
            color: "brown",
        },
        barren: {
            value: values.barrenSurface.value,
            color: "beige",
        },
        cropland: {
            value: values.croplandSurface.value,
            color: "yellow",
        },
    }}
/>

<h2>Demographics</h2>

<p>
    There are <Number {...values.humans} /> people on Earth. (<Number
        {...values.humansEverLived}
    /> have ever lived.)
    <Number {...values.humansBornPerYear} /> are born every year, and <Number
        {...values.humansDiePerYear}
    /> die.
</p>

<EmojiBox count={values.humans.value} emoji="🧑" />

<p>This is how much our people earn per month:</p>

<EmojiGraph
    count={values.humans.value}
    emoji="🧑"
    barEmoji="💵"
    unit="$"
    distribution={(percentile) => Math.round((1.207 / (1 - percentile)) * 30)}
/>

<p>This is how old they are:</p>

<EmojiBox
    count={values.humans.value}
    emoji={(age) => {
        if (age < 3) {
            return "👶"
        } else if (age < 18) {
            return "🧒"
        } else if (age < 65) {
            return "🧑"
        } else {
            return "👴"
        }
    }}
    distribution={(x) => 23 * (1.8 * x + 0.03 * (10 / (1.1 - x))) - 4}
/>

<!--
<EmojiGraph
    count={values.humans.value}
    emoji="🧑"
    barEmoji="🎂"
    unit="years"
    distribution={(x) => 23 * (1.8 * x + 0.03 * (10 / (1.1 - x))) - 4}
/>
-->

<p><Number {...values.humansEurope} /> of these people live in Europe.</p>
<EmojiBox count={values.humansEurope.value} emoji="🇪🇺" />

<p><Number {...values.humansAfrica} /> live in Africa.</p>
<EmojiBox count={values.humansAfrica.value} emoji="🌍" />

<p>
    <Number {...values.humansAsia} /> live in Asia (including <Number
        {...values.humansChina}
    /> in China and <Number {...values.humansIndia} /> in India).
</p>
<EmojiBox count={values.humansAsia.value} emoji="🌏" />

<p><Number {...values.humansNorthAmerica} /> live in North America.</p>
<EmojiBox count={values.humansNorthAmerica.value} emoji="🌎" />

<p><Number {...values.humansSouthAmerica} /> live in South America.</p>
<EmojiBox count={values.humansSouthAmerica.value} emoji="🌎" />

<p>And <Number {...values.humansAntarctica} /> live in Antarctica.</p>

<p>
    <Number {...values.depression} /> of these people suffer from depression.
</p>

<EmojiBox count={values.depression.value} emoji="😔" />

<p>
    <Number {...values.humansKilledByBlackDeath} /> people died from the Black Death
    in the 14th century.
</p>

<EmojiBox count={values.humansKilledByBlackDeath.value} emoji="☠️" />

<p>
    <Number {...values.overweight} /> are overweight.
</p>

<EmojiBox count={values.overweight.value} emoji="🤰" />

<p>
    And <Number {...values.extremePoverty} /> live in extreme poverty, on less than
    $1.90 per day, or the equivalent amount after converting currencies and adjusting
    for price differences between countries.
</p>
<EmojiBox count={values.extremePoverty.value} emoji="🥺" />

<p><Number {...values.cannotRead} /> people cannot read.</p>
<EmojiBox count={values.cannotRead.value} />

<p><Number {...values.christians} /> are Christians.</p>
<EmojiBox count={values.christians.value} emoji="✝️" />

<p><Number {...values.muslims} /> are Muslims.</p>
<EmojiBox count={values.muslims.value} emoji="☪️" />

<p><Number {...values.atheists} /> are non-religious.</p>
<EmojiBox count={values.atheists.value} emoji="🕊️" />

<p><Number {...values.hindus} /> are Hindus.</p>
<EmojiBox count={values.hindus.value} emoji="🕉️" />

<p><Number {...values.buddhists} /> are Buddhists.</p>
<EmojiBox count={values.buddhists.value} emoji="☸️" />

<p>
    <Number {...values.chineseTraditionalReligions} /> follow Chinese traditional
    religions.
</p>
<EmojiBox count={values.chineseTraditionalReligions.value} emoji="🈷️" />

<h2>Transport</h2>

<p>
    There are <Number {...values.bikes} /> bikes in the world, and <Number
        {...values.cars}
    /> cars.
</p>

<EmojiBox count={values.bikes.value} emoji="🚲" />

<EmojiBox count={values.cars.value} emoji="🚗" />

<p>
    There are <Number {...values.flightsPerYear} /> flights per year.
</p>

<h2>Animals</h2>

<p>
    There are approximately <Number {...values.otherAnimals} /> each of cattle, sheep,
    goats, and pigs alive right now.
</p>
<p>
    <EmojiBox count={values.otherAnimals.value} emoji="🐄" />
    <EmojiBox count={values.otherAnimals.value} emoji="🐑" />
    <EmojiBox count={values.otherAnimals.value} emoji="🐐" />
    <EmojiBox count={values.otherAnimals.value} emoji="🐖" />
</p>
<Question q="What do you think, how many chickens are alive right now?">
    <p>
        There are <Number {...values.chickens} /> chickens alive right now. <Number
            {...values.chickensKilledPerYear}
        /> are killed every year (<Number
            value={values.chickensKilledPerYear.value / 365}
        />
        per day).
    </p>

    <EmojiBox count={values.chickens.value} emoji="🐔" />
</Question>

<p>
    There are <Number {...values.farms} /> farms. <Number
        {...values.croplandSurface}
    /> of land is used for crops, and <Number {...values.livestockSurface} /> is
    used for livestock.
</p>

<h2>Greenhouse gases</h2>

<p>
    We are producing <Number {...values.co2EmissionsPerYear} unit="tons" /> of CO₂
    per year, which is <Number
        {...values.co2EmissionsPerYear}
        factor={1 / 365}
        unit="tons"
    /> per day, or <UnscaledNumber
        value={values.co2EmissionsPerYear.value / values.humans.value}
        factor={1 / 365}
        unit="tons"
    /> per person per day.
</p>
<p>
    This is about the same amount for each person as a <UnscaledNumber
        value={((values.co2EmissionsPerYear.value / 365 / values.humans.value) *
            1000) /
            values.co2CarPerKM.value}
        unit="km"
    /> car ride or <UnscaledNumber
        value={((values.co2EmissionsPerYear.value / 365 / values.humans.value) *
            1000) /
            values.co2PerBitcoinTransaction.value}
    /> Bitcoin transactions
</p>

<h2>Energy</h2>

<p>
    The world is consuming <Number {...values.energyPerYear} unit="kWh" /> of energy
    per year, which is <Number
        {...values.energyPerYear}
        factor={1 / 365}
        unit="kWh"
    /> per day, or <UnscaledNumber
        value={(values.energyPerYear.value / 365 / values.humans.value) * 1000}
        unit="Wh"
    /> per person per day.
</p>
<p>
    This daily use per person is equivalent to charging <UnscaledNumber
        value={((values.energyPerYear.value / 365 / values.humans.value) *
            1000) /
            (values.smartphoneBatteryCapacity.value * 5)}
    /> smartphones or boiling <UnscaledNumber
        value={((values.energyPerYear.value / 365 / values.humans.value) *
            1000) /
            values.kWhPerBoilingLiter.value}
        unit="L"
    />
    of water.
</p>
<p>
    <EmojiBox
        count={((values.energyPerYear.value / 365 / values.humans.value) *
            1000) /
            (values.smartphoneBatteryCapacity.value * 5)}
        emoji="📱"
        scale={1}
    />
    <EmojiBox
        count={((values.energyPerYear.value / 365 / values.humans.value) *
            1000) /
            values.kWhPerBoilingLiter.value}
        emoji="🫖"
        scale={1}
    />
</p>

<h2>Money</h2>

<p>
    There is <Number {...values.allMoney} unit="USD" /> in the world (money in circulation,
    plus in checks and demand deposits).
</p>

<h2>The Universe</h2>

<p>
    The Milky Way contains <Number {...values.starsInMilkyWay} /> stars, and it has
    a diameter of <Number {...values.milkyWayDiameter} />.
</p>

<p>
    The entire universe contains approximately <Number
        {...values.galaxiesInUniverse}
    /> galaxies.
</p>

<style>
    /* text that pops out! centered! shadow! colorful gradient! */
    .wow {
        margin: 2rem 0;
        font-size: 500%;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        font-variant: small-caps;
        color: darkred;
    }
</style>
