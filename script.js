const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// 1. Actual API call logic
async function getBotReply(message) {
  try {
    const response = await fetch("https://your-api-url.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        prompt: message
      })
    });

    const data = await response.json();

    // Update this line based on API response structure
    return data.reply || "No reply received.";
  } catch (error) {
    console.error("API error:", error);
    return "Sorry, I couldn't reach the server.";
  }
}

// 2. Handle form submission
chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.textContent = userMsg;
  chatBox.appendChild(userDiv);
  userInput.value = "";

  // Add a temporary "typing..." message
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "bot-msg";
  loadingDiv.textContent = "Thinking...";
  chatBox.appendChild(loadingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Get reply from API
  const reply = await getBotReply(userMsg);

  // Replace "Thinking..." with actual reply
  loadingDiv.textContent = reply;
  chatBox.scrollTop = chatBox.scrollHeight;
});
