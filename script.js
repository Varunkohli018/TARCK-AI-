const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

async function getBotReply(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("API error:", error);
    return "Sorry, I couldn't reach the server.";
  }
}

chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.textContent = userMsg;
  chatBox.appendChild(userDiv);
  userInput.value = "";

  const loadingDiv = document.createElement("div");
  loadingDiv.className = "bot-msg";
  loadingDiv.textContent = "Thinking...";
  chatBox.appendChild(loadingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  const reply = await getBotReply(userMsg);

  loadingDiv.textContent = reply;
  chatBox.scrollTop = chatBox.scrollHeight;
});
