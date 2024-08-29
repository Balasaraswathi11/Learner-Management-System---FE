import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main'; // Adjust the import path as necessary
import { UserData } from '../context/UserContext'; // Assuming you have a UserData hook or context

const ChatPage = () => {
    const { userId, adminId } = useParams();
    const { user } = UserData(); // Fetch user data (including role)
    const isAdmin = user.role === 'admin'; // Check if the user is an admin

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [content, setContent] = useState('');
    const [replyToMessageId, setReplyToMessageId] = useState(null); // Track the message being replied to
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const admin="66b9aa68623c7671e3b6b588"; // Hardcoded admin ID (consider moving to environment variables)

    useEffect(() => {
        if (isAdmin) {
            // Fetch the list of users who have messaged the admin
            const fetchUsers = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `${server}/api/chats/messages/${userId}/${adminId}`,
                        { headers: { token: localStorage.getItem('token') } }
                    );
                    console.log(response.data)
                    setMessages(response.data);
                    console.log(users)
                    setError('');
                } catch (error) {
                    setError('Error fetching users');
                    console.error('Error fetching users:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        } else {
            // Fetch messages between the current user and recipient
            const fetchMessages = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `${server}/api/chats/messages/${userId}/${admin}`,
                        { headers: { token: localStorage.getItem('token') } }
                    );
                    setMessages(response.data);
                    setError('');
                } catch (error) {
                    setError('Error fetching messages');
                    console.error('Error fetching messages:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMessages();
        }
    }, [userId, adminId, isAdmin]);

   

    const handleSend = async () => {


        console.log("userId",userId)
        console.log("adminId",adminId)
        try {
            const endpoint = isAdmin
                ? `${server}/api/chats/reply-message`
                : `${server}/api/chats/send-message`;

            const payload = isAdmin
                ? { replyTo: adminId, from: userId, content }
                : { replyTo: null, from: userId, to: admin, content };

            await axios.post(endpoint, payload, {
                headers: { token: localStorage.getItem('token') }
            });

            setContent('');
            setReplyToMessageId(null); // Reset replyToMessageId after sending

            // Refresh the messages list or users list based on the role
            if (isAdmin) {
                
                    const response = await axios.get(
                        `${server}/api/chats/messages/${userId}/${adminId}`,
                        { headers: { token: localStorage.getItem('token') } }
                    );
                    setMessages(response.data);
                
            } else {
                const response = await axios.get(
                    `${server}/api/chats/messages/${userId}/${admin}`,
                    { headers: { token: localStorage.getItem('token') } }
                );
                setMessages(response.data);
            }
        } catch (error) {
            setError('Error sending message');
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                {isAdmin ? 'Users Who Have Messaged Admin' : `Chat with Admin`}
            </h2>


            {isAdmin ?
                  (
                        <div>
                          
                            {messages.map((message) => (
                                <div key={message._id} className="card mb-3">
                                    <div className="card-body">
                                        <p className="card-text"><strong>From:</strong> {message.from.name} ({message.from.email})</p>
                                        <p className="card-text"><strong>To:</strong> {message.to.name} ({message.to.email})</p>
                                        <p className="card-text"><strong>Message:</strong> {message.content}</p>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    
             
            ) : (
                <div>
                    {messages.map((message) => (
                        <div key={message._id} className="card mb-3">
                            <div className="card-body">
                                <p className="card-text"><strong>From:</strong> {message.from.name}</p>
                                <p className="card-text"><strong>To:</strong> {message.to.name}</p>
                                <p className="card-text"><strong>Message:</strong> {message.content}</p>
                                <p className="card-text"><strong>Sent at:</strong> {new Date(message.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="form-group mt-4">
                <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type your message"
                    rows="4"
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleSend}
                >
                    {isAdmin ? 'Reply' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
