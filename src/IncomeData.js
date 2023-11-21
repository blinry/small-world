// Source: https://wid.world/data/
// Year: 2021
// Unit: EUR
const postTaxIncomePercentiles = [
    {percentile: 0, value: -803.2},
    {percentile: 1, value: 371.2},
    {percentile: 2, value: 438.9},
    {percentile: 3, value: 574.9},
    {percentile: 4, value: 727.7},
    {percentile: 5, value: 894.4},
    {percentile: 6, value: 1067.7},
    {percentile: 7, value: 1240.8},
    {percentile: 8, value: 1398.5},
    {percentile: 9, value: 1433},
    {percentile: 10, value: 1551.9},
    {percentile: 11, value: 1722.3},
    {percentile: 12, value: 1879.6},
    {percentile: 13, value: 2043},
    {percentile: 14, value: 2226.9},
    {percentile: 15, value: 2367.3},
    {percentile: 16, value: 2493.5},
    {percentile: 17, value: 2608.9},
    {percentile: 18, value: 2734.1},
    {percentile: 19, value: 2843},
    {percentile: 20, value: 2972.3},
    {percentile: 21, value: 3087.2},
    {percentile: 22, value: 3214.1},
    {percentile: 23, value: 3322.9},
    {percentile: 24, value: 3448.5},
    {percentile: 25, value: 3570.2},
    {percentile: 26, value: 3697.3},
    {percentile: 27, value: 3822},
    {percentile: 28, value: 3955.5},
    {percentile: 29, value: 4108.3},
    {percentile: 30, value: 4249.3},
    {percentile: 31, value: 4402.7},
    {percentile: 32, value: 4540.4},
    {percentile: 33, value: 4668.7},
    {percentile: 34, value: 4823.3},
    {percentile: 35, value: 4990.6},
    {percentile: 36, value: 5145.7},
    {percentile: 37, value: 5324.8},
    {percentile: 38, value: 5531},
    {percentile: 39, value: 5735.5},
    {percentile: 40, value: 5907},
    {percentile: 41, value: 6102},
    {percentile: 42, value: 6316},
    {percentile: 43, value: 6542.3},
    {percentile: 44, value: 6792.9},
    {percentile: 45, value: 7030},
    {percentile: 46, value: 7295.3},
    {percentile: 47, value: 7530.4},
    {percentile: 48, value: 7778.7},
    {percentile: 49, value: 8041},
    {percentile: 50, value: 8317.9},
    {percentile: 51, value: 8611.7},
    {percentile: 52, value: 8952.4},
    {percentile: 53, value: 9273},
    {percentile: 54, value: 9603.4},
    {percentile: 55, value: 9942.3},
    {percentile: 56, value: 10326},
    {percentile: 57, value: 10770.1},
    {percentile: 58, value: 11234.4},
    {percentile: 59, value: 11655},
    {percentile: 60, value: 12063.7},
    {percentile: 61, value: 12551.1},
    {percentile: 62, value: 13128.4},
    {percentile: 63, value: 13616.4},
    {percentile: 64, value: 14128.2},
    {percentile: 65, value: 14613.6},
    {percentile: 66, value: 15160.4},
    {percentile: 67, value: 15738.6},
    {percentile: 68, value: 16359},
    {percentile: 69, value: 17010.5},
    {percentile: 70, value: 17551},
    {percentile: 71, value: 18097.7},
    {percentile: 72, value: 18784.7},
    {percentile: 73, value: 19459.2},
    {percentile: 74, value: 20193.5},
    {percentile: 75, value: 20940.4},
    {percentile: 76, value: 21704},
    {percentile: 77, value: 22385.9},
    {percentile: 78, value: 23094.4},
    {percentile: 79, value: 24100.5},
    {percentile: 80, value: 25055.1},
    {percentile: 81, value: 26164.1},
    {percentile: 82, value: 27385.7},
    {percentile: 83, value: 28484.8},
    {percentile: 84, value: 29879.8},
    {percentile: 85, value: 31301.7},
    {percentile: 86, value: 32957.5},
    {percentile: 87, value: 34967.9},
    {percentile: 88, value: 36806.8},
    {percentile: 89, value: 39250.2},
    {percentile: 90, value: 41500.7},
    {percentile: 91, value: 44018.3},
    {percentile: 92, value: 47502.1},
    {percentile: 93, value: 51786},
    {percentile: 94, value: 55686.6},
    {percentile: 95, value: 62448.1},
    {percentile: 96, value: 71366.9},
    {percentile: 97, value: 84208.7},
    {percentile: 98, value: 106873.6},
    {percentile: 99, value: 294666.4},
]

export function postTaxIncomeDistribution(x1, x2) {
    let sum = 0
    let count = 0
    for (let i = 0; i < postTaxIncomePercentiles.length; i++) {
        if (
            postTaxIncomePercentiles[i].percentile >= x1 * 100 &&
            postTaxIncomePercentiles[i].percentile <= x2 * 100
        ) {
            sum += postTaxIncomePercentiles[i].value
            count++
        }
    }

    const usdPerEur = 1.21

    return ((sum / count) * usdPerEur) / 12 // per month!
}