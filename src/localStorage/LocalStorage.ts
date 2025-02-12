import {Movie} from "../types/movie"

export class LocalStorage {
    private static STORAGE_KEY = "movies"

    static saveMovies(movies: Movie[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(movies))
    }

    static getMovies(): Movie[] {
        const data = localStorage.getItem(this.STORAGE_KEY)
        return data ? JSON.parse(data) : []
    }
}