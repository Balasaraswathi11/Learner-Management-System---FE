import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import { server } from '../../main';
import { useNavigate, useParams } from 'react-router-dom';

const AssignmentCreate = ({ courseId, user }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${server}/api/admin/course/${courseId}/assignment`,
                {
                    title,
                    description,
                    dueDate
                },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    },
                }
            );

            // Show a success toast notification
            toast.success(response.data.message);

            // Clear the form fields after successful submission
            setTitle('');
            setDescription('');
            setDueDate('');

            // Navigate to the assignments page
            navigate(`/course/${courseId}/assignments`);
        } catch (error) {
            console.error('Error creating assignment:', error.response ? error.response.data : error.message);
            // Show an error toast notification
            toast.error('Error creating assignment');
        }
    };

    if (user && user.role === "admin") {
        return (
            <div className="container mt-4">
                <h2>Create Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    } else {
        return (
            <button onClick={() => navigate(`/course/${courseId}/assignments`)}>Assignments</button>
        );
    }
};

export default AssignmentCreate;
