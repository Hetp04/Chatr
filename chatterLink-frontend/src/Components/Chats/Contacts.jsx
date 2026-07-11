import React, { useEffect, useState } from 'react'
import './Chat.css'
import ContactComp from './ContactComp';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import baseUrl from '../config/baseUrl'

// Plus icon
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 14, height: 14 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
)

function Contacts({ onUserClick }) {
    const { currentUser } = useAuth()
    const [targetUserContact, setTargetUserContact] = useState('');
    const [contactList, setContactList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleContactTextFieldChange = (e) => {
        setTargetUserContact(e.target.value)
    }

    const handleAdd = () => {
        if (targetUserContact.trim() !== '') {
            const url = baseUrl + '/api/v1/contacts/add';
            axios.post(url,
                { userId: currentUser.userId, targetUserContact: targetUserContact },
                { headers: { "Authorization": `Bearer ${currentUser.token}` } }
            )
            .then(res => { setContactList(res.data.contactList) })
            .catch((err) => {
                const errMsg = err.response?.data || "Failed to add contact. Please make sure you are typing their exact registered EMAIL address.";
                alert(errMsg);
            })
            setTargetUserContact('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd()
    }

    useEffect(() => {
        const url = baseUrl + `/api/v1/contacts/get?userId=${currentUser.userId}`;
        axios.get(url, {
            headers: { "Authorization": `Bearer ${currentUser.token}` }
        })
        .then(res => { setContactList(res.data.contactList) })
        .catch(() => {})
    }, [])

    const handleContactClick = (username, index, userId) => {
        setSelectedIndex(index)
        onUserClick(username, userId)
    }

    return (
        <>
            {/* Add Contact Row */}
            <div className='sidebar-add-contact-row'>
                <PlusIcon />
                <input
                    className='sidebar-add-contact-input'
                    type="text"
                    placeholder='Add contact...'
                    value={targetUserContact}
                    onChange={handleContactTextFieldChange}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* Contact List */}
            {contactList?.length > 0 ? (
                contactList.map((contact, index) => (
                    <ContactComp
                        key={contact.userId || index}
                        index={index}
                        onContactClick={handleContactClick}
                        username={contact.username}
                        userId={contact.userId}
                        selectedIndex={selectedIndex}
                    />
                ))
            ) : (
                <div className='not-contacts-container'>
                    <p>No contacts yet.<br />Add someone above.</p>
                </div>
            )}
        </>
    )
}

export default Contacts
