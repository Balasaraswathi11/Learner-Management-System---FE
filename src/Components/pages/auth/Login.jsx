import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserData } from "../../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.css";

const Login = () => {
  const { btnLoading, loginUser } = UserData();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      await loginUser(values.email, values.password, navigate);
    },
  });

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-form bg-light p-4 rounded">
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" disabled={btnLoading} className="btn btn-dark">
            {btnLoading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p className="text-center">
          <Link to="/forgot">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
