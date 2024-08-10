<script>
  import { fade, fly } from 'svelte/transition';
  import MessageItem from './MessageItem.svelte';

  export let messages = [];
  export let isTyping = false;

  function downloadImage(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<div class="message-list">
  {#each messages as message (message.id)}
    <div 
      class="message-wrapper {message.sender}"
      in:fly="{{ y: 50, duration: 300 }}"
      out:fade="{{ duration: 200 }}"
    >
      {#if message.type === 'image'}
        <div class="image-container">
          <img src={message.content} alt="Generated image" />
          <button class="download-button" on:click={() => downloadImage(message.content)}>
            ⬇️
          </button>
        </div>
      {:else}
        <MessageItem {message} />
      {/if}
    </div>
  {/each}
  {#if isTyping}
    <div class="message-wrapper bot" in:fly="{{ y: 50, duration: 300 }}" out:fade="{{ duration: 200 }}">
      <div class="message typing">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .message-list {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .message-wrapper {
    display: flex;
    margin-bottom: 1rem;

    &.user {
      justify-content: flex-end;
    }

    &.bot {
      justify-content: flex-start;
    }
  }

  :global(.message-wrapper .message) {
    max-width: 70%;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    word-wrap: break-word;
  }

  :global(.message-wrapper.user .message) {
    background-color: var(--user-message-bg);
    color: var(--background-color);
    border-bottom-right-radius: 0;
  }

  :global(.message-wrapper.bot .message) {
    background-color: var(--bot-message-bg);
    color: var(--text-color);
    border-bottom-left-radius: 0;
  }

  .typing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    padding: 0 1rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: var(--text-color);
    border-radius: 50%;
    margin: 0 3px;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }

  .image-container {
    position: relative;
    display: inline-block;
    max-width: 70%;
  }

  .image-container img {
    max-width: 100%;
    border-radius: 20px;
  }

  .download-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
</style>