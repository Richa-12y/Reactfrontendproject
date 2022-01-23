import React from 'react'
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import Home from '../containers/Home';
import Login from '../containers/Login';
import Movie from '../containers/Movie';
import NotFound from '../containers/NotFound';
import Order from '../containers/Order';
import Pricing from '../containers/Pricing';
import SignUp from '../containers/SignUp';
import Header from "./Header";

export default function Layout() {
    let location = useLocation();
    return (
        <div>
            <Header />
            <div className={(location?.pathname == '/' || location.pathname.indexOf('movie')>-1) ? '' : 'container'}>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="/pricing" element={<Pricing />}></Route>
                    <Route path="/order" element={<Order />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/movie/:id" element={<Movie />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </div>
    )
}
