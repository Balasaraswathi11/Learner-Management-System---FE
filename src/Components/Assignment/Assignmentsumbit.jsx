import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { server } from '../../main'; // Adjust the path as needed
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

// Validation schema using yup
const validationSchema = yup.object().shape({
    link: yup.string().url('Invalid URL').required('GitHub link is required'),
    comment: yup.string().required('Comments are required')
});

const Assignmentsubmit = ({ user }) => {
    const { courseId, assignmentId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(
                `${server}/api/course/${courseId}/assignment/${assignmentId}/submit`,
                values,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );

            // Show a success toast notification
            toast.success(response.data.message);

            // Redirect to assignments list or another page after submission
            navigate('/assignments');
        } catch (error) {
            console.error('Error submitting assignment:', error.response ? error.response.data : error.message);
            // Show an error toast notification
            toast.error('Error submitting assignment');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        user && user.role === "student" ? (
            <div className="container mt-4">
                <h2>Submit Assignment</h2>
                <Formik
                    initialValues={{ link: '', comment: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="link" className="form-label">GitHub Link</label>
                                <Field
                                    type="url"
                                    className="form-control"
                                    id="link"
                                    name="link"
                                />
                                <ErrorMessage name="link" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="comment" className="form-label">Comments</label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="comment"
                                    name="comment"
                                    rows="4"
                                />
                                <ErrorMessage name="comment" component="div" className="text-danger" />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        ) : (
            <div className="container mt-4">
                <p>You are not authorized to submit assignments.</p>
            </div>
        )
    );
};

export default Assignmentsubmit;
