import {Genre} from "./filters.ts";

export interface Movie {
    id: string
    title: string
    releaseYear: number
    country: string
    annotation: string
    genre: Genre
    producer: string
    actors: string
    createdAt: Date
    updatedAt: Date
    isFavorite: boolean
    coverImage?: string
}
