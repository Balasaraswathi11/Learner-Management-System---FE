import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css"
import Header from './Components/headers/Header';
import Home from './Components/pages/home/Home';
import Login from './Components/pages/auth/Login';
import Register from './Components/pages/auth/Register';
import Verify from './Components/pages/auth/Verify';
import Footer from './Components/Footer/Footer';
import About from './Components/pages/about/About';
import { Toaster } from 'react-hot-toast';
import { UserData } from './Components/context/UserContext';
import Account from './Components/pages/account/Account';
import Loadingpg from './Components/loading/Loadingpg';
import Courses from './Components/course/Courses';
import Coursedescription from './Components/pages/coursedescription/Coursedescription';
import Paymentsuccess from './Components/pages/paymentsuccess/Paymentsuccess';
import Dashboard from './Components/pages/dashboard/Dashboard';
import CourseStudy from './Components/pages/coursestudy/CourseStudy';
import Lecture from './Components/pages/lecture/Lecture';
import AdminDashboard from './admin/Dashboard/AdminDashboard';
import AdminUsers from './admin/Users/AdminUsers';
import Admincourses from './admin/Courses/Admincourses';
import ForgetPassword from './Components/pages/auth/ForgetPassword';
import Reset from './Components/pages/auth/Reset';

import QuizDetails from './Components/Quiz/QuizDetails';
import QuizTake from './Components/Quiz/Quiztake';
import Quizresult from './Components/Quiz/Quizresult';
import Assignmentsdisplay from './Components/Assignment/Assignmentdisplay';
import ChatPage from './Components/chat/ChatPage';
import Sendmsg from './Components/chat/Sendmsg';
import Getmsg from './Components/chat/Getmsg';
import ChatsList from './Components/chat/ChatList';
import ChatList from './Components/chat/ChatList';
import Userchat from './Components/chat/Userchat';
import Quiz from './Components/Quiz/Quiz';

const App = () => {
  const {user,isAuth,loading}=UserData()
  

  console.log(user)
  return (<>
  { loading? <Loadingpg />: <BrowserRouter>
      <Toaster />
    <Header />
   <Routes>
   

    <Route path="/" element={<Home />} />  
    <Route path="/login" element={isAuth ? <Account />:<Login />} />  
    <Route path="/register" element={isAuth ? <Home />:<Register />} />  
    <Route path="/verify" element={isAuth ? <Home />:<Verify />} />
    <Route path="/forgot" element={isAuth ? <Home />:<ForgetPassword />} />
    <Route
              path="/payment-success/:id"
              element={isAuth ? <Paymentsuccess user={user} /> : <Login />}
            />  
    <Route path="/about" element={<About />} />  
    <Route path="/courses" element={<Courses />} />
    <Route path="/course/:id" element={isAuth?<Coursedescription />:<Login />} />   
    <Route path="/account" element={isAuth ? <Account/>:<Login />} />  
    <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
                <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashboard user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <Admincourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
            
            <Route
  path="/admin/quiz"
  element={isAuth ? <Quiz user={user} /> : <Login />}
/>
<Route
  path="/take-quiz/:id"
  element={isAuth ? <QuizDetails user={user} /> : <Login />}
/>
<Route
  path="quizzes/:id"
  element={isAuth ? <QuizTake user={user} /> : <Login />}
/>
<Route
  path="/chat/:adminId"
  element={isAuth ? <ChatList user={user} /> : <Login />}
/>
<Route
  path="chats/:userId/:adminId"
  element={isAuth ? <ChatPage user={user} /> : <Login />}
/>
<Route
  path="chats/:adminId/:userId"
  element={isAuth ? <Userchat user={user} /> : <Login />}
/>
<Route path="/admin/:adminId/users" element={isAuth ? <Getmsg user={user} /> : <Login />}/>
<Route
  path="course/:courseId/assignments"
  element={isAuth ? <Assignmentsdisplay user={user} /> : <Login />}
/>
            <Route
              path="/reset-password/:token"
              element={ <Reset user={user} />}
            />
             <Route
              path="/quiz/:quizId/result"
              element={isAuth ? <Quizresult user={user} /> : <Login />}
            />
             
   </Routes>
   <Footer />


   </BrowserRouter>}
   </>  )
}

export default App