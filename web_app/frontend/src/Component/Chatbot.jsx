
import React, { useState } from "react";
import axios from "axios";
import styles from "../Styles/Chatbot.module.css"; // Import CSS Module

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        setLoading(true);
        if (input.trim() === "") return;

        const newMessage = { text: input, sender: "user" };
        setMessages([...messages, newMessage]);
        setInput("");
        try {
            const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });
            // console.log(response.data.response);

            
            
            const botMessage = { text: response.data.response, sender: "bot" };
            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        }

        
        setLoading(false);
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${msg.sender === "user" ? styles.user : styles.bot}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className={styles.input}
                />
                <button onClick={sendMessage} className={styles.button} disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
