import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../../components/header";
import classes from "./MainLayout.module.sass"

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className={classes.mainContainer}>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;