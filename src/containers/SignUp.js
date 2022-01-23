import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/AuthService";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    let navigate = useNavigate();
    return (
        <div className="col-sm-5">
            <h1>Sign Up</h1>
            <Formik initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: ''
            }}
                validationSchema={
                    Yup.object({
                        name: Yup.string().required('Please Enter Name'),
                        email: Yup.string().required('Please Enter Email').email('Please Enter CorrectEmail'),
                        password: Yup.string().required('Please Enter Password'),
                        confirmPassword: Yup.string().required('Please Enter Confirm Password').oneOf([
                            Yup.ref('password'), null], "Confirm Password doesn't match"),
                        phoneNumber: Yup.string().required('Please Enter Phone Number'),
                    })
                }
                onSubmit={(values) => {
                    values.role = "User";
                    AuthService.Register(values).then(res => {
                        if (res.status == 201) {
                            navigate('/login');
                        }
                    });
                }}>
                <Form>
                    <div className="mb-3">
                        <label>Name</label>
                        <Field name="name" type="text" className="form-control"></Field>
                        <ErrorMessage component="label" className="text-danger" name="name"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <Field name="email" type="text" className="form-control"></Field>
                        <ErrorMessage component="label" className="text-danger" name="email"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <Field name="password" type="password" className="form-control"></Field>
                        <ErrorMessage component="label" className="text-danger" name="password"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <Field name="confirmPassword" type="password" className="form-control"></Field>
                        <ErrorMessage component="label" className="text-danger" name="confirmPassword"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label>Phone Number</label>
                        <Field name="phoneNumber" type="text" className="form-control"></Field>
                        <ErrorMessage component="label" className="text-danger" name="phoneNumber"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
