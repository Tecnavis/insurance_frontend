import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllPolicyOwnerHeader = () => {
    
  return (
    <div className="panel-header">
        <h5>All PolicyOwners</h5>
        <div className="btn-box d-flex gap-2">
            <div id="tableSearch">
                <Form.Control type='text' placeholder='Seach...'/>
            </div> 
            <Link to="/addEmployee" className="btn btn-sm btn-primary"><i className="fa-light fa-plus"></i> Add New</Link> 
        </div>
    </div>
  )
}

export default AllPolicyOwnerHeader



