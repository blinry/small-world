<script>
    let visible = false
</script>

<span
    on:click={() => {
        visible = !visible
    }}
>
    <slot />
    {#if visible}
        <div class="background">
            <div class="popup">
                <slot name="popup" />
            </div>
        </div>
    {/if}
</span>

<style>
    span {
        cursor: pointer;
    }
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
    .popup {
        width: 30em;
        height: 10em;
        background-color: white;
        box-shadow: 0 0 1em black;
        padding: 1em;
        border-radius: 0.5em;
        font-weight: normal;
    }
</style>
