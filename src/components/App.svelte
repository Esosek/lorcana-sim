<script>
  import PackPicker from './PackPicker.svelte';
</script>

<PackPicker onSubmit={(_) => console.log('Generating packs...')} />
