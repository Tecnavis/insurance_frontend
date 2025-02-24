import React, { useState } from 'react'  // ✅ Import useState
import Footer from '../components/footer/Footer'
import AddNewBreadcrumb from '../components/breadcrumb/AddNewBreadcrumb'
import InsuranceData from '../components/add-new-product/InsuranceData' 
import SaleData from '../components/add-new-product/SaleData'

const AddInsurance = () => {
  const [productDataBtn, setProductDataBtn] = useState(false)  

  const handleProductDataBtn = () => {
    setProductDataBtn(!productDataBtn)
  }

  return (
    <div className="main-content">
      <AddNewBreadcrumb link={"/allInsurance"} title={'Add New Insurance'} />
      <div className="row g-4">
        <div className="col-xxl-12 col-lg-12">               
          <div className="panel mb-30">
            <div className="panel-header">
            </div>
            <div className={`panel-body ${productDataBtn ? 'd-none' : ''}`}>
              <InsuranceData />  
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AddInsurance
