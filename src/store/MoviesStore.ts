import {makeAutoObservable} from "mobx";
import {Movie} from "../types/movie.ts";
import {DateRange, Genre, YearRange} from "../types/filters.ts";
import {Sorting} from "../types/sorting.ts";

export class MoviesStore {
    movies: Movie[] = []
    filters = {
        russian: false,
        favorites: false,
        notFavorites: false,
        releasedThisYear: false,
        genre: null as Genre | null,
        releaseYearRange: { from: null, to: null } as YearRange,
        updatedDateRange: { from: null, to: null } as DateRange,
        createdDateRange: { from: null, to: null } as DateRange,
    }
    searchQuery: string = ""
    sorting: Sorting = "createdAt"

    constructor() {
        makeAutoObservable(this)
    }

    addMovie(movie: Movie) {
        this.movies.push(movie)
    }

    deleteMovie(id: string) {
        this.movies = this.movies.filter(movie => movie.id !== id)
    }

    findMovieById(id: string): Movie | undefined {
        return this.movies.find(movie => movie.id === id)
    }

    updateMovie(updatedMovie: Movie): void {
        const index = this.movies.findIndex(movie => movie.id === updatedMovie.id)
        if (index !== -1) {
            this.movies[index] = {
                ...updatedMovie,
                updatedAt: new Date()
            }
        }
    }

    setFilter<T extends keyof this['filters']>(key: T, value: this["filters"][T]) {
        this.filters[key] = value
    }

    applyFilters() {
        let filteredMovies = [...this.movies]

        if (this.filters.russian) {
            filteredMovies = filteredMovies.filter(movie => movie.country.toLowerCase() === 'россия')
        }

        if (this.filters.favorites) {
            filteredMovies = filteredMovies.filter(movie => movie.isFavorite)
        }

        if (this.filters.releasedThisYear) {
            const currentYear = new Date().getFullYear()
            filteredMovies = filteredMovies.filter(movie => movie.releaseYear === currentYear)
        }

        if (this.filters.genre && this.filters.genre !== 'Все жанры') {
            filteredMovies = filteredMovies.filter(movie => movie.genre === this.filters.genre)
        }

        if (this.filters.releaseYearRange.from || this.filters.releaseYearRange.to) {
            filteredMovies = filteredMovies.filter(movie => {
                const { from, to } = this.filters.releaseYearRange
                return (
                    (!from || movie.releaseYear >= from) &&
                    (!to || movie.releaseYear <= to)
                )
            })
        }

        if (this.filters.createdDateRange.from || this.filters.createdDateRange.to) {
            filteredMovies = filteredMovies.filter(movie => {
                const { from, to } = this.filters.createdDateRange
                console.log(from?.toISOString(), to?.toISOString())
                console.log(movie.createdAt)
                return (
                    (!from || movie.createdAt >= from.toISOString()) &&
                    (!to || movie.createdAt <= to.toISOString())
                )
            })
        }

        if (this.filters.updatedDateRange.from || this.filters.updatedDateRange.to) {
            filteredMovies = filteredMovies.filter(movie => {
                const { from, to } = this.filters.updatedDateRange
                return (
                    (!from || movie.updatedAt >= from) &&
                    (!to || movie.updatedAt <= to)
                )
            })
        }

        return filteredMovies
    }

    applySearch(movies: Movie[]) {
        if (!this.searchQuery.trim()) {
            return movies
        }

        const lowercasedQuery = this.searchQuery.toLowerCase()

        return movies.filter(movie => {
            const titleMatch = movie.title.toLowerCase().includes(lowercasedQuery)
            const annotationMatch = movie.annotation.toLowerCase().includes(lowercasedQuery)
            const producerMatch = movie.producer.toLowerCase().includes(lowercasedQuery)
            const actorsMatch = movie.actors.toLowerCase().includes(lowercasedQuery)

            return titleMatch || annotationMatch || producerMatch || actorsMatch
        })
    }

    sortMovies(movies: Movie[], sortBy: Sorting) {
        return movies.sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title)
            } else {
                return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
            }
        })
    }

    setSorting(newSorting: Sorting) {
        this.sorting = newSorting
    }

    get sortedFilteredAndSearchedMovies() {
        let filteredMovies = this.applyFilters()

        let searchedMovies = this.applySearch(filteredMovies)

        const res = this.sortMovies(searchedMovies, this.sorting)
        console.log(res)
        return res
    }
}

const moviesStore = new MoviesStore()
export default moviesStore
