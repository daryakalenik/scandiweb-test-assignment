import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_PRODUCTS } from "../../query/query";

import {
  ADD_ITEM_TO_CART,
  CHANGE_PATHNAME,
  ADD_PRODUCTS,
} from "../../ducks/main/reducer";
import { categoryPagePriceSwitch } from "../../helpers/categoryPagePriceSwitch";

import "./style.scss";

class ProductsPage extends React.Component {
  componentDidMount() {
    this.props.CHANGE_PATHNAME(window.location.pathname.slice(1));
  }

  render() {
    return (
      <>
        <Query
          query={GET_PRODUCTS}
          variables={{ title: this.props.reduxState.main.path }}
        >
          {({ data }) => {
            return (
              <div className="category">
                <div className="category__wrapper">
                  <h1 className="category__title">
                    {this.props.reduxState.main.path}
                  </h1>
                  <div className="products-block category__products-block">
                    {data
                      ? data.category?.products.map((item) => {
                          return (
                            <div
                              className={
                                item.inStock
                                  ? "item products-block__item"
                                  : "item products-block__item item--not-in-stock"
                              }
                              key={item.id}
                              onMouseEnter={
                                item.inStock
                                  ? (e) => {
                                      e.currentTarget.className =
                                        "item--active products-block__item";
                                    }
                                  : null
                              }
                              onMouseLeave={
                                item.inStock
                                  ? (e) => {
                                      e.currentTarget.className =
                                        "item products-block__item";
                                    }
                                  : null
                              }
                            >
                              <Link
                                to={item.id}
                                id={item.id}
                                onClick={(e) => {
                                  this.props.CHANGE_PATHNAME(item.id);
                                }}
                                className="item-img"
                              >
                                <img src={item.gallery[0]} alt={item.name} />
                                {item.inStock ? " " : <p>OUT OF STOCK</p>}
                              </Link>
                              <span
                                onClick={(e) => {
                                  return item.attributes.length !== 0
                                    ? this.props.ADD_ITEM_TO_CART({
                                        product: item,
                                        attributes: Object.assign(
                                          {},
                                          ...item.attributes.map(
                                            (attribute) => {
                                              return {
                                                [attribute.name]:
                                                  attribute.items[0].value,
                                              };
                                            }
                                          )
                                        ),
                                      })
                                    : this.props.ADD_ITEM_TO_CART({
                                        product: item,
                                        itemAttributes: item.attributes,
                                      });
                                }}
                              ></span>

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
                                {categoryPagePriceSwitch(
                                  this.props.reduxState.main.currency,
                                  item
                                )}
                              </p>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            );
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

    ADD_PRODUCTS: (value) => {
      dispatch(ADD_PRODUCTS(value));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
