import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Brands from "../pages/Brands";
import Vehicles from "../pages/Vehicles";
import ManageQuery from "../pages/ManageQuery";
import ManagePages from "../pages/ManagePages";
import ContactInfo from "../pages/ContactInfo";

import AddBrands from "../components/UI/AddBrands";
import UpdateBrands from "../components/UI/UpdateBrands";
import AddVehicles from "../components/UI/AddVehicles";
import UpdateVehicles from "../components/UI/UpdateVehicles";

import UpdatePassword from "../components/UI/UpdatePassword";

const Routers = () => {
  return (
    <Routes>
      {/* Level 1 */}
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
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
