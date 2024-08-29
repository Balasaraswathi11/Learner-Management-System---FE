import React from 'react';
import { server } from '../../main';
import "./coursecard.css";
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CourseData } from '../context/CourseContext';

const CourseCard = ({ course }) => {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  const { fetchCourse } = CourseData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/admin/delcourse/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchCourse();
      } catch (error) {
        console.error("Error deleting course:", error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt={course.title} className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor: {course.createdBy}</p>
      <p>Duration: {course.duration} weeks</p>
      <p>Price: ₹{course.price}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            user.subscription.includes(course._id) ? (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn"
              >
                Study
              </button>
            ) : (
              <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="common-btn"
              >
                Get Started
              </button>
            )
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="common-btn"
        >
          Get Started
        </button>
      )}
      <br />

      {user && user.role === "admin" && (
        <button
          className='common-btn'
          onClick={() => deleteHandler(course._id)}
          style={{ backgroundColor: "red", color: "white", marginTop: "20px" }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default CourseCard;
