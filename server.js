const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
  const userMessage = req.body.prompt;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ reply: 'Server error. Please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GreenChat API server running on port ${PORT}`);
});
