import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  CHANGE_PATHNAME,
  CONVERT_TOTAL,
  CHANGE_CART_STATUS,
} from "../../ducks/main/reducer";
import { AttributesBlock } from "../AttributesBlock/AttributesBlock";
import { cartPriceSwitch } from "../../helpers/cartPriceSwitch";
import { taxSwitch } from "../../helpers/taxSwitch";
import { totalPriceSwitch } from "../../helpers/totalPriceSwitch";
import CartProductButtons from "../CartProductButtons/CartProductButtons";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import "./style.scss";

class Cart extends React.Component {
  componentDidMount() {
    this.props.CHANGE_PATHNAME(window.location.pathname.slice(1));
  }

  render() {
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
                          {cartPriceSwitch(
                            this.props.reduxState.main.currency,
                            item
                          )}
                        </p>
                        <AttributesBlock item={item} />
                      </div>
                      <CartProductButtons item={item} />
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
                    {taxSwitch(this.props.reduxState.main.currency)}
                  </span>
                </p>
                <p>
                  {`Qty: `}
                  <span className="total-block_qty">
                    {this.props.reduxState.main.cart.length}
                  </span>
                </p>
                <p className="total-block__header">
                  Total:{" "}
                  <span className="total-block__amount">
                    {totalPriceSwitch(
                      this.props.reduxState.main.currency,
                      this.props.reduxState.main.cart,
                      this.props.CONVERT_TOTAL
                    ).toFixed(2)}
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
