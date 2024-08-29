import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { server } from '../../../main';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';

const ForgetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(`${server}/api/user/forget`, { email: values.email });
        toast.success(data.message);
        navigate("/login");
      } catch (error) {
        toast.error(error.response ? error.response.data.message : 'An error occurred');
      }
    },
  });

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-form bg-light p-4 rounded">
        <h2 className="mb-4 text-center">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Enter Email</label>
            <input
              type="email"
              id="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-dark"
          >
            {formik.isSubmitting ? "Please Wait..." : "Forgot Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
