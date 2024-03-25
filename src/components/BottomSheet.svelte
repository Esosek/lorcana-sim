<script>
  import options, { SortOptions } from '../stores/options';
  import deckStore, { deckLength } from '../stores/deck';

  function sortCards(newValue) {
    options.update((prevValue) => {
      if (newValue === prevValue.sortBy) {
        prevValue.ascending = !prevValue.ascending;
      } else {
        prevValue.sortBy = newValue;
      }
      return prevValue;
    });
  }
</script>

<div class="sort-options flex-group">
  <p class="deck-count">Cards in Deck : {$deckLength}</p>
  <section class="sort flex-group">
    <p class="label">Sort by</p>
    <button
      data-selected={$options.sortBy === SortOptions.Ink}
      on:click={() => sortCards(SortOptions.Ink)}>Ink</button
    >
    <button
      data-selected={$options.sortBy === SortOptions.Rarity}
      on:click={() => sortCards(SortOptions.Rarity)}>Rarity</button
    >
  </section>
  <button
    class="deckbuilder-btn"
    on:click={() =>
      options.update((value) => {
        return {
          ...value,
          isBuilding: !value.isBuilding,
        };
      })}
  >
    {#if $options.isBuilding}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
        ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
          d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"
        /></svg
      >
      <span>Swap</span>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
        ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
          d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z"
        /></svg
      >
      <span>Deckbuilder</span>
    {/if}
  </button>
</div>

<style>
  .flex-group {
    gap: 3rem;
  }

  .sort {
    align-items: baseline;
    gap: 1rem;
  }

  .sort-options {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0.75rem 2rem;
    background-color: var(--clr-primary);
    z-index: 100;
    box-shadow: 5px -5px 10px var(--clr-transparent-50);
    border-radius: 0 3rem 0 0;
  }

  .deck-count {
    font-weight: var(--fw-regular);
    font-size: var(--fs-medium);
  }

  .label {
    font-weight: var(--fw-light);
    font-size: var(--fs-medium);
  }

  button {
    color: var(--clr-neutral-200);
  }

  button:hover,
  button[data-selected='true'] {
    color: var(--clr-tertiary);
  }

  .deckbuilder-btn {
    display: grid;
    justify-items: center;
    gap: 0.25rem;
    font-size: var(--fs-small);
    min-width: 100px;
  }

  .deckbuilder-btn svg {
    height: 1.5rem;
    fill: var(--clr-neutral-200);
  }

  .deckbuilder-btn:hover svg {
    fill: var(--clr-tertiary);
  }
</style>
