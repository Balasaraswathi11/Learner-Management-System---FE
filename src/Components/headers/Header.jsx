import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Header = () => {
  const {isAuth,user}=UserData()
  return (
    <header>
      <div className="logo">E-Learning</div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
       {isAuth ? <Link to={"/account"}>Account</Link> :   <Link to={"/login"}>Login</Link>}
       {isAuth? <Link to={`/chat/${user._id}`}>Chat</Link>:null}
          
      
       
        
      </div> 
    </header>
  );
};

export default Header;