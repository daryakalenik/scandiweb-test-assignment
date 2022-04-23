import React from "react";
import { connect } from "react-redux";
import sanitize from "sanitize-html";

import { ADD_ITEM_TO_CART, CHANGE_PATHNAME } from "../../ducks/main/reducer";

import "./style.scss";

class ProductPage extends React.Component {
  state = {
    itemId: "",
    itemAttributes: {},
    currentPhotoIndex: 0,
    clickWithNoAttributes: false,
  };

  componentDidMount() {
    this.setState({ itemId: window.location.pathname.slice(1).split("/")[1] });
    this.props.CHANGE_PATHNAME(window.location.pathname.slice(1).split("/")[1]);
  }

  render() {
    return (
      <div className="product">
        {this.state.clickWithNoAttributes ? (
          <p className="alert-block">
            please select all attributes before adding to the cart
          </p>
        ) : null}
        <div className="product__wrapper">
          <div className="images-block product__images-block">
            {this.props.reduxState.main.products.length > 0
              ? this.props.reduxState.main.products.map((item) => {
                  return item.id === this.state.itemId
                    ? item.gallery.map((photo, index, arr) => {
                        return (
                          <div
                            key={index}
                            id={index}
                            onClick={(e) => {
                              this.setState({ currentPhotoIndex: e.target.id });
                            }}
                            className="images-block__item"
                            style={{
                              backgroundImage: `url(${photo})`,
                            }}
                          />
                        );
                      })
                    : null;
                })
              : null}
          </div>
          <div
            className="product__main-image"
            style={
              this.props.reduxState.main.products.length > 0
                ? this.props.reduxState.main.products
                    .map((item) => {
                      return item.id === this.state.itemId
                        ? {
                            backgroundImage: `url(${
                              item.gallery[this.state.currentPhotoIndex]
                            })`,
                          }
                        : "";
                    })
                    .filter((item) => {
                      return item;
                    })[0]
                : null
            }
          />
          <div className="text-block product__text-block">
            <p className="text-block__brand">
              {this.props.reduxState.main.products.length > 0
                ? this.props.reduxState.main.products.map((item) => {
                    return item.id === this.state.itemId ? (
                      <span>{item.brand}</span>
                    ) : null;
                  })
                : null}
            </p>
            <p className="text-block__name">
              {this.props.reduxState.main.products.length > 0
                ? this.props.reduxState.main.products.map((item) => {
                    return item.id === this.state.itemId ? (
                      <span>{item.name}</span>
                    ) : null;
                  })
                : null}
            </p>
            <div className="attributes-block text-block__attributes-block">
              {this.props.reduxState.main.products.length > 0
                ? this.props.reduxState.main.products.map((item) => {
                    return item.id === this.state.itemId ? (
                      <>
                        {item.attributes.map((item) => {
                          return item.type === "text" ? (
                            <div>
                              <p className="attributes-block__name">
                                {item.name.toUpperCase()}
                              </p>
                              <div>
                                {item.items.map((att) => {
                                  return (
                                    <div
                                      name={item.name}
                                      className={
                                        this.state.itemAttributes[item.name] ===
                                        att.value
                                          ? "attributes-block__text attributes-block__text--active"
                                          : "attributes-block__text"
                                      }
                                      value={att.value}
                                      onClick={(e) => {
                                        this.setState((prevState) => {
                                          return {
                                            itemAttributes: {
                                              ...prevState.itemAttributes,
                                              [e.target.getAttribute("name")]:
                                                e.target.getAttribute("value"),
                                            },
                                          };
                                        });
                                      }}
                                    >
                                      {att.value}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="attributes-block__name">
                                {item.name.toUpperCase()}
                              </p>
                              <div className="attributes-block__swatches">
                                {item.items.map((att) => {
                                  return (
                                    <div
                                      name={item.name}
                                      className={
                                        this.state.itemAttributes[item.name] ===
                                        att.value
                                          ? "attributes-block__swatch attributes-block__swatch--active"
                                          : "attributes-block__swatch"
                                      }
                                      onClick={(e) => {
                                        this.setState((prevState) => {
                                          return {
                                            itemAttributes: {
                                              ...prevState.itemAttributes,
                                              [e.target.getAttribute("name")]:
                                                e.target.getAttribute("value"),
                                            },
                                          };
                                        });
                                      }}
                                      value={att.value}
                                      style={{ backgroundColor: att.value }}
                                    ></div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : null;
                  })
                : null}
            </div>
            <div className="price-block product__price-block">
              <p className="price-block__header">PRICE:</p>
              {this.props.reduxState.main.products.length > 0
                ? this.props.reduxState.main.products.map((item) => {
                    return item.id === this.state.itemId ? (
                      <p className="price-block__price">
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
                    ) : null;
                  })
                : null}
            </div>
            <div
              onClick={() => {
                return this.props.reduxState.main.products.find((item) => {
                  return item.id === this.state.itemId;
                }).attributes.length ===
                  Object.keys(this.state.itemAttributes).length
                  ? (this.props.ADD_ITEM_TO_CART({
                      product: this.props.reduxState.main.products.find(
                        (item) => {
                          return item.id === this.state.itemId;
                        }
                      ),
                      attributes: this.state.itemAttributes,
                    }),
                    this.setState({ clickWithNoAttributes: false }))
                  : this.setState({ clickWithNoAttributes: true });
              }}
              className={
                this.props.reduxState.main.products.length > 0
                  ? this.props.reduxState.main.products
                      .map((item) => {
                        return item.id === this.state.itemId
                          ? item.inStock
                            ? "product-page__button--active"
                            : "product-page__button--disabled"
                          : "";
                      })
                      .filter((item) => {
                        return item;
                      })
                  : null
              }
            >
              {this.props.reduxState.main.products.length > 0
                ? this.props.reduxState.main.products
                    .map((item) => {
                      return item.id === this.state.itemId
                        ? item.inStock
                          ? "ADD TO CART"
                          : "OUT OF STOCK"
                        : "";
                    })
                    .filter((item) => {
                      return item;
                    })
                : null}
            </div>

            {this.props.reduxState.main.products.length > 0
              ? this.props.reduxState.main.products.map((item) => {
                  return item.id === this.state.itemId ? (
                    <div
                      className="product-page__description-block"
                      dangerouslySetInnerHTML={{
                        __html: sanitize(item.description),
                      }}
                    ></div>
                  ) : null;
                })
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
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
