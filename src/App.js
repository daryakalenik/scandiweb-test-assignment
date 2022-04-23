/* eslint-disable no-lone-blocks */
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { graphql } from "react-apollo";
import { connect } from "react-redux";

import { GET_PRODUCTS } from "./query/query";
import { ADD_PRODUCTS } from "./ducks/main/reducer";

import NavBar from "./components/NavBar/NavBar";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";

import "./App.scss";

class App extends React.Component {
  getData() {
    this.props.ADD_PRODUCTS(this.props.data.category.products);
  }

  componentDidUpdate() {
    {
      this.props.data.category &&
      this.props.reduxState.main.products.length === 0
        ? this.getData()
        : console.log("");
    }
  }
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

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_PRODUCTS: (value) => {
      dispatch(ADD_PRODUCTS(value));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

const AppWithData = graphql(GET_PRODUCTS, {
  options: {},
})(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppWithData);
