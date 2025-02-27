import Footer from '../components/footer/Footer';
import AllInsuranceCategory from '../components/category/AllInsuranceCategory';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { BASE_URL } from "../api";

const InsuranceCategoryMainContent = () => {
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

    // Handle form submission
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

            await axios.post(`${BASE_URL}/services/categories/create/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess(true);
            setCategoryData({ name: '', description: '', is_active: true });
            setThumbnail(null);
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
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Main Category</label>
                                        <select className="form-control form-control-sm" data-placeholder="Select">
                                            <option value="">Select</option>
                                            <option value="0">Cloth</option>
                                            <option value="1">-Fashion</option>
                                            <option value="2">--Jewellery</option>
                                            <option value="3">---Bag</option>
                                            <option value="4">----Smart Phone</option>
                                            <option value="5">Watch</option>
                                            <option value="6">Sunglass</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Custom Category Icon</label>
                                        <input type="text" className="form-control form-control-sm" placeholder="FontAwesome 6 Pro icon name" />
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
                                    <div className="col-12">
                                        <label className="form-label">Display Type</label>
                                        <select className="form-control form-control-sm">
                                            <option value="0">Default</option>
                                            <option value="1">Products</option>
                                            <option value="2">Subcategories</option>
                                            <option value="3">Both</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Active Status</label>
                                        <input 
                                            type="checkbox" 
                                            checked={categoryData.is_active}
                                            onChange={handleCheckboxChange} 
                                        />
                                    </div>
                                    <div className="col-12">
                                        <div className="upload-category-thumbnail">
                                            <label className="form-label mb-0" role="button" onClick={handleShowThumbnail}>
                                                Add Category Thumbnail
                                            </label>
                                            <div {...getRootProps()} className={`${showThumbnail ? '' : 'd-none'}`}>
                                                <input {...getInputProps()} />
                                                <div className="jquery-uploader">
                                                    <div className="jquery-uploader-preview-container">
                                                        <div className="jquery-uploader-select-card">
                                                            <div className="jquery-uploader-select">
                                                                <div className="upload-button">
                                                                    <i className="fa fa-plus"></i><br />
                                                                    <span>Upload</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                <AllInsuranceCategory />
            </div>
            <Footer />
        </div>
    );
};

export default InsuranceCategoryMainContent;
