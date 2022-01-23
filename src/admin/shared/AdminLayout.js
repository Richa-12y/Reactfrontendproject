import React from 'react'
import { Outlet, Routes, Route, useLocation, Navigate } from "react-router-dom";
import authUser from '../../helpers/authUser';
import Dashboard from '../containers/Dashboard';
import Movie from '../containers/Movie';
import MovieBanner from '../containers/MovieBanner';
import Movies from '../containers/Movies';

import Header from "./Header";

export default function AdminLayout() {
    //let location = useLocation();
    const isAuth = authUser.IsAuth();
    return (
        isAuth ? <div>
            <Header />
            <div className='container'>
                <Routes>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="/movies" element={<Movies />}></Route>
                    <Route path="/movie/edit/:id" element={<Movie />}></Route>
                    <Route path="/movie/banner/:id" element={<MovieBanner />}></Route>
                    <Route path="/movie/create" element={<Movie />}></Route>
                </Routes>
            </div>
        </div> : <Navigate to="/login"></Navigate>
    )
}
