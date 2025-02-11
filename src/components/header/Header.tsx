import React, {useState} from 'react';
import classes from './Header.module.sass';
import Searchbar from "../../ui/searchbar";
import LogoSvg from "../../assets/logo.svg"
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>('')

    return (
        <header className={classes.header}>
            <div className={classes.headerInner}>
                <LogoSvg
                    className={classes.headerLogo}
                    onClick={()=>navigate('/')}
                    width={'21.9rem'}
                    height={'5.1rem'}
                />
                <Searchbar
                    value={searchQuery}
                    setValue={(e)=>setSearchQuery(e.target.value)}
                    placeholder={"Название, режиссер, актер, аннотация"}
                />
            </div>
        </header>
    );
};

export default Header;