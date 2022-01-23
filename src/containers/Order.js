import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import authUser from "../helpers/authUser";
import { RAZORPAY, RECEIPT_ID, TAX } from '../helpers/constant';
import PaymentService from '../services/PaymentService';
import UtilService from '../services/UtilService';

const RAZORPAY_OPTIONS = {
    "key": "", // Enter the Key ID generated from the Dashboard
    "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "",
    "name": "",
    "description": "",
    "image": "https://www.dotnettricks.com/images/d-icon.png",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
    },
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": "NA"
    },
    "theme": {
        "color": "#3399cc"
    }
}
export default function Order() {
    const [plan, setPlan] = useState({});
    let navigate = useNavigate();
    const user = authUser.Get();
    useEffect(() => {
        let dataEnc = localStorage.getItem('p');
        const planData = UtilService.Decrypt(dataEnc);
        let order = { total: planData.total, currency: 'INR', receipt: 'NA' };
        PaymentService.CreateOrder(order).then(res => {
            if (res.status == 200) {
                RAZORPAY_OPTIONS.order_id = res.data.orderId;
            }
        });

        setPlan(planData);

        //razorpay checkout.js 
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const payWithRazorPay = function () {
        RAZORPAY_OPTIONS.name = user.name;
        RAZORPAY_OPTIONS.description = plan.name;
        RAZORPAY_OPTIONS.key = RAZORPAY.key;
        RAZORPAY_OPTIONS.amount = (plan.price * 100).toString();
        RAZORPAY_OPTIONS.currency = plan.currency;

        RAZORPAY_OPTIONS.prefill.name = user.name;
        RAZORPAY_OPTIONS.prefill.email = user.email;
        RAZORPAY_OPTIONS.prefill.contact = user.phoneNumber;

        // binding this object to both success and dismiss handler
        RAZORPAY_OPTIONS.handler = razorPaySuccessHandler.bind(this);
        //open popup
        let razorpay = new window.Razorpay(RAZORPAY_OPTIONS);
        razorpay.open();
    }
    const razorPaySuccessHandler = function (res) {
        var payment = {
            planId: plan.id,
            planName: plan.name,
            price:plan.price,
            total: plan.total,
            tax: plan.tax,
            signature: res.razorpay_signature,
            orderId: res.razorpay_order_id,
            currency: plan.currency,
            email: user.email,
            paymentId: res.razorpay_payment_id,
            userId: user.id
        };
        
       // console.log(payment);

        PaymentService.SavePaymentDetails(payment).then(res=>{
            if(res.status==200)
            {
                let encdata = UtilService.Encrypt(res.data);
                localStorage.setItem(RECEIPT_ID,encdata);

                navigate('/receipt');
            }
        });
    }
    return (
        <div className='col-sm-8'>
        <h2>Order Details</h2>
        <hr />
        <div className="card-body">
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                    Plan Details
                    <span>{plan.name}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                    Amount
                    <span>{plan.price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                    Tax ({TAX.GST}%)
                    <span>+{plan.tax}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center  px-0 mb-3">
                    <strong>Total Amount</strong>
                    <span><strong>{plan.total}</strong></span>
                </li>
            </ul>
            <a onClick={payWithRazorPay} className="btn btn-primary btn-block">Pay With RazorPay</a>
        </div>
    </div>
    )
}
