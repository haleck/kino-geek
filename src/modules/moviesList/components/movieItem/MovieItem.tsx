import React, {FC, useState} from 'react';
import classes from './MovieItem.module.sass'
import {Movie} from "../../../../types/movie.ts";
import MovieCover from '../../../../assets/defaultMovieCover.png'
import StarSvg from '../../../../assets/star.svg'
import OptionsSvg from '../../../../assets/options.svg'
import movieService from "../../../../services/MovieService.ts";
import {IMovieActionsMenu} from "../../types.ts";
import {useNavigate} from "react-router-dom";

interface MovieItemProps {
    movie: Movie,
    index: number,
    changeActiveActionsMenu: (newActiveActionsMenu: IMovieActionsMenu) => void
}

const MovieItem: FC<MovieItemProps> = ({movie, index, changeActiveActionsMenu}) => {
    const [isFavorite, setIsFavorite] = useState(movie.isFavorite)

    const navigate = useNavigate()

    const addToFavorite = () => {
        movieService.updateMovie({...movie, isFavorite: !movie.isFavorite})
        setIsFavorite((prevState) => !prevState)
    }

    const handleOptionsClick = (event: React.MouseEvent): void => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        changeActiveActionsMenu({
            movie: movie,
            position: {
                top: rect.bottom + 10,
                left: rect.left,
            }
        });
    }

    const goToMoviePage = () => {
        navigate(`/${movie.id}`)
    }

    return (
        <div className={classes.item}>
            <h3 className={classes.itemIndex}>{index}</h3>
            <img src={MovieCover} alt="Обложка фильма" height={'110px'} width={"75px"}/>
            <div className={classes.itemDetails}>
                <div className={classes.itemFirstLine}>
                    <span className={classes.itemTitle} onClick={goToMoviePage}>{movie.title}</span>
                    <span className={classes.itemYear}>({movie.releaseYear})</span>
                    <span className={`${classes.itemFavorite} ${isFavorite? classes.active : ""}`} onClick={addToFavorite}>
                        <StarSvg style={isFavorite? {color: 'white'} : {}} />
                    </span>
                    <OptionsSvg className={classes.itemOptions} onClick={handleOptionsClick} data-role={'actionsSvg'}/>
                </div>
                <div>
                    <span className={classes.itemGenre}>{movie.genre}</span>
                    <span className={classes.itemProducer}>Режиссер: {movie.producer}</span>
                </div>
                <div className={classes.itemAnnotation}>{movie.annotation}</div>
                <div className={classes.itemRoles}>В ролях: {movie.actors}</div>
            </div>
        </div>
    );
};

export default MovieItem;