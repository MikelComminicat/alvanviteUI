<script>
  export let toggleSidebar;
</script>

<header>
  <button on:click={toggleSidebar}>☰</button>
  <h1>Alvan-AI</h1>
</header>

<style lang="scss">
  header {
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  button {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    left: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
</style>