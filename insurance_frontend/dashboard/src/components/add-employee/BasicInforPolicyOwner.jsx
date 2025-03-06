import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../api";
import Cookies from 'js-cookie';

const BasicInformation = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contact_number: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${BASE_URL}/users/staffs/create/`, formData, {
        headers: {
          'Content-Type': 'application/json',
           "Authorization": `Bearer ${Cookies.get("access_token")}` 
        },
      });

      setMessage('Staff user created successfully!');
      setFormData({
        username: '',
        email: '',
        contact_number: '',
      });
    } catch (error) {
      setMessage('Error creating staff user. Please try again.');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-12">
      <div className="panel">
        <div className="panel-header">
          <h5>Basic Information</h5>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="username"
                  className="form-control form-control-sm"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="contact_number"
                  className="form-control form-control-sm"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control form-control-sm"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
          {message && <p className="mt-2 text-info">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;