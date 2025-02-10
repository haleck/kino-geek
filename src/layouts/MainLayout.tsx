import React from 'react';
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <header>
                Шапка
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;