import React, { useState } from 'react';
import classes from './RangeFilter.module.sass'
import {YearRange} from "../../types.ts";

interface RangeFilterProps {
    minValue?: number
    maxValue?: number
    onChange: (range: YearRange) => void
}

const RangeFilter: React.FC<RangeFilterProps> = ({minValue, maxValue, onChange}) => {
    const [min, setMin] = useState<string>("")
    const [max, setMax] = useState<string>("")

    const handleRangeChange = (value: string, type: 'min' | 'max') => {
        if (type === 'min') {
            setMin(value)
            onChange({from: Number(value), to: Number(max)})
        } else {
            setMax(value)
            onChange({from: Number(min), to: Number(value)})
        }
    }

    return (
        <div className={classes.filterContainer}>
            <input
                className={classes.filterInput}
                type="number"
                value={min}
                onChange={(e)=>handleRangeChange(e.target.value, 'min')}
                placeholder={`От ${minValue || ""}`}
                min={minValue}
            />
            -
            <input
                className={classes.filterInput}
                type="number"
                value={max}
                onChange={(e)=>handleRangeChange(e.target.value, 'max')}
                placeholder={`До ${maxValue || ""}`}
                max={maxValue}
            />
        </div>
    );
};

export default RangeFilter;
