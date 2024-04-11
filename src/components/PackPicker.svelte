<script>
  import { onMount } from 'svelte';
  import SetSelect from './SetSelect.svelte';
  import cardPool from '../stores/cardPool';
  import options, { pickGameMode, GameMode } from '../stores/options';

  let setsData = {};
  let selectComponents = [];
  let setSelectValues = {};
  let isGeneratingPacks = false;

  let errorMessages = [];

  onMount(async () => {
    await fetchSets();
    addSet();
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

  function addSet() {
    if (selectComponents.length < Object.entries(setsData).length) {
      selectComponents = [...selectComponents, { id: Math.random() }];
    }
  }

  function removeSet(id) {
    if (selectComponents.length > 1) {
      selectComponents = selectComponents.filter(
        (component) => component.id !== id
      );
      delete setSelectValues[id];
    }
  }

  function onSelectChange(id, setKey, count) {
    setSelectValues[id] = { [setKey]: count };
  }

  async function generate() {
    console.log('Generating packs...');
    isGeneratingPacks = true;

    const selectedPacks = getSelectedPacks();
    const generatedPacks = await generatePacks(selectedPacks);

    if (generatedPacks.error) return;

    isGeneratingPacks = false;
    console.log('Packs generated!');

    updatePoolStore(generatedPacks);
  }

  function getSelectedPacks() {
    const selectedPacks = [];

    Object.values(setSelectValues).forEach((set) => {
      for (let i = 0; i < Object.values(set)[0]; i++) {
        const playerCount = $options.gameMode === GameMode.Draft ? 8 : 1;
        // Generate for each "player" in draft
        for (let i = 0; i < playerCount; i++) {
          selectedPacks.push(Object.keys(set)[0]);
        }
      }
    });
    console.log(selectedPacks);
    return selectedPacks;
  }

  async function generatePacks(pickedPacks) {
    try {
      const url = `/api/packs?sets=${pickedPacks.join(',')}`;
      const response = await fetch(url);

      if (!response.ok)
        throw Error('Server responded with status', response.status);

      const packData = await response.json();
      return packData;
    } catch (error) {
      errorMessages = [
        ...errorMessages,
        'Generating cards failed, please reload the page.',
      ];
      return { error: error.message };
    }
  }

  function updatePoolStore(generatedPacks) {
    let cardList = [];

    for (const pack in generatedPacks) {
      generatedPacks[pack].cards.forEach((card) => {
        const existingCard = cardList.find((c) => c.id === card.id);
        if (existingCard) {
          existingCard.quantity++;
        } else {
          cardList.push({ ...card, quantity: 1 });
        }
      });
    }

    cardPool.set(cardList);
  }
</script>

<div class="center">
  <main>
    <h1>Choose packs</h1>
    {#each errorMessages as message}
      <p class="error">{message}</p>
    {/each}

    {#if errorMessages.length === 0}
      <div class="mode-picker">
        <button
          class="mode-btn"
          aria-current={$options.gameMode === GameMode.Sealed ? 'true' : null}
          on:click={() => pickGameMode(GameMode.Sealed)}>Sealed</button
        >
        <button
          class="mode-btn"
          aria-current={$options.gameMode === GameMode.Draft ? 'true' : null}
          on:click={() => pickGameMode(GameMode.Draft)}>Draft</button
        >
      </div>
      {#each selectComponents as component, _ (component.id)}
        <SetSelect
          id={component.id}
          {removeSet}
          {setsData}
          onChange={onSelectChange}
        />
      {/each}
      <button class="add-btn" on:click={addSet}
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
          ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          /></svg
        > Add set</button
      >
      <button
        class="primary-btn"
        disabled={isGeneratingPacks}
        on:click={generate}
        >{isGeneratingPacks ? 'Generating...' : 'Generate'}</button
      >
    {/if}
  </main>
</div>

<style>
  .center {
    min-height: 100vh;
  }

  .mode-picker {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 0.3rem;
    overflow: clip;
    border: 1px solid var(--clr-tertiary);
    margin-block: 2rem;
  }

  .mode-btn {
    padding: 0.75rem 2rem;
    font-size: var(--fs-small);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: var(--fw-bold);
    color: var(--clr-tertiary-75);
  }

  .mode-btn[aria-current='true'] {
    background-color: var(--clr-tertiary);
    color: var(--clr-primary);
  }

  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    color: var(--clr-neutral-200);
    margin: 0.75rem;
    font-size: var(--fs-small);
    transition: color 150ms;
  }

  .add-btn:hover {
    color: var(--clr-tertiary);
  }

  .add-btn:hover svg {
    fill: var(--clr-neutral-200);
    background-color: var(--clr-tertiary);
  }

  .add-btn svg {
    height: 1.25rem;
    width: 1.25rem;
    padding: 0.15rem;
    fill: var(--clr-tertiary);
    border-radius: 50%;
    transition:
      fill 150ms,
      background-color 150ms;
  }
</style>
