<script>
  import cardStore from '../stores/cardPool';

  let cardPool = [];

  cardStore.subscribe((value) => {
    cardPool = [...value];
  });
</script>

<main>
  <ul class="flex-group">
    {#each cardPool as card}
      <li>
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
    max-width: 250px;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: transform 150ms ease-out;
  }

  li:hover {
    cursor: pointer;
    transform: scale(1.025);
  }
</style>
