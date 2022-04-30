import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { CONVERT_TOTAL, CHANGE_CART_STATUS } from "../../../ducks/main/reducer";
import { AttributesBlock } from "../../AttributesBlock/AttributesBlock";
import { cartPriceSwitch } from "../../../helpers/cartPriceSwitch";
import { totalPriceSwitch } from "../../../helpers/totalPriceSwitch";
import { miniCartItemsNumberSwitch } from "../../../helpers/miniCartItemsNumberSwitch";
import CartProductButtons from "../../CartProductButtons/CartProductButtons";

import "./style.scss";

class MiniCart extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target) &&
      event.target.className !== "cart-block cart-currency-block__cart-block" &&
      event.target.className !== "cart-block__items-number"
    ) {
      this.props.CHANGE_CART_STATUS("");
    }
  }
  render() {
    return (
      <div className="mini-cart" ref={this.wrapperRef}>
        <h3 className="mini-cart__header">
          {miniCartItemsNumberSwitch(this.props.reduxState.main.cart.length)}
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
                          {cartPriceSwitch(
                            this.props.reduxState.main.currency,
                            item
                          )}
                        </p>
                        <AttributesBlock item={item} />
                      </div>
                      <CartProductButtons item={item} />
                      <div className="product-photo cart-product__product-photo">
                        <img
                          src={item.product.gallery[0]}
                          alt={item.product.name}
                        />
                      </div>
                    </div>
                  );
                })
            : null}
        </div>
        <div className="mini-cart-total mini-cart__total-block">
          <span className="mini-cart-total__header">Total</span>
          <span className="mini-cart-total__amount">
            {totalPriceSwitch(
              this.props.reduxState.main.currency,
              this.props.reduxState.main.cart,
              this.props.CONVERT_TOTAL
            ).toFixed(2)}
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
    CHANGE_CART_STATUS: () => {
      dispatch(CHANGE_CART_STATUS(""));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
