const API_KEY = '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';

export async function sendMessage(model, message) {
  console.log('Sending request to model:', model);
  console.log('Message:', message);

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ inputs: message }),
    }
  );
  const result = await response.json();
  
  console.log('API Response:', result);

  if (Array.isArray(result) && result[0].generated_text) {
    return result[0].generated_text;
  } else if (typeof result === 'object' && result.generated_text) {
    return result.generated_text;
  } else if (typeof result === 'string') {
    return result;
  } else {
    console.error('Unexpected response format:', result);
    throw new Error('Unexpected response format from API');
  }
}

export async function generateImage(prompt) {
  console.log('Generating image for prompt:', prompt);

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mann-e/Mann-E_Dreams",
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  
  if (!response.ok) {
    console.error('Error generating image:', response.statusText);
    throw new Error('Failed to generate image');
  }

  const blob = await response.blob();
  console.log('Image generated successfully');
  return URL.createObjectURL(blob);
}