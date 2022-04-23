import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  CONVERT_TOTAL,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  CHANGE_CART_STATUS,
} from "../../../ducks/main/reducer";

import "./style.scss";

class MiniCart extends React.Component {
  render() {
    return (
      <div className="mini-cart">
        <h3 className="mini-cart__header">
          {(() => {
            switch (this.props.reduxState.main.cart.length) {
              case 1:
                return (
                  <>
                    <span className="mini-cart__header--bold">My Bag, </span>
                    {this.props.reduxState.main.cart.length} item
                  </>
                );

              case 0:
                return "Your cart is empty";
              default:
                return (
                  <>
                    <span className="mini-cart__header--bold">My Bag, </span>
                    {this.props.reduxState.main.cart.length} items
                  </>
                );
            }
          })()}
        </h3>
        <div className="mini-cart__products-wrapper">
          {this.props.reduxState.main.cart.length > 0
            ? this.props.reduxState.main.cart
                .filter((value, index, self) => {
                  return (
                    self.findIndex(
                      (v) =>
                        v.product.id === value.product.id &&
                        JSON.stringify(v.attributes) ===
                          JSON.stringify(value.attributes)
                    ) === index
                  );
                })
                .map((item) => {
                  return (
                    <div className="cart-product mini-cart__cart-product">
                      <div className="cart-product__text-block">
                        <p>{item.product.brand}</p>
                        <p>{item.product.name}</p>
                        <p>
                          {(() => {
                            switch (this.props.reduxState.main.currency) {
                              case "$":
                                return (
                                  <>
                                    {
                                      item.product.prices[
                                        item.product.prices.findIndex((i) => {
                                          return i.currency.symbol === "$";
                                        })
                                      ].currency.symbol
                                    }
                                    {
                                      item.product.prices[
                                        item.product.prices.findIndex((i) => {
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
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
                                            return i.currency.symbol === "£";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
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
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
                                            return i.currency.symbol === "A$";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
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
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
                                            return i.currency.symbol === "¥";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
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
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
                                            return i.currency.symbol === "₽";
                                          }),
                                        ]
                                      ].currency.symbol
                                    }
                                    {
                                      item.product.prices[
                                        [
                                          item.product.prices.findIndex((i) => {
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
                        <div className="cart-attributes cart-product__cart-attributes">
                          {this.props.reduxState.main.products
                            .find((pr) => {
                              return pr.id === item.product.id;
                            })
                            .attributes.map((atr) => {
                              return atr.type === "text" ? (
                                <div>
                                  <p className="cart-attributes__name">
                                    {atr.name}
                                  </p>
                                  {atr.items.map((atrItem) => {
                                    return (
                                      <span
                                        className={
                                          item.attributes[atr.name] ===
                                          atrItem.value
                                            ? "cart-attributes__text cart-attributes__text--active"
                                            : "cart-attributes__text"
                                        }
                                      >
                                        {atrItem.value}
                                      </span>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div>
                                  <p className="cart-attributes__name">
                                    {atr.name}
                                  </p>
                                  {atr.items.map((atrItem) => {
                                    return (
                                      <span
                                        style={{
                                          backgroundColor: atrItem.value,
                                        }}
                                        className={
                                          item.attributes[atr.name] ===
                                          atrItem.value
                                            ? "cart-attributes__swatch cart-attributes__swatch--active"
                                            : "cart-attributes__swatch"
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className="product-buttons cart-product__cart-buttons">
                        <div
                          value={item.product.id}
                          onClick={() => {
                            this.props.ADD_ITEM_TO_CART(item);
                          }}
                        >
                          +
                        </div>
                        <p className="product-buttons__count">
                          {
                            this.props.reduxState.main.cart.filter((value) => {
                              return (
                                value.product.id === item.product.id &&
                                JSON.stringify(value.attributes) ===
                                  JSON.stringify(item.attributes)
                              );
                            }).length
                          }
                        </p>
                        <div
                          value={item.product.id}
                          onClick={() => {
                            this.props.DELETE_ITEM_FROM_CART(item);
                          }}
                        >
                          -
                        </div>
                      </div>
                      <div
                        className="product-photo cart-product__product-photo"
                        style={{
                          backgroundImage: `url(${item.product.gallery[0]})`,
                        }}
                      ></div>
                    </div>
                  );
                })
            : null}
        </div>
        <div className="mini-cart-total mini-cart__total-block">
          <span className="mini-cart-total__header">Total</span>
          <span className="mini-cart-total__amount">
            {(() => {
              let total = 0;
              switch (this.props.reduxState.main.currency) {
                case "$":
                  total = this.props.reduxState.main.cart
                    .map((item) => {
                      return item.product.prices[0].amount;
                    })
                    .reduce((item, prev) => {
                      return item + prev;
                    }, 0);
                  this.props.CONVERT_TOTAL(total);
                  return total;
                case "£":
                  total = this.props.reduxState.main.cart
                    .map((item) => {
                      return item.product.prices[1].amount;
                    })
                    .reduce((item, prev) => {
                      return item + prev;
                    }, 0);
                  this.props.CONVERT_TOTAL(total);
                  return total;
                case "A$":
                  total = this.props.reduxState.main.cart
                    .map((item) => {
                      return item.product.prices[2].amount;
                    })
                    .reduce((item, prev) => {
                      return item + prev;
                    }, 0);
                  this.props.CONVERT_TOTAL(total);
                  return total;
                case "¥":
                  total = this.props.reduxState.main.cart
                    .map((item) => {
                      return item.product.prices[3].amount;
                    })
                    .reduce((item, prev) => {
                      return item + prev;
                    }, 0);
                  this.props.CONVERT_TOTAL(total);
                  return total;
                case "₽":
                  total = this.props.reduxState.main.cart
                    .map((item) => {
                      return item.product.prices[4].amount;
                    })
                    .reduce((item, prev) => {
                      return item + prev;
                    }, 0);
                  this.props.CONVERT_TOTAL(total);
                  return total;
                default:
                  return null;
              }
            })().toFixed(2)}
            {this.props.reduxState.main.currency}
          </span>
        </div>
        <div className="mini-cart-buttons mini-cart__mini-cart-buttons">
          <Link
            to="/cart"
            className="mini-cart-buttons__full-cart"
            onClick={() => {
              this.props.CHANGE_CART_STATUS();
            }}
          >
            VIEW BAG
          </Link>
          <button
            onClick={() => {
              this.props.reduxState.main.cart.length > 0
                ? alert("checking out")
                : console.log("");
            }}
            className={
              this.props.reduxState.main.cart.length === 0
                ? "mini-cart-buttons__check-out mini-cart-buttons__check-out disabled"
                : "mini-cart-buttons__check-out"
            }
          >
            CHECK OUT
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CONVERT_TOTAL: (value) => {
      dispatch(CONVERT_TOTAL(value));
    },
    ADD_ITEM_TO_CART: (value) => {
      dispatch(ADD_ITEM_TO_CART(value));
    },
    DELETE_ITEM_FROM_CART: (value) => {
      dispatch(DELETE_ITEM_FROM_CART(value));
    },
    CHANGE_CART_STATUS: () => {
      dispatch(CHANGE_CART_STATUS(""));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
