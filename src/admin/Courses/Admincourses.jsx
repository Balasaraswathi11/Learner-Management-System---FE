import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../Utils/Layout';
import CourseCard from '../../Components/coursecard/CourseCard';
import { CourseData } from '../../Components/context/CourseContext';
import axios from 'axios';
import { server } from '../../main';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Yup for validation

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const Admincourses = ({ user }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const { courses, fetchCourse } = CourseData();

  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    category: "",
    price: "",
    createdBy: "",
    duration: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    createdBy: Yup.string().required("Created By is required"),
    duration: Yup.number().required("Duration is required").positive("Duration must be a positive number"),
  });

  const submitHandler = async (values, { resetForm }) => {
    setBtnLoading(true);
    const form = new FormData();
    
    form.append("title", values.title);
    form.append("description", values.description);
    form.append("category", values.category);
    form.append("price", values.price);
    form.append("createdBy", values.createdBy);
    form.append("duration", values.duration);
    form.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/admin/course/new`, form, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourse();
      setImage("");
      setImagePrev("");
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      setBtnLoading(false);
    }
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <Layout>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <h1 className="mb-4">All Courses</h1>
            <div className="row">
              {courses && courses.length > 0 ? (
                courses.map((e) => (
                  <div className="col-md-6 mb-3" key={e._id}>
                    <CourseCard course={e} />
                  </div>
                ))
              ) : (
                <p>No Courses Yet</p>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h2 className="mb-4 text-center text-primary">Add Course</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <Field
                        type="text"
                        name="title"
                        className="form-control"
                      />
                      <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <Field
                        type="text"
                        name="description"
                        className="form-control"
                      />
                      <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <Field
                        type="number"
                        name="price"
                        className="form-control"
                      />
                      <ErrorMessage name="price" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="createdBy" className="form-label">Created By</label>
                      <Field
                        type="text"
                        name="createdBy"
                        className="form-control"
                      />
                      <ErrorMessage name="createdBy" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">Category</label>
                      <Field
                        as="select"
                        name="category"
                        className="form-select"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option value={category} key={category}>
                            {category}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="category" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="duration" className="form-label">Duration</label>
                      <Field
                        type="number"
                        name="duration"
                        className="form-control"
                      />
                      <ErrorMessage name="duration" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("image", e.target.files[0]);
                          changeImageHandler(e);
                        }}
                        required
                      />
                      {imagePrev && <img src={imagePrev} alt="Preview" className="img-fluid mt-3" />}
                    </div>

                    <button
                      type="submit"
                      disabled={btnLoading}
                      className="btn btn-primary w-100"
                    >
                      {btnLoading ? "Please Wait..." : "Add Course"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admincourses;
