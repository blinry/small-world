<script>
    import _ from "lodash"
    import confetti from "canvas-confetti"

    export let q
    export let a
    export let fakeAnswers

    let answerShown = false
    let userAnswer

    $: allAnswers = _.shuffle([...fakeAnswers, a])

    const audioFail = new Audio("fail.wav")
    const audioCorrect = new Audio("correct.wav")
</script>

<div>
    <b>{q}</b>

    <div class="button-wrapper">
        {#each allAnswers as answer}
            <button
                class:correct={answer === a && answerShown === true}
                class:wrong={answer !== a && answerShown === true}
                on:click={() => {
                    answerShown = true
                    if (answer === a) {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: {y: 0.6},
                        })
                        audioCorrect.play()
                    } else {
                        audioFail.play()
                    }
                }}
                disabled={answerShown}
                >{#if answerShown}
                    {#if answer === a}
                        ✅
                    {:else}
                        ❌
                    {/if}
                {/if}
                {answer}</button
            >
        {/each}
    </div>

    {#if answerShown}
        <slot />
    {/if}
</div>

<style>
    div {
        background: lightblue;
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem 0;
    }

    .button-wrapper {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
    }

    .button-wrapper > button {
        flex-grow: 1;
        width: 40%;
        color: black;
    }

    .correct {
        background-color: DarkSeaGreen;
    }

    .wrong {
        background-color: RosyBrown;
    }
</style>
