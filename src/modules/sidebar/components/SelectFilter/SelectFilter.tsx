import React, {FC} from 'react';
import classes from './SelectFilter.module.sass'

interface SelectFilterProps {
    options: string[]
    selectedOption: string | null
    onSelectOption: (option: string) => void
}

const SelectFilter: FC<SelectFilterProps> = ({
        options,
        selectedOption,
        onSelectOption
    }) => {
    return (
        <div className={classes.filterContainer}>
            <select value={selectedOption ?? ''} onChange={(e)=>onSelectOption(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectFilter;
