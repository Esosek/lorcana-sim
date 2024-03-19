<script>
  import deck from '../stores/deck';
  import pool from '../stores/cardPool';

  import inkableIconImg from '../assets/images/inkable_icon.png';
  import nonInkableIconImg from '../assets/images/non_inkable_icon.png';

  function removeCard(card) {
    deck.remove(card.id);
    pool.add(card);
  }
</script>

<aside class="flex-group">
  <h1>Deck</h1>
  <p>Count: {$deck.length}</p>
  {#if $deck.length != 0}
    <ul class="decklist">
      {#each $deck as card}
        <li data-ink={card.color}>
          <button on:click={() => removeCard(card)}>
            <div class="card-cost">
              <img
                src={card.inkwell ? inkableIconImg.src : nonInkableIconImg.src}
                alt="Inkable symbol"
              />
              <p>{card.cost}</p>
            </div>

            <div
              class="card-name"
              style={card.type === 'Character' ? 'justify-self: start' : ''}
            >
              <p class="card-basename">{card.baseName}</p>
              {#if card.subtitle}
                <p class="card-subtitle">{card.subtitle}</p>
              {/if}
            </div>

            <p>{card.quantity}x</p>
          </button>
        </li>
      {/each}
    </ul>
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

  h1 {
    margin-bottom: 0.5rem;
  }

  .decklist {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    margin-block: 1.5rem;
    gap: 5px;
    width: 100%;
    overflow: scroll;
  }

  li {
    --_ink-color: var(--ink-color, green);
    background-color: var(--_ink-color);
    padding-block: 0.15rem;
    border-radius: 0.3rem;
  }

  li:hover {
    cursor: pointer;
    box-shadow: inset 0 0 0 2px var(--clr-neutral-200);
  }

  button {
    color: inherit;
    display: grid;
    grid-template-columns: 50px 4fr 1fr;
    align-items: center;
    width: 100%;
  }

  [data-ink='Amber'] {
    --ink-color: #c68600;
  }
  [data-ink='Amethyst'] {
    --ink-color: #5a255a;
  }
  [data-ink='Emerald'] {
    --ink-color: #1c6625;
  }
  [data-ink='Ruby'] {
    --ink-color: #a00a23;
  }
  [data-ink='Sapphire'] {
    --ink-color: #005c86;
  }
  [data-ink='Steel'] {
    --ink-color: #6d7682;
  }

  .card-cost {
    position: relative;
  }

  .card-cost img {
    position: absolute;
    height: 100%;
    right: 5px;
  }

  .card-name {
    display: flex;
    flex-direction: column;
    text-align: start;
  }

  .card-basename,
  .card-subtitle {
    margin-block: 0;
    font-size: 0.75rem;
  }

  .card-basename {
    text-transform: uppercase;
    font-weight: var(--fw-bold);
  }

  .empty-text {
    font-weight: var(--fw-light);
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
</style>
