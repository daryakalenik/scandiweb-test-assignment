import React from "react";
import { connect } from "react-redux";
import sanitize from "sanitize-html";
import { GET_PRODUCT } from "../../query/query";
import { Query } from "react-apollo";

import { ADD_ITEM_TO_CART, CHANGE_PATHNAME } from "../../ducks/main/reducer";
import { productPagePriceSwitcher } from "../../helpers/productPagePriceSwitcher";

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
      <>
        <Query query={GET_PRODUCT} variables={{ id: this.state.itemId }}>
          {({ data }) => {
            return data ? (
              <div className="product">
                {this.state.clickWithNoAttributes ? (
                  <p className="alert-block">
                    please select all attributes before adding to the cart
                  </p>
                ) : null}
                <div className="product__wrapper">
                  <div className="images-block product__images-block">
                    {data.product?.gallery.map((photo, index, arr) => {
                      return (
                        <div
                          key={index}
                          id={index}
                          onClick={(e) => {
                            this.setState({
                              currentPhotoIndex: e.target.id,
                            });
                          }}
                          className="images-block__item"
                        >
                          <img src={photo} alt={data.product.name} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="product__main-image">
                    <img
                      src={data.product?.gallery[this.state.currentPhotoIndex]}
                      alt={data.product?.name}
                    />
                  </div>
                  <div className="text-block product__text-block">
                    <p className="text-block__brand">
                      <span>{data.product?.brand}</span>
                    </p>
                    <p className="text-block__name">
                      <span>{data.product?.name}</span>
                    </p>
                    <div className="attributes-block text-block__attributes-block">
                      {
                        <>
                          {data.product?.attributes.map((item) => {
                            return item.type === "text" ? (
                              <div>
                                <p className="attributes-block__name">
                                  {item.name.toUpperCase()}:
                                </p>
                                <div>
                                  {item.items.map((att) => {
                                    return (
                                      <div
                                        name={item.name}
                                        className={
                                          this.state.itemAttributes[
                                            item.name
                                          ] === att.value
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
                                                  e.target.getAttribute(
                                                    "value"
                                                  ),
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
                                  {item.name.toUpperCase()}:
                                </p>
                                <div className="attributes-block__swatches">
                                  {item.items.map((att) => {
                                    return (
                                      <div
                                        name={item.name}
                                        className={
                                          this.state.itemAttributes[
                                            item.name
                                          ] === att.value
                                            ? "attributes-block__swatch attributes-block__swatch--active"
                                            : "attributes-block__swatch"
                                        }
                                        onClick={(e) => {
                                          this.setState((prevState) => {
                                            return {
                                              itemAttributes: {
                                                ...prevState.itemAttributes,
                                                [e.target.getAttribute("name")]:
                                                  e.target.getAttribute(
                                                    "value"
                                                  ),
                                              },
                                            };
                                          });
                                        }}
                                        value={att.value}
                                        style={{
                                          backgroundColor: att.value,
                                        }}
                                      ></div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </>
                      }
                    </div>
                    <div className="price-block product__price-block">
                      <p className="price-block__header">PRICE:</p>
                      {
                        <p className="price-block__price">
                          {productPagePriceSwitcher(
                            this.props.reduxState.main.currency,
                            data
                          )}
                        </p>
                      }
                    </div>
                    <div
                      onClick={() => {
                        return data.product?.attributes.length ===
                          Object.keys(this.state.itemAttributes).length
                          ? (this.props.ADD_ITEM_TO_CART({
                              product: data.product,
                              attributes: this.state.itemAttributes,
                            }),
                            this.setState({ clickWithNoAttributes: false }))
                          : this.setState({ clickWithNoAttributes: true });
                      }}
                      className={
                        data.product?.inStock
                          ? "product-page__button--active"
                          : "product-page__button--disabled"
                      }
                    >
                      {data.product?.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                    </div>
                    <div
                      className="product-page__description-block"
                      dangerouslySetInnerHTML={{
                        __html: sanitize(data.product?.description),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : null;
          }}
        </Query>
      </>
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
