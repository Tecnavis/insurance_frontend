import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../api";
import Cookies from 'js-cookie';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";


const BasicInformation = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contact_number: '',
    marital_status: '',
    gender: '',
    address: '',
    date_of_birth: null,
    alternative_phone: '',
    nominee_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleDateChange = (date, field) => {
    setFormData({
        ...formData,
        [field]: date
    });
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formattedData = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? format(formData.date_of_birth, "dd-MM-yyyy") // Convert before sending
        : null,
    };

    try {
      const response = await axios.post(`${BASE_URL}/insurance/policy-owner/create/`, formattedData, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${Cookies.get("access_token")}`
        },
      });
      setMessage('Policy Owner created successfully!');
      setFormData({
        username: '',
        email: '',
        contact_number: '',
        marital_status: '',
        gender: '',
        address: '',
        date_of_birth: null,
        alternative_phone: '',
        nominee_name: '',
      });
    } catch (error) {
      setMessage('Error creating policy owner. Please try again.');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="col-12">
      <div className="panel">
        <div className="panel-header">
          <h5>Policy Owner Information</h5>
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
                <label className="form-label">Marital Status</label>
                <select
                  name="marital_status"
                  className="form-control form-control-sm"
                  value={formData.marital_status}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-control form-control-sm"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
              <div className="col-xxl-3 col-lg-4 col-sm-7">
                <label className="form-label">Date of Birth</label>
                <div className="col-md-4">
                        <DatePicker 
                            selected={formData.date_of_birth}
                            onChange={(date) => handleDateChange(date, 'date_of_birth')}
                            className="form-control form-control-sm"
                            placeholderText="dd-mm-yyyy"
                            dateFormat="dd-MM-yyyy"
                        />
                           {/* <DatePicker
                              selected={formData.date_of_birth}
                              onChange={handleDateChange}
                              className="form-control"
                              placeholderText="dd-MM-yyyy"
                              dateFormat="dd-MM-yyyy" // Display format
                            /> */}

                    </div>  
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Alternative Phone</label>
                <input
                  type="tel"
                  name="alternative_phone"
                  className="form-control form-control-sm"
                  value={formData.alternative_phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-6">
                <label className="form-label">Nominee Name</label>
                <input
                  type="text"
                  name="nominee_name"
                  className="form-control form-control-sm"
                  value={formData.nominee_name}
                  onChange={handleChange}
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
