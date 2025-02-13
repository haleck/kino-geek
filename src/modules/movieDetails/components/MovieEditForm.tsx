import React, { useReducer } from 'react'
import classes from '../styles/GlobalMovieStyles.module.sass'
import Input from '../../../ui/Input/Input.tsx'
import { Movie } from '../../../types/movie.ts'
import { MovieLabels } from '../types/types.ts'
import Button from '../../../ui/button/Button.tsx'
import SaveSvg from '../../../assets/save.svg'
import CancelSvg from '../../../assets/cancel.svg'
import Cover from "../UI/Cover/Cover.tsx";
import FileUploadButton from "../UI/FileUploadButton/FileUploadButton.tsx";

interface MovieEditFormProps {
    movie: Movie
    setMode: (mode: 'view' | 'edit') => void
}

type FormState = Omit<Movie, 'id' | 'isFavorite' | 'coverImage' >

type FormAction = {
    type: keyof FormState
    payload: string | number | Date
}

const initialState = (movie: Movie): FormState => ({
    title: movie.title,
    releaseYear: movie.releaseYear,
    country: movie.country,
    annotation: movie.annotation,
    genre: movie.genre,
    producer: movie.producer,
    actors: movie.actors,
    createdAt: movie.createdAt,
    updatedAt: movie.updatedAt
})

const formReducer = (state: FormState, action: FormAction): FormState => {
    return {
        ...state,
        [action.type]: action.payload,
    }
}

const MovieEditForm = ({ movie, setMode }: MovieEditFormProps) => {
    // Используем useReducer для управления состоянием всех полей
    const [formState, dispatch] = useReducer(formReducer, movie, initialState)

    // Обработчик изменения значения поля формы
    const handleChange = (key: keyof FormState, value: string | number | Date) => {
        dispatch({ type: key, payload: value })
    }

    const handleFileSelect = (file: File) => {
        console.log('Выбран файл:', file)
    }

    const handleCancel = () => {
        setMode('view')
    }

    const handleSave = () => {
        console.log('Сохраненные данные:', formState)
        setMode('view')
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Input
                    value={formState.title}
                    setValue={(value) => handleChange('title', value)}
                    maxLength={40}
                    className={classes.heading}
                />
                <div className={classes.actions}>
                    <Button onClick={handleSave}>
                        Сохранить <SaveSvg />
                    </Button>
                    <Button onClick={handleCancel}>
                        Отменить <CancelSvg />
                    </Button>
                </div>
            </div>
            <div className={classes.cover}>
                <Cover />
                <FileUploadButton
                    label={"Обновить обложку"}
                    onFileSelect={handleFileSelect}
                />
            </div>
            <div className={classes.content}>
                <div className={classes.heading}>О фильме</div>
                <div className={classes.description}>
                    {/* Рендер полей объекта фильма */}
                    {Object.entries(formState).map(([key, value]) => {
                        const label = MovieLabels[key as keyof FormState]
                        // Если в ассоциативном объекте нет такого ключа - поле отображать не нужно
                        if (!label) return null

                        return (
                            <React.Fragment key={key}>
                                <div className={classes.key}>{label}</div>
                                {/* Если ключ - дата добавления или обновления - ограничить возможность редактирования */}
                                {key !== 'createdAt' && key !== 'updatedAt' ?
                                    <Input
                                        value={value}
                                        setValue={(newValue) => handleChange(key as keyof FormState, newValue)}
                                        className={classes.value}
                                    />
                                    :
                                    <div className={classes.value}>{value}</div>
                                }
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MovieEditForm