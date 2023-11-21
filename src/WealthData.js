// Source: https://wid.world/data/
// Year: 2021
// Unit: EUR
const wealthPercentiles = [
    {percentile: 0, value: -51619},
    {percentile: 1, value: -10441.3},
    {percentile: 2, value: -3926.4},
    {percentile: 3, value: -1684.2},
    {percentile: 4, value: -828.3},
    {percentile: 5, value: -405.6},
    {percentile: 6, value: -77.8},
    {percentile: 7, value: 44.4},
    {percentile: 8, value: 185.1},
    {percentile: 9, value: 301.9},
    {percentile: 10, value: 437.4},
    {percentile: 11, value: 561},
    {percentile: 12, value: 702.3},
    {percentile: 13, value: 816.2},
    {percentile: 14, value: 974.5},
    {percentile: 15, value: 1125.8},
    {percentile: 16, value: 1319.7},
    {percentile: 17, value: 1486.1},
    {percentile: 18, value: 1688.2},
    {percentile: 19, value: 1927.6},
    {percentile: 20, value: 2101.2},
    {percentile: 21, value: 2352.7},
    {percentile: 22, value: 2598.5},
    {percentile: 23, value: 2842.2},
    {percentile: 24, value: 3127.5},
    {percentile: 25, value: 3372.8},
    {percentile: 26, value: 3666.6},
    {percentile: 27, value: 3970.5},
    {percentile: 28, value: 4242},
    {percentile: 29, value: 4627},
    {percentile: 30, value: 4915.9},
    {percentile: 31, value: 5325.7},
    {percentile: 32, value: 5627},
    {percentile: 33, value: 5993.2},
    {percentile: 34, value: 6458.5},
    {percentile: 35, value: 6849.4},
    {percentile: 36, value: 7210},
    {percentile: 37, value: 7694.5},
    {percentile: 38, value: 8085.3},
    {percentile: 39, value: 8493.4},
    {percentile: 40, value: 8639.5},
    {percentile: 41, value: 9091.9},
    {percentile: 42, value: 9608.7},
    {percentile: 43, value: 10056.1},
    {percentile: 44, value: 10597},
    {percentile: 45, value: 11169.2},
    {percentile: 46, value: 11825.4},
    {percentile: 47, value: 12413.5},
    {percentile: 48, value: 13086.5},
    {percentile: 49, value: 13689.6},
    {percentile: 50, value: 14269.7},
    {percentile: 51, value: 14846.5},
    {percentile: 52, value: 15537.4},
    {percentile: 53, value: 16228.1},
    {percentile: 54, value: 17119.6},
    {percentile: 55, value: 17889.9},
    {percentile: 56, value: 18708.3},
    {percentile: 57, value: 19565.2},
    {percentile: 58, value: 20452.1},
    {percentile: 59, value: 21459.3},
    {percentile: 60, value: 22510.5},
    {percentile: 61, value: 23589},
    {percentile: 62, value: 24592.4},
    {percentile: 63, value: 25624.8},
    {percentile: 64, value: 26890.3},
    {percentile: 65, value: 28317.3},
    {percentile: 66, value: 29940.4},
    {percentile: 67, value: 31188.7},
    {percentile: 68, value: 32627.3},
    {percentile: 69, value: 34348},
    {percentile: 70, value: 36190.3},
    {percentile: 71, value: 37828.2},
    {percentile: 72, value: 39926.7},
    {percentile: 73, value: 42454.4},
    {percentile: 74, value: 44550.1},
    {percentile: 75, value: 47145.2},
    {percentile: 76, value: 49544.9},
    {percentile: 77, value: 52480.3},
    {percentile: 78, value: 55387.2},
    {percentile: 79, value: 59830.6},
    {percentile: 80, value: 62886.4},
    {percentile: 81, value: 67360.4},
    {percentile: 82, value: 72871.4},
    {percentile: 83, value: 78776.6},
    {percentile: 84, value: 85053.5},
    {percentile: 85, value: 91770.3},
    {percentile: 86, value: 99421.4},
    {percentile: 87, value: 107993.3},
    {percentile: 88, value: 118692.7},
    {percentile: 89, value: 129834.6},
    {percentile: 90, value: 145754.5},
    {percentile: 91, value: 164531.4},
    {percentile: 92, value: 191109.9},
    {percentile: 93, value: 221899.8},
    {percentile: 94, value: 266328.8},
    {percentile: 95, value: 324641.8},
    {percentile: 96, value: 414899.9},
    {percentile: 97, value: 540423.9},
    {percentile: 98, value: 784440.1},
    {percentile: 99, value: 3007763.8},
]

export function wealthDistribution(x1, x2) {
    let sum = 0
    let count = 0
    for (let i = 0; i < wealthPercentiles.length; i++) {
        if (
            wealthPercentiles[i].percentile >= x1 * 100 &&
            wealthPercentiles[i].percentile <= x2 * 100
        ) {
            sum += wealthPercentiles[i].value
            count++
        }
    }

    const usdPerEur = 1.21

    return (sum / count) * usdPerEur
}