import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import CatalogPage from "./pages/CatalogPage.tsx";
import MoviePage from "./pages/MoviePage.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<MainLayout />}>
                  <Route index element={<CatalogPage />} />
                  <Route path=':id' element={<MoviePage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
