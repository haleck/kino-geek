import React, {ChangeEvent, FC, useState} from 'react';
import classes from "./Searchbar.module.sass";
import SearchSvg from "@assets/search.svg";

interface SearchbarProps {
    value: string,
    setValue: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string
}

const Searchbar: FC<SearchbarProps> = ({value, setValue, placeholder}) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={`${classes.searchbarContainer} ${isFocused ? classes.focused : ''}`}>
            <input
                className={classes.searchbarInput}
                value={value}
                onChange={setValue}
                placeholder={placeholder}
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <SearchSvg width={'2.2rem'} height={'2.2rem'} />
        </div>
    );
};

export default Searchbar;
