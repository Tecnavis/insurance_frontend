import Footer from '../components/footer/Footer';
import AllInsuranceCategory from '../components/category/AllInsuranceCategory';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from "../api";


const InsuranceCategoryMainContent = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const getAuthHeader = () => {
        const token = Cookies.get('access_token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.post(`${BASE_URL}/insurance/categories/create/`, categoryData, {
                headers: getAuthHeader()
            });

            setSuccess(true);
            setCategoryData({ name: '', description: '' });
        } catch (err) {
            setError('Failed to create category. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="main-content">
            <div className="dashboard-breadcrumb dashboard-panel-header mb-30">
                <h2>Categories</h2>
            </div>

            <div className="row g-4">
                    <div className="col-xxl-4 col-md-5">
                        <div className="panel">
                            <div className="panel-header">
                                <h5>Add New Category</h5>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">Category Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control form-control-sm" 
                                                name="name"
                                                value={categoryData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Description</label>
                                            <textarea 
                                                rows="5" 
                                                className="form-control form-control-sm"
                                                name="description"
                                                value={categoryData.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        {error && <p className="text-danger">{error}</p>}
                                        {success && <p className="text-success">Category created successfully!</p>}
                                        <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-sm btn-primary" type="submit" disabled={loading}>
                                                {loading ? 'Saving...' : 'Save Category'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <AllInsuranceCategory />
                  
                </div>
            
        </div>
    );
};

export default InsuranceCategoryMainContent;
