<script>
  import { get } from 'svelte/store';
  import ratingSet from '../../stores/ratingSet';
  import CardLarge from '../CardLarge.svelte';

  let isFinished = false;

  function getCode() {
    isFinished = true;
    const cardIds = get(ratingSet).map((card) => card.id);
    navigator.clipboard.writeText(cardIds);
  }

  function moveCardUp(cardIndex) {
    ratingSet.move(cardIndex, cardIndex - 1);
  }

  function moveCardDown(cardIndex) {
    ratingSet.move(cardIndex, cardIndex + 1);
  }

  function moveCardToIndex(cardIndex, newIndexPosition) {
    ratingSet.move(cardIndex, newIndexPosition);
  }
</script>

<main class="center">
  <h1>Set cards</h1>
  <button class="primary-btn" on:click={getCode}>Done</button>

  {#if isFinished}
    <p>Order copied to clipboard!</p>
  {/if}
  <ul class="flex-group">
    {#each $ratingSet as card, index}
      <li>
        <CardLarge {card} showQuantity={false} />
        <div class="control flex-group">
          <button class="control-arrow" on:click={() => moveCardUp(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
              ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
              /></svg
            >
          </button>
          <button class="order-index">{index + 1}.</button>
          <button class="control-arrow" on:click={() => moveCardDown(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
              ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              /></svg
            >
          </button>
        </div>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    flex-direction: column;
  }

  h1 {
    margin-block: 1.5rem;
  }

  .primary-btn {
    margin-block: 0;
  }

  .flex-group {
    gap: 1rem;
  }

  ul {
    margin-block: 2rem;
  }

  .control {
    background-color: var(--clr-secondary);
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }

  .control-arrow {
    width: 1.5rem;
  }

  .control-arrow:hover {
    transform: scale(0.95);
  }

  .control-arrow svg {
    fill: var(--clr-tertiary);
    transition: fill 150ms;
  }

  .control-arrow:hover svg {
    fill: var(--clr-tertiary-75);
  }

  .order-index {
    font-size: var(--fs-large);
    font-weight: var(--fw-light);
    color: inherit;
    padding: 0.25rem 0.5rem;
    border: 2px solid var(--clr-primary);
    border-radius: 0.5rem;
    box-shadow: 0 0 2px var(--clr-tertiary);
  }

  .order-index:hover {
    background-color: var(--clr-primary);
  }
</style>
