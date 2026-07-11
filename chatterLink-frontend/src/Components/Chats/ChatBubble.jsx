import React from 'react';

const ChatBubble = ({ isSender, message }) => {
    const containerStyle = {
        width: '100%',
        display: 'flex',
        padding: '3px 0',
        justifyContent: isSender ? 'flex-end' : 'flex-start',
    }

    const bubbleStyle = {
        maxWidth: '65%',
        padding: '8px 14px',
        borderRadius: isSender ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        backgroundColor: isSender ? '#F4F4F4' : '#FFFFFF',
        border: isSender ? 'none' : '1px solid #E9E9E7',
        wordBreak: 'break-word',
    }

    const textStyle = {
        fontSize: '0.875rem',
        color: '#191919',
        margin: 0,
        lineHeight: '1.5',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
    }

    return (
        <div style={containerStyle}>
            <div style={bubbleStyle}>
                <p style={textStyle}>{message}</p>
            </div>
        </div>
    )
}

export default ChatBubble