<script>
  import { get } from 'svelte/store';
  import ratingSet from '../../stores/ratingSet';
  import CardLarge from '../CardLarge.svelte';

  let isFinished = false;

  function getCode() {
    isFinished = true;
    let ratingString = '';

    for (const card of get(ratingSet)) {
      ratingString += `{"${card.id}": ${card.rating}},`;
    }

    console.log(ratingString);
    navigator.clipboard.writeText(ratingString);
  }
</script>

<main class="center">
  <h1>Set cards</h1>
  <button class="primary-btn" on:click={getCode}>Export</button>

  {#if isFinished}
    <p>Copied to clipboard!</p>
  {:else}
    <p>
      Rate cards on a scale from 5.0 to 1.0, where 5.0 is the best and 1.0 is
      the worst.
    </p>
  {/if}
  <ul class="flex-group">
    {#each $ratingSet as card, index}
      <li>
        <CardLarge {card} showQuantity={false} />
        <div class="control flex-group">
          <button
            class="control-arrow"
            on:click={() => ratingSet.decrement(index)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
              ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
              /></svg
            >
          </button>
          <p class="rating">{card.rating.toFixed(1)}</p>
          <button
            class="control-arrow"
            on:click={() => ratingSet.increment(index)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
              ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
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

  .rating {
    font-size: var(--fs-large);
  }
</style>
