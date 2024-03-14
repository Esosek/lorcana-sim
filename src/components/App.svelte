<script>
  function addSet() {
    console.log('Adding new set...');
  }

  function generate() {
    console.log('Generating packs...');
  }
</script>

<div class="center">
  <main>
    <h1>Choose packs</h1>
    <div class="flex-group">
      <select>
        <option value="tfc">The First Chapter</option>
        <option value="rotf">Rise of the Floodborn</option>
        <option value="iti">Into the Inklands</option>
      </select>
      <input id="" type="number" min="1" value="1" />
      <button class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
          ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          /></svg
        >
      </button>
    </div>
    <button class="add-btn" on:click={addSet}
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
        ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
        /></svg
      > Add set</button
    >
    <button class="primary-btn" on:click={generate}>Generate</button>
  </main>
</div>

<style>
  h1 {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: var(--fw-light);
    margin-bottom: 3rem;
  }

  input {
    max-width: 3rem;
  }

  .delete-btn {
    display: flex;
    align-items: center;
    transition: transform 150ms;
  }

  .delete-btn:hover {
    transform: rotateZ(15deg);
  }

  .delete-btn svg {
    fill: var(--clr-error);
    height: 1.5rem;
    width: 1.5rem;
  }

  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    color: var(--clr-neutral-200);
    margin: 1rem auto;
    border: 1px solid var(--clr-neutral-200);
    font-size: var(--fs-small);
    padding: 0.3rem;
    border-radius: 3rem;
    min-width: 75%;
  }

  .add-btn:hover {
    background-color: var(--clr-transparent-25);
  }

  .add-btn svg {
    height: 1rem;
    fill: var(--clr-neutral-200);
  }
</style>
