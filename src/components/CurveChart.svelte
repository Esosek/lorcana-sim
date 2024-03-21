<script>
  import deck from '../stores/deck';

  const defaultChartValues = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6+': 0,
  };

  let chartValues = defaultChartValues;
  let maxValue = 0;

  deck.subscribe((cards) => {
    const updatedChartValues = { ...defaultChartValues };

    cards.forEach((card) => {
      if (card.cost >= 6) {
        updatedChartValues['6+'] += card.quantity;
      } else {
        updatedChartValues[card.cost] += card.quantity;
      }
    });
    maxValue = Math.max(...Object.values(updatedChartValues));
    chartValues = { ...updatedChartValues };
  });
</script>

<section class="ink-chart">
  <h2 class="center">Ink Curve</h2>
  <ul class="chart-list">
    {#each Object.entries(chartValues) as chartBar}
      <li>
        <div
          class="chart-bar"
          style="height:{(chartBar[1] / maxValue) * (6.25 * 0.6)}rem"
        >
          {#if chartBar[1] > 0}
            <p class="count-label">{chartBar[1]}</p>
          {/if}
        </div>
        <p class="ink-label">{chartBar[0]}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  h2 {
    margin-block: 0.5rem 1.5rem;
  }
  .chart-list {
    display: grid;
    grid-template-columns: repeat(6, 2rem);
    align-items: end;
    gap: 0.5rem;
    height: 6.25rem;
  }
  li {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;
    text-align: center;
  }
  .chart-bar {
    position: relative;
    background-color: var(--clr-tertiary);
    width: 100%;
    transition: height 500ms ease-in-out;
  }

  .count-label {
    position: absolute;
    top: -1.15rem;
    left: 0;
    right: 0;
    margin: 0;
    font-size: var(--fs-small);
    font-weight: var(--fw-light);
  }

  .ink-label {
    font-size: var(--fs-regular);
    font-weight: var(--fw-bold);
  }
</style>
