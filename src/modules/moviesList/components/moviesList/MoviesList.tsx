import React, {useState} from 'react';
import classes from './moviesList.module.sass'
import ListHeader from "../listHeader/ListHeader.tsx";
import movieService from "../../../../services/MovieService.ts";
import {observer} from "mobx-react-lite";
import MovieItem from "../movieItem/MovieItem.tsx";
import useMovieActionsMenu from "../../hooks/useMovieActionsMenu.ts";
import MovieActionsMenu from "../movieActionsMenu/MovieActonsMenu.tsx";
import ConfirmationModal from "../../../../components/confirmationModal/ConfirmationModal.tsx";
import {useNavigate} from "react-router-dom";

const MoviesList = observer(() => {
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const movies = movieService.getMovies()
    const {activeActionsMenu, changeActiveActionsMenu} = useMovieActionsMenu()

    const navigate = useNavigate()

    const deleteMovie = (id) => {
        movieService.deleteMovie(id)
        setShowConfirmationModal(false)
    }

    const editMovie = (id) => {
        navigate(`/${id}`)
    }

    return (
        <div className={classes.listContainer}>
            <div className={classes.listHeaderWrapper}>
                <ListHeader />
            </div>
            {/*<button onClick={()=>movieService.addTestMovies()}>add</button>*/}
            {/*<button onClick={()=>movieService.deleteAllMovies()}>remove</button>*/}
            <div className={classes.listItems}>
                {movies.length > 0?
                    movies.map((movie, index)=>
                        <MovieItem
                            key={movie.id}
                            movie={movie}
                            index={index+1}
                            changeActiveActionsMenu={changeActiveActionsMenu}
                        />
                    )
                    :
                    <p>Фильмы не найдены</p>
                }
            </div>
            {showConfirmationModal &&
                <ConfirmationModal
                    isOpen={showConfirmationModal}
                    title="Подтверждение удаления"
                    message={`Вы уверены, что хотите удалить фильм "${activeActionsMenu.movie?.title}"?`}
                    onConfirm={() => deleteMovie(activeActionsMenu.movie?.id)}
                    onCancel={()=> setShowConfirmationModal(false)}
                />
            }
            {activeActionsMenu.movie && activeActionsMenu.position && (
                <MovieActionsMenu
                    position={activeActionsMenu.position}
                    onDelete={() => setShowConfirmationModal(true)}
                    onEdit={()=>editMovie(activeActionsMenu.movie?.id)}
                />
            )}
        </div>
    );
});

export default MoviesList;