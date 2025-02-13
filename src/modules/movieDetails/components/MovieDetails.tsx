import React, {FC, useState} from 'react';
import {Movie} from "../../../types/movie.ts";
import MovieEditForm from "./MovieEditForm.tsx";
import MovieView from "./MovieView.tsx";

interface MovieDetailsProps {
    movie: Movie
}

export type Mode = "view" | "edit" | "create"

const MovieDetails: FC<MovieDetailsProps> = ({movie}) => {
    const [mode, setMode] = useState<Mode>('view')

    const renderComponent = () => {
        switch (mode) {
            case "view":
                return <MovieView movie={movie} setMode={setMode} />
            case "edit":
                return <MovieEditForm movie={movie} setMode={setMode} />
        }
    }

    return renderComponent()
};

export default MovieDetails;