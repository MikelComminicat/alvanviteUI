<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let selectedModel = 'meta-llama/Meta-Llama-3-70B-Instruct';

  const models = [
    { id: 'meta-llama/Meta-Llama-3-70B-Instruct', name: 'Meta-Llama-3-70B', type: 'text' },
    { id: 'gpt2', name: 'GPT-2', type: 'text' },
    { id: 'bert-base-uncased', name: 'BERT', type: 'text' },
    { id: 'roberta-base', name: 'RoBERTa', type: 'text' },
    { id: 'runwayml/stable-diffusion-v1-5', name: 'Stable Diffusion 1.5', type: 'image' },
  ];

  function handleModelChange() {
    const selectedModelData = models.find(model => model.id === selectedModel);
    dispatch('modelChange', selectedModelData);
  }
</script>

<div class="sidebar">
  <h2>Model Selection</h2>
  <select bind:value={selectedModel} on:change={handleModelChange}>
    {#each models as model}
      <option value={model.id}>{model.name} ({model.type})</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .sidebar {
    width: 200px;
    padding: 1rem;
    background-color: var(--chat-bg);
    color: var(--text-color);

    h2 {
      margin-bottom: 1rem;
    }

    select {
      width: 100%;
      padding: 0.5rem;
      background-color: var(--background-color);
      color: var(--text-color);
      border: 1px solid var(--secondary-color);
    }
  }
</style>