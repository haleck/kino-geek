import React, {FC} from 'react';
import classes from './Selector.module.sass'

export type Option = {
    label: string
    value: string
}
interface SelectFilterProps {
    options: Option[]
    selectedOption: Option
    onSelectOption: (option: Option) => void
    firstOptionDisabled?: boolean
}

const Selector: FC<SelectFilterProps> = ({
        options,
        selectedOption,
        onSelectOption,
        firstOptionDisabled,
        ...props
    }) => {
    const handleChangeOption = (optionValue) => {
        const option = options.filter((option)=>option.value === optionValue)[0]
        onSelectOption(option)
    }

    return (
        <div className={classes.filterContainer} {...props}>
            <select value={selectedOption.value ?? ''} onChange={(e)=>handleChangeOption(e.target.value)}>
                {options.map((option, index) => (
                    <option key={option.value} value={option.value} disabled={index === 0 && firstOptionDisabled}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Selector;
