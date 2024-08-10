<script>
  function handleTransition() {
    window.dispatchEvent(new CustomEvent('alvanworld-loading-done'));
  }
</script>

<div class="loading-screen">
  <div class="welcome-text">Welcome to AlvanWorld</div>
  <button on:click={handleTransition} class="transition-button" aria-label="Let's Go">Let's Go</button>
</div>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ff5858, #c1deae, #8e44ad);
    background-size: 300% 300%;
    color: #fff;
    font-family: 'Cinzel', serif;
    font-size: 2em;
    overflow: hidden;
    animation: colorShift 30s ease-in-out infinite;
  }

  .welcome-text, .transition-button {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(-10px); }
    50% { transform: translateY(20px); }
  }

  @keyframes colorShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .transition-button {
    padding: 12px 24px;
    font-size: 1em;
    background-color: rgba(255, 255, 255, 0.5);
    color: #444;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    margin-top: 20px; /* Add margin to separate text and button */
  }

  .transition-button:hover {
    background-color: #f0e3ff;
    color: #333;
  }
</style>
