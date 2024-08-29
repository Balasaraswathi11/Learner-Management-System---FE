
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { server } from '../../main'; // Adjust the import path as necessary

const Getmsg = () => {
    const { adminId } = useParams(); // Get the adminId from the URL parameters
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `${server}/api/chats/participants`,
                    { headers: { token: localStorage.getItem('token') } }
                );
                setUsers(response.data);
                setError('');
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [adminId]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Users Who Have Messaged</h2>
            {loading && <div className="alert alert-info">Loading users...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {users.length > 0 ? (
                <ul className="list-group">
                    {users.map(user => (
                        <li key={user._id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <strong>{user.name}</strong><br />
                                    <small>{user.email}</small>
                                </div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => window.location.href = `/admin/${adminId}/users/${user._id}/messages`}
                                >
                                    View Messages
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users have messaged yet.</p>
            )}
        </div>
    );
};

export default Getmsg

