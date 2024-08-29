import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { server } from '../../main';
import 'bootstrap/dist/css/bootstrap.min.css';

const Assignmentsdisplay = ({ user }) => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submissionLink, setSubmissionLink] = useState('');
    const [submissionComment, setSubmissionComment] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`${server}/api/course/${courseId}/assignments`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error.response ? error.response.data : error.message);
                setError('Error fetching assignments');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${server}/api/course/${courseId}/assignment/${selectedAssignment}/submit`,
                {
                    link: submissionLink,
                    comment: submissionComment
                },
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }
            );
            // Clear form and update UI
            setSubmissionLink('');
            setSubmissionComment('');
            setSelectedAssignment(null);
            // Refresh assignments
            const response = await axios.get(`${server}/api/course/${courseId}/assignments`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            setAssignments(response.data);
        } catch (error) {
            console.error('Error submitting assignment:', error.response ? error.response.data : error.message);
            setError('Error submitting assignment');
        }
    };

    const handleDelete = async (assignmentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
        if (!confirmDelete) return;
        try {
            await axios.delete(
                `${server}/api/admin/course/${courseId}/assignment/${assignmentId}/delete`,
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }
            );
            // Refresh assignments after deletion
            setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
        } catch (error) {
            console.error('Error deleting assignment:', error.response ? error.response.data : error.message);
            setError('Error deleting assignment');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 style={{ marginBottom: "50px", textAlign: "center" }}>Assignments for Course {courseId}</h2>

            {/* Form for submission */}
            {selectedAssignment && (
                <div className="mb-4">
                    <h3>Submit Assignment</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="submissionLink" className="form-label">Assignment Link</label>
                            <input
                                type="text"
                                className="form-control"
                                id="submissionLink"
                                value={submissionLink}
                                onChange={(e) => setSubmissionLink(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="submissionComment" className="form-label">Comment</label>
                            <textarea
                                className="form-control"
                                id="submissionComment"
                                rows="3"
                                value={submissionComment}
                                onChange={(e) => setSubmissionComment(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )}

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Link</th>
                            <th>Comment</th>
                            <th>Submitted</th>
                            <th>Action</th>
                            {user.role === "admin" && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length === 0 ? (
                            <tr>
                                <td colSpan={user.role === "admin" ? "8" : "7"}>No assignments found</td>
                            </tr>
                        ) : (
                            assignments.map((assignment) => (
                                <tr key={assignment._id}>
                                    <td>{assignment.title}</td>
                                    <td>{assignment.description}</td>
                                    <td>{new Date(assignment.dueDate).toLocaleString()}</td>
                                    <td><a href={assignment.link} target="_blank" rel="noopener noreferrer">View Link</a></td>
                                    <td>{assignment.comment}</td>
                                    <td>{assignment.submitted ? 'Yes' : 'No'}</td>
                                    <td>
                                        {!assignment.submitted && (
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setSelectedAssignment(assignment._id)}
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </td>
                                    {user.role === "admin" && (
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(assignment._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Assignmentsdisplay;
