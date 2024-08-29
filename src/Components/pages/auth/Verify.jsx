import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserData } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';

const Verify = () => {
  const navigate = useNavigate();
  const { btnLoading, verifyOtp } = UserData();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .matches(/^\d+$/, 'OTP must be a number')
        .length(6, 'OTP must be exactly 6 digits'),
    }),
    onSubmit: async (values) => {
      try {
        await verifyOtp(values.otp, navigate);
      } catch (error) {
        console.error("OTP verification failed:", error);
        // Optionally, show an error message to the user here
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
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

          <button
            type="submit"
            disabled={btnLoading}
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
