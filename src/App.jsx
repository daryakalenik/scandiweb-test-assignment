import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="App__container">
          <Routes>
            <Route path="/" element={<Navigate replace to="/all" />} />
            <Route path="/:category" element={<ProductsPage />} />
            <Route path="/:category/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
