import React, { useState } from 'react';
import SimpleFilter from '../SimpleFilter/SimpleFilter.tsx';
import classes from './Sidebar.module.sass';
import FilterWrapper from '../FilterWrapper/FilterWrapper.tsx';
import RangeFilter from '../RangeFilter/RangeFilter.tsx';
import DateFilter from '../DateFilter/DateFilter.tsx';
import {DateRange, YearRange} from "../../../../types/filters.ts";
import Selector from "../../../../ui/selector/Selector.tsx";
import movieService from "../../../../services/MovieService.ts";
import {observer} from "mobx-react-lite";

const genreOptions = [
    'Все жанры',
    'Комедия',
    'Драма',
    'Экшен',
    'Фантастика',
    'Триллер',
    'Ужасы',
]

const initialAdvancedFilters = {
    genre: genreOptions[0] as string,
    releaseYearRange: { from: null, to: null } as YearRange,
    createdDateRange: { from: null, to: null } as DateRange,
    updatedDateRange: { from: null, to: null } as DateRange,
}

const initialSimpleFilters = [
    { label: 'Российские', value: 'russian', isActive: false },
    { label: 'Избранное', value: 'favorites', isActive: false },
    { label: 'Вышли в этом году', value: 'releasedThisYear', isActive: false }
]

const Sidebar = observer(() => {
    const [activeAdvancedFilters, setActiveAdvancedFilters] = useState(initialAdvancedFilters)
    const [activeSimpleFilters, setActiveSimpleFilters] = useState(initialSimpleFilters)

    const handleFilterChange = <K extends keyof typeof activeAdvancedFilters>(key: K, value: typeof activeAdvancedFilters[K]) => {
        setActiveAdvancedFilters((prev) => ({ ...prev, [key]: value }))
        movieService.setFilter(key, value)
    }

    const toggleSimpleFilter = (filterValue) => {
        setActiveSimpleFilters(prevFilters =>
            prevFilters.map(filter =>{
                if (filter.value === filterValue) {
                    movieService.setFilter(filterValue, !filter.isActive)
                    return { ...filter, isActive: !filter.isActive }
                } else {
                    return filter
                }
            })
        )
    }

    const advancedFiltersComponents = [
        {
            label: 'Жанры',
            component: (
                <Selector
                    options={genreOptions}
                    selectedOption={activeAdvancedFilters.genre}
                    onSelectOption={(genre)=>handleFilterChange('genre', genre)}
                />
            ),
            defaultVisible: true,
        },
        {
            label: 'Год выпуска',
            component: <RangeFilter onChange={(year) => handleFilterChange('releaseYearRange', year)} />,
            defaultVisible: true,
        },
        {
            label: 'Дата добавления',
            component: <DateFilter onChange={(date) => handleFilterChange('createdDateRange', date)} />,
            defaultVisible: false,
        },
        {
            label: 'Дата обновления',
            component: <DateFilter onChange={(date) => handleFilterChange('updatedDateRange', date)} />,
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
            {advancedFiltersComponents.map(({ label, component, defaultVisible }) => (
                <FilterWrapper key={label} defaultVisible={defaultVisible} label={label}>
                    {component}
                </FilterWrapper>
            ))}
        </div>
    );
});

export default Sidebar;
