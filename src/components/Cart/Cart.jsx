import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  CHANGE_PATHNAME,
  CONVERT_TOTAL,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  CHANGE_CART_STATUS,
} from "../../ducks/main/reducer";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import "./style.scss";

class Cart extends React.Component {
  componentDidMount() {
    this.props.CHANGE_PATHNAME(window.location.pathname.slice(1));
  }

  render() {
    console.log(this.props.reduxState.main);
    return (
      <div className="cart">
        <h3 className="cart__header">
          {this.props.reduxState.main.path.toUpperCase()}
        </h3>
        <div className="cart__products-wrapper">
          {this.props.reduxState.main.cart.length > 0 ? (
            <div>
              {this.props.reduxState.main.cart
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
                    <div className="cart-product cart__cart-product">
                      <div className="cart-product__text-block">
                        <p>{item.product.brand}</p>
                        <Link to={item.product.id}>{item.product.name}</Link>
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
                      <Carousel
                        className="product-photo cart-product__product-photo"
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                      >
                        {item.product.gallery.map((photo) => {
                          return (
                            <div>
                              <img src={photo} alt="product" />
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>
                  );
                })}
              <div className="total-block cart__total-block">
                <p>
                  Tax:
                  <span className="total-block__tax">
                    {(() => {
                      switch (this.props.reduxState.main.currency) {
                        case "$":
                          return " $15.00";

                        case "£":
                          return " £10.83";

                        case "A$":
                          return " A$19.44";

                        case "¥":
                          return " ¥1627.62";

                        case "₽":
                          return " ₽1139.76";
                        default:
                          return null;
                      }
                    })()}
                  </span>
                </p>
                <p>
                  {`Qty: `}
                  <span class="total-block_qty">
                    {this.props.reduxState.main.cart.length}
                  </span>
                </p>
                <p className="total-block__header">
                  Total:{" "}
                  <span className="total-block__amount">
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
                </p>

                <button
                  onClick={() => {
                    alert("checking out");
                  }}
                  className="check-out cart-buttons-block__check-out"
                >
                  ORDER
                </button>
              </div>
            </div>
          ) : (
            <p className="cart-product__text-block">Your cart is empty</p>
          )}{" "}
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
    CHANGE_PATHNAME: (value) => {
      dispatch(CHANGE_PATHNAME(value));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
