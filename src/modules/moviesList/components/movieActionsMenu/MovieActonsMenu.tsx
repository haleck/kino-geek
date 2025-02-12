import React, {FC, useEffect} from 'react';
import classes from "./MovieActionsMenu.module.sass"
import Button from "../../../../ui/button/Button.tsx";
import {Position} from "../../types.ts";

interface MovieActionsMenuProps {
    position: Position
    onDelete: () => void
    onEdit: ()=>void
}

const MovieActionsMenu: FC<MovieActionsMenuProps> = ({position, onDelete, onEdit}) => {
    return (
        <div
            className={classes.actionMenu}
            style={{top: position.top, left: position.left}}
            data-role={'actions'}
        >
            <Button onClick={onEdit} size={"small"} variant={'accent'}>
                Редактировать
            </Button>
            <Button onClick={onDelete} size={"small"} variant={'accent'}>
                Удалить
            </Button>
        </div>
    );
};

export default MovieActionsMenu