import React from 'react';
import {useParams} from "react-router-dom";
import movieService from "../../services/MovieService.ts";
import MovieDetails from "../../modules/movieDetails";

const MoviePage = () => {
    const { id } = useParams<{ id: string }>()

    const movie = id && movieService.getMovieById(id)

    if (!movie) return <p>Фильм не найден</p>

    return (
        <MovieDetails movie={movie}/>
    );
};

export default MoviePage;