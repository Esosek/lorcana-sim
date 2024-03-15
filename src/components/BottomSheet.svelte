<script>
  import { get } from 'svelte/store';
  import sortOptions, { SortOptions } from '../stores/sortOptions';

  function sortCards(options) {
    const currentOptions = get(sortOptions);

    if (options === currentOptions.sortBy) {
      sortOptions.setAscending(!currentOptions.ascending);
    } else {
      sortOptions.sortBy(options);
    }
  }
</script>

<div class="sort-options flex-group">
  <p class="deck-count">Cards in Deck : 0</p>
  <section class="sort flex-group">
    <p class="label">Sort by</p>
    <button
      data-selected={$sortOptions.sortBy === SortOptions.Ink}
      on:click={() => sortCards(SortOptions.Ink)}>Ink</button
    >
    <button
      data-selected={$sortOptions.sortBy === SortOptions.Rarity}
      on:click={() => sortCards(SortOptions.Rarity)}>Rarity</button
    >
  </section>
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
    padding: 0.5rem 3rem;
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
</style>
