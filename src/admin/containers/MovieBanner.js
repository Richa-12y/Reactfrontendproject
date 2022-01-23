import React, { useState, useEffect } from 'react'
import { Formik, Form, ErrorMessage } from "formik";

import { useNavigate, useParams } from 'react-router-dom';

import * as Yup from "yup";
import FileService from '../../services/FileService';

function ImagePreview(props) {
    const [imgSrc, setImage] = useState('');
    useEffect(() => {
        if (props.file != '') {
            let reader = new FileReader();
            reader.readAsDataURL(props.file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
    }, [props])
    return (
        imgSrc != '' && <img src={imgSrc} width={props.width} />
    );
}

export default function MovieBanner() {
    const { id } = useParams();
    let navigate = useNavigate();
    return (
        <div className="col-sm-9">
            <h1>Upload Thumbnail and Banner</h1>
            <Formik
                initialValues={{
                    id: 0,
                    thumbnail: '',
                    banner: ''
                }}
                validationSchema={
                    Yup.object({
                        thumbnail: Yup.mixed().required('Please Upload Thumbnail'),
                        banner: Yup.mixed().required('Please Upload Banner')
                    })
                }
                onSubmit={(values) => {
                    const formData = new FormData();

                    formData.append('id', id);
                    formData.append('file', values.thumbnail, values.thumbnail.name);
                    formData.append('file', values.banner, values.banner.name);

                    FileService.UploadFiles(formData).then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            // simulate async api call with set timeout
                            setTimeout(() => navigate('/admin/movies'), 1000);
                        }
                    });
                }}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label>Thumbnail</label>
                            <input id="thumbnail" name="thumbnail" type="file" onChange={(event) => {
                                setFieldValue("thumbnail", event.currentTarget.files[0]);
                            }} />
                            <ImagePreview file={values.thumbnail} width="200px"/>
                            <ErrorMessage component="label" className="text-danger" name="thumbnail" />
                        </div>
                        <div className="mb-3">
                            <label>Banner</label>
                            <input id="banner" name="banner" type="file" onChange={(event) => {
                                setFieldValue("banner", event.currentTarget.files[0]);
                            }} />
                            <ImagePreview file={values.banner} width="500px" />
                            <ErrorMessage component="label" className="text-danger" name="banner" />
                        </div>
                        <div className="mb-3">
                            <input type="submit" value="Save" className="btn btn-primary" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}