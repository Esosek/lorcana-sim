<script>
  let isFinished = false;

  function getCode() {
    isFinished = true;
    console.log('Order copied!');
  }
</script>

<main class="center">
  <h1>Set cards</h1>
  <button class="primary-btn" on:click={getCode}>Done</button>

  {#if isFinished}
    <p>Order copied to clipboard!</p>
  {/if}
</main>

<style>
  main {
    flex-direction: column;
  }

  h1 {
    margin-block: 1.5rem;
  }

  .primary-btn {
    margin-block: 0;
  }
</style>
