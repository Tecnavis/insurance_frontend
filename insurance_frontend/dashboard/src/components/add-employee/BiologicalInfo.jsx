import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';

const BiologicalInfo = () => {
    const [birthDate, setBirthDate] = useState(null);
  return (
    <div className="col-12">
        <div className="panel">
            <div className="panel-header">
                <h5>More Information</h5>
            </div>
            <div className="panel-body">
                <div className="row g-3">
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Date of Birth</label>
                        <Form.Control
                        type="text"
                        className="form-control form-control-sm date-picker"
                        as={DatePicker}
                        selected={birthDate}
                        onChange={date => setBirthDate(date)}
                        placeholderText="dd mmm, yy"
                        />                    
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Gender</label>
                        <select className="form-control form-control-sm" data-placeholder="Gender">
                            <option value="">Gender</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </select>
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Marital Status</label>
                        <select className="form-control form-control-sm" data-placeholder="Marital Status">
                            <option value="">Marital Status</option>
                            <option value="0">Married</option>
                            <option value="1">Unmarried</option>
                            <option value="1">Divorced</option>
                        </select>
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Nominee Info</label>
                        <input type="text" className="form-control form-control-sm"/>
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Photo</label>
                        <input type="file" className="form-control form-control-sm"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default BiologicalInfo