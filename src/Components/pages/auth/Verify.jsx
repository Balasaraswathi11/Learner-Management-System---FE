import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { UserData } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';

const Verify = () => {
  const [show, setShow] = useState(false);
  const { btnloading, verifyUser } = UserData();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.number()
        .required('OTP is required')
        .min(1000, 'OTP must be at least 4 digits')
        .max(9999, 'OTP can be at most 4 digits')
    }),
    onSubmit: async (values) => {
      try {
        await verifyUser(values.otp, navigate);
      } catch (error) {
        console.error('Verification failed', error);
      }
    },
  });

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setShow(true);
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-form bg-light p-4 rounded">
        <h2 className="mb-4 text-center">Verify Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP</label>
            <input
              type="text"
              id="otp"
              className={`form-control ${formik.touched.otp && formik.errors.otp ? 'is-invalid' : ''}`}
              placeholder="Enter OTP"
              {...formik.getFieldProps('otp')}
            />
            {formik.touched.otp && formik.errors.otp ? (
              <div className="invalid-feedback">{formik.errors.otp}</div>
            ) : null}
          </div>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleCaptchaChange}
          />
          {show && (
            <button
              type="submit"
              disabled={btnloading || formik.isSubmitting}
              className="btn btn-primary w-100 mt-3"
            >
              {btnloading ? "Please wait..." : "Verify"}
            </button>
          )}
        </form>
        <p className="mt-3">
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;
