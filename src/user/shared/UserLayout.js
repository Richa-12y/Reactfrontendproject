import React from 'react'
import { Outlet, Routes, Route, useLocation, Navigate } from "react-router-dom";
import authUser from '../../helpers/authUser';
import Dashboard from '../containers/Dashboard';
import Movies from '../containers/Movies';

import Header from "./Header";

export default function UserLayout() {
    //let location = useLocation();
    const isAuth = authUser.IsAuth();
    return (
        isAuth ? <div>
            <Header />
            <div className='container'>
                <Routes>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="/movies" element={<Movies />}></Route>
                </Routes>
            </div>
        </div> : <Navigate to="/login"></Navigate>
    )
}