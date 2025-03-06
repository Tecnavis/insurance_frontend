import React from 'react'
import Footer from '../components/footer/Footer'
import AllPolicyOwnerHeader from '../components/header/AllPolicyOwnerHeader'
import AllPolicyOwnerTable from '../components/tables/AllPolicyOwnerTable'

const AllPolicyOwner = () => {
  return (
    <div className="main-content">
        <div className="row">
            <div className="col-12">
                <div className="panel">
                    <AllPolicyOwnerHeader/>
                    <div className="panel-body">
                        <AllPolicyOwnerTable/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AllPolicyOwner