import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { server } from '../../../main';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';

const Reset = () => {
  const navigate = useNavigate();
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `${server}/api/user/reset/${params.token}`,
          { password: values.password }
        );
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
        <h2 className="mb-4 text-center">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Enter Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your new password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-"
          >
            {formik.isSubmitting ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
