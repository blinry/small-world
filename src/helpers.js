export function humanReadable(value) {
    // Convertes big values into something like 120 million or 41 thousand
    // or 1.2 billion

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
        return Math.round(value / 1e12) + " trillion"
    } else {
        return Math.round(value)
    }
}
