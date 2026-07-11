import React from 'react'
import './Chat.css'

function ContactComp({ username, onContactClick, index, userId, selectedIndex }) {
    const isActive = selectedIndex === index;

    const getInitials = (name) => {
        if (!name) return '?';
        return name.substring(0, 2).toUpperCase();
    }

    return (
        <div
            className={`contact-tab ${isActive ? 'active' : ''}`}
            onClick={() => onContactClick(username, index, userId)}
        >
            <div className='contact-tab-avatar'>
                {getInitials(username)}
            </div>
            <p>{username}</p>
        </div>
    )
}

export default ContactComp
