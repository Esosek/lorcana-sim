<script>
  import cardPool from '../stores/cardPool';
  import PackPicker from './PackPicker.svelte';
  import Deckbuilder from './Deckbuilder.svelte';
  import draft from '../stores/draft';

  let isCardPoolGenerated = false;

  cardPool.subscribe((value) => {
    if (isCardPoolGenerated) return;
    if (value.length > 0) {
      isCardPoolGenerated = true;
    }
  });

  draft.subscribe((value) => {
    if (isCardPoolGenerated) return;
    if (value.currentPack.length > 0) {
      isCardPoolGenerated = true;
    }
  });
</script>

{#if isCardPoolGenerated}
  <Deckbuilder />
{:else}
  <PackPicker />
{/if}
