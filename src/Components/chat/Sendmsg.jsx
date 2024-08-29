// src/components/SendMessage.js
import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../../main';

const Sendmsg = ({user}) => {
    const [mentorId, setMentorId] = useState('');
    const [messageContent, setMessageContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${server}/api/chats/send-message`, {
                from: user._id,
                to: user._id,
                content: messageContent
            });
            alert('Message sent successfully');
            setMentorId('');
            setMessageContent('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        }
    };

    return (
        <div>
            <h1>Send a Message</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="mentorId">Mentor ID:</label>
                    <input
                        type="text"
                        id="mentorId"
                        value={mentorId}
                        onChange={(e) => setMentorId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="messageContent">Message:</label>
                    <textarea
                        id="messageContent"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Sendmsg;
