<script>
  import ratingSet from '../../stores/ratingSet';
  import SetPicker from './SetPicker.svelte';
  import RatingScreen from './RatingScreen.svelte';
</script>

{#if $ratingSet.length !== 0}
  <RatingScreen />
{:else}
  <SetPicker />
{/if}
