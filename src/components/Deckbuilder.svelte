<script>
  import { get } from 'svelte/store';

  import pool from '../stores/cardPool';
  import deck from '../stores/deck';
  import options from '../stores/options';
  import CardSort from './BottomSheet.svelte';
  import CardLarge from './CardLarge.svelte';
  import Sidebar from './Sidebar.svelte';

  function addCard(card) {
    if (get(options).isBuilding) {
      deck.remove(card.id);
      pool.add(card);
    } else {
      deck.add(card);
      pool.remove(card.id);
    }
  }
</script>

<main>
  <CardSort />
  <h1 class="center">{$options.isBuilding ? 'Deck' : 'Card pool'}</h1>
  <ul class="flex-group">
    {#each $options.isBuilding ? $deck : $pool as card}
      <CardLarge {card} onClick={() => addCard(card)} />
    {/each}
  </ul>
</main>
<Sidebar />

<style>
  main {
    padding-right: 20%;
  }

  .flex-group {
    gap: 1.5rem;
  }
</style>
