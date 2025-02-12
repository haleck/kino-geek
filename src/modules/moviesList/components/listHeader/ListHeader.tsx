import React, {useState} from 'react';
import classes from "./ListHeader.module.sass";
import Button from "../../../../ui/button/Button.tsx";
import Selector from "../../../../ui/selector/Selector.tsx";
import {Sorting} from "../../../../types/sorting.ts";

type SortingOption = {
    label: string,
    value: keyof typeof Sorting | ""
}

enum sortFields {
    'Сортировка'="",
    'По названию'="title",
    'По дате добавления'="createdAt",
    'По дате обновления'="updatedAt",
}

const sortingOptions: string[] = [
    'Сортировка',
    'По названию',
    'По дате добавления',
    'По дате обновления',
]

const ListHeader = () => {
    const [selectedOption, setSelectedOption] = useState<string>(sortingOptions[0])

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