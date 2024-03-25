<script>
  import deck from '../stores/deck';

  import inkableIconImg from '../assets/images/inkable_icon.png';
  import nonInkableIconImg from '../assets/images/non_inkable_icon.png';
</script>

<div class="inkable-count">
  <div class="counter">
    <img src={nonInkableIconImg.src} alt="Non-inkable symbol" />
    <p class="counter-value">
      {$deck
        .filter((card) => !card.inkwell)
        .reduce((acc, card) => acc + card.quantity, 0)}
    </p>
  </div>
  <div class="counter">
    <img src={inkableIconImg.src} alt="Inkable symbol" />
    <p class="counter-value">
      {$deck
        .filter((card) => card.inkwell)
        .reduce((acc, card) => acc + card.quantity, 0)}
    </p>
  </div>
</div>

<style>
  .inkable-count {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 0.3rem;
  }

  .counter {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
  }

  img {
    height: 100%;
    width: 100%;
  }

  .counter-value {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
</style>
