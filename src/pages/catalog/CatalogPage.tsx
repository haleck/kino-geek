import React from 'react';
import Sidebar from "../../modules/sidebar/components/Sidebar/Sidebar.tsx";
import classes from './CatalogPage.module.sass'
import MoviesList from "../../modules/moviesList";

const CatalogPage = () => {
    return (
        <div className={classes.catalogContainer}>
            <Sidebar />
            <MoviesList />
        </div>
    );
};

export default CatalogPage;