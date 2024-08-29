import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { UserData } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("OTP submitted:", otp); // Debugging statement

    try {
      await verifyOtp(otp, navigate);
    } catch (error) {
      console.error("OTP verification failed:", error); // Debugging statement
      // Optionally, you could show an error message to the user here
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">OTP</label>
          <input
            type="number"
            id="otp" // Added id for the label
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button 
            disabled={btnLoading} 
            type="submit" 
            className="common-btn"
          >
            {btnLoading ? "Please Wait..." : "Verify"}
          </button>
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;
