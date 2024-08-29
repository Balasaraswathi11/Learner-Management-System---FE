import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center ">
        <p className='text-light'>
          &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
          with ❤️ by <a href="#" className="text-danger">Bala</a>
        </p>
        <div className="social-links mt-3">
          <a href="#" className="text-white me-3">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-light me-3">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-light">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
