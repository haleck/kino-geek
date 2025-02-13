import React, { useReducer } from 'react'
import classes from '../styles/GlobalMovieStyles.module.sass'
import Input from '../../../ui/Input/Input.tsx'
import {genreOptions, Movie} from '../../../types/movie.ts'
import { MovieLabels } from '../types/types.ts'
import Button from '../../../ui/button/Button.tsx'
import SaveSvg from '../../../assets/save.svg'
import CancelSvg from '../../../assets/cancel.svg'
import Cover from "../UI/Cover/Cover.tsx";
import FileUploadButton from "../UI/FileUploadButton/FileUploadButton.tsx";
import Selector from "../../../ui/selector/Selector.tsx";
import AutoResizeTextarea from "../../../ui/AutoResizeTextarea/AutoResizeTextarea.tsx";

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

    // Функция для рендеринга поля фильма
    const renderField = (key: keyof FormState, value: string | number | Date) => {
        const label = MovieLabels[key]

        // Если в ассоциативном объекте нет такого ключа - поле отображать не нужно
        if (!label) return null

        // Если ключ - дата добавления или обновления, отобразить только значение
        if (key === 'createdAt' || key === 'updatedAt') {
            return (
                <React.Fragment key={key}>
                    <div className={classes.key}>{label}</div>
                    <div className={classes.value}>{value}</div>
                </React.Fragment>
            )
        }

        // Если ключ - жанр, отобразить Selector
        if (key === 'genre') {
            return (
                <React.Fragment key={key}>
                    <div className={classes.key}>{label}</div>
                    <Selector
                        options={genreOptions}
                        selectedOption={value as string}
                        onSelectOption={(newValue) => handleChange(key, newValue)}
                        firstOptionDisabled={true}
                        selectClassName={classes.value}
                    />
                </React.Fragment>
            )
        }

        // Если ключ - аннотация, отобразить Textarea
        if (key === 'annotation') {
            return (
                <React.Fragment key={key}>
                    <div className={classes.key}>{label}</div>
                    <AutoResizeTextarea
                        text={String(value)}
                        setText={(newValue) => handleChange(key, newValue)}
                        maxLength={300}
                        className={classes.value}
                        handleEnter={(ref)=>ref.current.value.trim()}
                    />
                </React.Fragment>
            )
        }

        // Для остальных полей использовать Input
        return (
            <React.Fragment key={key}>
                <div className={classes.key}>{label}</div>
                <Input
                    value={String(value)}
                    setValue={(newValue) => handleChange(key, newValue)}
                    className={classes.value}
                    type={key==='releaseYear' ? 'number' : 'text'}
                />
            </React.Fragment>
        )
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
                    {Object.entries(formState).map(([key, value]) => renderField(key as keyof FormState, value))}
                </div>
            </div>
        </div>
    )
}

export default MovieEditForm