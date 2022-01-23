import { NavLink, useNavigate } from "react-router-dom";
import React from 'react'
import authUser from "../helpers/authUser";

export default function Header() {
    let navigate = useNavigate();
    const user = authUser.Get();
    const signOut = function () {
        authUser.Remove();
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/"><img src="logo.png" /> eVideoPrime</NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse d-sm-inline-flex justify-content-end" id="collapsibleNavId">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {
                            user == null ? <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>
                            </>
                                : <>
                                    <li className="nav-item">
                                        <span className="nav-link">Welcome: {user.name}</span>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="" onClick={signOut}>Signout</a>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}