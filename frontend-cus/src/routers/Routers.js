import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//customer
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
//admin
import Dashboard from "../pages/adminDashboard";
import Brands from "../pages/adminBrands";
import Vehicles from "../pages/adminVehicles";
import ManageQuery from "../pages/adminManageQuery";
import ManagePages from "../pages/adminManagePages";
import ContactInfo from "../pages/adminContactInfo";
import AddBrands from "../components/UI/adminAddBrands";
import UpdateBrands from "../components/UI/adminUpdateBrands";
import AddVehicles from "../components/UI/adminAddVehicles";
import UpdateVehicles from "../components/UI/adminUpdateVehicles";
import UpdatePassword from "../components/UI/adminUpdatePassword";


const Routers = () => {

  return (
    <Routes>
      {/* Customer */}
        {/* Level 1 path */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />

        {/* Level 2 path */}
        <Route path="/cars/:slug" element={<CarDetails />} />


      
      {/* Admin */}
        <Route path="/admin" element={<Dashboard />} />
        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        <Route path="/admin/brands" element={<Brands />} />
        <Route path="/admin/vehicles" element={<Vehicles />} />
        <Route path="/admin/manage-query" element={<ManageQuery />} />
        <Route path="/admin/manage-pages" element={<ManagePages />} />
        <Route path="/admin/contact-info" element={<ContactInfo />} />


        {/* Level 2 */}
        <Route path="/admin/brands/new" element={<AddBrands />} />
        <Route path="/admin/brands/edit" element={<UpdateBrands />} />

        <Route path="/admin/vehicles/new" element={<AddVehicles />} />
        <Route path="/admin/vehicles/edit" element={<UpdateVehicles />} />

        {/* Admin Change Password */}
        <Route path="/admin/password/edit" element={<UpdatePassword />} />
    </Routes>
  );
};

export default Routers;
