import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import MovieService from '../../services/MovieService';

export default function Movie() {
    let navigate = useNavigate();
    let initialValues = {
        id: '',
        name: '',
        summary: '',
        description: '',
        videoUrl: '',
        duration: '',
        language: '',
        releaseDate: null,
        categoryId: '',
        isActive: true
    };

    const { id } = useParams();

    const [movieData, setMovieData] = useState(initialValues);
    useEffect(() => {
        if (id != undefined) {
            MovieService.Get(id).then(res => {
                res.data.releaseDate = new Date(res.data.releaseDate);
                setMovieData(res.data);
                //setTimeout(() => setMovieData(res.data), 10);
            });
        }
    }, []);

    const validationSchema = Yup.object({
        categoryId: Yup.string().required('Please Select Category'),
        name: Yup.string().required('Please Enter Name'),
        videoUrl: Yup.string().required('Please Enter Video Url'),
        summary: Yup.string().required('Please Enter Summary'),
        description: Yup.string().required('Please Enter Description'),
        duration: Yup.string().required('Please Enter Duration'),
        language: Yup.string().required('Please Select Language'),
        releaseDate: Yup.date().required('Please Enter Release Date'),
    });
    const handleSubmit = (values) => {
        if (values.id != '') {
            MovieService.Update(values).then(res => {
                if (res.status == 200) {
                    navigate('/admin/movies');
                }
            });
        }
        else {
            values.id = 0;
            MovieService.Add(values).then(res => {
                if (res.status == 201) {
                    let id = res.data;
                    navigate('/admin/movie/banner/' + id);
                }
            });
        }
    }
    return (
        <div className="col-sm-5">
            {
                movieData.id == '' ? <h1> Create Movie</h1> : <h1> Edit Movie</h1>
            }
            <Formik
                enableReinitialize={true}
                initialValues={movieData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ setFieldValue, values }) => {
                    return (
                        <Form>
                            <div className="mb-3">
                                <label>Category</label>
                                <Field name="categoryId" as="select" className="form-control" onChange={(event) => {
                                    setFieldValue("categoryId", event.target.value);
                                }}>
                                    <option value="">- Select -</option>
                                    <option value="1">Action</option>
                                    <option value="2">Comedy</option>
                                    <option value="3">Drama</option>
                                    <option value="4">Horror</option>
                                    <option value="5">Romance</option>
                                </Field>
                                <ErrorMessage component="label" className="text-danger" name="categoryId" />
                            </div>
                            <div className="mb-3">
                                <label>Name</label>
                                <Field name="name" type="text" placeholder="Name" className="form-control" />
                                <ErrorMessage component="label" className="text-danger" name="name" />
                            </div>
                            <div className="mb-3">
                                <label>Video Url</label>
                                <Field name="videoUrl" type="text" placeholder="Video Url" className="form-control" />
                                <span>https://www.youtube.com/embed/video_id</span>
                                <ErrorMessage component="label" className="text-danger" name="videoUrl" />
                            </div>
                            <div className="mb-3">
                                <label>Summary</label>
                                <Field name="summary" as="textarea" placeholder="Summary" className="form-control" />
                                <ErrorMessage component="label" className="text-danger" name="summary" />
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <Field name="description" as="textarea" placeholder="Description" className="form-control" />
                                <ErrorMessage component="label" className="text-danger" name="description" />
                            </div>
                            <div className="mb-3">
                                <label>Duration</label>
                                <Field name="duration" type="text" placeholder="HH:MM:SS" className="form-control" />
                                <ErrorMessage component="label" className="text-danger" name="duration" />
                            </div>
                            <div className="mb-3">
                                <label>Language</label>
                                <Field name="language" as="select" placeholder="Language" className="form-control" onChange={(event) => {
                                    setFieldValue("language", event.target.value);
                                }}>
                                    <option value="">- Select -</option>
                                    <option value="hindi">Hindi</option>
                                    <option value="english">English</option>
                                </Field>
                                <ErrorMessage component="label" className="text-danger" name="language" />
                            </div>
                            <div className="mb-3">
                                <label>Release Date</label>
                                <DatePicker name="releaseDate" className="form-control" format="MM dd yyyy"
                                    selected={values.releaseDate} onChange={(val) => { setFieldValue("releaseDate", val); }} />
                                <ErrorMessage component="label" className="text-danger" name="releaseDate" />
                            </div>
                            <div className="mb-3">
                                <input type="submit" value="Save" className="btn btn-primary" />
                                &nbsp; <NavLink to="/admin/movies" className="btn btn-warning">Cancel</NavLink>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div >
    );
}
