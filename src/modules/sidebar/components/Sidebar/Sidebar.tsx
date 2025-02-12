import React, { useState } from 'react';
import SimpleFilter from '../SimpleFilter/SimpleFilter.tsx';
import classes from './Sidebar.module.sass';
import FilterWrapper from '../FilterWrapper/FilterWrapper.tsx';
import RangeFilter from '../RangeFilter/RangeFilter.tsx';
import DateFilter from '../DateFilter/DateFilter.tsx';
import {DateRange, YearRange} from "../../../../types/filters.ts";
import Selector, {Option} from "../../../../ui/selector/Selector.tsx";

const genreOptions = [
    {label: 'Все жанры', value: 'all'},
    {label: 'Комедии', value: 'comedy'},
    {label: 'Драма', value: 'drama'},
    {label: 'Экшен', value: 'action'},
]

const initialAdvancedFilters = {
    category: genreOptions[0] as Option,
    announceYear: { from: null, to: null } as YearRange,
    uploadDate: { from: null, to: null } as DateRange,
    updateDate: { from: null, to: null } as DateRange,
}

const initialSimpleFilters = [
    { label: 'Российские', value: 'russian', isActive: false },
    { label: 'Избранное', value: 'favorites', isActive: false },
    { label: 'Не избранное', value: 'notFavorites', isActive: false },
    { label: 'Вышли в этом году', value: 'releasedThisYear', isActive: false }
]

const Sidebar = () => {
    const [filters, setFilters] = useState(initialAdvancedFilters)
    const [activeSimpleFilters, setActiveSimpleFilters] = useState(initialSimpleFilters)

    const handleFilterChange = <K extends keyof typeof filters>(key: K, value: typeof filters[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const toggleSimpleFilter = (filterValue: string) => {
        setActiveSimpleFilters(prevFilters =>
            prevFilters.map(filter =>
                filter.value === filterValue
                    ? { ...filter, isActive: !filter.isActive }
                    : filter
            )
        )
    }

    const advancedFilters = [
        {
            label: 'Жанры',
            component: (
                <Selector
                    options={genreOptions}
                    selectedOption={filters.category}
                    onSelectOption={(genre)=>handleFilterChange('category', genre)}
                />
            ),
            defaultVisible: true,
        },
        {
            label: 'Год выпуска',
            component: <RangeFilter onChange={(year) => handleFilterChange('announceYear', year)} />,
            defaultVisible: true,
        },
        {
            label: 'Дата добавления',
            component: <DateFilter onChange={(date) => handleFilterChange('uploadDate', date)} />,
            defaultVisible: false,
        },
        {
            label: 'Дата обновления',
            component: <DateFilter onChange={(date) => handleFilterChange('updateDate', date)} />,
            defaultVisible: false,
        }
    ]

    return (
        <div className={classes.sidebar}>
            <div className={classes.simpleFilters}>
                {initialSimpleFilters.map(({ label, value, isActive }) => (
                    <SimpleFilter
                        key={value}
                        label={label}
                        isActive={isActive}
                        onClick={() => toggleSimpleFilter(value)}
                    />
                ))}
            </div>
            {advancedFilters.map(({ label, component, defaultVisible }) => (
                <FilterWrapper key={label} defaultVisible={defaultVisible} label={label}>
                    {component}
                </FilterWrapper>
            ))}
        </div>
    );
};

export default Sidebar;
