<script>
    export let value
    export let unit = null
    export let comment = "This is the actual value on the real Earth."
    export let factor = 1

    $: factoredValue = value * factor

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
</script>

<span title={comment}
    >{numberWithCommas(factoredValue)}{#if unit}{" " + unit}{/if}</span
>

<style>
    span {
        font-size: 120%;
    }
</style>
