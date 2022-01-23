import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
//import MovieService from "../services/MovieService";
import CatalogService from '../services/CatalogService';


export default function Movie() {
    const [movieData, setMovieData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        if (movieData.name == undefined) {
            CatalogService.Get(id).then(res => {
                setMovieData(res.data);
            });
        }
    }, [movieData]);

    return (
        <>
             <div className="row" style={{ margin: '0', background: '#212529' }}>
                <div className='col-md-5 text-white'>
                    <div className='container pt-5 px-5'>
                        <h4 className='pt-5'>{movieData.name}</h4>
                        <h6>{movieData.language}</h6>
                        <p className='pt-1'>{movieData.description}</p>
                        <Link to={`/movie/player/${id}`} className='btn btn-primary'>Watch Movie</Link>
                    </div>
                </div>
                <div className='col-md-7 col-sm-12 movie-gradient'>
                    <img src={`/${movieData.banner}`} alt="" className="img-slider" />
                </div>
            </div>
        </>
    )
}
