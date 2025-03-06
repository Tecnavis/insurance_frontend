import React from 'react'
import Footer from '../components/footer/Footer'
import BasicInforPolicyOwner from '../components/add-employee/BasicInforPolicyOwner'
import BiologicalInfo from '../components/add-employee/BiologicalInfo'
import AddNewBreadcrumb from '../components/breadcrumb/AddNewBreadcrumb'
import SaveBtn from '../components/add-employee/SaveBtn'

const AddPolicyOwner = () => {
  return (
    <div className="main-content">
        <AddNewBreadcrumb link={'/allPolicyOwner'} title={'Add Policy Owner'}/>
        <div className="row">
            <BasicInforPolicyOwner/>
            {/* <BasicInformation/> */}
            <BiologicalInfo/>
            <SaveBtn/>
        </div>
        <Footer/>
    </div>
  )
}
export default AddPolicyOwner