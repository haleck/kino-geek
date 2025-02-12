import {useEffect, useState} from "react";
import {IMovieActionsMenu} from "../types.ts";

/**
 * Хук для управления состоянием контекстного меню действий для фильма.
 * Позволяет открывать, закрывать и переключать активное меню, а также автоматически закрывать его при клике вне целевых элементов.
 *
 * @returns {{
 *  *   activeActionsMenu: IMovieActionsMenu;
 *  *   changeActiveActionsMenu: (newActionMenu: IMovieActionsMenu) => void;
 *  * }}
 * - `activeActionsMenu` - Текущее активное меню действий.
 * - `changeActiveActionsMenu` - Функция для переключения активного меню.
 */

const useMovieActionsMenu = () => {
    const [activeActionsMenu, setActiveActionsMenu] = useState<IMovieActionsMenu>({movie: null, position: null});
    const changeActiveActionsMenu = (newActionMenu: IMovieActionsMenu) => {
        setActiveActionsMenu((prev: IMovieActionsMenu) => {
            if (prev.movie?.id === newActionMenu.movie?.id) {
                return {movie: null, position: null};
            }
            return {...newActionMenu};
        });
    };

    const closeActionsMenu = (event) => {
        const ignoreElements = ['actions', 'actionsSvg', 'modal'];
        if (ignoreElements.some(role => event.target.closest(`[data-role="${role}"]`))) {
            return;
        }
        changeActiveActionsMenu({movie: null, position: null});
    };

    useEffect(() => {
        document.addEventListener('click', closeActionsMenu);
        return () => {
            document.removeEventListener('click', closeActionsMenu);
        };
    }, []);

    return {
        activeActionsMenu,
        changeActiveActionsMenu
    }
}

export default useMovieActionsMenu;