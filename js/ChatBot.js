class Chatbot {
    constructor() {
        this.intents = []; // To store intents from intents.json
        this.loadIntents(); // Load intents on initialization
    }

    // Load intents from intents.json
    loadIntents() {
        fetch('intents.json')
            .then(response => response.json())
            .then(data => {
                this.intents = data.intents;
            })
            .catch(error => console.error('Error loading intents:', error));
    }

    // Function to get a response based on user input
    getResponse(input) {
        let response = "Sorry, I didn't understand that."; // Default response
        for (let i = 0; i < this.intents.length; i++) {
            const patterns = this.intents[i].patterns;
            for (let j = 0; j < patterns.length; j++) {
                const pattern = new RegExp(patterns[j], 'i'); // Case insensitive matching
                if (pattern.test(input)) {
                    const responses = this.intents[i].responses;
                    response = responses[Math.floor(Math.random() * responses.length)]; // Randomly select a response
                    return response; // Return immediately upon finding a match
                }
            }
        }
        return response; // Return default response if no matches found
    }
    
}

// Create a new Chatbot instance
const chatbot = new Chatbot();

// Modify the Chatbox class to integrate the chatbot logic
class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.message = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({ key }) => {
            if (key === 'Enter') {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatBox) {
        this.state = !this.state;

        if (this.state) {
            chatBox.classList.add('chatbox--active');
        } else {
            chatBox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatBox) {
        var textField = chatBox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.message.push(msg1);

        // Get the response from the chatbot
        const botResponse = chatbot.getResponse(text1);
        let msg2 = { name: "Anmol", message: botResponse };
        this.message.push(msg2);

        // Update the chat display
        this.updateChatText(chatBox);
        textField.value = ''; // Clear input field
    }

    updateChatText(chatbox) {
        var html = '';
        this.message.slice().reverse().forEach(function (item) {
            if (item.name === "Anmol") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

// Initialize the Chatbox
const chatbox = new Chatbox();
chatbox.display();
