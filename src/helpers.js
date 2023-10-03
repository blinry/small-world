export function humanReadable(value) {
    // Convertes big values into something like 120 million or 41 thousand
    // or 1.2 billion

    // also "xx * 10^yy"
    let exponent = Math.floor(Math.log10(value))
    let mantissa = value / Math.pow(10, exponent)
    let scientificNotation = " (= " + mantissa + "*10^" + exponent + ")"

    if (value < 0.05) {
        return 0
    } else if (value < 2) {
        return value
    } else if (value < 10000) {
        return Math.round(value)
    } else if (value < 1e6) {
        return Math.round(value / 1000) + " thousand"
    } else if (value < 1e9) {
        return Math.round(value / 1e6) + " million"
    } else if (value < 1e12) {
        return Math.round(value / 1e9) + " billion"
    } else if (value < 1e15) {
        return Math.round(value / 1e12) + " trillion" + scientificNotation
    } else if (value < 1e18) {
        return Math.round(value / 1e15) + " quadrillion" + scientificNotation
    } else if (value < 1e21) {
        return Math.round(value / 1e18) + " quintillion" + scientificNotation
    } else {
        return Math.round(value) + scientificNotation
    }
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

export function parseValue(value) {
    // Convert strings like "10.5 million bananas", "two thousand tonnes" or "4" or "50 cows" into an object with value and unit.

    const numberMap = {
        thousand: 1000,
        million: 1000000,
        billion: 1000000000,
        trillion: 1000000000000,
    }

    const parts = value.split(" ")

    let parsed = {
        value: parseFloat(parts[0]),
    }

    if (isNaN(parsed.value)) {
        throw new Error("Invalid number format")
    }

    if (parts.length > 1) {
        const factor = numberMap[parts[1].toLowerCase()]
        if (factor) {
            parsed.value *= factor
            parsed.unit = parts.slice(2).join(" ")
        } else {
            parsed.unit = parts.slice(1).join(" ")
        }
    }

    return parsed
}

export function renderEmoji(txt) {
    if (txt === "") return ""

    if (/\p{Extended_Pictographic}/u.test(txt)) {
        return txt
    } else {
        return `<img class="custom-emoji" src="/custom-emoji/${txt}.svg">`
    }
}
