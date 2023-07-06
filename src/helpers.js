export function humanReadable(value) {
    // Convertes big values into something like 120 million or 41 thousand
    // or 1.2 billion

    // also "xx * 10^yy"
    let exponent = Math.floor(Math.log10(value))
    let mantissa = value / Math.pow(10, exponent)
    let scientificNotation = " (= " + mantissa + "*10^" + exponent + ")"

    if (value < 1) {
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
