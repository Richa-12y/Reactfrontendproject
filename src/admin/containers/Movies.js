import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { IMAGE_ADDRESS } from '../../helpers/constant';
import MovieService from "../../services/MovieService";

//https://codepen.io/monsieurv/pen/abyJQWQ
//https://codesandbox.io/s/react-hooks-material-ui-pagination-example-forked-k2p4z?file=/src/App.js

export default function Movies() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        MovieService.GetAll().then(res => {
            if (res.status == 200)
                setMovies(res.data);
        });
    }, []);
    const deleteItem = function (id) {
        if (window.confirm('Are you sure to delete?')) {
            MovieService.Delete(id).then(res => {
                if (res.status == 200) {
                    MovieService.GetAll().then(res => {
                        if (res.status == 200)
                            setMovies(res.data);
                    });
                }
            });
        }
    }
    return (
        <div>
            <h2>Movie List</h2>
            <NavLink to="/admin/movie/create" className="btn btn-primary">Create</NavLink>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Summary</th>
                        <th>Language</th>
                        <th>Duration</th>
                        <th style={{ width: '150px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map((data, index) => {
                            return <tr key={index}>
                                <td>
                                    <img src={`${IMAGE_ADDRESS}/{data.banner}`} style={{ height: '100px' }} />
                                    <div>{data.name}</div>
                                </td>
                                <td>{data.summary}</td>
                                <td>{data.language}</td>
                                <td>{data.duration}</td>
                                <td>
                                <NavLink to={`/admin/movie/banner/${data.id}`} className="btn btn-warning">Update Banner</NavLink>&nbsp;&nbsp;

                                    <NavLink to={`/admin/movie/edit/${data.id}`} className="btn btn-primary">Edit</NavLink> &nbsp;
                                    <button className="btn btn-warning" onClick={(e) => deleteItem(data.id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}