import Papa from "papaparse"

let countriesContinentsCSV = "/data/countriesContinents.csv"
let ageCSV = "/data/age.csv"
let povertyCSV = "/data/poverty.csv"

let propertyDefinitions = {
    urban: (row) => {
        return {
            "🏙️": Number(row[2]) / (Number(row[2]) + Number(row[3])),
            "🌾": Number(row[3]) / (Number(row[2]) + Number(row[3])),
        }
    },
    energyAccess: (row) => {
        return {
            "⚡": Number(row[2]) / (Number(row[2]) + Number(row[3])),
            "🪫": Number(row[3]) / (Number(row[2]) + Number(row[3])),
        }
    },
}

export const HUMANS = 8e9
const CHICKENS = 33e9 // just a guess, no Internet...

class Entity {
    constructor() {
        let width = 500
        this.x = Math.random() * width
        this.y = Math.random() * width
    }
}

class Person extends Entity {
    constructor() {
        super()
        this.properties = {}
    }

    setProperty(key, value) {
        this.properties[key] = value
    }

    getLabel() {
        let label = ""
        if (this.properties.sex) {
            if (this.properties.age) {
                if (this.properties.age == "<5") {
                    label += "👶"
                } else if (this.properties.age == "5-14") {
                    if (this.properties.sex == "xx") {
                        label += "👧"
                    } else {
                        label += "👦"
                    }
                } else if (
                    this.properties.age == "15-24" ||
                    this.properties.age == "25-64"
                ) {
                    if (this.properties.sex == "xx") {
                        label += "👩"
                    } else {
                        label += "👨"
                    }
                } else {
                    if (this.properties.sex == "xx") {
                        label += "👵"
                    } else {
                        label += "👴"
                    }
                }
            }
        }

        for (let [propertyName, emoji] of Object.entries(this.properties)) {
            if (propertyName !== "age" && propertyName !== "sex") {
                label += emoji
            }
        }

        return label
    }
}

const defaultHumanProperties = {
    sex: {
        xx: {
            fraction: 0.5,
        },
        xy: {
            fraction: 0.5,
        },
    },
    //canRead: {
    //    yes: {
    //        fraction: 0.8,
    //    },
    //    no: {
    //        fraction: 0.2,
    //    },
    //},
    //income: {
    //    "very rich": {
    //        fraction: 0.01,
    //    },
    //    "in between": {
    //        fraction: 0.79,
    //    },
    //    "very poor": {
    //        fraction: 0.2,
    //    }
    //}
}

export async function onDataReady(hook) {
    await parseCSV(countriesContinentsCSV)
    await parseCSV(ageCSV)
    await parseCSV(povertyCSV)
    await Promise.all(
        Object.keys(propertyDefinitions).map(async (propertyName) =>
            parseCSV(`/data/${propertyName}.csv`),
        ),
    )

    hook()
}

let cachedData = {}
function parseCSV(url) {
    return new Promise((resolve, reject) => {
        if (cachedData[url]) {
            resolve(cachedData[url])
        } else {
            Papa.parse(url, {
                download: true,
                complete: (results) => {
                    cachedData[url] = results
                    resolve(results)
                },
            })
        }
    })
}

async function getTotalHumans(entity, year) {
    let results = await parseCSV(ageCSV)
    let entityField = 0
    let yearField = 1

    let currentData = results.data.filter(
        (row) => row[entityField] == entity && Number(row[yearField]) == year,
    )
    if (currentData.length <= 0) {
        throw `getTotalHumans: No age data for ${entity} in ${year}.`
    }
    return (
        Number(currentData[0][4]) +
        Number(currentData[0][5]) +
        Number(currentData[0][6]) +
        Number(currentData[0][7]) +
        Number(currentData[0][8])
    )
}

async function generateGenericProperty(year, entity, propertyName) {
    let results = await parseCSV(`/data/${propertyName}.csv`)

    let header = results.data.shift()
    let entityField = 0
    let yearField = 1

    let currentData = results.data.filter(
        (row) => row[entityField] == entity && Number(row[yearField]) == year,
    )
    if (currentData.length <= 0) {
        throw `No ${propertyName} data for ${entity} in ${year}.`
    }
    let property = {}
    let options = propertyDefinitions[propertyName](currentData[0])
    for (let [option, fraction] of Object.entries(options)) {
        property[option] = {fraction: fraction}
    }
    return property
}

async function generateAgeProperty(year, entity) {
    let results = await parseCSV(ageCSV)

    let header = results.data.shift()
    let entityField = 0
    let yearField = 1
    let categories = [
        {
            field: 4,
            emoji: "65+",
            lower: 65,
            upper: 110,
        },
        {
            field: 5,
            emoji: "<5",
            lower: 0,
            upper: 4,
        },
        {
            field: 6,
            emoji: "5-14",
            lower: 5,
            upper: 14,
        },
        {
            field: 7,
            emoji: "15-24",
            lower: 15,
            upper: 24,
        },
        {
            field: 8,
            emoji: "25-64",
            lower: 25,
            upper: 64,
        },
    ]
    let currentData = results.data.filter(
        (row) => row[entityField] == entity && Number(row[yearField]) == year,
    )
    if (currentData.length <= 0) {
        throw `No age data for ${entity} in ${year}.`
    }
    let property = {}
    let totalHumans =
        Number(currentData[0][4]) +
        Number(currentData[0][5]) +
        Number(currentData[0][6]) +
        Number(currentData[0][7]) +
        Number(currentData[0][8])
    for (let category of categories) {
        property[category.emoji] = {
            fraction: Number(currentData[0][category.field]) / totalHumans,
        }
    }

    return property
}

async function generatePovertyProperty(year, entity) {
    let results = await parseCSV(povertyCSV)

    let header = results.data.shift()

    let entityField = 0
    let yearField = 1
    let categories = [
        {
            field: 7,
            label: "below poverty line",
            income: "$2.15", // in 2017 prices
        },
        {
            field: 8,
            label: "lower-middle income poverty line",
            income: "$3.65",
        },
        {
            field: 9,
            label: "upper-middle income poverty line",
            income: "$6.85",
        },
    ]
    let data = results.data.filter(
        (row) => row[entityField] == entity && Number(row[yearField]) == year,
    )
    if (data.length <= 0) {
        throw `No poverty data for ${entity} in ${year}.`
    }
    data = data[0]
    let property = {}
    let total = 0
    for (let category of categories) {
        let value = Number(data[category.field])
        property[category.income] = {
            fraction: (value - total) / 100,
        }
        total = value
    }
    property["not poor"] = {
        fraction: 1 - total / 100,
    }

    return property
}

export async function buildGroupWorld(scale, year, entity) {
    let countriesContinents = await parseCSV(countriesContinentsCSV)
    let countryList = countriesContinents.data
        .filter((row) => row[2] == entity)
        .map((row) => row[0])

    let worldPromises = []
    for (let country of countryList) {
        worldPromises.push(buildWorld(scale, year, country))
    }

    let results = await Promise.allSettled(worldPromises)
    results = results
        .filter((res) => res.status == "fulfilled")
        .map((res) => res.value)

    let flattenedResult = []
    flattenedResult = flattenedResult.concat(...results)
    return flattenedResult
}

// If scale is one million, one million people in the real world will be represented by one person in the game world.
export function buildWorld(scale, year, entity) {
    return new Promise(async (resolve, reject) => {
        let humanProperties = structuredClone(defaultHumanProperties)

        try {
            humanProperties["age"] = await generateAgeProperty(year, entity)
        } catch (e) {
            console.error(e)
            reject(e)
            return
        }

        try {
            humanProperties["poverty"] = await generatePovertyProperty(
                year,
                entity,
            )
        } catch (e) {
            console.error(e)
            // This is not such a problem, keep going.
        }

        for (let propertyName of Object.keys(propertyDefinitions)) {
            try {
                humanProperties[propertyName] = await generateGenericProperty(
                    year,
                    entity,
                    propertyName,
                )
            } catch (e) {
                console.error(e)
            }
        }

        //console.log(entity)
        //console.log(humanProperties)

        const world = []
        let totalHumans = await getTotalHumans(entity, year)
        //console.log(totalHumans)
        let displayedHumans = Math.round(totalHumans / scale)
        for (let i = 0; i < displayedHumans; i++) {
            let p = new Person()
            for (let property in humanProperties) {
                let options = humanProperties[property]
                let value = Math.random()
                let progress = 0
                for (let option in options) {
                    let attributes = options[option]
                    progress += attributes.fraction
                    if (progress >= value) {
                        p.setProperty(property, option)
                        break
                    }
                }
            }

            world.push(p)
        }
        //for (let i = 0; i < CHICKENS / scale; i++) {
        //    world.push(new Entity("🐔"));
        //}
        resolve(world)
    })
}

export async function entityList() {
    let results = await parseCSV(povertyCSV)

    // Remove header.
    results.data.shift()

    let entities = new Set()
    for (let row of results.data) {
        if (row[0] !== "") {
            entities.add(row[0])
        }
    }
    return [...entities]
}
