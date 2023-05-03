import Papa from "papaparse"

let ageCSV = "/data/age.csv"
let povertyCSV = "/data/poverty.csv"

const HUMANS = 8e9
const CHICKENS = 33e9 // just a guess, no Internet...

let entity = "World"
let year = "2017"

class Entity {
    constructor() {
        let width = 1200
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

        if (this.properties.canRead == "yes") {
            label += "📖"
        }

        if (this.properties.poverty) {
            label += this.properties.poverty
        }
        return label
    }
}

const humanProperties = {
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

function parseCSV(url) {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            complete: (results) => {
                resolve(results)
            },
        })
    })
}

async function generateAgeProperty() {
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
        (row) => row[entityField] == entity && row[yearField] == year
    )
    if (currentData.length <= 0) {
        console.error("No data age for", entity, year)
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

async function generatePovertyProperty() {
    let results = await parseCSV(povertyCSV)

    let header = results.data.shift()
    console.log(header)

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
        (row) => row[entityField] == entity && row[yearField] == year
    )
    if (data.length <= 0) {
        console.error("No data poverty for", entity, year)
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

// If scale is one million, one million people in the real world will be represented by one person in the game world.
export function buildWorld(scale) {
    return new Promise(async (resolve, reject) => {
        humanProperties["age"] = await generateAgeProperty()
        humanProperties["poverty"] = await generatePovertyProperty()
        console.log(humanProperties)

        const world = []
        for (let i = 0; i < HUMANS / scale; i++) {
            let p = new Person()
            for (let property in humanProperties) {
                let options = humanProperties[property]
                let value = Math.random()
                let progress = 0
                for (let option in options) {
                    let attributes = options[option]
                    progress += attributes.fraction
                    if (progress >= value) {
                        console.log(property, option)
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
