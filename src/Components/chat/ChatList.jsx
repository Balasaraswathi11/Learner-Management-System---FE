import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../main';

const ChatList = ({ user }) => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { adminId } = useParams(); // Captures the admin ID from the URL params
    const navigate = useNavigate(); // Use navigate to programmatically navigate

    // Fetch all participants on component mount
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get(`${server}/api/chats/participants`, {
                    headers: { token: localStorage.getItem('token') },
                });

                if (Array.isArray(response.data.message)) {
                    setParticipants(response.data.message);
                } else {
                    console.error('Unexpected response structure:', response.data);
                }

                setError('');
            } catch (error) {
                setError('Error fetching participants');
                console.error('Error fetching participants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, []);

    const handleClick = (participantId) => {
        // Navigate to the chat page with the adminId and participantId
        navigate(`/chats/${adminId}/${participantId}`);
    };

    const admin = "66b9aa68623c7671e3b6b588"; // Hardcoded adminId for non-admin users

    return (
        <div>
            {user.role === "admin" ? (
                <>
                    <h2 className="mb-4">Chat Participants</h2>
                    {loading && <div className="alert alert-info">Loading...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {!loading && !error && (
                        <ul className="list-group mb-4">
                            {participants.map((participantId) => (
                                <li
                                    key={participantId}
                                    className="list-group-item d-flex justify-content-between"
                                >
                                    <span>User ID: {participantId}</span>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleClick(participantId)}
                                    >
                                        View Messages
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <>
                <div style={{textAlign:"center",height:"70vh",marginTop:"50px"}}><h1>Message to the admin</h1>
                    <button
                        className="btn btn-primary m-5"
                        onClick={() => handleClick(admin)} // Use adminId for non-admin users
                    >
                        Send Message
                    </button></div>
                
                </>
            )}
        </div>
    );
};

export default ChatList;
