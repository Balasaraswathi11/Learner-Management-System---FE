import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { server } from "../../main";
// Create the context
const CourseContext = createContext();

// Context provider component
export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
const[course,setCourse]= useState([])
const[mycourse,setmycourse]=useState([])
  // Fetch course data from the API
  async function fetchCourse() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses); // Set the fetched courses in state
    } catch (error) {
      console.error("Failed to fetch courses:", error); // Handle the error (optional)
    }
  }


  async function getcoursebyid(id){
    try {
        const{data}= await axios.get(`${server}/api/course/${id}`);
        setCourse(data.course)
    } catch (error) {
        console.log(error)
    }
  }

  async function fetchmycourse(){
    try {
      const {data}=await axios.get(`${server}/api/course/mycourse`,{
        headers:{token:localStorage.getItem("token")}
      })
  setmycourse(data.courses)
    } catch (error) {
      console.log(error)
    }
    
  }

  // Use effect to fetch courses on component mount
  useEffect(() => {
  
    fetchCourse();
    fetchmycourse()
  }, []); // Empty dependency array means this runs once on mount

  return (
    <CourseContext.Provider value={{ courses, fetchCourse , getcoursebyid, course,fetchmycourse,mycourse}}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use the context
export const CourseData = () => useContext(CourseContext);
