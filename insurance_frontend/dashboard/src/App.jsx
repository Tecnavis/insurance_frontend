import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import CrmDashboard from "./pages/CrmDashboard"
import Company from "./pages/Supplier"
import Customer from "./pages/purchaseditems"
import AddEmployee from "./pages/AddEmployee"
import AddAdmin from "./pages/AddAdmin"
import AllEmployee from "./pages/AllEmployee"
import AllAdmin from "./pages/AllAdmin"
import AllCustomer from "./pages/AllCustomer"
import AddNewProduct from "./pages/AddNewProduct"
import AddSales from "./pages/AddSales"
import AddInsurance from "./pages/AddInsurance"
import AddPurchase from "./pages/AddPurchase"
import AllProduct from "./pages/AllProduct"
import AllSales from "./pages/AllSales"
import AllInsurance from "./pages/AllInsurance"
import AllPurchase from "./pages/AllPurchase"

import Category from "./pages/Category"
import InsuranceCategory from "./pages/InsuranceCategory"
import InsuranceSubCategory from "./pages/InsuranceSubCategory"
import AllPolicyOwner from "./pages/AllPolicyOwner" 
import AddPolicyOwner from "./pages/AddPolicyOwner"
import Invoices from "./pages/Invoices"
import Login2 from "./pages/Login2"
import Registration from "./pages/Registration"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Layout from "./components/layout/Layout"
import PublicLayout from "./components/layout/PublicLayout"
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ProtectedRoute from '../src/protectedroute/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('access_token'));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!Cookies.get('access_token'));
    window.addEventListener('storage', checkAuth); 

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
          <Route element={<PublicLayout />}>
              <Route path="/registration" element={<Registration />} />
              <Route path="/" element={<Login2 setIsAuthenticated={setIsAuthenticated} />} />
          </Route>   
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<CrmDashboard />} />
            <Route path="/allProduct" element={<AllProduct />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addNewProduct" element={<AddNewProduct />} />
            <Route path="/purchaseditem" element={<Customer />} />
            <Route path="/allSales" element={<AllSales />} />
            <Route path="/addSales" element={<AddSales />} />
            <Route path="/allpurchase" element={<AllPurchase />} />
            <Route path="/addPurchase" element={<AddPurchase />} />
            <Route path="/allCustomer" element={<AllCustomer />} />
            <Route path="/supplier" element={<Company />} />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/allEmployee" element={<AllEmployee />} />
            <Route path="/addAdmin" element={<AddAdmin />} />
            <Route path="/allAdmin" element={<AllAdmin />} />
            <Route path="/invoice/:id" element={<Invoices />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/editProfile" element={<EditProfile/>}/>

            <Route path="/insurancecategory" element={<InsuranceCategory/>}/>
            <Route path="/insurancesubcategory" element={<InsuranceSubCategory/>}/>

            <Route path="/allinsurance" element={<AllInsurance/>}/>
            <Route path="/addinsurance" element={<AddInsurance/>}/>

            <Route path="/allpolicyowner" element={<AllPolicyOwner />} />
            <Route path="/addPolicyOwner" element={<AddPolicyOwner />} />
          </Route>
        </Route>        
      </Routes>
    </Router>
  );
}
export default App;