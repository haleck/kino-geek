import {Movie} from "../../types/movie.ts";

export interface Position {
    top: number
    left: number
}

export interface IMovieActionsMenu {
    movie: Movie | null
    position: Position | null
}