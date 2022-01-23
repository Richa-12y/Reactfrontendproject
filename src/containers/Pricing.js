import React, { useState, useEffect } from 'react'
import authUser from "../helpers/authUser";
import PlanService from '../services/PlanService';
import UtilService from '../services/UtilService';
import {NavLink, useNavigate  } from "react-router-dom";
import { TAX  } from "../helpers/constant";

export default function Pricing() {
    let navigate = useNavigate();
    const user = authUser.Get();
    const [planData, setPlanData] = useState([]);
    const handleSubscribe = function (id, name, price, currency) {
       let tax = Math.round(price * TAX.GST / 100);
        const plan = {
            id: id,
            name: name,
            price: price,
            tax: tax,
            total: price + tax,
            currency: currency,
            userId: user.id
        };
        const data = UtilService.Encrypt(plan);
        localStorage.setItem('p', data);
        navigate('/order');
    }
    useEffect(() => {
        if (planData.length == 0) {
            PlanService.GetAll().then(res => {
                setPlanData(res.data);
            });
        }
    }, [planData])
    return (
        <div>
            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1>Subscription Pricing</h1>
                <p className="fs-5 text-muted">Join eVideoPrime to watch the latest movies and TV shows. Enjoy secure, ad-free entertainment at lower cost.</p>
            </div>
            <main>
                <div className="row text-center">
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm border-default">
                            <div className="card-header py-3  bg-default border-default">
                                <h4 className="my-0 fw-normal">Free</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">INR {planData[0] && planData[0].price}<small className="text-muted fw-light">/yr</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>All Content</li>
                                    <li>Watch on TV or Laptop</li>
                                    <li>Ads Free Movies</li>
                                    <li>Video Quality (Full HD)</li>
                                </ul>
                                {
                                    user != null ? <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={(e) => handleSubscribe(planData[0].id, planData[0].name, planData[0].price, planData[0].currency)}>Subscribe For Free</button>
                                        : <NavLink to="/signup?return=pricing" className="w-100 btn btn-lg btn-outline-primary">Sign up for free</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm border-info">
                            <div className="card-header py-3 text-white bg-info border-info">
                                <h4 className="my-0 fw-normal">Plus</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">INR {planData[1] && planData[1].price}<small className="text-muted fw-light">/yr</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>All Content</li>
                                    <li>Watch on TV or Laptop</li>
                                    <li>Ads Free Movies</li>
                                    <li>Video Quality (Full HD)</li>
                                </ul>
                                {
                                    user != null ? <button type="button" className="w-100 text-white btn btn-lg btn-info" onClick={(e) => handleSubscribe(planData[1].id, planData[1].name, planData[1].price, planData[1].currency)}>Subscribe Now</button>
                                        : <NavLink to="/login?return=pricing" className="w-100 text-white btn btn-lg btn-info">Subscribe Now</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm border-primary">
                            <div className="card-header py-3 text-white bg-primary border-primary">
                                <h4 className="my-0 fw-normal">Premium</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">INR {planData[2] && planData[2].price}<small className="text-muted fw-light">/yr</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>All Content</li>
                                    <li>Watch on TV or Laptop</li>
                                    <li>Ads Free Movies</li>
                                    <li>Video Quality (4K)</li>
                                </ul>
                                {
                                    user != null ? <button type="button" className="w-100 btn btn-lg btn-primary" onClick={(e) => handleSubscribe(planData[2].id, planData[2].name, planData[2].price, planData[2].currency)}>Subscribe Now</button>
                                        : <NavLink to="/login?return=pricing" className="w-100 btn btn-lg btn-primary">Subscribe Now</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
