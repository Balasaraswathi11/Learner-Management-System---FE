import React from 'react';
import { useNavigate } from 'react-router-dom';
import Testimonial from '../../Testimonials/Testimonial';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Home.css'; // Import custom CSS

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container-fluid bg-light text-dark text-center py-5 home">
        <div className="home-content">
          <h1 className="display-4">Welcome to our E-learning Platform</h1>
          <p className="lead">Learn, Grow, Excel</p>
          <button 
            onClick={() => navigate("/courses")}
            className="btn btn-black btn-lg border border-black"
          >
            Get Started
          </button>
        </div>
      </div>
      <Testimonial />
    </div>
  );
}

export default Home;
