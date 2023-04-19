import Papa from "papaparse"

let ageCSV = "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario)/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario).csv"

class Entity {
    constructor(name) {
        this.name = name

        let width = 800
        this.x = Math.random()*width
        this.y = Math.random()*width
    }
}

const HUMANS = 8e9
const CHICKENS = 33e9 // just a guess, no Internet...

const humanProperties = {
    sex: {
        "xx": {
            fraction: 0.5,
            emoji: "👦"
        },
        "xy": {
            fraction: 0.5,
            emoji: "👧"
        }
    },
    canRead: {
        "yes": {
            fraction: 0.8,
            emoji: "📖"
        },
        "no": {
            fraction: 0.2,
            emoji: ""
        }
    }
    //income: {
    //    "very rich": {
    //        fraction: 0.01,
    //        emoji: "💰"
    //    },
    //    "in between": {
    //        fraction: 0.79,
    //        emoji: "🪙"
    //    },
    //    "very poor": {
    //        fraction: 0.2,
    //        emoji: ""
    //    }
    //}
}

// If scale is one million, one million people in the real world will be represented by one person in the game world.
export function buildWorld(scale) {
    return new Promise((resolve, reject) => {
    Papa.parse(ageCSV, {
        download: true,
        complete: (results) => {
            let header = results.data.shift()
            console.log(header)
            let entityField = 0
            let yearField = 1
            let categories = [
                {
                    field: 2,
                    emoji: "<15"
                },
                {
                    field: 3,
                    emoji: "15-64"
                },
                {
                    field: 4,
                    emoji: "65+"
                },
                {
                    field: 5,
                    emoji: "<5"
                },
                {
                    field: 6,
                    emoji: "5-14"
                },
                {
                    field: 7,
                    emoji: "15-24"
                },
                {
                    field: 8,
                    emoji: "25-64"
                },
            ]
            let currentData = results.data.filter(row => row[entityField] == "World" && row[yearField] == "2023")
            let property = {}
            for (let category of categories) {
                property[category.emoji] = {
                    fraction: Number(currentData[0][category.field]) / HUMANS,
                    emoji: category.emoji
                }
            }
            humanProperties["age"] = property

            const world = [];
            for (let i = 0; i < HUMANS / scale; i++) {
                let name = ""
                for (let property in humanProperties) {
                    let options = humanProperties[property]
                    let value = Math.random()
                    let progress = 0
                    for (let option in options) {
                        let attributes = options[option]
                        progress += attributes.fraction
                        if (progress >= value) {
                            name += attributes.emoji
                            break
                        }
                    }
                }
                world.push(new Entity(name));
            }
            //for (let i = 0; i < CHICKENS / scale; i++) {
            //    world.push(new Entity("🐔"));
            //}
            resolve(world);
        }
    })
    })
}
