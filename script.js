const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

async function getBotReply(message) {
  try {
const response = await fetch("https://contect-AV-Ai.onrender.com/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ prompt: message }) // ✅ use "prompt" not "message"
});
    const data = await response.json();
    return data.reply || "No reply received.";
  } catch (error) {
    console.error("API error:", error);
    return "Sorry, I couldn't reach the server.";
  }
}

chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  // User message
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.textContent = userMsg;
  chatBox.appendChild(userDiv);

  userInput.value = "";

  // Bot typing placeholder
  const botDiv = document.createElement("div");
  botDiv.className = "bot-msg";
  botDiv.textContent = "Thinking...";
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  const reply = await getBotReply(userMsg);
  botDiv.textContent = reply;
  chatBox.scrollTop = chatBox.scrollHeight;
});
