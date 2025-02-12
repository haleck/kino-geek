import React, {useState} from 'react';
import classes from "./ListHeader.module.sass";
import Button from "../../../../ui/button/Button.tsx";
import Selector, {Option} from "../../../../ui/selector/Selector.tsx";
import {Sorting} from "../../../../types/sorting.ts";

type SortingOption = {
    label: string,
    value: keyof typeof Sorting | ""
}

const sortingOptions: SortingOption[] = [
    {label: 'Сортировка', value: ""},
    {label: 'По названию', value: "title"},
    {label: 'По дате добавления', value: "createdAt"},
    {label: 'По дате обновления', value: "updatedAt"},
]

const ListHeader = () => {
    const [selectedOption, setSelectedOption] = useState<Option>(sortingOptions[0])

    return (
        <header className={classes.headerContainer}>
            <div className={classes.headerHeading}>
                Все фильмы
            </div>
            <Button variant={'accent'}>
                Добавить
            </Button>
            <Selector
                options={sortingOptions}
                selectedOption={selectedOption}
                onSelectOption={(sorting)=>setSelectedOption(sorting)}
                firstOptionDisabled={true}
                style={{width: 'auto', flexShrink: 0}}
            />
        </header>
    );
};

export default ListHeader;