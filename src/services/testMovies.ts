import {Genre} from "../types/filters.ts";
import {Movie} from "../types/movie.ts";
import {v4 as uuidv4} from "uuid";

export const testMovies: Omit<Movie, "id">[] = [
    {
        title: "Фильм Один",
        releaseYear: 2021,
        country: "Россия",
        annotation: "Захватывающий боевик с множеством сцен действия.",
        genre: "Драма" as Genre,
        producer: "Продюсер Один",
        actors: "Актер Один, Актер Два",
        createdAt: new Date("2021-01-01"),
        updatedAt: new Date("2021-01-01"),
        isFavorite: true,
        coverImage: "https://example.com/cover1.jpg"
    },
    {
        title: "Фильм Два",
        releaseYear: 2020,
        country: "США",
        annotation: "Драмеди о любви и поиске себя.",
        genre: "Экшен" as Genre,
        producer: "Продюсер Два",
        actors: "Актер Три, Актер Четыре",
        createdAt: new Date("2020-06-15"),
        updatedAt: new Date("2020-06-15"),
        isFavorite: false,
        coverImage: "https://example.com/cover2.jpg"
    },
    {
        title: "Фильм Три",
        releaseYear: 2022,
        country: "Великобритания",
        annotation: "Хоррор с неожиданными поворотами сюжета.",
        genre: "Ужасы" as Genre,
        producer: "Продюсер Три",
        actors: "Актер Пять, Актер Шесть",
        createdAt: new Date("2022-03-10"),
        updatedAt: new Date("2022-03-10"),
        isFavorite: false,
        coverImage: "https://example.com/cover3.jpg"
    }
]
