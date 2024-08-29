import React from 'react'
import { CourseData } from '../context/CourseContext'
import CourseCard from '../coursecard/CourseCard'
import './courses.css'
const Courses = () => {
    const{courses}=CourseData()
    console.log(courses)
  return (
    <div className="courses">
    <h2>Available Courses</h2>
    <div className="course-container">
      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))
      ) : (
        <p>No Courses Yet!</p>
      )}
    </div>
  </div>
  )
}

export default Courses