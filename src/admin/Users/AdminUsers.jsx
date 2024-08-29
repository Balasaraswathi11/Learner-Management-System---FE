import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../main';
import toast from 'react-hot-toast';
import Layout from '../Utils/Layout';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/admin/users`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  const updateRole = async (id) => {
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update the role?");
      if (confirmUpdate) {
        const { data } = await axios.put(`${server}/api/admin/user/${id}`, {}, {
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        toast.success(data.message);
        fetchUsers(); // Refresh the list after updating the role
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="container my-5">
        <h1 className="text-center mb-4">All Users</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>
                    <td>
                      <button
                        onClick={() => updateRole(e._id)}
                        className="btn btn-primary"
                      >
                        Update Role
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
