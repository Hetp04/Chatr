import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import './Chat.css'
import ChatBubble from "./ChatBubble";

const ChatComp = ({ chatMessages }) => {
    const { currentUser } = useAuth()
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);
    //console.log("Chatmmmessage:", chatMessages)
    return (
        <div className="chat-data-container">
            {
                chatMessages?.length > 0 ? (
                    <div className="chat-messages-data">
                        {
                            chatMessages.map((message) => (
                                <ChatBubble
                                    message={message.content}
                                    isSender={message.senderId === currentUser.userId}
                                 />
                            ))
                        }
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    <div className="messages-not-found">
                        <p>No messages yet. Say hello! 👋</p>
                    </div>
                )
            }
        </div>
    )
}

export default ChatComp