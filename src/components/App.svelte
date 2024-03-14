<script>
    let arePacksSelected = true;

    function toggleSelected() {
        arePacksSelected = !arePacksSelected;
    }
</script>

{#if arePacksSelected}<h1>Selected</h1>{:else}<h1>Not selected</h1>{/if}
<button on:click={toggleSelected}>Swap</button>