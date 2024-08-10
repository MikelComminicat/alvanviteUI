<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  let input = '';
  let file = null;
  let isTyping = false;
  const dispatch = createEventDispatcher();

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function handleInput() {
    isTyping = input.trim().length > 0;
  }

  function sendMessage() {
    if (input.trim() || file) {
      dispatch('sendMessage', { text: input.trim(), file });
      input = '';
      file = null;
      isTyping = false;
    }
  }

  function handleFileChange(event) {
    file = event.target.files[0];
  }
</script>

<div class="message-input" transition:fade={{ duration: 300 }}>
  <label for="file-upload" class="file-upload-label">
    📎
    <input
      id="file-upload"
      type="file"
      on:change={handleFileChange}
      style="display: none;"
    />
  </label>
  <textarea
    bind:value={input}
    on:keydown={handleKeydown}
    on:input={handleInput}
    placeholder="Type your message here..."
    rows="1"
  ></textarea>
  {#if isTyping}
    <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  {/if}
</div>

<style lang="scss">
  .message-input {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: var(--chat-bg);
    border-top: 1px solid var(--secondary-color);
    position: relative;

    textarea {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid var(--secondary-color);
      border-radius: 20px;
      resize: none;
      font-family: inherit;
      font-size: 1rem;
      background-color: var(--background-color);
      color: var(--text-color);

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }

    .file-upload-label {
      cursor: pointer;
      margin-right: 0.5rem;
      font-size: 1.5rem;
    }

    .typing-indicator {
      position: absolute;
      right: 1.5rem;
      bottom: 1.5rem;
      display: flex;
      align-items: center;

      span {
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        margin: 0 2px;
        animation: blink 1s infinite;

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }

  @keyframes blink {
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
  }
</style>