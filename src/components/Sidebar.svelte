<script>
  import deck from '../stores/deck';

  let cardList = [];

  deck.subscribe((value) => {
    cardList = [...value];
  });
</script>

<aside class="flex-group">
  <h1>Deck</h1>
  <p>Count: {deck.length}</p>
  {#if deck.length != 0}
    <ul class="decklist">
      {#each cardList as card}
        <li>{card.fullName}</li>
      {/each}
      <li></li>
    </ul>
  {:else}
    <p class="empty-text">No cards...</p>
  {/if}
</aside>

<style>
  aside {
    position: fixed;
    flex-direction: column;
    background-color: var(--clr-secondary);
    box-shadow: 0 -5px 5px var(--clr-transparent-50);
    top: 0;
    right: 0;
    bottom: 0;
    width: 20%;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  .empty-text {
    font-weight: var(--fw-light);
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
</style>
