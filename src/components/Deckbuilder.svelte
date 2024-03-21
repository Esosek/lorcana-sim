<script>
  import { get } from 'svelte/store';

  import pool from '../stores/cardPool';
  import deck from '../stores/deck';
  import options from '../stores/options';
  import CardSort from './BottomSheet.svelte';
  import CardLarge from './CardLarge.svelte';
  import Sidebar from './Sidebar.svelte';
  import CardSmall from './CardSmall.svelte';

  let deckCards = {};

  deck.subscribe((value) => {
    const updatedDeckCards = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };

    value.forEach((card) => {
      if (card.cost >= 5) {
        updatedDeckCards[5].push(card);
      } else {
        updatedDeckCards[card.cost].push(card);
      }
    });
    deckCards = { ...updatedDeckCards };
  });

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

  {#if $options.isBuilding}
    <div class="grid">
      {#each Object.values(deckCards) as inkSlot}
        <ul class="ink-list" style={inkSlot.length <= 0 ? 'display:none' : ''}>
          {#each inkSlot as card}
            <CardSmall {card} onClick={() => addCard(card)} />
          {/each}
        </ul>
      {/each}
    </div>
  {:else}
    <ul class="flex-group">
      {#each $pool as card}
        <CardLarge {card} onClick={() => addCard(card)} />
      {/each}
    </ul>
  {/if}
</main>
<Sidebar />

<style>
  main {
    padding-right: calc(20% + 1rem);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: start;
    gap: 0.25rem;
    margin-bottom: 75px;
  }

  .flex-group {
    gap: 1.5rem;
  }

  .ink-list {
    display: grid;
    gap: 0.5rem;
  }
</style>
