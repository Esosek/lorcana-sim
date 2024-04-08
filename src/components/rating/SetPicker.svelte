<script>
  import { onMount } from 'svelte';
  import '../../styles/global.css';
  import ratingSet from '../../stores/ratingSet';

  let setsData = {};
  let setIndex = '1';
  let isLoadingCards = false;

  let errorMessages = [];

  onMount(async () => {
    await fetchSets();
  });

  async function fetchSets() {
    try {
      const url = '/api/sets';
      const response = await fetch(url);
      setsData = await response.json();
    } catch (error) {
      console.error(error.message);
      errorMessages = [
        ...errorMessages,
        'Fetching sets failed, please reload the page.',
      ];
    }
  }

  async function loadCards() {
    ratingSet.set([1]);
  }
</script>

<div class="center">
  <main>
    <h1>Choose set</h1>
    {#each errorMessages as message}
      <p class="error">{message}</p>
    {/each}
    {#if errorMessages.length === 0}
      <select bind:value={setIndex}>
        {#each Object.entries(setsData) as set}
          <option value={set[0]}>{set[1].name}</option>
        {/each}
      </select>
      <button class="primary-btn" disabled={isLoadingCards} on:click={loadCards}
        >{isLoadingCards ? 'Loading...' : 'Next'}</button
      >
    {/if}
  </main>
</div>

<style>
  .center {
    min-height: 100vh;
  }
</style>
