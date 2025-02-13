import React from 'react';
import classes from './Cover.module.sass'

interface CoverProps {
    image?: string
}

const Cover = ({image}) => {
    return (
        <>
            {image?
                <div>
                    Картинка
                </div>
                :
                <div className={classes.imageTemplate}>
                    Без обложки
                </div>
            }
        </>
    );
};

export default Cover;