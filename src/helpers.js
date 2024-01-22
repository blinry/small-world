export function metricToImperial(quantity) {
    let result = {...quantity}
    if (quantity.unit == "cm") {
        result.unit = "in"
        result.value = quantity.value / 2.54
    } else if (quantity.unit == "km") {
        result.unit = "miles"
        result.value = quantity.value / 1.609344
    } else if (quantity.unit == "m") {
        result.unit = "ft"
        result.value = quantity.value * 3.281
    } else if (quantity.unit == "km²") {
        result.unit = "mi²"
        result.value = quantity.value / 2.589988
    } else if (quantity.unit == "kg") {
        result.unit = "lbs"
        result.value = quantity.value * 2.205
    } else if (quantity.unit == "g") {
        result.unit = "oz"
        result.value = quantity.value * 0.035274
    }
    return result
}

// Format a quantity nicely, and return it as a string.
export function humanReadable(quantity, useMetric = true, rounded = true) {
    let resultingQuantity

    if (typeof quantity === "number") {
        quantity = {value: quantity}
    } else {
        quantity = {...quantity}
    }

    if (quantity.unit === "tonnes" && quantity.value < 0.001) {
        quantity.unit = "g"
        quantity.value *= 1_000_000
    } else if (quantity.unit === "tonnes" && quantity.value < 1) {
        quantity.unit = "kg"
        quantity.value *= 1000
    }

    if (!useMetric) {
        resultingQuantity = metricToImperial(quantity)
    } else {
        resultingQuantity = quantity
    }

    // Convertes big values into something like 120 million or 41 thousand
    // or 1.2 billion.

    let exponent = Math.floor(Math.log10(resultingQuantity.value))
    let mantissa =
        Math.floor((100 * resultingQuantity.value) / Math.pow(10, exponent)) /
        100
    let scientificNotation = " (= " + mantissa + "*10^" + exponent + ")"

    let result = ""

    if (rounded) {
        if (resultingQuantity.value < 0.05) {
            result = "0"
        } else if (resultingQuantity.value < 0.7) {
            result = Math.round(resultingQuantity.value * 10) / 10
        } else if (resultingQuantity.value < 1.35) {
            result = Math.round(resultingQuantity.value)
        } else if (resultingQuantity.value < 1.8) {
            result = Math.round(resultingQuantity.value * 10) / 10
        } else if (resultingQuantity.value < 10000) {
            result = `${Math.round(resultingQuantity.value)}`
        } else if (resultingQuantity.value < 1e6) {
            result =
                Math.round(resultingQuantity.value / 100) / 10 + " thousand"
        } else if (resultingQuantity.value < 1e9) {
            result = Math.round(resultingQuantity.value / 1e5) / 10 + " million"
        } else if (resultingQuantity.value < 1e12) {
            result = Math.round(resultingQuantity.value / 1e8) / 10 + " billion"
        } else if (resultingQuantity.value < 1e15) {
            result =
                Math.round(resultingQuantity.value / 1e11) / 10 +
                " trillion" +
                scientificNotation
        } else if (resultingQuantity.value < 1e18) {
            result =
                Math.round(resultingQuantity.value / 1e14) / 10 +
                " quadrillion" +
                scientificNotation
        } else if (resultingQuantity.value < 1e21) {
            result =
                Math.round(resultingQuantity.value / 1e17) / 10 +
                " quintillion" +
                scientificNotation
        } else {
            result = Math.round(resultingQuantity.value) + scientificNotation
        }
    } else {
        result = resultingQuantity.value
    }

    if (resultingQuantity.unit) {
        result += " " + resultingQuantity.unit
    }

    return result
}

// Converts small values (like 0.000000001 months) into something like 10 seconds.
export function humanReadableSmall(value, unit) {
    if (unit === "months") {
        let conversions = [
            {unit: "nanoseconds", factor: 1e-9},
            {unit: "microseconds", factor: 1e-6},
            {unit: "milliseconds", factor: 1e-3},
            {unit: "seconds", factor: 1},
            {unit: "minutes", factor: 60},
            {unit: "hours", factor: 60 * 60},
            {unit: "days", factor: 24 * 60 * 60},
            //{unit: "months", factor: 30 * 24 * 60 * 60},
            {unit: "years", factor: 30 * 24 * 60 * 60 * 365},
        ]
        // find correct input factor
        let inputFactor = 30 * 24 * 60 * 60

        // find correct output factor, so that result will be 1-3 digits
        for (let conversion of conversions) {
            let result = (value * inputFactor) / conversion.factor
            if (result >= 1 && result < 1000) {
                return `${Math.round(result)} ${conversion.unit}`
            }
        }
    } else {
        return `${value} ${unit}`
    }
}

export function parseQuantity(string) {
    // Convert strings like "10.5 million bananas", "two thousand tonnes" or "4" or "50 cows" into a quantity with value and unit.

    const numberMap = {
        thousand: 1000,
        million: 1000000,
        billion: 1000000000,
        trillion: 1000000000000,
    }

    const parts = string.split(" ")

    let quantity = {
        value: parseFloat(parts[0]),
    }

    if (isNaN(quantity.value)) {
        throw new Error("Invalid number format")
    }

    if (parts.length > 1) {
        const factor = numberMap[parts[1].toLowerCase()]
        if (factor) {
            quantity.value *= factor
            quantity.unit = parts.slice(2).join(" ")
        } else {
            quantity.unit = parts.slice(1).join(" ")
        }
    }

    return quantity
}

export function renderEmoji(txt) {
    if (txt === "") return ""

    if (/\p{Extended_Pictographic}/u.test(txt)) {
        return txt
    } else {
        return `<img class="custom-emoji" src="/custom-emoji/${txt}.svg">`
    }
}
