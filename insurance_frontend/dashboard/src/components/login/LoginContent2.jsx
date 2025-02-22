import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL } from "../../api";
import { Cookie } from 'react-bootstrap-icons';

const LoginContent2 = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const response = await fetch(`${BASE_URL}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
      },
        body: JSON.stringify(formData),
      });  
      const data = await response.json();

      if (response.ok) {
        // Store tokens in cookies
        Cookies.set('access_token', data.access_token, { expires: 1 }); 
        Cookies.set('refresh_token', data.refresh_token, { expires: 7 }); 
        // In LoginContent2.js, line 47
       Cookies.set('user_role', data.role.toUpperCase(), { expires: 1 });
      //  Cookies.set('user_id', data.user_id, { expires: 1 });
        
        navigate('/dashboard');
      } else {
        setError(data.detail || 'Invalid login credentials');
      }

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content login-panel login-panel-2">
      <h3 className="panel-title">Login</h3>
      <div className="login-body login-body-2">
        <div className="top d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src="assets/images/logo-black.png" alt="Logo" />
          </div>
          <Link to="/"><i className="fa-duotone fa-house-chimney"></i></Link>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-30">
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-group-text"><i className="fa-regular fa-user"></i></span>
            </div>
            <div className="input-group mb-20">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="input-group-text"><i className="fa-regular fa-lock"></i></span>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn btn-primary w-100 login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginContent2;
