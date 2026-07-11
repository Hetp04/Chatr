import React, { useState } from "react";

// Send arrow icon
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: 14, height: 14 }}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
)

const SenderComp = ({ handleSendClick }) => {
    const [textFieldValue, setTextFieldValue] = useState('')

    const handleSend = () => {
        if (!textFieldValue.trim()) return;
        handleSendClick(textFieldValue)
        setTextFieldValue('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="send-message-container">
            <div className="send-input-wrapper">
                <input
                    className="send-input-field"
                    type="text"
                    placeholder="Message..."
                    value={textFieldValue}
                    onChange={(e) => setTextFieldValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="send-btn" onClick={handleSend} title="Send">
                    <SendIcon />
                </button>
            </div>
        </div>
    )
}

export default SenderComp