import { connect } from "react-redux";
import React from "react";
import { graphql } from "react-apollo";
import { NavLink } from "react-router-dom";

import { GET_CATEGORIES } from "../../query/query";

import CurrenciesMenu from "./CurrenciesMenu/CurrenciesMenu";
import MiniCart from "./MiniCart/MiniCart";
import { CHANGE_CART_STATUS, CHANGE_PATHNAME } from "../../ducks/main/reducer";

import "./styles.scss";

class NavBar extends React.Component {
  state = { isCartOpened: false };

  handleCartClick = () => {
    this.setState({
      isCartOpened: !this.state.isCartOpened,
    });
    this.props.CHANGE_CART_STATUS();
  };

  handleNavClick = (e) => {
    this.props.CHANGE_PATHNAME(e.target.name);
  };

  render() {
    return (
      <nav
        className="nav-bar"
        style={
          this.props.reduxState.main.isCartOpened
            ? {
                boxShadow:
                  "calc(100vh + 100vw) calc(100vh + 100vw) 0 calc(100vh + 100vw) rgba(0, 0, 0, 0.3)",
              }
            : null
        }
      >
        <div className="nav-bar__wrapper">
          <div className="menu nav-bar__menu">
            {this.props.data.categories
              ? this.props.data.categories.map((item, index) => {
                  return (
                    <NavLink
                      name={item.name}
                      onClick={this.handleNavClick}
                      className={({ isActive }) =>
                        isActive
                          ? "menu__item menu__item--active"
                          : "menu__item"
                      }
                      key={index}
                      to={`/${item.name}`}
                    >
                      {item.name.toUpperCase()}
                    </NavLink>
                  );
                })
              : null}
          </div>
          <div className="nav-bar__logo" />
          <div className="cart-currency-block nav-bar__cart-currency-block">
            <div className="currency-block cart-currency-block___currency-block">
              <CurrenciesMenu />
            </div>
            <div
              className="cart-block cart-currency-block__cart-block"
              onClick={this.handleCartClick}
            >
              {this.props.reduxState.main.cart.length > 0 ? (
                <span className="cart-block__items-number">
                  {this.props.reduxState.main.cart.length}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          {this.props.reduxState.main.isCartOpened ? <MiniCart /> : null}
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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

const NavBarWithData = graphql(GET_CATEGORIES, {
  options: {},
})(NavBar);

export default connect(mapStateToProps, mapDispatchToProps)(NavBarWithData);
