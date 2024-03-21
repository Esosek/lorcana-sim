<script>
  import inkableIconImg from '../assets/images/inkable_icon.png';
  import nonInkableIconImg from '../assets/images/non_inkable_icon.png';

  export let card;
  export let onClick, onMouseEnter, onMouseLeave;
</script>

<li data-ink={card.color}>
  <button
    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
  >
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

<style>
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
</style>
