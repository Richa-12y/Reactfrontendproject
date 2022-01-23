import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminLayout from './admin/shared/AdminLayout';
import Layout from './shared/Layout';
import UserLayout from './user/shared/UserLayout';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/user/*" element={<UserLayout />}></Route>
        <Route path="/admin/*" element={<AdminLayout />}></Route>
        <Route path="/*" element={<Layout />}></Route>
      </Routes>
    </div>
  )
}
