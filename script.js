document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
        messageDiv.innerHTML = `<strong>${sender === "user" ? "You" : "Bot"}:</strong> ${text}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") {
            alert("⚠️ Please enter a message!");
            return;
        }

        addMessage(userMessage, "user");

        fetch("https://chatbot-complete.onrender.com/chat", {  // ✅ Ensure this route exists
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => {
            console.log("API Response Status:", response.status); // Debugging
            return response.json();
        })
        .then(data => {
            console.log("Bot Response:", data); // Debugging
            if (data.response) {
                addMessage(data.response, "bot");
            } else {
                addMessage("⚠️ No response from the chatbot.", "bot");
            }
        })
        .catch(error => {
            console.error("❌ ERROR:", error);
            addMessage("⚠️ Chatbot is not responding.", "bot");
        });

        userInput.value = "";
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
