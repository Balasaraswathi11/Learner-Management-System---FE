import React, { useEffect, useState } from 'react'
import "./coursedescription.css"
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'

import { UserData } from '../../context/UserContext'
import { server } from '../../../main'
import Loadingpg from '../../loading/Loadingpg'
import axios from 'axios'
import toast from 'react-hot-toast'



const Coursedescription = () => {
    const params=useParams()
    const [loading,setLoading]=useState(false)
   const {fetchCourse,course}=CourseData();
   const {fetchuser}=UserData()
   const navigate=useNavigate()
   const {user}=UserData()
   useEffect(() => {
    fetchCourse(params.id);
  }, []);


   const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      if (!token) {
        console.error("No token found");
        toast.error("User not authenticated");
        return;
      }
  
      setLoading(true);
  
      // Debugging logs
      console.log(`Server URL: ${server}`);
      console.log(`Request URL: ${server}/api/course/checkout/${params.id}`);
      
      // Make the API call to initiate the checkout
      const { data: { order } ,} = await axios.post(`${server}/api/course/checkout/${params.id}`, {}, {
        headers: {token}
      });
  
      console.log("Order Data:", order);
  
      const options = {
        key: "rzp_test_WcNf3ZIZKE7HoH", // Your Razorpay key
        amount: order.id, // Amount in currency subunits
        currency: "INR",
        name: "E-learning",
        description: "Learning with us",
        order_id: order.id,

        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          try {
            const { data } = await axios.post(`${server}/api/course/verification/${params.id}`, {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature
            }, { headers: {token,} ,});
  
            console.log("Verification Data:", data);
  
            await fetchuser();
            await fetchCourse()
            
            toast.success(data.message);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            console.error("Verification failed:", error);
            toast.error(error.response?.data?.message || "Verification failed");
          } finally {
            setLoading(false);
          }
        },
        theme: {
          color: "#3399cc"
        }
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout initiation failed:", error);
      toast.error("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    
  <>
     {loading ? (
        <Loadingpg />
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
                <div>  <p>{course.description}</p>

<p>Let's get started with course At ₹{course.price}</p></div>
              
              <div>  {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button className="common-btn" onClick={checkoutHandler}>
                  Buy Now
                </button>
              )}</div>
              </div>

           

            
            </div>
          )}
        </>
      )}
   
   
   
  </>
  )
}

export default Coursedescription