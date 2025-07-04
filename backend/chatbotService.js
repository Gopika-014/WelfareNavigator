require("dotenv").config();
const axios = require("axios");

const sendMessageToChatbot = async (message) => {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: message },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.generated_text || "Sorry, I couldn't understand.";
    } catch (error) {
        console.error("Chatbot Error:", error);
        return "An error occurred while fetching the response.";
    }
};

module.exports = { sendMessageToChatbot };
