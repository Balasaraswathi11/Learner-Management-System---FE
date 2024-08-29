import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { server } from "../../main";

// Create the context
const CourseContext = createContext();

// Context provider component
export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [mycourse, setMycourse] = useState([]);

  // Fetch course data from the API
  async function fetchCourse() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses); // Set the fetched courses in state
    } catch (error) {
      console.error("Failed to fetch courses:", error); // Handle the error (optional)
    }
  }

  async function getCourseById(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error(`Failed to fetch course with ID ${id}:`, error); // Improved error logging
    }
  }

  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/course/mycourse`, {
        headers: { token: localStorage.getItem("token") }
      });
      setMycourse(data.courses);
    } catch (error) {
      console.error("Failed to fetch my courses:", error); // Improved error logging
    }
  }

  // Use effect to fetch courses on component mount
  useEffect(() => {
    fetchCourse();
    fetchMyCourse();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <CourseContext.Provider value={{ courses, fetchCourse, getCourseById, course, fetchMyCourse, mycourse }}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use the context
export const CourseData = () => useContext(CourseContext);
