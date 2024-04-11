<script>
  export let card;
  export let showQuantity = true;
  export let onClick = () => {};
  export let maxWidth = 250;
  // min 160 max 310 and step 30
</script>

<div class="card-item" style="--max-width: {maxWidth}px">
  <button on:click={onClick}>
    {#if showQuantity}
      <div class="quantity center">
        <p>{card.quantity}</p>
        <span class="multiplier">x</span>
      </div>
    {/if}
    <img
      src={card.images.thumbnail}
      alt={`Image of ${card.fullName} card`}
      width={maxWidth}
      height={maxWidth * 1.396}
    />
  </button>
</div>

<style>
  .card-item {
    position: relative;
    max-width: var(--max-width);
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 5px var(--clr-transparent-50);
    transition: transform 150ms ease-out;
  }

  .card-item:hover {
    cursor: pointer;
    transform: scale(1.025);
  }

  .card-item button {
    color: var(--clr-neutral-200);
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
    letter-spacing: 1px;
    padding: 1.5rem;
    box-shadow: 0 0 5px var(--clr-transparent-50);
  }

  .multiplier {
    font-size: var(--fs-medium);
  }
</style>
