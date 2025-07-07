const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔐 Put your secret OpenAI API key here (but DO NOT expose this key in frontend!)
const configuration = new Configuration({
  apiKey: "sk-proj-xxxx...your_secret_key_here...",
});
const openai = new OpenAIApi(configuration);

// ✅ Main route that handles prompt
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Something went wrong with the AI." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`GreenChat API server running on port ${port}`);
});
