// import React, { useState } from 'react';
// import axios from 'axios';
// import { server } from '../../main';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { UserData } from '../context/UserContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Quiz = () => {
//   const [courseId, setCourseId] = useState('');
//   const [title, setTitle] = useState('');
//   const [questions, setQuestions] = useState([{ question: '', option1: '', option2: '', option3: '', option4: '', answer: '', title: '' }]);
//   const [loading, setLoading] = useState(false);
//   const { user } = UserData();
//   const navigate = useNavigate();

//   const handleQuestionChange = (index, e) => {
//     const { name, value } = e.target;
//     const newQuestions = [...questions];
//     newQuestions[index] = { ...newQuestions[index], [name]: value };
//     setQuestions(newQuestions);
//   };

//   const addQuestion = () => {
//     setQuestions([...questions, { question: '', option1: '', option2: '', option3: '', option4: '', answer: '', title: '' }]);
//   };

//   const removeQuestion = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data } = await axios.post(`${server}/api/admin/course/${courseId}/quiz`, { title, questions }, {
//         headers: {
//           token: localStorage.getItem('token'),
//         },
//       });

//       toast.success(data.message);
//       setCourseId('');
//       setTitle('');
//       setQuestions([{ question: '', option1: '', option2: '', option3: '', option4: '', answer: '', title: '' }]);
//       navigate(`/take-quiz/${courseId}`); // Navigate after successful creation
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to create quiz');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">
//         {user && user.role === 'admin' ? 'Create a Quiz' : 'Take Quiz'}
//       </h2>
//       {user && user.role === 'admin' ? (
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="courseId" className="form-label">Course ID:</label>
//             <input
//               type="text"
//               id="courseId"
//               value={courseId}
//               onChange={(e) => setCourseId(e.target.value)}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="title" className="form-label">Quiz Title:</label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="form-control"
//               required
//             />
//           </div>

//           {questions.map((question, index) => (
//             <div key={index} className="border p-3 mb-3 rounded">
//               <h3>Question {index + 1}</h3>
//               <div className="mb-3">
//                 <label htmlFor={`question-${index}`} className="form-label">Question:</label>
//                 <input
//                   type="text"
//                   id={`question-${index}`}
//                   name="question"
//                   value={question.question}
//                   onChange={(e) => handleQuestionChange(index, e)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor={`option1-${index}`} className="form-label">Option 1:</label>
//                 <input
//                   type="text"
//                   id={`option1-${index}`}
//                   name="option1"
//                   value={question.option1}
//                   onChange={(e) => handleQuestionChange(index, e)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor={`option2-${index}`} className="form-label">Option 2:</label>
//                 <input
//                   type="text"
//                   id={`option2-${index}`}
//                   name="option2"
//                   value={question.option2}
//                   onChange={(e) => handleQuestionChange(index, e)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor={`option3-${index}`} className="form-label">Option 3:</label>
//                 <input
//                   type="text"
//                   id={`option3-${index}`}
//                   name="option3"
//                   value={question.option3}
//                   onChange={(e) => handleQuestionChange(index, e)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor={`option4-${index}`} className="form-label">Option 4:</label>
//                 <input
//                   type="text"
//                   id={`option4-${index}`}
//                   name="option4"
//                   value={question.option4}
//                   onChange={(e) => handleQuestionChange(index, e)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor={`answer-${index}`} className="form-label">Answer:</label>
//                 <input
//                   type="text"
//                   id={`answer-${index}`}
//                   name="answer"
//                   value={question.answer}
//                   onChange={(e) => handleQuestionChange(index, e)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor={`title-${index}`} className="form-label">Question Title:</label>
//                 <input
//                   type="text"
//                   id={`title-${index}`}
//                   name="title"
//                   value={question.title}
//                   onChange={(e) => handleQuestionChange(index, e)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <button type="button" className="btn btn-danger" onClick={() => removeQuestion(index)}>Remove Question</button>
//             </div>
//           ))}

//           <button type="button" className="btn btn-primary mb-3" onClick={addQuestion}>Add Question</button><br />
//           <button type="submit" className="btn btn-success" disabled={loading}>
//             {loading ? 'Creating...' : 'Create Quiz'}
//           </button>
//         </form>
//       ) : (
//         <button className="btn btn-primary" onClick={() => navigate(`/take-quiz/${courseId}`)}>Take Quiz</button>
//       )}
//     </div>
//   );
// };

// export default Quiz;
