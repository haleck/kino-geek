import React, {FC, useState} from 'react';
import classes from '../styles/GlobalMovieStyles.module.sass'
import Cover from "../UI/Cover/Cover.tsx";
import {Movie} from "../../../types/movie.ts";
import ConfirmationModal from "../../../components/confirmationModal/ConfirmationModal.tsx";
import Button from "../../../ui/button/Button.tsx";
import StarSvg from "../../../assets/star.svg";
import DeleteSvg from "../../../assets/delete.svg";
import EditSvg from "../../../assets/edit.svg";
import movieService from "../../../services/MovieService.ts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Mode} from "./MovieDetails.tsx";
import {MovieLabels} from "../types/types.ts";

interface MovieViewProps {
    movie: Movie
    setMode: (mode: Mode) => void
}

const MovieView: FC<MovieViewProps> = observer(({movie, setMode}) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [isFavorite, setIsFavorite] = useState(movie.isFavorite)

    const navigate = useNavigate()

    const handleDeleteMovie = () => {
        movieService.deleteMovie(movie.id)
        navigate('/')
    }

    const handleToggleFavorite = () => {
        movieService.updateMovie({...movie, isFavorite: !movie.isFavorite})
        setIsFavorite(prevState => !prevState)
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.heading}>
                        {movie.title}
                </div>
                <div className={classes.actions}>
                    <Button
                        variant={isFavorite ? 'accent' : 'std'}
                        onClick={handleToggleFavorite}
                    >
                        В избранное <StarSvg/>
                    </Button>

                    <Button onClick={() => setShowConfirmationModal(true)}>
                        Удалить <DeleteSvg/>
                    </Button>
                    <Button onClick={() => setMode('edit')}>
                        Редактировать <EditSvg/>
                    </Button>
                </div>
            </div>
            <div className={classes.cover}>
                <Cover/>
            </div>
            <div className={classes.content}>
                <div className={classes.heading}>О фильме</div>
                <div className={classes.description}>
                    {/*Рендер полей объекта фильма*/}
                    {Object.entries(movie).map(([key, value]) => {
                        const label = MovieLabels[key as keyof Movie]
                        {/*Если в ассоциативном объекте нет такого ключа - поле отображать не нужно */
                        }
                        if (!label) return null
                        return (
                            <React.Fragment key={key}>
                                <div className={classes.key}>{label}</div>
                                <div className={classes.value}>{value}</div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>

            {showConfirmationModal &&
                <ConfirmationModal
                    isOpen={showConfirmationModal}
                    title="Подтверждение удаления"
                    message={`Вы уверены, что хотите удалить фильм "${movie!.title}"?`}
                    onConfirm={handleDeleteMovie}
                    onCancel={() => setShowConfirmationModal(false)}
                />
            }
        </div>
    );
});

export default MovieView;