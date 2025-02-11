import React, {FC, ReactNode, useState} from 'react';
import classes from './FilterWrapper.module.sass'
import ArrowSvg from '../../../../assets/arrow.svg'

interface FilterWrapperProps {
    defaultVisible?: boolean
    label: string
    children: ReactNode
}

const FilterWrapper: FC<FilterWrapperProps> = ({defaultVisible, label, children}) => {
    const [isVisible, setIsVisible] = useState(defaultVisible || false)

    return (
        <div className={classes.filterContainer}>
            <div
                onClick={() => setIsVisible((prev) => !prev)}
                className={classes.filterHeading}
            >
                <ArrowSvg
                    className={`${classes.filterIcon} ${isVisible? classes.active : ''}`}
                    width={"1.3rem"}
                    heigth={"0.65rem"}
                />
                {label}
            </div>
            {isVisible && children}
        </div>
    );
};

export default FilterWrapper;
