<script>
  import cardPool from '../stores/cardPool';
  import PackPicker from './PackPicker.svelte';
  import Deckbuilder from './Deckbuilder.svelte';

  let isCardPoolGenerated = false;

  cardPool.subscribe((value) => {
    if (isCardPoolGenerated) return;
    if (value.length > 0) {
      isCardPoolGenerated = true;
    }
  });
</script>

{#if isCardPoolGenerated}
  <Deckbuilder />
{:else}
  <PackPicker />
{/if}
