<script>
    import Slider from "./Slider.svelte"
    import Number from "./Number.svelte"
    import Length from "./Length.svelte"
    import Volume from "./Volume.svelte"
    import UnscaledNumber from "./UnscaledNumber.svelte"
    import EmojiBox from "./EmojiBox.svelte"
    import EmojiGraph from "./EmojiGraph.svelte"
    import EmojiHistogram from "./EmojiHistogram.svelte"
    import EmojiRate from "./EmojiRate.svelte"
    import EmojiWheel from "./EmojiWheel.svelte"
    import Squares from "./Squares.svelte"
    import Question from "./Question.svelte"
    import QuestionButtons from "./QuestionButtons.svelte"
    import Thought from "./Thought.svelte"
    import ContentNote from "./ContentNote.svelte"
    import ContinentMap from "./ContinentMap.svelte"
    import ConversionPractice from "./ConversionPractice.svelte"

    import {defaultScale} from "./stores.js"
    import {humanReadable, renderEmoji} from "./helpers.js"

    const values = {
        humans: {
            value: 8.05e9,
            year: 2023,
            source: "https://ourworldindata.org/grapher/population-by-age-group-with-projections",
        },
        humans1300: {
            value: 456.39e6,
            year: 1300,
            source: "https://ourworldindata.org/grapher/population",
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
        humansKilledByBlackDeath: {
            value: 75e6,
            source: "https://www.abc.net.au/science/articles/2008/01/29/2149185.htm",
        },
        covidDeaths: {
            value: 6.95e6,
            source: "https://ourworldindata.org/covid-deaths",
            year: 2023,
        },
        covidCases: {
            value: 767e6,
            source: "https://ourworldindata.org/covid-cases",
            year: 2023,
        },
        motorcycles: {
            value: 708e6,
            source: "https://www.riders-share.com/blog/article/number-motorcycles-world-top-countries",
        },
        cars: {
            value: 1083528e3,
            source: "https://en.wikipedia.org/wiki/Motor_vehicle",
        },
        trucksAndBuses: {
            value: 406770e3,
            source: "https://en.wikipedia.org/wiki/Motor_vehicle",
        },
        railwayNetworkLength: {
            value: 1.148e6,
            unit: "km",
            source: "https://www.citypopulation.de/en/world/bymap/railways/",
        },
        fishCaptured: {
            value: 93.74e6,
            unit: "tonnes",
            year: 2015,
            source: "https://ourworldindata.org/fish-and-overfishing",
        },
        fishFromAquaculture: {
            value: 106e6,
            unit: "tonnes",
            year: 2015,
            source: "https://ourworldindata.org/fish-and-overfishing",
        },
        individualFishPerTonne: {
            value: 13000,
            source: "https://reducing-suffering.org/one-trillion-fish/#Numerosity_estimate",
        },
        insects: {
            value: 10e18,
            source: "https://www.si.edu/spotlight/buginfo/bugnos",
        },
        oceanWater: {
            value: 1386000000,
            unit: "km³",
        },
        noAccessToSafeDrinkingWater: {
            value: 2071265000,
            source: "https://ourworldindata.org/water-access",
        },
        noAccessToElectricity: {
            value: 760e6,
            source: "https://ourworldindata.org/energy-access",
            year: 2019,
        },
        companies: {
            value: 334e6,
            source: "https://www.businessdit.com/how-many-businesses-are-there-in-the-world/",
        },
        visualImpairment: {
            value: 253e6,
            source: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5820628/",
        },
        chickens: {
            value: 33e9,
            source: "https://www.fao.org/poultry-production-products/production/poultry-species/chickens/en/",
            year: 2020,
        },
        shareOfChickensRaisedInIntensiveFarming: {
            value: 0.7,
            source: "https://www.ciwf.org.uk/farm-animals/chickens/meat-chickens/",
        },
        co2eqEmissionsPerYear: {
            value: 54.59e9,
            unit: "tonnes",
            year: 2021,
            source: "https://ourworldindata.org/explorers/co2?facet=none&country=~OWID_WRL&Gas+or+Warming=All+GHGs+%28CO%E2%82%82eq%29&Accounting=Production-based&Fuel+or+Land+Use+Change=All+fossil+emissions&Count=Per+country&Relative+to+world+total=false",
        },
    }

    // Source: https://ourworldindata.org/emissions-by-sector
    // Year: 2016
    const greenhouseGasEmissionsSectors = [
        {
            name: "Iron and Steel",
            description:
                "as energy-related emissions from manufacturing these materials",
            percent: 7.2,
            emoji: "🏗️",
        },
        {
            name: "Chemical & petrochemical",
            description:
                "from energy used in the manufacturing of fertilizers, pharmaceuticals, refrigerants, oil and gas extraction, etc",
            percent: 3.6,
            emoji: "🧪",
        },
        {
            name: "Food and tobacco",
            description:
                "for food processing and manufacturing tobacco products",
            percent: 1,
            emoji: "🍔🚬",
        },
        {
            name: "Non-ferrous metals",
            description:
                "from energy used in the manufacturing of aluminium, copper, lead, nickel, tin, titanium, etc",
            percent: 0.7,
            emoji: "🔩",
        },
        {
            name: "Road transport",
            description: "",
            percent: 11.9,
            emoji: "🚗",
        },
        {
            name: "Aviation",
            description: "",
            percent: 1.9,
            emoji: "✈️",
        },
        {
            name: "Rail",
            description: "",
            percent: 0.4,
            emoji: "🚆",
        },
        {
            name: "Pipeline",
            description: "",
            percent: 0.3,
            emoji: "🚰",
        },
        {
            name: "Ship",
            description: "",
            percent: 1.7,
            emoji: "🚢",
        },
        {
            name: "Residential",
            description: "",
            percent: 10.9,
            emoji: "🏠",
        },
        {
            name: "Commercial",
            description: "",
            percent: 6.6,
            emoji: "🏢",
        },
        {
            name: "Machinery",
            description: "",
            percent: 0.5,
            emoji: "🔧",
        },
        {
            name: "Paper, pulp & printing",
            description: "",
            percent: 0.6,
            emoji: "📄",
        },
        {
            name: "Other industry",
            description: "",
            percent: 10.6,
            emoji: "🏭",
        },
        {
            name: "Energy in Agri & Fishing",
            description: "",
            percent: 1.7,
            emoji: "🐄🐟",
        },
        {
            name: "Unallocated fuel combustion",
            description: "",
            percent: 7.8,
            emoji: "🔥",
        },
        {
            name: "Coal",
            description: "",
            percent: 1.9,
            emoji: "🏭",
        },
        {
            name: "Oil & Natural Gas",
            description: "",
            percent: 3.9,
            emoji: "🛢️",
        },
        {
            name: "Cement",
            description: "",
            percent: 3,
            emoji: "🏗️",
        },
        {
            name: "Chemical & petrochemical (industrial)",
            description: "",
            percent: 2.2,
            emoji: "🧪",
        },
        {
            name: "Livestock & Manure",
            description: "",
            percent: 5.8,
            emoji: "🐄💩",
        },
        {
            name: "Rice Cultivation",
            description: "",
            percent: 1.3,
            emoji: "🌾",
        },
        {
            name: "Agricultural Soils",
            description: "",
            percent: 4.1,
            emoji: "🌾",
        },
        {
            name: "Crop Burning",
            description: "",
            percent: 3.5,
            emoji: "🌾🔥",
        },
        {
            name: "Forest Land",
            description: "",
            percent: 2.2,
            emoji: "🌳",
        },
        {
            name: "Cropland",
            description: "",
            percent: 1.4,
            emoji: "🌾",
        },
        {
            name: "Grassland",
            description: "",
            percent: 0.1,
            emoji: "🌾",
        },
        {
            name: "Landfills",
            description: "",
            percent: 1.9,
            emoji: "🗑️",
        },
        {
            name: "Wastewater",
            description: "",
            percent: 1.3,
            emoji: "🚽",
        },
    ]

    // Calculate remaining share.
    const remainingEmissionsShare =
        1 -
        greenhouseGasEmissionsSectors.reduce(
            (sum, sector) => sum + sector.percent / 100,
            0
        )
    if (remainingEmissionsShare > 1) {
        greenhouseGasEmissionsSectors.push({
            sector: "Other",
            description: "",
            share: remainingEmissionsShare,
            emoji: "❓",
        })
    }

    const co2Density = 1.842 // kg/m3, at 20°C and 1 atm. Source: https://www.engineeringtoolbox.com/gas-density-d_158.html
    const weightOfCO2ball = 1 // kg
    const volumeOfCO2ball = weightOfCO2ball / co2Density
    const diameterOfCO2ball =
        Math.cbrt((volumeOfCO2ball * 3) / (4 * Math.PI)) * 2

    // Source: https://ourworldindata.org/grapher/share-of-deaths-by-cause?time=latest
    // Year: 2019
    const deathCauses = [
        {
            cause: "Cardiovascular disease",
            deathShare: 0.3284,
            emoji: "💔",
        },
        {
            cause: "Cancer",
            deathShare: 0.1783,
            emoji: "cancer-ribbon",
        },
        {
            cause: "Respiratory disease",
            deathShare: 0.0703,
            emoji: "🫁",
        },
        {
            cause: "Digestive disease",
            deathShare: 0.0452,
            emoji: "intestines",
        },
        {
            cause: "Lower respiratory infection",
            deathShare: 0.0441,
            emoji: "🦠",
        },
        {
            cause: "Neonatal death",
            deathShare: 0.0333,
            emoji: "👶",
        },
        {
            cause: "Enteric infection",
            deathShare: 0.0309,
            emoji: "🦠",
        },
        {
            cause: "Alzheimer's disease",
            deathShare: 0.0287,
            emoji: "🧠",
        },
        {
            cause: "Diabetes mellitus",
            deathShare: 0.0274,
            emoji: "sugar-cube",
        },
        {
            cause: "Diarrheal disease",
            deathShare: 0.0271,
            emoji: "💩",
        },
        {
            cause: "Liver disease",
            deathShare: 0.026,
            emoji: "🍺",
        },
        {
            cause: "Kidney disease",
            deathShare: 0.0253,
            emoji: "kidneys",
        },
        /* ... */
        {
            cause: "Road incident",
            deathShare: 0.0212,
            emoji: "🚗",
        },
        {
            cause: "Suicide",
            deathShare: 0.0134,
            emoji: "😔",
        },
        {
            cause: "HIV",
            deathShare: 0.0153,
            emoji: "hiv-ribbon",
        },
        {
            cause: "Malaria",
            deathShare: 0.0114,
            emoji: "🦟",
        },
    ]

    // Calculate remaining share.
    const remainingDeathShare =
        1 - deathCauses.reduce((sum, cause) => sum + cause.deathShare, 0)
    deathCauses.push({
        cause: "Other cause",
        deathShare: remainingDeathShare,
        emoji: "❓",
    })

    // Source: https://ourworldindata.org/energy-mix
    // Year: 2019
    const energyConsumptionBySource = [
        {
            name: "Oil",
            percent: 33.1,
            emoji: "🛢️",
        },
        {
            name: "Coal",
            percent: 27,
            emoji: "🪨",
        },
        {
            name: "Gas",
            percent: 24.3,
            emoji: "⛽",
        },
        {
            name: "Nuclear",
            percent: 4.3,
            emoji: "☢️",
        },
        {
            name: "Hydropower",
            percent: 6.4,
            emoji: "💧",
        },
        {
            name: "Wind",
            percent: 2.2,
            emoji: "🌬️",
        },
        {
            name: "Solar",
            percent: 1.1,
            emoji: "☀️",
        },
        {
            name: "Biofuels",
            percent: 0.7,
            emoji: "🌾",
        },
        {
            name: "Other renewables",
            percent: 0.9,
            emoji: "🌳",
        },
    ]

    const humans = {
        1900: {
            europe: 406e6,
            northamerica: 104e6,
            southamerica: 41e6,
            asia: 931e6,
            africa: 138e6,
            oceania: 5.94e6,
        },
        2000: {
            europe: 727e6,
            northamerica: 486e6,
            southamerica: 349e6,
            asia: 3.74e9,
            africa: 799e6,
            oceania: 31.22e6,
        },
        2100: {
            europe: 587e6,
            northamerica: 669e6,
            southamerica: 425e6,
            asia: 4.67e9,
            africa: 3.92e9,
            oceania: 68.71e6,
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
        humansOceania: 45e6,
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
        bikes: 1e9,
        flightsPerYear: 38e6,
        chickensKilledPerYear: 73e9,
        otherAnimals: 1e9,
        farms: 570e6,
        surfaceOfCentralPark: 3.41,
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
    }

    for (const [key, value] of Object.entries(values2)) {
        values[key] = {
            value,
        }
    }
</script>

<h1>Small World 🌍</h1>

<p>
    The Earth is big. Really, <i>really</i> big. So unimaginable big that it can
    be hard to wrap our heads around it.
</p>

<p>
    To make it easier to grasp, we can scale it down! This is the factor we'll
    use:
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
    The cool thing is: If I tell you that there are <Number {...values.dogs} /> dogs
    on our small world, you can convert back to the actual number!
</p>

<EmojiBox count={values.dogs.value} emoji="🐕" />

<QuestionButtons
    q="How many dogs are there on the real Earth?"
    a={humanReadable(values.dogs.value)}
    fakeAnswers={[
        humanReadable(values.dogs.value / 1000),
        humanReadable(values.dogs.value / 10),
        humanReadable(values.dogs.value * 10),
    ]}
>
    <p>
        There are <UnscaledNumber {...values.dogs} /> dogs on the real Earth.
    </p>
</QuestionButtons>

<p>
    Spend some time on our small world, and get a better understanding of the
    real Earth!
</p>

<p>
    Each time you see a bold number (like in "<Number {...values.cats} /> cats"),
    it will be a number scaled down to the small world. You can hover over it to
    see the real number, or click on it to see the source.
</p>

<h2>Planet</h2>

<p>
    The surface of our small world is <Number {...values.surfaceOfEarth} /> (a square
    with edge lengths of roughly <Length
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
    That leaves <Number {...values.habitableSurface} /> of habitable land, which
    is equal to <Number
        {...values.habitableSurface}
        factor={100}
        unit="hectares"
    />.

    <Number {...values.forestSurface} /> is forest, <Number
        {...values.glaciersSurface}
    /> is covered by glaciers, and <Number {...values.builtupSurface} /> is urban
    and built-up land.
    <Number {...values.shrubSurface} /> is shrubland, <Number
        {...values.croplandSurface}
    /> is cropland.
    <Number {...values.livestockSurface} /> is used for livestock.
    <Number {...values.freshwaterSurface} /> is freshwater, and <Number
        {...values.barrenSurface}
    /> is barren land.
</p>

<Squares
    values={{
        ocean: {
            value: values.oceanSurface.value,
            color: "blue",
            label: "🌊",
        },
        forest: {
            value: values.forestSurface.value,
            color: "darkgreen",
            label: "🌲",
        },
        shrubland: {
            value: values.shrubSurface.value,
            color: "yellowgreen",
            label: "shrub",
        },
        urban: {
            value: values.builtupSurface.value,
            color: "gray",
            label: "🏙",
        },
        freshwater: {
            value: values.freshwaterSurface.value,
            color: "lightblue",
            label: "💧",
        },
        livestock: {
            value: values.livestockSurface.value,
            color: "brown",
            label: "🐄",
        },
        cropland: {
            value: values.croplandSurface.value,
            color: "yellow",
            label: "🌾",
        },
        barren: {
            value: values.barrenSurface.value,
            color: "beige",
            label: "🏜️",
        },
        glaciers: {
            value: values.glaciersSurface.value,
            color: "lightgray",
            label: "🧊",
        },
    }}
/>

<Thought t="That's a lot of land used to keep animals!">
    Yeah! Around <UnscaledNumber
        value={(values.livestockSurface.value / values.habitableSurface.value) *
            100}
        unit="%"
    /> of the habitable land is used for livestock. If we'd eat less meat, we could
    use that land for other things. You can learn more in the Our World in Data article
    <a href="https://ourworldindata.org/land-use-diets"
        >If the world adopted a plant-based diet we would reduce global
        agricultural land use from 4 to 1 billion hectares</a
    >.
</Thought>

<p>
    The volume of all water on our small world is <Volume
        {...values.oceanWater}
    />. That's a cube with an edge length of <Length
        value={Math.pow(values.oceanWater.value, 1 / 3)}
        unit="km"
    />.
</p>

<h2>Demographics</h2>

<p>
    There are <Number {...values.humans} /> people on the small world. (<Number
        {...values.humansEverLived}
    /> have ever lived.)
    <Number {...values.humansBornPerYear} /> are born every year, and <Number
        {...values.humansDiePerYear}
    /> die.
</p>

<EmojiBox count={values.humans.value} emoji="🧑" />

<p>
    This is how much our people earn per month. The numbers are already adjusted
    for price differences between countries. (Note that these values are not
    scaled down, because they're per-person numbers. They translate directly to
    real Earth.)
</p>

<EmojiGraph
    count={values.humans.value}
    emoji="🧑"
    barEmoji="💵"
    unit="$"
    distribution={(percentile) => Math.round((1.207 / (1 - percentile)) * 30)}
/>

<p>This is how old they are:</p>

<EmojiHistogram
    count={values.humans.value}
    emoji={(age) => {
        if (age < 3) {
            return "👶"
        } else if (age < 18) {
            return "🧒"
        } else if (age < 65) {
            return "🧑"
        } else {
            return "🧓"
        }
    }}
    bucketSize={10}
    distribution={(x) => 23 * (1.8 * x + 0.03 * (10 / (1.1 - x))) - 4}
/>

<p>
    <Number {...values.humansEurope} /> of these people live in Europe. <Number
        {...values.humansAfrica}
    /> live in Africa.

    <Number {...values.humansAsia} /> live in Asia (including <Number
        {...values.humansChina}
    /> in China and <Number {...values.humansIndia} /> in India).

    <Number {...values.humansNorthAmerica} /> live in North America.

    <Number {...values.humansSouthAmerica} /> live in South America.

    <Number {...values.humansOceania} /> live in Oceania. And <Number
        {...values.humansAntarctica}
    /> live in Antarctica.
</p>

<ContinentMap
    emoji="🧑"
    europe={values.humansEurope.value}
    asia={values.humansAsia.value}
    africa={values.humansAfrica.value}
    northamerica={values.humansNorthAmerica.value}
    southamerica={values.humansSouthAmerica.value}
    oceania={values.humansOceania.value}
/>

<h2>Humans through the centuries</h2>

{#each Object.keys(humans) as year}
    <h3>{year}</h3>
    <ContinentMap emoji="🧑" {...humans[year]} />
{/each}

<h2>Other things</h2>

<p>
    <Number {...values.depression} /> of our <Number {...values.humans} /> people
    suffer from depression.
</p>
<EmojiBox count={values.depression.value} emoji="😔" />

<p>
    <Number {...values.visualImpairment} /> people are blind, or have a moderate
    to severe visual impairment.
</p>
<EmojiBox count={values.visualImpairment.value} emoji="🦯" />

<h2>Death causes</h2>

<ContentNote
    t="The next section concerns the topic of death. Click here if you want to see it."
>
    <EmojiWheel
        probabilities={deathCauses.map((cause) => [
            cause.deathShare,
            {
                emoji: cause.emoji,
                label: cause.cause,
            },
        ])}
    />

    <!--
    {#each deathCauses as cause}
        <p>
            <Number value={cause.deathShare * values.humans.value} /> of the people will
            die from {cause.cause}.
        </p>
        <EmojiBox
            count={cause.deathShare * values.humans.value}
            emoji={cause.emoji}
        />
    {/each}
    -->

    <p>
        <Number {...values.humansKilledByBlackDeath} /> people died from the Black
        Death in the 14th century. Back then, the world's population was still around
        <Number {...values.humans1300} />.
    </p>

    <EmojiBox count={values.humansKilledByBlackDeath.value} emoji="☠️" />
</ContentNote>

<h2>Other statistics</h2>

<p>
    <Number {...values.covidCases} /> people have been infected with COVID-19 so
    far, and <Number {...values.covidDeaths} /> died from it.
</p>

<EmojiBox count={values.covidCases.value} emoji="🦠" />
<EmojiBox count={values.covidDeaths.value} emoji="☠️" />

<p>
    <Number {...values.overweight} /> are overweight.
</p>

<EmojiBox count={values.overweight.value} emoji="overweight" />

<p>
    And <Number {...values.extremePoverty} /> live in extreme poverty, on less than
    $1.90 per day
</p>
<EmojiBox count={values.extremePoverty.value} emoji="🥺" />

<p><Number {...values.cannotRead} /> people cannot read.</p>
<EmojiBox count={values.cannotRead.value} />

<p>
    <Number {...values.noAccessToSafeDrinkingWater} /> have no access to safe drinking
    water.
</p>
<EmojiBox count={values.noAccessToSafeDrinkingWater.value} emoji="🚱" />

<p>
    <Number {...values.noAccessToElectricity} /> don't have access to electricity.
</p>
<EmojiBox count={values.noAccessToElectricity.value} emoji="🪫" />

<h2>Religion</h2>

<p><Number {...values.christians} /> are Christians.</p>
<EmojiBox count={values.christians.value} emoji="✝️" />

<p><Number {...values.muslims} /> are Muslims.</p>
<EmojiBox count={values.muslims.value} emoji="☪️" />

<p><Number {...values.atheists} /> are non-religious.</p>
<EmojiBox count={values.atheists.value} emoji="🧑" />

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
    There are <Number {...values.bikes} /> bikes in the world, <Number
        {...values.cars}
    /> cars, <Number {...values.trucksAndBuses} /> trucks/buses, and <Number
        {...values.motorcycles}
    /> motorcycles.
</p>

<EmojiBox count={values.bikes.value} emoji="🚲" />

<EmojiBox count={values.cars.value} emoji="🚗" />

<EmojiBox count={values.trucksAndBuses.value} emoji="🚚" />

<EmojiBox count={values.motorcycles.value} emoji="🏍️" />

<p>
    There are <Number {...values.flightsPerYear} /> flights per year.
</p>

<Question
    q="This sounds like a small number! Let's see if you still remember our conversion factor! How many flights are there actually, on real Earth?"
>
    <p>
        There are <UnscaledNumber {...values.flightsPerYear} /> flights per year
        on real Earth.
    </p>
</Question>

<p>
    The total length of the railway network is <Number
        {...values.railwayNetworkLength}
    />.
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
<Question
    q="What do you think, how many chickens are alive right now (in the small world)?"
>
    <p>
        There are <Number {...values.chickens} /> chickens alive right now. <Number
            {...values.chickens}
            factor={values.shareOfChickensRaisedInIntensiveFarming.value}
        /> of them are raised in intensive industrial farming systems.
    </p>

    <EmojiBox
        count={values.chickens.value *
            (1 - values.shareOfChickensRaisedInIntensiveFarming.value)}
        emoji="🐔"
    />
    <EmojiBox
        count={values.chickens.value *
            values.shareOfChickensRaisedInIntensiveFarming.value}
        emoji="🔒"
    />

    <p>
        <Number {...values.chickensKilledPerYear} /> chickens are killed every year
        (<Number value={values.chickensKilledPerYear.value / 365} />
        per day).
    </p>
</Question>

<p>
    There are <Number {...values.farms} /> farms. <Number
        {...values.croplandSurface}
    /> of land is used for crops, and <Number {...values.livestockSurface} /> is
    used for livestock.
</p>

<p>
    <Number {...values.fishCaptured} /> of fish are captured every year, and <Number
        {...values.fishFromAquaculture}
    /> are farmed. That's around <Number
        value={(values.fishCaptured.value + values.fishFromAquaculture.value) *
            values.individualFishPerTonne.value}
    /> indivual fish. Per day, that's <Number
        value={((values.fishCaptured.value + values.fishFromAquaculture.value) *
            values.individualFishPerTonne.value) /
            365}
    /> fishes.
</p>

<EmojiBox
    count={(values.fishCaptured.value + values.fishFromAquaculture.value) *
        values.individualFishPerTonne.value}
    emoji="🐟"
/>

<p>
    There's the incredible number of <Number {...values.insects} /> insects alive
    right now.
</p>

<EmojiBox count={values.insects.value} emoji="🪰" />

<h2>Greenhouse gases</h2>

<p>The problem with CO₂ is that it's an invisible gas.</p>

<p>
    We're going to imagine a big, black bubble that contains
    {weightOfCO2ball} kg of CO₂. Conveniently, it has a diameter of almost precisely
    {Math.round(diameterOfCO2ball)} meters! Here it is:
</p>

<p style="text-align: center;">
    <span style="font-size: {(diameterOfCO2ball / 1.7) * 8}rem;">⚫</span>
    <span style="font-size: 8rem;">🧍</span>
</p>

<p>
    For comparison, you breathe out enough CO₂ to fill one of these bubbles
    every day.
</p>

<p>
    Burning one liter of gasoline produces <UnscaledNumber value={2.3} /> kg of CO₂.
</p>

<div style="font-size: 200%; text-align: center; margin: 1rem 0;">
    ⛽ = ⚫⚫
</div>

<p>
    Burning 1 kg of black coal produces <UnscaledNumber value={3.3} /> kg of CO₂.
</p>

<div style="font-size: 200%; text-align: center; margin: 1rem 0;">
    🪨 = ⚫⚫⚫
</div>

<p>Burning 1 kg of wood produces <UnscaledNumber value={1.7} /> kg of CO₂.</p>

<div style="font-size: 200%; text-align: center; margin: 1rem 0;">
    🪵 = ⚫⚫
</div>

<!--
7.7 L of gasoline per 100 km, bei 100 km/h
Also das inner Stunde.
2.3 kg CO2/L
17.71 kg CO2 pro Stunde
-->

<p>
    As a worldwide average, we produce <UnscaledNumber
        value={values.co2eqEmissionsPerYear.value / values.humans.value}
        factor={1000 / 365}
    /> kg of CO₂ per person every day.
</p>
<EmojiBox
    count={values.co2eqEmissionsPerYear.value / values.humans.value}
    factor={1000 / 365}
    unscaled={true}
    emoji="⚫"
/>

<p>
    Driving 100 km by car produces roughly <UnscaledNumber
        value={17.71}
        unit="kg"
    /> of CO2.
</p>
<EmojiBox count={17.71} unscaled={true} emoji="⚫" />

<p>
    Driving the same distance by train produces only <UnscaledNumber
        value={3.2}
        unit="kg"
    /> (per person).
</p>
<EmojiBox count={3.2} unscaled={true} emoji="⚫" />

<p>
    And flying that distance produces <UnscaledNumber value={230} unit="kg" />.
</p>
<EmojiBox count={230} unscaled={true} emoji="⚫" />

<!--
EU: avg 10 t/year to heat
-->

<!--
1 t/person/year if eating meat
2.7397260274 kg per day

<p>If you eat meat, you produce</p>
-->

<p>
    The people on the small world are producing <Number
        {...values.co2eqEmissionsPerYear}
        factor={1000 * (1 / 365 / 24)}
        unit="kg"
    /> of CO₂eq <b>per hour</b>. That's this many bubbles since you opened this
    page:
</p>

<EmojiRate {...values.co2eqEmissionsPerYear} factor={1000} emoji="⚫" />

{#each greenhouseGasEmissionsSectors as sector}
    <p>
        <Number
            value={(sector.percent / 100) * values.co2eqEmissionsPerYear.value}
            factor={(1 / 365 / 24) * 1000}
            unit="kg"
        /> of CO₂eq are produced every hour by
        {sector.emoji} <strong>{sector.name}</strong>, {sector.description}.
    </p>
    <EmojiBox
        count={(sector.percent / 100) * values.co2eqEmissionsPerYear.value}
        factor={1000 * (1 / 365 / 24)}
        emoji="⚫"
    />
{/each}

<!--
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
-->

<h2>Energy</h2>

<p>
    Our small world is consuming <Number {...values.energyPerYear} unit="kWh" />
    of energy per year, which is <Number
        {...values.energyPerYear}
        factor={1 / 365}
        unit="kWh"
    /> per day,
    <Number {...values.energyPerYear} factor={1 / 365 / 24} unit="kWh" /> per hour,
    or <UnscaledNumber
        value={(values.energyPerYear.value / 365 / values.humans.value) * 1000}
        unit="Wh"
    /> per person per day.
</p>

{#each energyConsumptionBySource as source}
    <p>
        <Number
            value={(source.percent / 100) * values.energyPerYear.value}
            unit="kWh"
        /> per year come from {source.emoji} <b>{source.name}</b>.
    </p>
    <EmojiBox
        count={(source.percent / 100) * values.energyPerYear.value}
        factor={1 / 1000}
        emoji="🔋"
    />
{/each}

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

<p>
    There are <Number {...values.companies} /> companies in the world.
</p>

<EmojiBox count={values.companies.value} emoji="🏢" />

<h2>The Universe</h2>

<p>
    The Milky Way (the galaxy that contains the small world) contains <Number
        {...values.starsInMilkyWay}
    /> stars, and it has a diameter of <Length {...values.milkyWayDiameter} />.
</p>

<p>
    The entire universe contains approximately <Number
        {...values.galaxiesInUniverse}
    /> galaxies.
</p>

<h2>What are you curious about?</h2>

<p>
    Maybe after reading all this, you have some questions about our small world.
    For example:
</p>

<ul>
    <li>How many people live in democracies?</li>
    <li>How many soldiers are there?</li>
    <li>How many bananas are eaten per day?</li>
</ul>

<p>Let's practice finding answers to questions like this!</p>

<ConversionPractice />

<h2>Play with the scale factor</h2>

<Slider />

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
