import Papa from "papaparse"

let ageCSV = "https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario)/Population%20by%20age%20group%20to%202100%20(based%20on%20UNWPP%2C%202017%20medium%20scenario).csv"

class Entity {
    constructor() {
        let width = 800
        this.x = Math.random()*width
        this.y = Math.random()*width
    }
}

class Person extends Entity{
    constructor(){
        super()
        this.properties = {}
    }

    setProperty(key, value){
        this.properties[key] = value
    }

    getLabel(){
        let label = ""
        if(this.properties.sex){
            if(this.properties.age){
                if(this.properties.age < 5){
                    label += "👶"
                }else if(this.properties.age < 15){
                    if(this.properties.sex == "xx"){
                        label += "👧"
                    }else{
                        label += "👦"
                    }
                }else if(this.properties.age < 65){
                    if(this.properties.sex == "xx"){
                        label += "👩"
                    }else{
                        label += "👨"
                    }
                }else{
                    if(this.properties.sex == "xx"){
                        label += "👵"
                    }else{
                        label += "👴"
                    }
                }
            }
        }

        if(this.properties.canRead == 'yes'){
            label += "📖"
        }
        return label
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
                    field: 4,
                    emoji: "65+",
                    lower: 65,
                    upper: 110
                },
                {
                    field: 5,
                    emoji: "<5",
                    lower: 0,
                    upper: 4
                },
                {
                    field: 6,
                    emoji: "5-14",
                    lower: 5,
                    upper: 14
                },
                {
                    field: 7,
                    emoji: "15-24",
                    lower: 15,
                    upper: 24
                },
                {
                    field: 8,
                    emoji: "25-64",
                    lower: 25,
                    upper: 64
                },
            ]
            let currentData = results.data.filter(row => row[entityField] == "World" && row[yearField] == "2023")
            let property = {}
            for (let category of categories) {
                property[category.emoji] = {
                    fraction: Number(currentData[0][category.field]) / HUMANS,
                    emoji: category.emoji,
                    upper: category.upper,
                    lower: category.lower
                }
            }
            humanProperties["age"] = property

            const world = [];
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
                            if(property == 'age'){
                                option = Math.random()*(attributes.upper - attributes.lower) + attributes.lower
                            }
                            p.setProperty(property, option)
                            break
                        }
                    }
                }


                world.push(p);
            }
            //for (let i = 0; i < CHICKENS / scale; i++) {
            //    world.push(new Entity("🐔"));
            //}
            resolve(world);
        }
    })
    })
}
