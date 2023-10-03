<script>
    let visible = false

    function toggle() {
        visible = !visible
        if (visible) {
            document.body.style.height = "100%"
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.height = ""
            document.body.style.overflow = ""
        }
    }
</script>

<span on:click={toggle}
    ><slot />{#if visible}<div class="background">
            <div class="popup"><slot name="popup" /></div>
        </div>{/if}
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
        max-width: 90vw;
        width: 30em;
        height: 10em;
        background-color: white;
        box-shadow: 0 0 1em black;
        padding: 1em;
        border-radius: 0.5em;
        font-weight: normal;
        margin: 2em;
        overflow-wrap: break-word;
    }
</style>
