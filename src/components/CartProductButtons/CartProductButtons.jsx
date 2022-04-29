import React from "react";
import { connect } from "react-redux";

import {
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
} from "../../ducks/main/reducer";

class CartProductButtons extends React.Component {
  render() {
    return (
      <div className="product-buttons cart-product__cart-buttons">
        <div
          value={this.props.item.product.id}
          onClick={() => {
            this.props.ADD_ITEM_TO_CART(this.props.item);
          }}
        >
          +
        </div>
        <p className="product-buttons__count">
          {
            this.props.reduxState.main.cart.filter((value) => {
              return (
                value.product.id === this.props.item.product.id &&
                JSON.stringify(value.attributes) ===
                  JSON.stringify(this.props.item.attributes)
              );
            }).length
          }
        </p>
        <div
          value={this.props.item.product.id}
          onClick={() => {
            this.props.DELETE_ITEM_FROM_CART(this.props.item);
          }}
        >
          -
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
    DELETE_ITEM_FROM_CART: (value) => {
      dispatch(DELETE_ITEM_FROM_CART(value));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartProductButtons);
