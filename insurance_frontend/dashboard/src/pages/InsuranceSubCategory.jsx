import Footer from '../components/footer/Footer';
import AllInsuranceSubCategory from '../components/category/AllInsuranceSubCategory';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { BASE_URL } from "../api";
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const InsuranceSubCategoryMainContent = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        is_active: true
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [showThumbnail, setShowThumbnail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const token = Cookies.get('access_token');
        axios.get(`${BASE_URL}/insurance/categories/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
    }, []);
    

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle is_active checkbox
    const handleCheckboxChange = (e) => {
        setCategoryData(prevState => ({
            ...prevState,
            is_active: e.target.checked
        }));
    };

    // Handle thumbnail upload
    const onDropSingle = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setThumbnail(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropSingle,
        accept: 'image/*',
        maxFiles: 1
    });

    // Toggle thumbnail upload visibility
    const handleShowThumbnail = () => {
        setShowThumbnail(!showThumbnail);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        try {
            const formData = new FormData();
            formData.append('name', categoryData.name);
            formData.append('description', categoryData.description);
            formData.append('is_active', categoryData.is_active);
            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
            }
    
            const token = Cookies.get("access_token");  
    
            await axios.post(`${BASE_URL}/insurance/subcategories/create/`, formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            setSuccess(true);
            setCategoryData({ name: '', description: '', is_active: true });
            setThumbnail(null);
        } catch (err) {
            console.error("Error Response:", err.response?.data);
            setError(err.response?.data?.message || 'Failed to create category. Please try again.');
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
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Main Category</label>
                                        <select
                                            className="form-control form-control-sm"
                                            name="category_id"
                                            value={categoryData.category_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Description</label>
                                        <textarea 
                                            rows="5" 
                                            className="form-control form-control-sm"
                                            name="description"
                                            value={categoryData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    {error && <p className="text-danger">{error}</p>}
                                    {success && <p className="text-success">Category created successfully!</p>}
                                    <div className="col-12 d-flex justify-content-end">
                                        <div className="btn-box">
                                            <button className="btn btn-sm btn-primary" type="submit" disabled={loading}>
                                                {loading ? 'Saving...' : 'Save Category'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <AllInsuranceSubCategory />
            </div>
            <Footer />
        </div>
    );
};
export default InsuranceSubCategoryMainContent;
