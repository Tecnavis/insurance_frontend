import React from 'react'
import Footer from '../components/footer/Footer'
import AllInsuranceHeader from '../components/header/AllInsuranceHeader'
import AllProductTable from '../components/tables/AllProductTable'
import AllSalesTable from '../components/tables/AllSalesTable'
import AllInsuranceTable from '../components/tables/AllInsuranceTable'
import HeaderBtn from '../components/header/HeaderBtn'

const AllInsuranceMainContent = () => {
  return (
    <div className="main-content">
        <div className="row g-4">
            <div className="col-12">
                <div className="panel">
                    <AllInsuranceHeader/>
                    <div className="panel-body">
                        <HeaderBtn/>
                        <AllInsuranceTable/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        
    </div>
  )
}
export default AllInsuranceMainContent