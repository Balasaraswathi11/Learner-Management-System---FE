import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { server } from '../../main';

const QuizDetails = ({ user }) => {
  const { id } = useParams(); // courseId or quizId based on your route structure
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get(`${server}/api/course/quizzes/${id}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        });

        if (data.quizzes && Array.isArray(data.quizzes)) {
          setQuizzes(data.quizzes);
        } else {
          console.error('No quizzes found');
        }
      } catch (error) {
        console.error('Error fetching quizzes', error);
      }
    };

    fetchQuizzes();
  }, [id]);

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`${server}/api/admin/delete/quiz/${quizId}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        // Remove the deleted quiz from the state
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
      } catch (error) {
        console.error('Error deleting quiz', error);
      }
    }
  };

  const handleTakeQuiz = (quizId) => {
    navigate(`/quizzes/${quizId}`); // Navigate to the quiz details page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">{quiz.title}</h3>
           
              <button 
                className="btn btn-primary" 
                onClick={() => handleTakeQuiz(quiz._id)}
              >
                Start Quiz
              </button>
              
              {user && user.role === 'admin' && (
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDeleteQuiz(quiz._id)}
                >
                  Delete Quiz
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No quizzes available</p>
      )}
    </div>
  );
};

export default QuizDetails;
