import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { BASE_URL } from '../../api';
import Cookies from 'js-cookie';

const InsuranceForm = () => {
    const [formData, setFormData] = useState({
        policy_owner: '',
        policy_number: '',
        insurance_type: '',
        category: '',
        sub_category: '',
        premium_amount: '',
        start_date: null,
        expiry_date: null,
        status: 'active',
        document: null,
        document_url: '',
    });
    const [policyOwners, setPolicyOwners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    

    useEffect(() => {
        fetchPolicyOwners();
    }, []);

    const fetchPolicyOwners = async () => {
        try {
            const token = Cookies.get("access_token");
            const response = await axios.get(`${BASE_URL}/insurance/policy-owners/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("Fetched Policy Owners:", response.data);
    
            if (!Array.isArray(response.data)) {
                console.error("Unexpected API response:", response.data);
                throw new Error("Invalid API response format");
            }
    
            setPolicyOwners(response.data);  
        } catch (error) {
            console.error("Error fetching owners:", error);
            setError("Error fetching owners");
        } finally {
            setLoading(false); 
        }
    };
        useEffect(() => {
            fetchCategories();
            fetchSubCategories();
        }, []);

        const fetchCategories = async () => {
            try {
                const token = Cookies.get("access_token");
                const response = await axios.get(`${BASE_URL}/insurance/categories/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        const fetchSubCategories = async () => {
            try {
                const token = Cookies.get("access_token");
                const response = await axios.get(`${BASE_URL}/insurance/subcategories/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSubCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch subcategories:", error);
            }
        };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "category") {
            // Filter subcategories where category.id matches selected category id
            const filtered = subCategories.filter(sub => sub.category.id.toString() === value);
            setFilteredSubCategories(filtered);
            setFormData({ ...formData, category: value, sub_category: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            [field]: date
        });
    };

    return (
        <div className="panel">
            <form>
                {/* Policy Owner */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Policy Owner</label>
                    <div className="col-md-10">
                        <select 
                            className="form-control form-control-sm"
                            name="policy_owner"
                            value={formData.policy_owner}
                            onChange={handleChange}
                        >
                            <option value="">Select Policy Owner</option>
                            {policyOwners.length > 0 ? (
                                policyOwners.map(owner => (
                                    <option key={owner.id} value={owner.id}>{owner.username}</option>
                                ))
                            ) : (
                                <option disabled>No Owners Available</option>
                            )}
                        </select>
                    </div>
                </div>


                {/* Policy Number */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Policy Number</label>
                    <div className="col-md-10">
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="policy_number"
                            value={formData.policy_number}
                            onChange={handleChange}
                            placeholder="Enter policy number"
                        />
                    </div>
                </div>


                {/* Category & Sub-category */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Category</label>
                    <div className="col-md-6">
                        <select 
                            className="form-control form-control-sm"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select 
                            className="form-control form-control-sm"
                            name="sub_category"
                            value={formData.sub_category}
                            onChange={handleChange}
                            disabled={!formData.category}  // Disable if no category selected
                        >
                            <option value="">Select sub-category</option>
                            {filteredSubCategories.map(sub => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Premium Amount */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Premium Amount</label>
                    <div className="col-md-10">
                        <input 
                            type="number" 
                            className="form-control form-control-sm" 
                            name="premium_amount"
                            value={formData.premium_amount}
                            onChange={handleChange}
                            placeholder="Enter premium amount"
                        />
                    </div>
                </div>

                {/* Start Date & Expiry Date with Calendar Picker */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Start Date</label>
                    <div className="col-md-4">
                        <DatePicker 
                            selected={formData.start_date}
                            onChange={(date) => handleDateChange(date, 'start_date')}
                            className="form-control form-control-sm"
                            placeholderText="Select start date"
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>
                    <label className="col-md-2 col-form-label col-form-label-sm">Expiry Date</label>
                    <div className="col-md-4">
                        <DatePicker 
                            selected={formData.expiry_date}
                            onChange={(date) => handleDateChange(date, 'expiry_date')}
                            className="form-control form-control-sm"
                            placeholderText="Select expiry date"
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Status</label>
                    <div className="col-md-10">
                        <select 
                            className="form-control form-control-sm"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="active">Active</option>
                            <option value="expired">Expired</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Document Upload */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Upload Document</label>
                    <div className="col-md-10">
                        <input 
                            type="file" 
                            className="form-control form-control-sm" 
                            name="document"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Document URL */}
                <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Document URL</label>
                    <div className="col-md-10">
                        <input 
                            type="url" 
                            className="form-control form-control-sm" 
                            name="document_url"
                            value={formData.document_url}
                            onChange={handleChange}
                            placeholder="Enter document URL"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="row g-3 mb-3">
                    <div className="col-md-10 offset-md-2">
                        <button type="submit" className="btn btn-primary btn-sm">
                            Submit Insurance
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default InsuranceForm;
