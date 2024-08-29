import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './../Utils/Layout';
import axios from 'axios';
import { server } from '../../main';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [stats, setStats] = useState('');

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/admin/getallstats`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="container my-5">
        <div className="text-center">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 border border-black bg-danger text-white d-flex flex-column justify-content-center align-items-center" style={{ height: '150px' }}>
                <p>Total Courses</p>
                <h3>{stats.totalCourses}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border border-black bg-secondary text-white d-flex flex-column justify-content-center align-items-center" style={{ height: '150px' }}>
                <p>Total Lectures</p>
                <h3>{stats.totalLectures}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border border-black bg-success text-white d-flex flex-column justify-content-center align-items-center" style={{ height: '150px' }}>
                <p>No. of Users</p>
                <h3>{stats.totalUsers}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
