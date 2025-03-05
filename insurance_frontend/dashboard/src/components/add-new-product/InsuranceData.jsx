// import React, { useState } from 'react'
// import { Form } from 'react-bootstrap'

// const SeoData = () => {
//     const [sizes, setSizes] = useState([
//         { size: "Lesson1", stock: 0, selected: false },
//         { size: "Lesson2", stock: 0, selected: false },
//       ]);
    
//       const handleSizeChange = (index) => {
//         const updatedSizes = [...sizes];
//         updatedSizes[index].selected = !updatedSizes[index].selected;
//         setSizes(updatedSizes);
//       };
    
     
//   return (
//     <div className="panel">
//         <form > 
//         <div className="row g-3 mb-3">
//             <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm"> Category</label>
//             <div className="col-md-6">
//             <div className="form-control-sm p-0">
//                     <select className="form-control form-control-sm">
//                         <option value="1">select main category</option>
//                         <option value="2">Dress</option>
//                     </select>
//                 </div>            
//             </div>
//             <div className="col-md-4">
//                 <div className="form-control-sm p-0">
//                     <select className="form-control form-control-sm">
//                         <option value="1">Sub Category</option>
//                         <option value="2">Shirt</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//         <div className='row g-3'>
//             <label htmlFor="Title" className="col-md-2 col-form-label col-form-label-sm">Title</label>
//             <div className="col-md-10">
//                 <input type="text" className="form-control form-control-sm" id="Title" placeholder='Title'/>
//             </div>
//         </div>
//         <br/>
//         <div className="row g-3 ">
//             <label htmlFor="Description" className="col-md-2 col-form-label col-form-label-sm">Description</label>
//             <div className="col-md-10">
//                 <textarea type="text" className="form-control form-control-sm" id="Description" placeholder='Description'/>
//             </div>
//         </div>
//         <br/>
//         <div className="row g-3 mb-3">
//             <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm">Images & Color</label>
//             <div className="col-md-6">
//             <div className="form-control-sm p-0">
//             <input type="file" className="form-control form-control-sm" id="image" placeholder='Images'/>
//             </div>            
//             </div>
//             <div className="col-md-4">
//                 <div className="form-control-sm p-0">
//                     <select className="form-control form-control-sm">
//                         <option value="1">Select Language</option>
//                         <option value="2">Malayalam</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//         <div className="row g-3 mb-3">
//             <label htmlFor="regularPrice" className="col-md-2 col-form-label col-form-label-sm"> Instructor</label>
//             <div className="col-md-10">
//                 <input type="text" className="form-control form-control-sm" id="regularPrice" placeholder='Instructor'/>
//             </div>
//         </div>
//         <div className="row g-3 mb-3">
//             <label htmlFor="salePrice" className="col-md-2 col-form-label col-form-label-sm">Price</label>
//             <div className="col-md-6">
//             <div className="form-control-sm p-0">
//             <input type="number" className="form-control form-control-sm" id="regularPrice" placeholder='Price'/>
//             </div>            
//             </div>
//             <div className="col-md-4">
//             <input type="text" className="form-control form-control-sm" id="regularPrice" placeholder='Offer Price'/>
//             </div>
//         </div>
//         <div className="row g-3 mb-3">
//             <label htmlFor="" className=" col-form-label col-form-label-sm">What you will learn this  course</label>
//             <input type="text" className="form-control form-control-sm" name="introduction" placeholder="benifits description"/>

//             <div className="col-md-8">
//             <div className="form-control-sm p-0">
//             <input type="number" className="form-control form-control-sm" id="regularPrice" placeholder='Points'/>
//             </div>            
//             </div>
//             <div className="col-md-2">
//             <button className="btn btn-sm btn-icon btn-primary" id="addAttr" >
//                 <i className='fa-plus'></i>
//             </button>
//             </div>
//         </div>
//         <br/>
//         <div className="row align-items-center g-3 mb-3">
//             <label className="col-md-2 col-form-label col-form-label-sm">Introduction</label>
//             <div className="col-md-10">
//                 <input type="text" className="form-control form-control-sm" name="introduction" placeholder="Introduction description"/>
//             </div>
//         </div>
       
//         <br/>
//     </form>
//     <br/>
//     </div>
//   )
// }

// export default SeoData

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

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

    // Fetch policy owners from API (Modify URL as needed)
    useEffect(() => {
        axios.get('/api/policy-owners/')
            .then(response => {
                setPolicyOwners(response.data);
            })
            .catch(error => console.error('Error fetching policy owners:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
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
                            {policyOwners.map(owner => (
                                <option key={owner.id} value={owner.id}>{owner.name}</option>
                            ))}
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

                {/* Insurance Type */}
                {/* <div className="row g-3 mb-3">
                    <label className="col-md-2 col-form-label col-form-label-sm">Insurance Type</label>
                    <div className="col-md-10">
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="insurance_type"
                            value={formData.insurance_type}
                            onChange={handleChange}
                            placeholder="Enter insurance type"
                        />
                    </div>
                </div> */}

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
                            <option value="health">Health Insurance</option>
                            <option value="auto">Auto Insurance</option>
                            <option value="life">Life Insurance</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select 
                            className="form-control form-control-sm"
                            name="sub_category"
                            value={formData.sub_category}
                            onChange={handleChange}
                        >
                            <option value="">Select sub-category</option>
                            <option value="comprehensive">Comprehensive</option>
                            <option value="third-party">Third-party</option>
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
