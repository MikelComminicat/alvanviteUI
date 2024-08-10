<script>
  import ChatWindow from './components/ChatWindow.svelte';
  import LoadingScreen from './components/LoadingScreen.svelte';
  import './styles/global.scss';

  let showChatWindow = false;

  // Listen for the 'loading-done' event to show the chat window
  window.addEventListener('alvanworld-loading-done', () => {
    showChatWindow = true;
  });
</script>

{#if !showChatWindow}
  <LoadingScreen />
{:else}
  <main>
    <ChatWindow />
  </main>
{/if}
