Assistant
<!-- Place this above </body> in your main HTML file -->

<div id="chatbot-container">
    <div id="chatbot-header">
        Virtual Assistant - Dr. Mehran Ullah
        <button onclick="closeChatbot()">×</button>
    </div>
    <div id="chatbot-messages">
        <div class="bot-message">Hello! I'm Dr. Mehran Ullah's Virtual Assistant. How can I assist you today?</div>
        <div id="chat-options" class="options">
            <button onclick="sendPredefinedMessage('research')">Research</button>
            <button onclick="sendPredefinedMessage('teaching')">Teaching</button>
            <button onclick="sendPredefinedMessage('phd')">PhD Supervision</button>
            <button onclick="sendPredefinedMessage('contact')">Contact</button>
            <button onclick="sendPredefinedMessage('profiles')">Profiles & Links</button>
        </div>
    </div>
</div>

<button id="chatbot-toggle-btn" onclick="openChatbot()">Chat with my Virtual Assistant</button>

<style>
    #chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 320px;
        background: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        display: none;
        flex-direction: column;
        font-family: Arial, sans-serif;
        z-index: 9999;
    }
    #chatbot-header {
        background: #004080;
        color: white;
        padding: 8px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
    }
    #chatbot-header button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
    }
    #chatbot-messages {
        padding: 10px;
        height: 280px;
        overflow-y: auto;
        background: #f9f9f9;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .bot-message, .user-message {
        padding: 6px 10px;
        border-radius: 12px;
        max-width: 90%;
    }
    .bot-message {
        background: #e1f5fe;
        align-self: flex-start;
    }
    .user-message {
        background: #004080;
        color: white;
        align-self: flex-end;
    }
    .options {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 5px;
    }
    .options button {
        background: #004080;
        color: white;
        border: none;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 12px;
        white-space: nowrap;
    }
    .options button:hover {
        background: #002D62;
    }
    #chatbot-toggle-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #004080;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        z-index: 9999;
    }
</style>

<script>
    let lastTopic = '';  // Track the last selected topic

    function openChatbot() {
        document.getElementById('chatbot-container').style.display = 'flex';
        resetChat();
    }

    function closeChatbot() {
        document.getElementById('chatbot-container').style.display = 'none';
        resetChat();  // Reset chat when closed
    }

    function resetChat() {
        document.getElementById('chatbot-messages').innerHTML = `
            <div class="bot-message">Hello! I'm Dr. Mehran Ullah's Virtual Assistant. How can I assist you today?</div>
            ${getOptionsHTML()}
        `;
        lastTopic = '';  // Reset topic on close
    }

    function sendPredefinedMessage(topic) {
        lastTopic = topic;  // Store selected topic
        addMessage('user', formatTopicForDisplay(topic));
        const response = getBotResponse(topic);
        setTimeout(() => {
            addMessage('bot', response);
            appendOptions();
        }, 600);
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
        messageDiv.innerText = text;
        document.getElementById('chatbot-messages').appendChild(messageDiv);
        scrollChatToBottom();
    }

    function appendOptions() {
        const messages = document.getElementById('chatbot-messages');
        const options = document.createElement('div');
        options.innerHTML = getOptionsHTML();
        messages.appendChild(options);
        scrollChatToBottom();
    }

    function getOptionsHTML() {
        return `
            <div class="options">
                <button onclick="sendPredefinedMessage('research')">Research</button>
                <button onclick="sendPredefinedMessage('teaching')">Teaching</button>
                <button onclick="sendPredefinedMessage('phd')">PhD Supervision</button>
                <button onclick="sendPredefinedMessage('contact')">Contact</button>
                <button onclick="sendPredefinedMessage('profiles')">Profiles & Links</button>
            </div>
        `;
    }

    function formatTopicForDisplay(topic) {
        const topics = {
            'research': 'Tell me about Dr. Mehran Ullah\'s research',
            'teaching': 'What does Dr. Mehran Ullah teach?',
            'phd': 'Does Dr. Mehran Ullah supervise PhD students?',
            'contact': 'How can I contact Dr. Mehran Ullah?',
            'profiles': 'Where can I find his profiles?'
        };
        return topics[topic] || topic;
    }

    function getBotResponse(topic) {
        const responses = {
            'research': "Dr. Mehran Ullah specializes in sustainable supply chains, optimization, AI applications in logistics, and circular economy models.",
            'teaching': "Dr. Mehran Ullah teaches courses in logistics, supply chain management, operations research, project management, and data science.",
            'phd': "Yes, Dr. Ullah supervises PhD students in supply chain management, sustainability, AI applications, and decision support systems.",
            'contact': "You can reach Dr. Mehran Ullah at mehran.ullah@uws.ac.uk.",
            'profiles': "You can find Dr. Mehran Ullah's professional profiles (LinkedIn, ORCID, Google Scholar, Scopus, and UWS Research Portal) directly at the top of this page in the **Profile Links section**."
        };
        return responses[topic] || "I'm here to assist you.";
    }

    function scrollChatToBottom() {
        const messages = document.getElementById('chatbot-messages');
        messages.scrollTop = messages.scrollHeight;
    }
</script>
