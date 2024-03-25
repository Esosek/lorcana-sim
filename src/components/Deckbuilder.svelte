<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  import pool from '../stores/cardPool';
  import deck from '../stores/deck';
  import options from '../stores/options';
  import CardSort from './BottomSheet.svelte';
  import CardLarge from './CardLarge.svelte';
  import Sidebar from './Sidebar.svelte';
  import CardSmall from './CardSmall.svelte';

  let deckCards = {};
  let previewElement;

  onMount(() => {
    previewElement = document.getElementById('deckbuild-preview');
  });

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
    hidePreview();
  }

  function previewCard(cardId) {
    const cards = get(deck);
    const card = cards.find((c) => c.id === cardId);

    if (card !== undefined) {
      previewElement.src = card.images.thumbnail;
      previewElement.alt = `Preview of ${card.fullName}`;
      previewElement.style.display = 'block';
    }
  }

  function hidePreview() {
    previewElement.style.display = 'none';
  }
</script>

<main>
  <CardSort />
  <img id="deckbuild-preview" src="" alt="" style="display: none" />
  <h1 class="center">{$options.isBuilding ? 'Deck' : 'Card pool'}</h1>

  {#if $options.isBuilding}
    <div class="grid">
      {#each Object.values(deckCards) as inkSlot}
        <ul class="ink-list" style={inkSlot.length <= 0 ? 'display:none' : ''}>
          {#each inkSlot as card}
            <CardSmall
              {card}
              onClick={() => addCard(card)}
              onMouseEnter={() => previewCard(card.id)}
              onMouseLeave={hidePreview}
            />
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
  #deckbuild-preview {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    z-index: 5;
    width: calc(20% - 0.5rem);
    box-shadow: 0 0 5px 2px var(--clr-transparent-50);
  }

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
