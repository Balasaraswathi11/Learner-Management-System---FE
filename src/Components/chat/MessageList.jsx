import React, { useEffect, useState } from 'react';
import { getMessagesForChat } from './Getmsg';

const MessageList = ({ chatId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const { data } = await getMessagesForChat(chatId);
            setMessages(data);
        };

        fetchMessages();
    }, [chatId]);

    return (
        <div>
            <h3>Messages</h3>
            <ul>
                {messages.map(message => (
                    <li key={message._id}>
                        <strong>{message.sender_id.username}:</strong> {message.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
