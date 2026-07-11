import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css'
import Contacts from './Contacts';
import Chatbox from './Chatbox';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import baseUrl from '../config/baseUrl';
import axios from 'axios';

// Logout icon (arrow-right-on-rectangle / sign-out)
const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
)

const Chats = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState({})
    const [stompClient, setStompClient] = useState(null)
    const [chatData, setChatData] = useState([])

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    useEffect(() => {
        const url = baseUrl + '/ws-chatter-link';
        const socket = new SockJS(url)
        const stompClient = Stomp.over(socket)

        stompClient.connect(
            { Authorization: `Bearer ${currentUser.token}` },
            (frame) => { setStompClient(stompClient) },
            (error) => { setStompClient(null) }
        )
        return () => {
            stompClient.disconnect(() => { setStompClient(null) })
        }
    }, [])

    useEffect(() => {
        const uri = `${baseUrl}/api/v1/chat?senderId=${currentUser.userId}&receiverId=${selectedUser.userId}`;
        axios.get(uri, {
            headers: { "Authorization": `Bearer ${currentUser.token}` }
        }).then(res => {
            setChatData(res.data)
        }).catch(() => {})
    }, [selectedUser])

    const onSelectedUser = (username, userId) => {
        if (JSON.stringify(selectedUser) == '{}') {
            subscribeToTopic(userId)
        } else {
            stompClient.unsubscribe();
            subscribeToTopic(userId)
        }
        setSelectedUser({ username, userId })
    }

    const subscribeToTopic = (userId) => {
        const topic = `/topic/message/${userId}/${currentUser.userId}`
        stompClient.subscribe(topic, (message) => {
            setChatData(prevData => ({
                ...prevData,
                chatMessages: [...(prevData?.chatMessages || []), JSON.parse(message.body)]
            }))
        })
    }

    const sendMessage = (messagePayload) => {
        if (stompClient != null) {
            stompClient.send("/app/chat.send", {}, JSON.stringify(messagePayload))
            setChatData(prevData => ({
                ...prevData,
                chatMessages: [...(prevData?.chatMessages || []), messagePayload]
            }))
        }
    }

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!currentUser?.username) return '?';
        return currentUser.username.substring(0, 2).toUpperCase();
    }

    return (
        <div className='chat-container'>
            {/* ─── Sidebar ─── */}
            <div className='sidebar'>
                {/* Workspace Header Removed */}

                {/* Contacts Section */}
                <span className='sidebar-section-label'>Messages</span>

                <div className='sidebar-contacts-list'>
                    <Contacts onUserClick={onSelectedUser} />
                </div>

                {/* Footer with user info + logout */}
                <div className='sidebar-footer'>
                    <div className='sidebar-user-info'>
                        <div className='sidebar-user-avatar'>{getUserInitials()}</div>
                        <span className='sidebar-username'>{currentUser?.username || 'User'}</span>
                    </div>
                    <button
                        className='sidebar-icon-btn'
                        onClick={handleLogout}
                        title="Sign out"
                    >
                        <LogoutIcon />
                    </button>
                </div>
            </div>

            {/* ─── Chat Area ─── */}
            <div className='chat-window'>
                {/* Top bar shows selected user info */}
                {JSON.stringify(selectedUser) !== '{}' && (
                    <div className='chat-header'>
                        <div className='chat-status-dot'></div>
                        <div>
                            <div className='chat-header-title'>{selectedUser.username}</div>
                        </div>
                    </div>
                )}
                <Chatbox
                    chatData={chatData}
                    sendMessageToUser={sendMessage}
                    selectedUser={selectedUser}
                />
            </div>
        </div>
    )
}

export default Chats