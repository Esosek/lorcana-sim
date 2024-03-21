<script>
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  import deck, { deckLength } from '../stores/deck';
  import pool from '../stores/cardPool';
  import options from '../stores/options';

  import CurveChart from './CurveChart.svelte';
  import InkableCount from './InkableCount.svelte';
  import CardSmall from './CardSmall.svelte';

  let previewElement;

  onMount(() => {
    previewElement = document.getElementById('preview');
  });

  function removeCard(card) {
    if (get(options).isBuilding) {
      deck.add(card);
      pool.remove(card.id);
    } else {
      deck.remove(card.id);
      pool.add(card);
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

<aside class="flex-group">
  <h2>{$options.isBuilding ? 'Card pool' : 'Deck'}</h2>
  <p>Cards in Deck: {$deckLength}</p>
  <img id="preview" src="" alt="" style="display: none" />
  {#if $options.isBuilding ? $pool.length != 0 : $deck.length != 0}
    <ul class="decklist">
      {#each $options.isBuilding ? $pool : $deck as card}
        <CardSmall
          {card}
          onClick={() => removeCard(card)}
          onMouseEnter={() => previewCard(card.id)}
          onMouseLeave={hidePreview}
        />
      {/each}
    </ul>
    <CurveChart />
    <InkableCount />
  {:else}
    <p class="empty-text">No cards...</p>
  {/if}
</aside>

<style>
  aside {
    position: fixed;
    flex-direction: column;
    flex-wrap: nowrap;
    background-color: var(--clr-secondary);
    box-shadow: 0 -5px 5px var(--clr-transparent-50);
    top: 0;
    right: 0;
    bottom: 0;
    width: 20%;
    padding-inline: 0.5rem;
  }

  h2 {
    font-size: var(--fs-large);
    margin-bottom: 0.5rem;
  }

  .decklist {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    margin-block: 0.5rem;
    gap: 5px;
    width: 100%;
    overflow-y: scroll;
  }

  #preview {
    position: absolute;
    top: 25%;
    left: -250px;
    width: 250px;
  }

  .empty-text {
    font-weight: var(--fw-light);
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
</style>
