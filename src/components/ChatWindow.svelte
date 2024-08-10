<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import MessageList from './MessageList.svelte';
  import MessageInput from './MessageInput.svelte';
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  import { sendMessage, generateImage } from '../services/huggingface.js';

  let messages = [
    { id: 1, content: 'Welcome to Alvan-AI!', sender: 'bot', type: 'text' },
    { id: 2, content: 'How can I assist you today?', sender: 'bot', type: 'text' }
  ];

  let selectedModel = {
    id: 'meta-llama/Meta-Llama-3-70B-Instruct',
    name: 'Meta-Llama-3-70B',
    type: 'text'
  };
  let isSidebarOpen = true;
  let isTyping = false;

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  async function handleNewMessage(event) {
    const userMessage = {
      id: messages.length + 1,
      content: event.detail.text,
      sender: 'user',
      type: 'text'
    };
    messages = [...messages, userMessage];

    isTyping = true;
    try {
      let response;
      if (selectedModel.type === 'text') {
        response = await sendMessage(selectedModel.id, event.detail.text);
        console.log('Processed Response:', response);
      } else if (selectedModel.type === 'image') {
        response = await generateImage(event.detail.text);
      }
      const botMessage = {
        id: messages.length + 1,
        content: response,
        sender: 'bot',
        type: selectedModel.type
      };
      messages = [...messages, botMessage];
    } catch (error) {
      console.error('Error processing message:', error);
      messages = [...messages, {
        id: messages.length + 1,
        content: "Sorry, I encountered an error processing your request. Please try again.",
        sender: 'bot',
        type: 'text'
      }];
    } finally {
      isTyping = false;
    }
  }

  function handleModelChange(event) {
    selectedModel = event.detail;
    messages = [...messages, { 
      id: messages.length + 1, 
      content: `Model changed to ${selectedModel.name}`,
      sender: 'bot',
      type: 'text'
    }];
  }

  onMount(() => {
    // Initialization logic if needed
  });
</script>

<div class="chat-window">
  <Header {toggleSidebar} />
  <div class="main-content">
    {#if isSidebarOpen}
      <Sidebar on:modelChange={handleModelChange} />
    {/if}
    <div class="chat-area" transition:fade={{ duration: 300 }}>
      <MessageList {messages} {isTyping} />
      <MessageInput on:sendMessage={handleNewMessage} />
    </div>
  </div>
</div>

<style lang="scss">
  .chat-window {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .chat-area { 
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--chat-bg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 1rem;
    border-radius: 10px;
    overflow: hidden;
  }
</style>
