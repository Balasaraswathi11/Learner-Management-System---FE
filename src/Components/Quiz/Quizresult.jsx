import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../main";
import 'bootstrap/dist/css/bootstrap.min.css';

const Quizresult = () => {
  const { quizId } = useParams(); // Get quiz ID from the URL
  const [result, setResult] = useState(null); // Initialize as null

  useEffect(() => {
    // Fetch the quiz result
    const fetchResult = async () => {
      try {
        const response = await axios.get(`${server}/api/course/quiz/${quizId}/result`, {
          headers: {
            token: localStorage.getItem("token")
          }
        });
        if (response.status === 200) {
          console.log('Fetched data:', response.data); // Debugging statement
          setResult(response.data);
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };
    
    fetchResult();
  }, [quizId]);

  if (!result) {
    return <div className="container mt-5"><div className="alert alert-info">Loading...</div></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quiz Result: {result.quizTitle || 'N/A'}</h2>
      <p><strong>Course:</strong> {result.courseTitle || 'N/A'}</p>
      <p><strong>Your Score:</strong> {result.score || '0'}</p>

      <h3 className="mt-4">Your Responses:</h3>
      <ul className="list-group">
        {Object.entries(result.responses || {}).length > 0 ? (
          Object.entries(result.responses).map(([questionId, answer], index) => (
            <li key={index} className="list-group-item">
              <strong>Question ID:</strong> {questionId} - <strong>Your Answer:</strong> {answer}
            </li>
          ))
        ) : (
          <li className="list-group-item">No responses found</li>
        )}
      </ul>
    </div>
  );
};

export default Quizresult;
