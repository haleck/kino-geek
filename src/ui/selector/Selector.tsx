import React, {FC} from 'react';
import classes from './Selector.module.sass'

interface SelectFilterProps {
    options: string[]
    selectedOption: string
    onSelectOption: (option: string) => void
    firstOptionDisabled?: boolean
    selectClassName?: string
}

const Selector: FC<SelectFilterProps> = ({
        options,
        selectedOption,
        onSelectOption,
        firstOptionDisabled,
        selectClassName,
        ...props
    }) => {

    return (
        <div className={classes.filterContainer} {...props}>
            <select value={selectedOption} onChange={(e)=>onSelectOption(e.target.value)} className={selectClassName}>
                {options.map((option, index) => (
                    <option key={index} value={option} disabled={index === 0 && firstOptionDisabled}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Selector;
