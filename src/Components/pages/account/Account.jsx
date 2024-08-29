import React from 'react'
import "./account.css"
import { MdDashboardCustomize } from "react-icons/md";
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Account = () => {
  const { user } = UserData();
  const { setUser, setIsAuth } = UserData();
  const navigate = useNavigate();

  const logouthandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out successfully"); // Ensure there's no typo here
    navigate("/login"); // Ensure this route exists and is correctly set up
    console.log("Navigating to login"); // Debugging to check if this line is reached
  };

  return (
    <div>
   {user&&
      <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Name: {user.name}</strong>
          </p>

          <p>
           <strong>Email - {user.email}</strong>
          </p>

          <button
          onClick={()=>navigate(`/${user._id}/dashboard`)}
          className='common-btn'
          >
           <MdDashboardCustomize /> Dashboard
          </button>
          <br />

          {user.role==="admin"&&(
            <button onClick={()=>navigate("/admin/dashboard")}
            className='common-btn'> 
              <MdDashboardCustomize />
            Admindashboard</button>
          )}

         
<br />
          <button
            onClick={logouthandler}
            className="common-btn"
            style={{ background: "red" }}
          >
            {/* <IoMdLogOut /> */}
            Logout
          </button>
        </div>
      </div>}

  </div>
  )
}

export default Account