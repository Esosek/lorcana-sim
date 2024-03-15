<script>
  import cardStore from '../stores/cardPool';
  import CardSort from './BottomSheet.svelte';

  let cardPool = [];

  cardStore.subscribe((value) => {
    cardPool = [...value];
  });
</script>

<main>
  <CardSort />
  <ul class="flex-group">
    {#each cardPool as card}
      <li>
        <div class="quantity center">
          <p>{card.quantity}</p>
          <span class="multiplier">x</span>
        </div>
        <img
          src={card.images.thumbnail}
          alt={`Image of ${card.fullName} card`}
          width="250"
          height="349"
        />
      </li>
    {/each}
  </ul>
</main>

<style>
  .flex-group {
    align-items: start;
    gap: 1.5rem;
  }

  li {
    position: relative;
    max-width: 250px;
    border-radius: 0.5rem;
    overflow: hidden;
    /* box-shadow: 0 0 5px var(--clr-transparent-50); */
    transition: transform 150ms ease-out;
  }

  li:hover {
    cursor: pointer;
    transform: scale(1.025);
  }

  .quantity {
    position: absolute;
    right: 15px;
    top: 15px;
    height: 3rem;
    width: 3rem;
    background-color: var(--clr-outline);
    border-radius: 50%;
    font-size: var(--fs-large);
    letter-spacing: 2px;
    padding: 1.5rem;
    box-shadow: 0 0 5px var(--clr-transparent-50);
  }

  .multiplier {
    font-size: var(--fs-medium);
  }
</style>
