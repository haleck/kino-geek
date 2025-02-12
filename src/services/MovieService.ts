import {v4 as uuidv4} from "uuid"
import {Movie} from "../types/movie"
import moviesStore, {MoviesStore} from "../store/MoviesStore"
import {LocalStorage} from "../localStorage/LocalStorage"
import {Genre} from "../types/filters.ts";
import {testMovies} from "./testMovies.ts";

export class MovieService {
    private moviesStore: MoviesStore

    constructor(moviesStore: MoviesStore) {
        this.moviesStore = moviesStore
        this.loadMovies()
    }

    private saveMovies() {
        LocalStorage.saveMovies(this.moviesStore.movies)
    }

    private loadMovies() {
        this.moviesStore.movies = LocalStorage.getMovies()
    }

    createMovie(title: string, genre: Genre, producer: string, actors: string, releaseYear?: number, annotation?: string) {
        const newMovie: Movie = {
            id: uuidv4(),
            title,
            genre,
            producer,
            actors,
            releaseYear: releaseYear ?? new Date().getFullYear(),
            annotation: annotation ?? "",
            country: "Unknown",
            createdAt: new Date(),
            updatedAt: new Date(),
            isFavorite: false
        }

        this.moviesStore.addMovie(newMovie)
        this.saveMovies()
    }

    deleteMovie(id: string) {
        console.log('deleting')
        this.moviesStore.deleteMovie(id)
        this.saveMovies()
    }

    updateMovie(updatedMovie: Movie) {
        this.moviesStore.updateMovie(updatedMovie)
        this.saveMovies()
    }

    getMovieById(id: string): Movie | undefined {
        return this.moviesStore.findMovieById(id)
    }

    getMovies() {
        return this.moviesStore.sortedFilteredAndSearchedMovies
    }

    addTestMovies() {
        testMovies.forEach(movie => {
            this.moviesStore.addMovie({...movie, id: uuidv4()})
        })
        this.saveMovies()
    }

    deleteAllMovies() {
        this.moviesStore.movies.forEach((movie)=>this.moviesStore.deleteMovie(movie.id))
        this.saveMovies()
    }
}

const movieService = new MovieService(moviesStore)

export default movieService
