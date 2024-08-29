import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { server } from '../../main';

const QuizTake = () => {
  const { id } = useParams(); // Get quiz ID from URL
  const [quiz, setQuiz] = useState(null);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`${server}/api/course/quiz/${id}`);
        setQuiz(data.quiz); // Set the quiz details in state
      } catch (error) {
        console.error('Error fetching quiz details', error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleChange = (questionId, option) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${server}/api/course/quiz/${id}/submit`, {
        responses,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      console.log(data.message); // Display success message or handle it as needed
      navigate(`/quiz/${id}/result`); // Navigate to results or another page
    } catch (error) {
      console.error('Error submitting quiz', error);
    }
  };

  if (!quiz) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{quiz.title}</h1>
      {quiz.questions.map((question) => (
        <div key={question._id} className="mb-4">
          <h3>{question.question}</h3>
          <div className="form-check">
            {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
              <div key={optionKey} className="form-check mb-2">
                <input
                  type="radio"
                  id={`${question._id}-${optionKey}`}
                  name={question._id}
                  value={question[optionKey]}
                  onChange={() => handleChange(question._id, question[optionKey])}
                  checked={responses[question._id] === question[optionKey]}
                  className="form-check-input"
                />
                <label
                  htmlFor={`${question._id}-${optionKey}`}
                  className="form-check-label"
                >
                  {question[optionKey]}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizTake;
