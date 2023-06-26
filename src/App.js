import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
import NotFoundBlock from "./components/NotFoundBlock/NotFoundBlock";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
export const AppContext = React.createContext();
function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
