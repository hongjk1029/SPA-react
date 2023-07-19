import React , { useState }from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "../pages/NotFound";

// Admin Routes
import SignIn from "../pages/admin/SignIn";
import Dashboard from "../pages/admin/Dashboard";
import ManageQuery from "../pages/admin/ManageQuery";
import ManagePages from "../pages/admin/ManagePages";
import ContactInfo from "../pages/admin/ContactInfo";
import UpdatePassword from "../pages/admin/UpdatePassword";

import ViewBrands from "../pages/admin/brand/View";
import AddBrands from "../pages/admin/brand/Add";
import UpdateBrands from "../pages/admin/brand/Update";

import ViewVehicles from "../pages/admin/vehicle/View";
import AddVehicles from "../pages/admin/vehicle/Add";
import UpdateVehicles from "../pages/admin/vehicle/Update";

// Customer Routes
import Home from "../pages/customer/Home";
import About from "../pages/customer/About";
import CarListing from "../pages/customer/CarListing";
import RentalListing from "../pages/customer/RentalListing";
import CarDetails from "../pages/customer/CarDetails";
import Contact from "../pages/customer/Contact";
import PrivacyPolicy from "../pages/customer/PrivacyPolicy";
import TermsCondition from "../pages/customer/TermsCondition";

const Routers = ({isAdmin , setLogin}) => {
  const [isAdminLogin, setIsAdminLogin] = useState()

  if(isAdminLogin){ setLogin(isAdminLogin)} 

  if(isAdmin){
    return (
      <Routes>
        {/* Level 1 */}
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/brands" element={<ViewBrands />} />
        <Route path="/admin/vehicles" element={<ViewVehicles />} />
        <Route path="/admin/manage-query" element={<ManageQuery />} />
        <Route path="/admin/manage-pages" element={<ManagePages />} />
        <Route path="/admin/contact-info" element={<ContactInfo />} />
        <Route path="/admin/*" element={<NotFound />} />
  
        {/* Level 2 */}
        <Route path="/admin/brands/new" element={<AddBrands />} />
        <Route path="/admin/brands/edit" element={<UpdateBrands />} />
  
        <Route path="/admin/vehicles/new" element={<AddVehicles />} />
        <Route path="/admin/vehicles/edit" element={<UpdateVehicles />} />
  
        {/* Admin Change Password */}
        <Route path="/admin/password/edit" element={<UpdatePassword />} />
      </Routes>
    );
  }
  else{
    return (
      <Routes>
        {/* Customer */}
          {/* Level 1 path */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars/sale" element={<CarListing />} />
          <Route path="/cars/rental" element={<RentalListing />} />
          <Route path="/policy" element={<PrivacyPolicy/>} />
          <Route path="/terms" element={<TermsCondition/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
  
          {/* Level 2 path */}
          <Route path="/cars/:slug/:id" element={<CarDetails />} />
  
          {/* Admin Sign In path */}
          <Route path="/admin/" element={<Navigate to="/admin/sign-in" />} />
          <Route path="/admin/sign-in" element={<SignIn setIsAdminLogin={setIsAdminLogin}/>} />
      </Routes>
    );
  }
};

export default Routers;
