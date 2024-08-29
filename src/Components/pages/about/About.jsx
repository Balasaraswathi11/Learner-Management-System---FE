import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./About.css";

const About = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <h2 className="mb-4">About Us</h2>
          <p>
            We are dedicated to providing high-quality online courses to help
            individuals learn and grow in their desired fields. Our experienced
            instructors ensure that each course is tailored for effective learning
            and practical application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
