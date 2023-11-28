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
    import ScrollBar from "./ScrollBar.svelte"
    import Dots from "./Dots.svelte"
    import ScrollBox from "./ScrollBox.svelte"

    import {ageDistribution} from "./AgeData.js"
    import {postTaxIncomeDistribution} from "./IncomeData.js"
    import {wealthDistribution} from "./WealthData.js"

    import {defaultScale} from "./stores.js"
    import {humanReadable} from "./helpers.js"

    const HUMANS = 8.05e9

    const values = {
        humans: {
            value: HUMANS,
            year: 2023,
            source: "https://ourworldindata.org/grapher/population-by-age-group-with-projections",
            emoji: "🧑",
        },
        humansBornPerYear: {
            value: 133.97e6,
            year: 2021,
            source: "https://ourworldindata.org/grapher/births-and-deaths-projected-to-2100",
        },
        humansDiePerYear: {
            value: 69.25e6,
            year: 2021,
            source: "https://ourworldindata.org/grapher/births-and-deaths-projected-to-2100",
        },
        humans1300: {
            value: 456.39e6,
            year: 1300,
            source: "https://ourworldindata.org/grapher/population",
            emoji: "🧑",
        },
        humans2086: {
            value: 10.43e9,
            year: 2086,
            source: "https://ourworldindata.org/grapher/population",
        },
        humansEverLived: {
            value: 117e9,
            year: 2022,
            source: "https://www.prb.org/articles/how-many-people-have-ever-lived-on-earth/",
        },
        shareAdults: {
            value: 1 - 24 / 81,
            year: 2023,
        },
        extremePoverty: {
            value: 0.0844 * HUMANS,
            year: 2019,
            source: "https://ourworldindata.org/explorers/poverty-explorer",
            emoji: "poverty",
        },
        illiterate: {
            value: 0.1375 * HUMANS,
            year: 2016,
            source: "https://ourworldindata.org/grapher/literate-and-illiterate-world-population",
            emoji: "❓",
        },
        surfaceOfEarth: {
            value: 510e6,
            unit: "km²",
            source: "http://www.physicalgeography.net/fundamentals/8o.html",
        },
        diameterOfEarth: {
            value: 6378 * 2,
            unit: "km",
            source: "https://imagine.gsfc.nasa.gov/features/cosmic/earth_info.html",
        },
        circumferenceOfEarth: {
            value: 40070,
            unit: "km",
            source: "https://imagine.gsfc.nasa.gov/features/cosmic/earth_info.html",
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
            emoji: "🐈",
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
            emoji: "🐕",
        },
        humansKilledByBlackDeath: {
            value: 75e6,
            source: "https://www.abc.net.au/science/articles/2008/01/29/2149185.htm",
            emoji: "💀",
        },
        humansKilledInWorldWar2: {
            value: 85e6,
            source: "https://en.wikipedia.org/wiki/World_War_II_casualties",
            emoji: "💀",
        },
        covidDeaths: {
            value: 6.95e6,
            source: "https://ourworldindata.org/covid-deaths",
            year: 2023,
            emoji: "☠️",
        },
        covidCases: {
            value: 767e6,
            source: "https://ourworldindata.org/covid-cases",
            year: 2023,
            emoji: "😷",
        },
        motorcycles: {
            value: 708e6,
            source: "https://www.riders-share.com/blog/article/number-motorcycles-world-top-countries",
            emoji: "🏍️",
        },
        cars: {
            value: 1083528e3,
            source: "https://en.wikipedia.org/wiki/Motor_vehicle",
            emoji: "🚗",
        },
        trucksAndBuses: {
            value: 406770e3,
            source: "https://en.wikipedia.org/wiki/Motor_vehicle",
            emoji: "🚚",
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
            emoji: "🚱",
        },
        noAccessToElectricity: {
            value: 760e6,
            source: "https://ourworldindata.org/energy-access",
            year: 2019,
            emoji: "🪫",
        },
        companies: {
            value: 334e6,
            source: "https://www.businessdit.com/how-many-businesses-are-there-in-the-world/",
            emoji: "🏢",
        },
        visualImpairment: {
            value: 253e6,
            source: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5820628/",
            emoji: "🦯",
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
        farmedFish: {
            value: 111.3e9,
            year: 2019,
            source: "https://www.sentienceinstitute.org/global-animal-farming-estimates",
            emoji: "🐟",
        },
        co2eqEmissionsPerYear: {
            value: 54.59e9,
            unit: "tonnes",
            year: 2021,
            source: "https://ourworldindata.org/explorers/co2?facet=none&country=~OWID_WRL&Gas+or+Warming=All+GHGs+%28CO%E2%82%82eq%29&Accounting=Production-based&Fuel+or+Land+Use+Change=All+fossil+emissions&Count=Per+country&Relative+to+world+total=false",
        },
        depression: {
            value: 280e6,
            year: 2019,
            source: "https://www.who.int/news-room/fact-sheets/detail/depression",
            emoji: "😔",
        },
        overweightOrObese: {
            value: 1.9e9 + 340e6 + 38e6,
            year: 2016,
            source: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
        },
        obese: {
            value: 650e6,
            year: 2016,
            source: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
            emoji: "obese",
        },
        onlyOverweight: {
            value: 1.9e9 + 340e6 + 38e6 - 650e6,
            year: 2016,
            source: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
            emoji: "overweight",
        },
        bikes: {
            value: 1e9,
            year: 2000,
            source: "https://www.worldometers.info/bicycles/",
            comment:
                "This number is a broad estimation from numbers collected between 1982-2000 and might be very outdated.",
            emoji: "🚲",
        },
        flightsPerYear: {
            value: 38.9e6,
            year: 2019,
            source: "https://www.statista.com/statistics/564769/airline-industry-number-of-flights/",
        },
        chickensKilledPerYear: {
            value: 70e9,
            year: 2020,
            source: "https://faunalytics.org/global-animal-slaughter-statistics-charts-2022-update/",
            emoji: "🍗",
        },
        cattleKilledPerYear: {
            value: 296e6,
            year: 2020,
            source: "https://faunalytics.org/global-animal-slaughter-statistics-charts-2022-update/",
        },
        pigsKilledPerYear: {
            value: 1.5e9,
            year: 2020,
            source: "https://faunalytics.org/global-animal-slaughter-statistics-charts-2022-update/",
        },
        sheepKilledPerYear: {
            value: 590e6,
            year: 2020,
            source: "https://faunalytics.org/global-animal-slaughter-statistics-charts-2022-update/",
        },
        goatKilledPerYear: {
            value: 500e6,
            year: 2021,
            source: "https://worldanimalfoundation.org/advocate/how-many-animals-killed-each-year/#In-2021,-More-Than-500-Million-Goats-Were-Slaughtered-for-Food",
        },
        cattleAlive: {
            value: 1.5e9,
            year: 2021,
            source: "https://ourworldindata.org/grapher/cattle-livestock-count-heads?tab=table",
            emoji: "🐄",
        },
        pigAlive: {
            value: 1e9,
            year: 2021,
            source: "https://ourworldindata.org/grapher/pig-livestock-count-heads?tab=table",
            emoji: "🐖",
        },
        sheepAlive: {
            value: 1.2e9,
            year: 2020,
            source: "http://data.un.org/Data.aspx?d=FAO&f=itemCode%3A976#FAO",
            emoji: "🐑",
        },
        goatAlive: {
            value: 1e9,
            year: 2021,
            source: "https://www.frontiersin.org/articles/10.3389/fvets.2021.648500/full",
            emoji: "🐐",
        },
        farms: {
            value: 656e6,
            year: 2020,
            source: "https://journals.sagepub.com/doi/full/10.1177/00307270211025539",
            emoji: "🏡",
        },
        surfaceOfCentralPark: {
            value: 3.41,
            unit: "km²",
            year: 2023,
            source: "https://en.wikipedia.org/wiki/Central_Park",
        },
        energyPerYear: {
            value: 178899e9,
            unit: "kWh",
            year: 2022,
            source: "https://ourworldindata.org/energy-production-consumption",
        },
        banknotesAndCoinsInCirulation: {
            value: 8275e9,
            unit: "USD",
            year: 2021,
            source: "https://stats.bis.org/statx/srs/table/CT2",
        },
        goldAboveGround: {
            value: 208874,
            unit: "tonnes",
            year: 2022,
            source: "https://www.gold.org/goldhub/data/how-much-gold",
        },
        goldPrice: {
            value: 61.96,
            unit: "USD/g",
            year: 2023,
            source: "https://goldprice.org",
        },
        allMoney: {
            value: 48.9e12,
            unit: "USD",
            year: 2022,
            source: "https://www.gobankingrates.com/money/economy/how-much-money-is-in-the-world/",
        },
        grossWorldProduct: {
            value: 100.56e12,
            unit: "USD",
            year: 2022,
            source: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=1W",
        },
        starsInMilkyWay: {
            value: 250e9,
            year: 2015,
            source: "https://asd.gsfc.nasa.gov/blueshift/index.php/2015/07/22/how-many-stars-in-the-milky-way/",
            comment: "estimate ranges from 100-400e9",
            emoji: "⭐",
        },
        galaxiesInUniverse: {
            value: 200e9,
            year: 2021,
            source: "https://en.wikipedia.org/wiki/Galaxy",
            emoji: "🌌",
        },
        co2CarPerKM: {
            value: 0.2,
            unit: "kg",
            year: 2023,
            source: "https://www.quarks.de/umwelt/klimawandel/co2-rechner-fuer-auto-flugzeug-und-co/",
        },
        kWhPerBoilingLiter: {
            value: 184,
            unit: "Wh",
            year: 2016,
            source: "https://discovergy.com/blog/energiesparen-haushalt",
        },
        smartphoneBatteryCapacity: {
            value: 4.5,
            unit: "Ah",
            year: 2021,
            source: "https://www.androidauthority.com/smartphone-battery-size-poll-results-1221015/",
        },
        trainTravelers2015: {
            value: 31162000000,
            year: 2015,
            source: "https://uic.org/IMG/pdf/synopsis_2015_print_5_.pdf",
        },
        goodsonrails: {
            value: 8696000000,
            year: 2015,
            unit: "tonnes",
            source: "https://uic.org/IMG/pdf/synopsis_2015_print_5_.pdf",
        },
        domains: {
            value: 254e6,
            year: 2023,
            source: "https://www.netcraft.com/blog/september-2023-web-server-survey/",
        },
        websites: {
            value: 1085e6,
            year: 2023,
            source: "https://www.netcraft.com/blog/september-2023-web-server-survey/",
            emoji: "🌐",
        },
        internetUsers: {
            value: 5.3e9,
            year: 2022,
            source: "https://www.itu.int/en/ITU-D/Statistics/Pages/facts/default.aspx",
            emoji: "🧑‍💻",
        },
    }

    //co2PerBitcoinTransaction: 398.86, //kg https://digiconomist.net/bitcoin-energy-consumption

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
            description:
                "from the burning of petrol and diesel in cars, trucks, lorries, motorcycles and buses. 60% of these emissions come from passenger travel, and the remaining 40% from road freight",
            percent: 11.9,
            emoji: "🚗",
        },
        {
            name: "Aviation",
            description:
                "81% of which come from passenger travel, and 19% from freight",
            percent: 1.9,
            emoji: "✈️",
        },
        {
            name: "Rail travel",
            description: "emissions from passenger and freight rail travel",
            percent: 0.4,
            emoji: "🚆",
        },
        {
            name: "Pipelines",
            description:
                "from energy use in the transport of oil and gas through pipelines",
            percent: 0.3,
            emoji: "🚰",
        },
        {
            name: "Shipping",
            description:
                "from the burning of fuel on passenger and freight boats",
            percent: 1.7,
            emoji: "🚢",
        },
        {
            name: "Residential",
            description:
                "from the generation of electricity for lighting, appliances, cooking etc. and heating at home",
            percent: 10.9,
            emoji: "🏠",
        },
        {
            name: "Commercial",
            description:
                "from the generation of electricity for lighting, appliances, etc. and heating in commercial buildings, such as offices, restaurants, and shops",
            percent: 6.6,
            emoji: "🏢",
        },
        {
            name: "Machinery",
            description:
                "as energy-related emissions from the production of machinery",
            percent: 0.5,
            emoji: "🔧",
        },
        {
            name: "Paper & pulp",
            description:
                "as energy-related emissions from the conversion of wood into paper and pulp",
            percent: 0.6,
            emoji: "📄",
        },
        {
            name: "Other industry",
            description:
                "from manufacturing in industries not listed below, including mining and quarrying, construction, textiles, wood products, and transport equipment (such as car manufacturing)",
            percent: 10.6,
            emoji: "🏭",
        },
        {
            name: "Energy use in agriculture & fishing",
            description:
                "from fuel used to power farm machinery or fishing vessels",
            percent: 1.7,
            emoji: "🐄🐟",
        },
        {
            name: "Unallocated fuel combustion",
            description:
                "from the production energy from other fuels including electricity and heat from biomass; on-site heat sources; combined heat and power (CHP); nuclear industry; and pumped hydroelectric storage",
            percent: 7.8,
            emoji: "🔥",
        },
        {
            name: "Fugitive emission from coal",
            description:
                "from the accidental leakage of methane during coal mining",
            percent: 1.9,
            emoji: "🏭",
        },
        {
            name: "Fugitive emissions from oil & natural gas",
            description:
                "from the often-accidental leakage of methane to the atmosphere",
            percent: 3.9,
            emoji: "🛢️",
        },
        {
            name: "Cement",
            description:
                "as a byproduct of a chemical conversion process used in the production of clinker, a component of cement",
            percent: 3,
            emoji: "🏗️",
        },
        {
            name: "Chemical & petrochemical (industrial)",
            description: "as byproducts from chemical processes",
            percent: 2.2,
            emoji: "🧪",
        },
        {
            name: "Livestock & Manure",
            description:
                "mainly produced by cattle and sheep – when microbes in their digestive systems break down food, they produce methane as a by-product",
            percent: 5.8,
            emoji: "🐄💩",
        },
        {
            name: "Rice Cultivation",
            description:
                "on flooded rice paddies, microbes in the soil produce methane as a by-product",
            percent: 1.3,
            emoji: "🌾",
        },
        {
            name: "Agricultural Soils",
            description:
                "from the addition of synthetic nitrogen fertilizers to soils",
            percent: 4.1,
            emoji: "🌾",
        },
        {
            name: "Crop Burning",
            description: "from the burning of agricultural residues",
            percent: 3.5,
            emoji: "🌾🔥",
        },
        {
            name: "Deforestation",
            description:
                "as the net emissions of carbon dioxide from changes in forestry cover",
            percent: 2.2,
            emoji: "🌳",
        },
        {
            name: "Cropland",
            description: "emitted when croplands are degraded",
            percent: 1.4,
            emoji: "🌾",
        },
        {
            name: "Grassland",
            description: "emitted when grasslands are degraded",
            percent: 0.1,
            emoji: "🌾",
        },
        {
            name: "Landfills",
            description:
                "produced when organic matter decomposes in low-oxygen conditions",
            percent: 1.9,
            emoji: "🗑️",
        },
        {
            name: "Wastewater",
            description:
                "from the decomposition of organic matter in wastewater treatment plants",
            percent: 1.3,
            emoji: "🚽",
        },
    ]

    // Calculate remaining share.
    const remainingEmissionsShare =
        1 -
        greenhouseGasEmissionsSectors.reduce(
            (sum, sector) => sum + sector.percent / 100,
            0,
        )
    if (remainingEmissionsShare > 1) {
        greenhouseGasEmissionsSectors.push({
            sector: "Other",
            description: "",
            percent: remainingEmissionsShare,
            emoji: "❓",
        })
    }

    // Sort sectors by share.
    greenhouseGasEmissionsSectors.sort((a, b) => b.percent - a.percent)

    // Source: https://www.pewresearch.org/religion/interactives/religious-composition-by-country-2010-2050/
    // Year: 2020
    const religions = [
        {
            name: "Christianity",
            percent: 31.11,
            emoji: "✝️",
        },
        {
            name: "Islam",
            percent: 24.9,
            emoji: "☪️",
        },
        {
            name: "Nonreligious",
            description: "are non-religious",
            percent: 15.6,
            emoji: "⚛️",
        },
        {
            name: "Hinduism",
            percent: 15.2,
            emoji: "🕉️",
        },
        {
            name: "Buddhism",
            percent: 6.6,
            emoji: "☸️",
        },
        {
            name: "Other religions",
            percent: 6.6,
            emoji: "other-religions",
        },
    ]

    const remainingReligionShare =
        1 - religions.reduce((sum, religion) => sum + religion.percent / 100, 0)
    if (remainingReligionShare > 1) {
        religions.push({
            name: "Other",
            percent: remainingReligionShare,
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
            deathShare: 32.84,
            emoji: "💔",
            description: "heart attacks, hypertension, ...",
        },
        {
            cause: "Cancer",
            deathShare: 17.83,
            emoji: "cancer-ribbon",
            description: "lung cancer, breast cancer, ...",
        },
        {
            cause: "Respiratory disease",
            deathShare: 7.03,
            emoji: "🫁",
            description: "asthma, bronchitis, ...",
        },
        {
            cause: "Digestive disease",
            deathShare: 4.52,
            emoji: "intestines",
            description: "gastroenteritis, ...",
        },
        {
            cause: "Lower respiratory infection",
            deathShare: 4.41,
            emoji: "🦠",
            description: "pseumonia, ...",
        },
        {
            cause: "Neonatal death",
            deathShare: 3.33,
            emoji: "👶",
            description: "death a few weeks after birth",
        },
        {
            cause: "Enteric infection",
            deathShare: 3.09,
            emoji: "🦠",
            description: "typhoid fever, cholera, ...",
        },
        {
            cause: "Alzheimer's disease",
            deathShare: 2.87,
            emoji: "🧠",
            description: "a type of dementia",
        },
        {
            cause: "Diabetes mellitus",
            deathShare: 2.74,
            emoji: "sugar-cube",
            description: "type 1 and type 2 diabetes",
        },
        {
            cause: "Diarrheal disease",
            deathShare: 2.71,
            emoji: "💩",
            description: "causes severe dehydration",
        },
        {
            cause: "Liver disease",
            deathShare: 2.6,
            emoji: "🍺",
            description: "cirrhosis, alcoholic liver disease, ...",
        },
        {
            cause: "Kidney disease",
            deathShare: 2.53,
            emoji: "kidneys",
            description: "chronic kidney disease, ...",
        },
        {
            cause: "Road incident",
            deathShare: 2.12,
            emoji: "🚗",
        },
        {
            cause: "Tuberculosis",
            deathShare: 2.09,
            emoji: "🦠",
            description: "a bacterial infection affecting the lungs",
        },
        {
            cause: "HIV/AIDS",
            deathShare: 1.53,
            emoji: "hiv-ribbon",
            description: "a viral infection that destroys the immune system",
        },
        {
            cause: "Suicide",
            deathShare: 1.34,
            emoji: "😔",
        },
        {
            cause: "Malaria",
            deathShare: 1.14,
            emoji: "🦟",
        },
        {
            cause: "Homicide",
            deathShare: 0.73,
            emoji: "🔪",
        },
        {
            cause: "Parkinson's disease",
            deathShare: 0.64,
            emoji: "🌷",
        },
        {
            cause: "Nutritional deficiencies",
            deathShare: 0.44,
            emoji: "💊",
        },
        {
            cause: "Meningitis",
            deathShare: 0.42,
            emoji: "🧠",
        },
        {
            cause: "Drowning",
            deathShare: 0.42,
            emoji: "💦",
        },
        {
            cause: "Protein-energy malnutrition",
            deathShare: 0.38,
            emoji: "🧬",
        },
        {
            cause: "Maternal deaths",
            deathShare: 0.35,
            emoji: "🤱",
        },
        {
            cause: "Alcohol disorders",
            deathShare: 0.3,
            emoji: "🍺",
        },
        {
            cause: "Drug disorders",
            deathShare: 0.23,
            emoji: "🧪",
        },
        {
            cause: "Fire",
            deathShare: 0.2,
            emoji: "🔥",
        },
        {
            cause: "Hepatitis",
            deathShare: 0.14,
            emoji: "🦠",
        },
        {
            cause: "Conflict (including terrorism)",
            deathShare: 0.11,
            emoji: "⚔️",
        },
        {
            cause: "Heat-related (hot and cold exposure)",
            deathShare: 0.08,
            emoji: "🥶",
        },
        /*{
            cause: "Terrorism",
            deathShare: 0.05,
            emoji: "",
        }, seems included in "Conflict"? */
        {
            cause: "Natural disasters",
            deathShare: 0.01,
            emoji: "🌋",
        },
    ]

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
        /*
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
        */
        {
            name: "Renewables",
            percent: 0.9 + 0.7 + 1.1 + 2.2 + 6.4,
            emoji: "🌳",
        },
    ]

    const energyConsumptionRenewables = [
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

    // Source: https://ourworldindata.org/grapher/population-regions-with-projections
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
        2023: {
            europe: 743e6,
            northamerica: 604e6,
            southamerica: 439e6,
            asia: 4.751e9,
            africa: 1.46e9,
            oceania: 45.5e6,

            india: 1.428e9,
            china: 1.425e9,
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
    // Add sums.
    for (const year in humans) {
        const sum = Object.values(humans[year]).reduce((a, b) => a + b, 0)
        humans[year].sum = sum
    }
</script>

<ScrollBar />

<h1>Small World</h1>
<div id="subtitle">
    by <a href="https://bleeptrack.de">bleeptrack</a> &
    <a href="https://blinry.org">blinry</a>, last updated 2023
</div>

<p>
    The Earth is big. Really, <i>really</i> big. So unimaginable big that it can
    be hard to wrap our heads around it.
</p>

<p>
    To make it easier to grasp, let's scale it down! Imagine a really tiny
    world, so tiny that you can see its big buildings from space:
</p>

<p
    style="font-size: 4rem; text-align: center; margin-top: 2rem; margin-bottom: -0.9rem;"
>
    🗼
</p>
<p
    style="font-size: 12rem; text-align: center; margin-bottom: 2rem; margin-top: 0;"
>
    🌏
</p>

<p>
    On this small world, there are <Number {...values.humans} /> humans! One of them
    is you!
</p>

<p>Together, the people have <Number {...values.cars} /> cars.</p>

<p>
    And there are <Number {...values.cats} /> cats and <Number
        {...values.dogs}
    /> dogs (including undomesticated ones).
</p>

<h2>💯 How does this relate to the real Earth?</h2>

<p>
    Have you played with miniature scale models? For example, model trains use a
    1:87 scale, which means that real trains are 87 times larger than the
    models!
</p>

<p>
    For our Small World, we picked a factor that's a <i>tiny bit</i> bigger. Here
    it is:
</p>

<p class="wow">1:{humanReadable($defaultScale)}</p>

<p>
    Quite a number, right? That means that instead of <Number
        {...values.cats}
    /> cats, there are 7 × 100 million = <UnscaledNumber {...values.cats} /> cats
    on the real Earth!
</p>

<p>
    And the cool thing is: As you learn more about the small world, you will be
    able to convert everything back to real numbers! For example, if you know
    that there are <Number {...values.dogs} /> dogs on our small world, you can convert
    back to the actual number!
</p>

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

    <p>
        You get that value by multiplying <Number {...values.dogs} /> (the number
        of dogs on the small world), with our factor of {humanReadable(
            $defaultScale,
        )}.
    </p>
</QuestionButtons>

<p>
    Each time you see a bold number (like in "<Number {...values.cats} /> cats"),
    it will be a number scaled down to the small world. You can hover over it to
    see the real number, or click on it to see the source.
</p>

<p>
    Spend some time on our small world, and get a better understanding of the
    real Earth!
</p>

<h2>🧑 Demographics</h2>

<p>
    There are <Number {...values.humans} /> humans on the small world.
    <Number {...values.humansBornPerYear} /> is born every year, and every
    <Number
        value={values.humansDiePerYear.value}
        source={values.humansDiePerYear.source}
        factor={1}
        inverse={true}
        unit={"years"}
    />, one of them dies.
    <!--and <Number
        {...values.humansDiePerYear}
    /> die.-->
</p>

<!--<p>
    Every three years, <Number {...values.humansDiePerYear} factor={3} /> die.
</p>-->

<p>This is where they live. Where do you live?</p>

<ContinentMap
    emoji="🧑"
    {...humans[2023]}
    source="https://ourworldindata.org/grapher/population-regions-with-projections"
/>

<p>
    And this is how old they are. Again, can you find yourself? Can you find
    other members of your family?
</p>

<EmojiHistogram
    count={values.humans.value}
    emoji={(age) => {
        if (age < 3) {
            return "👶"
        } else if (age < 18) {
            return "🧒"
        } else if (age < 60) {
            return "🧑"
        } else {
            return "🧓"
        }
    }}
    bucketSize={10}
    distribution={ageDistribution}
    source="https://population.un.org/wpp/Download/Files/1_Indicators%20(Standard)/CSV_FILES/WPP2022_PopulationBySingleAgeSex_Medium_Percentage_2022-2100.zip"
/>

<h2>📊 Other statistics</h2>

<p>
    Here's some more information about our <Number {...values.humans} /> humans!
</p>

<p>
    <Number {...values.onlyOverweight} /> are overweight, and <Number
        {...values.obese}
    /> are obese.
</p>

<p>
    And <Number {...values.extremePoverty} /> live in extreme poverty, on less than
    $1.90 per day
</p>

<p><Number {...values.illiterate} /> people cannot read.</p>

<p>
    <Number {...values.noAccessToSafeDrinkingWater} /> have no access to safe drinking
    water.
</p>

<QuestionButtons
    q="Time for another conversion practice! How many people have no access to safe drinking water on the real Earth?"
    a={humanReadable(values.noAccessToSafeDrinkingWater.value)}
    fakeAnswers={[
        humanReadable(values.noAccessToSafeDrinkingWater.value / 1000),
        humanReadable(values.noAccessToSafeDrinkingWater.value * 10),
        humanReadable(values.noAccessToSafeDrinkingWater.value / 100000),
    ]}
>
    <p>
        The correct answer is that there are <UnscaledNumber
            {...values.noAccessToSafeDrinkingWater}
        /> people without access to safe drinking water on the real Earth.
    </p>

    <p>
        You get that value by multiplying <Number
            {...values.noAccessToSafeDrinkingWater}
        /> (the number of people without access to safe drinking water on the small
        world), with our factor of {humanReadable($defaultScale)}.
    </p></QuestionButtons
>

<p>
    <Number {...values.noAccessToElectricity} /> don't have access to electricity.
</p>

<p>
    <Number {...values.depression} /> of our <Number {...values.humans} /> people
    suffer from depression.
</p>

<p>
    <Number {...values.visualImpairment} /> people are blind, or have a moderate
    to severe visual impairment.
</p>

<h2>🌍 Planet</h2>

<p>
    The planet has a diameter of <Length {...values.diameterOfEarth} />, and a
    circumference of <Length {...values.circumferenceOfEarth} />.
</p>

<p>
    The surface of our small world is <Number {...values.surfaceOfEarth} /> (that's
    roughly
    <Number
        value={values.surfaceOfEarth.value / values.surfaceOfCentralPark.value}
    /> times the area of Central Park in New York City). <Number
        {...values.oceanSurface}
    /> of that is ocean.
</p>

<p style="font-size: 12rem; text-align: center; margin: 2rem 0;">🌏</p>

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

<!--<p>
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
</p>-->

<p>Here's how the land is used! Click on the squares to learn what they are!</p>

<Squares
    total={{
        value: values.surfaceOfEarth,
        color: "blue",
        label: "🌊",
    }}
    source="https://ourworldindata.org/land-use"
    values={{
        forest: {
            value: values.forestSurface,
            color: "darkgreen",
            label: "🌲",
            description: "Forest",
        },
        shrubland: {
            value: values.shrubSurface,
            color: "yellowgreen",
            label: "shrub",
            description: "Shrubs and grasslands",
        },
        urban: {
            value: values.builtupSurface,
            color: "gray",
            label: "🏙",
            description:
                "Urban and built-up land (cities, towns, villages, roads, and other human infrastructure)",
        },
        freshwater: {
            value: values.freshwaterSurface,
            color: "lightblue",
            label: "💧",
            description: "Freshwater",
        },
        livestock: {
            value: values.livestockSurface,
            color: "brown",
            label: "🐄",
            description: "Livestock",
        },
        cropland: {
            value: values.croplandSurface,
            color: "yellow",
            label: "🌾",
            description: "Cropland",
        },
        barren: {
            value: values.barrenSurface,
            color: "beige",
            label: "🏜️",
            description:
                "Barren land (deserts, dry salt flats, beaches, sand dunes, exposed rocks)",
        },
        glaciers: {
            value: values.glaciersSurface,
            color: "lightgray",
            label: "🧊",
            description: "Glaciers",
        },
    }}
/>

<Thought t="That's a lot of land used to keep animals!">
    Yeah! Around <UnscaledNumber
        value={(values.livestockSurface.value / values.habitableSurface.value) *
            100}
        unit="%"
    /> of the habitable land is used for livestock. You can learn more in the Our
    World in Data article
    <a href="https://ourworldindata.org/land-use-diets"
        >If the world adopted a plant-based diet we would reduce global
        agricultural land use from 4 to 1 billion hectares</a
    >.
</Thought>

<!--<p>
    The volume of all water on our small world is <Volume
        {...values.oceanWater}
    />. That's a cube with an edge length of <Length
        value={Math.pow(values.oceanWater.value, 1 / 3)}
        unit="km"
    />.
</p>-->

<h2>⌛ Humans through the centuries</h2>

<p>
    Until today, <Number {...values.humansEverLived} /> humans have ever lived.
</p>

<p>
    In the year 1900, there were <Number value={humans[1900].sum} /> humans on the
    small world. Here's where they lived:
</p>

<ContinentMap
    emoji="🧑"
    {...humans[1900]}
    source="https://ourworldindata.org/grapher/population-regions-with-projections"
/>

<p>
    And in the year 2100, it's estimated that there will be <Number
        value={humans[2100].sum}
    /> humans:
</p>

<ContinentMap
    emoji="🧑"
    {...humans[2100]}
    source="https://ourworldindata.org/grapher/population-regions-with-projections"
/>

<Thought t="Will there the number of humans keep increasing?">
    Probably not! According to projections by the UN, it will peak at around <Number
        {...values.humans2086}
    /> humans in 2086. Read more in the article
    <a
        href="https://ourworldindata.org/population-growth?insight=the-un-expects-the-global-population-to-peak-by-the-end-of-the-century#key-insights"
        >Population Growth</a
    > by Our World in Data.
</Thought>

<h2>☠️ Death causes</h2>

<p>
    What do people on our small world die from? Here's the current global
    probabilities. Go ahead and spin the wheel by clicking the arrow!
</p>

<EmojiWheel
    probabilities={deathCauses.map((cause) => [
        cause.deathShare,
        {
            emoji: cause.emoji,
            label: cause.cause,
            description: cause.description,
        },
    ])}
    source="https://ourworldindata.org/grapher/share-of-deaths-by-cause?time=latest"
/>

<p>
    <Number {...values.covidCases} /> people have been infected with COVID-19 so
    far, and <Number {...values.covidDeaths} /> died from it.
</p>

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

<h2>📖 History</h2>

<p>
    In the 14th century, there were <Number {...values.humans1300} /> humans in the
    world.
</p>

<p>
    <Number {...values.humansKilledByBlackDeath} /> one of them died from the Black
    Death.
</p>

<p>
    During World War II, the deadliest military conflict in history, <Number
        {...values.humansKilledInWorldWar2}
    /> human died.
</p>

<h2>🛐 Religion</h2>

{#each religions as religion}
    <p>
        <Number
            value={(religion.percent / 100) * values.humans.value}
            emoji={religion.emoji}
        /> of the people
        {#if religion.description}
            <b>{religion.description}</b>{:else}
            follow <b>{religion.name}</b>{/if}.
    </p>
{/each}

<h2>🛤️ Transport</h2>

<p>
    There are <Number {...values.bikes} /> bikes in the world, <Number
        {...values.cars}
    /> cars, <Number {...values.trucksAndBuses} /> trucks/buses, and <Number
        {...values.motorcycles}
    /> motorcycles.
</p>

<p>
    There are <Number {...values.flightsPerYear} /> flights per year.
</p>

<QuestionButtons
    q="This sounds like a small number! Let's see if you still remember our conversion factor! How many flights are there actually, on real Earth?"
    a={humanReadable(values.flightsPerYear.value)}
    fakeAnswers={[
        humanReadable(values.flightsPerYear.value / 100),
        humanReadable(values.flightsPerYear.value / 1000),
        humanReadable(values.flightsPerYear.value * 10),
    ]}
>
    <p>
        There are <UnscaledNumber {...values.flightsPerYear} /> flights per year
        on real Earth.
    </p>
</QuestionButtons>

<p>
    About <Number {...values.trainTravelers2015} /> train rides are registered per
    year and <Number {...values.goodsonrails} /> of goods are transported by trains
    per year.
</p>

<h2>🐾 Animals</h2>

<p>
    There are <Number {...values.farms} /> farms.<!-- <Number
        {...values.croplandSurface}
    /> of land is used for crops, and <Number {...values.livestockSurface} /> is
    used for livestock.-->
</p>

<p>
    There are <Number {...values.cattleAlive} /> cattle, <Number
        {...values.sheepAlive}
    /> sheep,
    <Number {...values.goatAlive} /> goats, and <Number {...values.pigAlive} /> pigs
    alive right now.
</p>
<Question
    q="What do you think: How many chickens are alive right now (in the small world)?"
>
    <p>
        There are <Number {...values.chickens} /> chickens alive right now. <Number
            {...values.chickens}
            factor={values.shareOfChickensRaisedInIntensiveFarming.value}
        /> of them are raised in intensive industrial farming systems.
    </p>

    <p>
        <Number {...values.chickensKilledPerYear} /> chickens are killed every year
        (<Number value={values.chickensKilledPerYear.value / 365} />
        per day).
    </p>
</Question>

<p>
    There are <Number {...values.farmedFish} /> fish being kept in fish tanks or
    ponds right now.
</p>

<!--
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
-->

<!--<p>
    There's the incredible number of <Number {...values.insects} /> insects alive
    right now.

    <EmojiBox count={values.insects.value} emoji="🪰" />
</p>-->

<h2>🌐 Technology</h2>

<p>
    <Number {...values.internetUsers} /> people use the Internet (which consists
    of <Number {...values.websites} /> websites).
</p>

<h2>⚫ Greenhouse gases</h2>

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

<!--
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
-->

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
    /> of CO₂ <b>per hour</b>.
</p>

<!--<EmojiRate {...values.co2eqEmissionsPerYear} factor={1000} emoji="⚫" />-->

<EmojiBox
    count={values.co2eqEmissionsPerYear.value}
    factor={1000 * (1 / 365 / 24)}
    emoji="⚫"
/>

<ContentNote
    t="Do you want to see more details about where exactly these bubbles come from?"
>
    <p>
        Okay, sure! Here's a description of where these CO₂ bubbles come from.
    </p>

    <p>
        Note: We use the term "CO₂" as a shorthand for "CO₂-equivalent", which
        includes other greenhouse gases like methane.
    </p>

    {#each greenhouseGasEmissionsSectors as sector}
        <p>
            <Number
                value={(sector.percent / 100) *
                    values.co2eqEmissionsPerYear.value}
                factor={(1 / 365 / 24) * 1000}
                unit="kg"
            /> of CO₂ are produced every hour by
            {sector.emoji} <strong>{sector.name}</strong>, {sector.description}.
        </p>
        <EmojiBox
            count={(sector.percent / 100) * values.co2eqEmissionsPerYear.value}
            factor={1000 * (1 / 365 / 24)}
            emoji="⚫"
        />
    {/each}
</ContentNote>

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

<!--<h2>🔋 Energy</h2>

<p>
    Energy consumption is not easy to meassure: we need to take two things into
    account!
</p>

<p>
    ⚡First there is the amount of energy. This is usually meassured in Watts <b
        >W</b
    >
    or when numbers get too big: in Kilowatts <b>kW</b>!<br />
    🕑Secondly there is the time over which the energy is consumed, for example an
    <b>hour</b>.<br />
    🔋Combined we have Watt hours Wh or Kilowatt hours <b>kWh</b>.
</p>

<Question
    q="💡 So if a 50W light bulb is running for 1 hour, what is the energy consumption?"
>
    <p>
        If a 50W light bulb is running for 1 hour we have an energy consumption
        of <b>50Wh</b>!
    </p>
</Question>

<p>
    But even our small world consumed a lot of energy. So from here we symbolize <b
        >1kWh</b
    > with one battery:
</p>

<p style="text-align: center;">
    <span style="font-size: 8rem;">🔋</span>
</p>

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
            value={((source.percent / 100) * values.energyPerYear.value) /
                356 /
                24}
            unit="kWh"
        /> per hour come from {source.emoji} <b>{source.name}</b>.
    </p>
    <EmojiBox
        count={((source.percent / 100) * values.energyPerYear.value) / 356 / 24}
        factor="1"
        emoji="🔋"
    />
{/each}

<Thought t="Check here if you want to see renewable sources in detail!">
    {#each energyConsumptionRenewables as source}
        <p>
            <Number
                value={((source.percent / 100) * values.energyPerYear.value) /
                    356 /
                    24}
                unit="kWh"
            /> per hour come from {source.emoji} <b>{source.name}</b>.
        </p>
        <EmojiBox
            count={((source.percent / 100) * values.energyPerYear.value) /
                356 /
                24}
            factor="1"
            emoji="🔋"
        />
    {/each}
</Thought>

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
-->

<h2>💵 Money</h2>

<p>
    All banknotes and coins that are in circulation right now are worth <Number
        {...values.banknotesAndCoinsInCirulation}
        unit="USD"
    />.
</p>

<p>
    <Number {...values.goldAboveGround} /> of gold have been mined so far, which
    are worth <Number
        value={values.goldAboveGround.value *
            1000 *
            1000 *
            values.goldPrice.value}
        unit="USD"
    />.
</p>

<p>
    The gross world product is <Number {...values.grossWorldProduct} /> per year
    (<UnscaledNumber
        value={values.grossWorldProduct.value / HUMANS}
        unit="USD"
    />
    per person).
</p>

<p>
    There are <Number {...values.companies} /> companies in the world.
</p>

<p>
    This is how much the adult people on our small world earn per month (after
    tax). The numbers are already adjusted for price differences between
    countries. (Note that these values are not scaled down, because they're
    per-person numbers. They translate directly to real Earth.)
</p>

<EmojiGraph
    count={values.humans.value * values.shareAdults.value}
    emoji="🧑"
    barEmoji="💵"
    unit="$"
    distribution={postTaxIncomeDistribution}
    source="https://wid.world/data/"
/>

<p>And this is how rich the adults are:</p>

<EmojiGraph
    count={values.humans.value * values.shareAdults.value}
    emoji="🧑"
    barEmoji="💰"
    barEmojiNegative="💸"
    unit="$"
    distribution={wealthDistribution}
    source="https://wid.world/data/"
/>

<h2>🌌 The Universe</h2>

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

<h2>💯 What does this factor of {humanReadable($defaultScale)} mean?</h2>

<p>
    It's very important that we don't forget that all numbers on our small world
    are scaled down by this big factor!
</p>

<p>
    So let's do a couple of quick estimation exercises to get a better feeling
    for this number!
</p>

<QuestionButtons
    q={"How long are " + humanReadable($defaultScale) + " seconds?"}
    a={humanReadable($defaultScale / 60 / 60 / 24 / 365) + " years"}
    fakeAnswers={[
        humanReadable((0.1 * $defaultScale) / 60 / 60 / 24) + " days",
        humanReadable((0.01 * $defaultScale) / 60 / 60 / 24) + " days",
        humanReadable((100 * $defaultScale) / 60 / 60 / 24 / 365) + " years",
    ]}
>
    <p>
        If you count from 1 to {humanReadable($defaultScale)}, and it takes you
        a second to say each number, you'll need {(
            $defaultScale /
            60 /
            60 /
            24 /
            365
        ).toFixed(1)} years!
    </p>
</QuestionButtons>

<QuestionButtons
    q={"If you stack " +
        humanReadable($defaultScale) +
        " $1 bills, how high would the resulting stack be?"}
    a={humanReadable(($defaultScale * 0.1093) / (1000 * 1000)) + " km"}
    fakeAnswers={[
        humanReadable(($defaultScale * 0.1093) / (1000 * 10)) + " km",
        humanReadable(($defaultScale * 0.1093) / (1000 * 1000)) + " m",
        humanReadable(($defaultScale * 0.1093) / (1000 * 100)) + " km",
    ]}
>
    <p>
        In fact, Tom Scott did <a
            href="https://www.youtube.com/watch?v=8YUWDrLazCg"
            >a video about this!</a
        > He gets in a car, and drives for the equivalent of 1 billion dollars stacked
        on top of each other. To reach the end of our 100 million dollar stack, he'd
        need around 10 minutes.
    </p>
</QuestionButtons>

<p>
    Finally, let's really look at the number! Here's 100 dots (you might need to
    zoom in a bit to see them): <Dots n={100} />
</p>

<p>Here's 100 thousand dots:</p>

<ScrollBox>
    <Dots n={100000} />
</ScrollBox>

<p>
    And here's 100 million dots! Come on, let's scroll through them together!
    There will be a surprise at the end!
</p>

<ScrollBox>
    {#each [...Array(1000).keys()] as _}<Dots n={100000} />{/each}
    <p>You did it! You just saw 100 million dots! Here's your cake: 🍰</p>

    <p>
        Okay, so, for each value on the small world, you have to mentally
        account for this factor.
    </p>

    <p>
        For example, when we said that <Number
            {...values.chickensKilledPerYear}
            factor={1 / 365}
        /> chickens are killed every day, the number on the real world is actually
        <Number {...values.chickensKilledPerYear} factor={1 / 365} /> times the number
        of dots you just saw.
    </p>
    <p>
        And when we said that <Number {...values.extremePoverty} /> people live in
        extreme poverty, on the real world, it's <Number
            {...values.extremePoverty}
        /> times the number of dots you just scrolled through.
    </p>
</ScrollBox>

<h2>❓ Time for a quiz!</h2>

<p>
    Now you've read a lot about the Small World. Often, seeing numbers in this
    format helps people remember them better! Let's see whether this also works
    for you:
</p>

<Question q="How many people live in Europe in the Small World?">
    <p>There are <Number value={humans[2023].europe} /> people in Europe.</p>

    <EmojiBox count={humans[2023].europe} emoji="🧑" />

    <Question q="So, how many people live in Europe on real Earth?">
        <p>
            There are <UnscaledNumber value={humans[2023].europe} /> people in Europe
            on real Earth.
        </p>
    </Question>
</Question>

<Question q="How many cars are there in the Small World?">
    <p>There are <Number {...values.cars} /> cars on the Small World.</p>

    <EmojiBox count={values.cars.value} emoji="🚗" />

    <Question q="So, how many cars are there on real Earth?">
        <p>There are <UnscaledNumber {...values.cars} /> cars on real Earth.</p>
    </Question>
</Question>

<Question q="What's the approximate share of people dying from heart disease?">
    <p>
        <UnscaledNumber value={deathCauses[0].deathShare} unit="%" /> of the people
        die from heart disease.
    </p>
</Question>

<p>Now let's try some questions that relate to the real world directly!</p>

<Question q="How many galaxies are there in the real world?">
    <p>
        There are <UnscaledNumber {...values.galaxiesInUniverse} /> galaxies in the
        universe.
    </p>
</Question>

<Question q="How much gold has been mined in the real world?">
    <p>
        There are <UnscaledNumber {...values.goldAboveGround} /> of gold that have
        been mined so far.
    </p>
</Question>

<Question q="How many websites are there on the real world?">
    <p>
        There are <UnscaledNumber {...values.websites} /> websites on the real world.
    </p>
</Question>

<Question q="How many chickens are held in intensive farming systems?">
    <p>
        There are <UnscaledNumber
            {...values.chickens}
            factor={values.shareOfChickensRaisedInIntensiveFarming.value}
        /> chickens in intensive farming systems.
    </p>
</Question>

<h2>🙋 What are you curious about?</h2>

<p>
    Maybe after reading all this, you have some questions about our small world,
    which we didn't cover! For example:
</p>

<ul>
    <li>How many people live in democracies in the world?</li>
    <li>How many smartphones are there in the world?</li>
    <li>How many bananas are eaten per year in the world?</li>
</ul>

<p>Let's practice finding answers to questions like this!</p>

<ConversionPractice />

<p>
    If you find an interesting number that's missing from this article, send us
    an email to <b
        ><span><span title="ihate@spam.com</span>">b</span>b</span>&#64;blinry<i
            title="</i>mailto">.</i
        >org</b
    >, and we might include it!
</p>

<h2>🔁 Re-use our work!</h2>

<p>
    This page is open source! You can find the code on <a
        href="https://github.com/blinry/small-world"
        target="_blank">GitHub</a
    >.
</p>

<p>
    It's licensed under the <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank">CC BY 4.0</a
    >
    license, which means that you're free to <b>share</b> and <b>adapt</b> the works:
    You can copy and redistribute them in any medium or format. You can print them
    and hang them on your wall, include them in presentations or on flyers. You can
    also remix, modify, and build upon the material.
</p>

<p>
    The only condition is that you give appropriate credit. You need to include
    our names (bleeptrack & blinry), a link to this page, and a link to the
    license text on creativecommons.org.
</p>

<h2>📚 Credits</h2>

<ul>
    <li>
        Thanks to <a href="https://www.openphilanthropy.org"
            >Open Philanthropy</a
        > for funding our work!
    </li>
    <li>
        Many of the numbers come from <a href="https://ourworldindata.org"
            >Our World in Data</a
        >.
    </li>
    <li>
        Thanks to our beta testers for their feedback: Winnie Hellmann, Piko,
        Wolfgang Morr, Winston Smith.
    </li>
</ul>

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
    h1 {
        margin-bottom: 0;
        text-align: center;
        font-size: 7em;
        margin-top: 1em;
    }

    h2::first-letter {
        margin-right: 0.3em;
        font-size: 150%;
    }

    #subtitle,
    #subtitle a {
        text-align: center;
        margin-bottom: 3rem;
        color: #555;
        font-size: 1.3rem;
        font-style: italic;
    }
</style>
