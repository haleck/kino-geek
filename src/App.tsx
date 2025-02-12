import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/main/MainLayout.tsx";
import MoviePage from "./pages/movie/MoviePage.tsx";
import CatalogPage from "./pages/catalog/CatalogPage.tsx";

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
