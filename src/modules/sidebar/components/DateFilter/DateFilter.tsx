import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './DateFilter.module.sass';
import {DateRange} from "../Sidebar/Sidebar.tsx";

interface DateFilterProps {
    onChange?: (dates: DateRange) => void
}

const DateFilter: FC<DateFilterProps> = ({ onChange }) => {
    const [from, setFrom] = useState<Date | null>(null)
    const [to, setTo] = useState<Date | null>(null)

    const handleDateChange = (date: Date | null, type: 'from' | 'to') => {
        if (type === 'from') {
            setFrom(date)
            if (onChange) onChange({ from: date, to })
        } else {
            setTo(date)
            if (onChange) onChange({ from, to: date })
        }
    };

    return (
        <div className={classes.filterContainer}>
            <DatePicker
                className={classes.filterInput}
                selected={from}
                onChange={(date) => handleDateChange(date, 'from')}
                selectsStart
                startDate={from}
                endDate={to}
                dateFormat="dd.MM.yyyy"
                placeholderText="От "
                portalId="root-datepicker"
            />
            -
            <DatePicker
                className={classes.filterInput}
                selected={to}
                onChange={(date) => handleDateChange(date, 'to')}
                selectsEnd
                startDate={from}
                endDate={to}
                minDate={from}
                dateFormat="dd.MM.yyyy"
                placeholderText="До "
                portalId="root-datepicker"
            />
        </div>
    );
};

export default DateFilter;
