import React, {FC, useState} from 'react';
import classes from "./SimpleFilter.module.sass"

interface SimpleFilterProps {
    isActive?: boolean
    label: string
    onClick: () => void
}

const SimpleFilter: FC<SimpleFilterProps> = ({isActive, label, onClick}) => {
    const [active, setActive] = useState<boolean>(isActive || false)

    const handleToggleFilter = () => {
        setActive(prevState => !prevState)
        onClick()
    }

    return (
        <div
            className={`${classes.simpleFilter} ${active? classes.active : ''}`}
            onClick={handleToggleFilter}
        >
            {label}
        </div>
    );
};

export default SimpleFilter;