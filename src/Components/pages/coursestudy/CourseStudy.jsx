import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import "./coursestudy.css"
import { server } from '../../../main'
import Quiz from '../../Quiz/Quiz'
import AssignmentCreate from '../../Assignment/AssignmentCreate'
const CourseStudy = ({user}) => {
    const params=useParams()
    const {getcoursebyid,course}=CourseData()
    const navigate=useNavigate()
    console.log(course)

if(user && user.role!=="admin" && !user.subscription.includes(params.id)){
  return navigate("/")
}

    useEffect(()=>{
      getcoursebyid(params.id)
    },[])
  return (<>
     {course && (
      <div className="course-study-page bg-dark">
        <img src={`${server}/${course.image}`} alt="" width={350} />
        <h1 style={{color:"white",margin:"10px"}}> {course.title}</h1>
        <h2><span style={{color:"white",margin:"10px"}}>Course description:</span></h2> <br /> <h5> {course.description}</h5>
        <h5><span style={{color:"white"}}>Created by -</span> {course.createdBy}</h5>
        <h5><span style={{color:"white",marginBottom:"40px"}}>Duration</span> - {course.duration} weeks</h5>
        <Link to={`/lectures/${course._id}`}>
          <h2>Lectures</h2>
        </Link>
       
       <h2 ><Quiz courseId={params.id}/></h2> 
       <h2><AssignmentCreate courseId={params.id} user={user} className='ASSIGNMENT' /></h2>
       
      </div>
      
    )}
   
    
  </>)
}

export default CourseStudy