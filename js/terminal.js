// terminal.js

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('input');
    inputElement.focus(); // Focus on the input element immediately on page load

    inputElement.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            const command = this.value.trim();
            processCommand(command); // Process the command through puzzles.js logic
            this.value = ''; // Clear the input field after processing the command

            // Scroll to the bottom of the output to ensure the latest content is visible
            const outputElement = document.getElementById('output');
            outputElement.scrollTop = outputElement.scrollHeight;
        }
    });
});

// Function to update terminal output
function updateTerminal(message) {
    const outputElement = document.getElementById('output');
    if (outputElement) {
        // Append new message
        const messageElement = document.createElement('div');
        messageElement.textContent = '> ' + message;
        outputElement.appendChild(messageElement);

        // Ensure the new message is visible
        outputElement.scrollTop = outputElement.scrollHeight;
    }
}
