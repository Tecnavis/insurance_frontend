import React, { useState } from 'react'
import ProductDataTab from './ProductDataTab'
import SaleData from './SaleData'

const SalesData = () => {
    const [productDataBtn,SetProductDataBtn] = useState(false)

    const handleProductDataBtn = () => {
        SetProductDataBtn(!productDataBtn)
    }
  return (
    <div className="panel mb-30">
        <div className="panel-header">
            {/* <h5>Sales Details</h5> */}
            {/* <div className="btn-box d-flex gap-2">
                <button className="btn btn-sm btn-icon btn-outline-primary panel-close" onClick={handleProductDataBtn}><i className="fa-light fa-angle-up"></i></button>
            </div> */}
        </div>
        <div className={`panel-body ${productDataBtn? 'd-none':''}`}>
           {/* <ProductDataTab/> */}
           <SaleData/>
        </div>
    </div>
  )
}

export default SalesData