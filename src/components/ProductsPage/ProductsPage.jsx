/* eslint-disable no-lone-blocks */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  ADD_ITEM_TO_CART,
  CHANGE_PATHNAME,
  ADD_PRODUCTS,
} from "../../ducks/main/reducer";

import "./style.scss";

class ProductsPage extends React.Component {
  state = { clickedOnItemWithAttributes: false };

  componentDidMount() {
    this.props.CHANGE_PATHNAME(window.location.pathname.slice(1));
  }

  render() {
    console.log(this.props.reduxState.main);
    return (
      <div className="category">
        <div className="category__wrapper">
          {this.state.clickedOnItemWithAttributes ? (
            <p className="alert-block">
              please go to the product page, select the attributes and add item
              to the cart
            </p>
          ) : null}
          <h1 className="category__title">{this.props.reduxState.main.path}</h1>
          <div className="products-block category__products-block">
            {this.props.reduxState.main.products
              ? this.props.reduxState.main.path === "all"
                ? this.props.reduxState.main.products.map((item) => {
                    return (
                      <div
                        className="item products-block__item"
                        key={item.id}
                        style={
                          item.inStock
                            ? {}
                            : {
                                opacity: 0.2,
                              }
                        }
                      >
                        <div
                          to={item.id}
                          className="item-img"
                          style={{
                            backgroundImage: `url(${item.gallery[0]})`,
                          }}
                          onMouseEnter={
                            item.inStock
                              ? (e) => {
                                  e.currentTarget.className =
                                    "item-img item-img--active";
                                }
                              : null
                          }
                          onMouseLeave={(e) => {
                            e.currentTarget.className = "item-img";
                          }}
                        >
                          <span
                            onClick={(e) => {
                              return item.attributes.length !== 0
                                ? this.setState({
                                    clickedOnItemWithAttributes: true,
                                  })
                                : (this.props.ADD_ITEM_TO_CART({
                                    product: item,
                                    itemAttributes: item.attributes,
                                  }),
                                  this.setState({
                                    clickedOnItemWithAttributes: false,
                                  }));
                            }}
                          ></span>
                          {item.inStock ? " " : <p>OUT OF STOCK</p>}
                        </div>

                        <Link
                          to={item.id}
                          onClick={(e) => {
                            this.props.CHANGE_PATHNAME(item.id);
                          }}
                          className="item__name"
                        >
                          {item.brand} {item.name}
                        </Link>
                        <p className="item__cost">
                          {(() => {
                            switch (this.props.reduxState.main.currency) {
                              case "$":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        item.prices.findIndex((i) => {
                                          return i.currency.symbol === "$";
                                        })
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        item.prices.findIndex((i) => {
                                          return i.currency.symbol === "$";
                                        })
                                      ].amount
                                    }
                                  </>
                                );

                              case "£":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "£";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "£";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );

                              case "A$":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "A$";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "A$";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );

                              case "¥":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "¥";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "¥";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );
                              case "₽":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "₽";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "₽";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );

                              default:
                                return null;
                            }
                          })()}
                        </p>
                      </div>
                    );
                  })
                : this.props.reduxState.main.products
                    .filter(
                      (item) =>
                        item.category === this.props.reduxState.main.path
                    )
                    .map((item) => (
                      <div
                        className="item products-block__item"
                        key={item.id}
                        style={
                          item.inStock
                            ? {}
                            : {
                                opacity: 0.2,
                              }
                        }
                      >
                        <div
                          className="item-img"
                          style={{
                            backgroundImage: `url(${item.gallery[0]})`,
                          }}
                          onMouseEnter={
                            item.inStock
                              ? (e) => {
                                  e.currentTarget.className =
                                    "item-img item-img--active";
                                }
                              : null
                          }
                          onMouseLeave={(e) => {
                            e.currentTarget.className = "item-img";
                          }}
                        >
                          <span
                            onClick={(e) => {
                              return item.attributes.length !== 0
                                ? this.setState({
                                    clickedOnItemWithAttributes: true,
                                  })
                                : (this.props.ADD_ITEM_TO_CART({
                                    product: item,
                                    itemAttributes: item.attributes,
                                  }),
                                  this.setState({
                                    clickedOnItemWithAttributes: false,
                                  }));
                            }}
                          ></span>
                          {item.inStock ? " " : <p>OUT OF STOCK</p>}
                        </div>

                        <Link
                          to={item.id}
                          onClick={(e) => {
                            this.props.CHANGE_PATHNAME(item.id);
                          }}
                          className="item__name"
                        >
                          {item.brand} {item.name}
                        </Link>
                        <p className="item__cost">
                          {(() => {
                            switch (this.props.reduxState.main.currency) {
                              case "$":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        item.prices.findIndex((i) => {
                                          return i.currency.symbol === "$";
                                        })
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        item.prices.findIndex((i) => {
                                          return i.currency.symbol === "$";
                                        })
                                      ].amount
                                    }
                                  </>
                                );

                              case "£":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "£";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "£";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );

                              case "A$":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "A$";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "A$";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );

                              case "¥":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "¥";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "¥";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );
                              case "₽":
                                return (
                                  <>
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "₽";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.prices[
                                        [
                                          item.prices.findIndex((i) => {
                                            return i.currency.symbol === "₽";
                                          }),
                                        ]
                                      ].amount
                                    }
                                  </>
                                );

                              default:
                                return null;
                            }
                          })()}
                        </p>
                      </div>
                    ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_ITEM_TO_CART: (value) => {
      dispatch(ADD_ITEM_TO_CART(value));
    },
    CHANGE_PATHNAME: (value) => {
      dispatch(CHANGE_PATHNAME(value));
    },

    ADD_PRODUCTS: (value) => {
      dispatch(ADD_PRODUCTS(value));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
