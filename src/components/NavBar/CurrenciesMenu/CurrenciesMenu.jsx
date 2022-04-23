import React from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";

import { GET_CURRENCIES } from "../../../query/query";
import { CHANGE_CURRENCY, CONVERT_TOTAL } from "../../../ducks/main/reducer";

import "./styles.scss";

class CurrenciesMenu extends React.Component {
  state = {
    isOpened: false,
    currency: "$",
  };

  customTickStyle = {
    transform: this.state.isOpened ? "rotate(-135deg)" : "rotate(45deg)",
  };

  componentDidMount() {
    this.props.CHANGE_CURRENCY(this.state.currency);
  }

  togglingCurrencyMenu = () => {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  };

  handleCurrencyChange = (e) => {
    this.setState({
      isOpened: !this.state.isOpened,
      currency: e.target.getAttribute("value"),
    });
    this.props.CHANGE_CURRENCY(e.target.getAttribute("value"));
  };

  render() {
    return (
      <div className="currency-block__wrapper">
        <div>
          <p value={this.state.currency} className="currency-block__header">
            {this.state.currency}
            <span
              className="currency-block__tick"
              style={{
                transform: this.state.isOpened
                  ? "rotate(-135deg)"
                  : "rotate(45deg)",
                right: this.state.currency.length > 1 ? "-13px" : "-5px",
              }}
              onClick={this.togglingCurrencyMenu}
            ></span>
          </p>
        </div>
        <ul
          className="currency-block__list"
          style={this.state.isOpened ? { backgroundColor: "white" } : null}
        >
          {this.props.data.currencies && this.state.isOpened
            ? this.props.data.currencies.map((item, index) => {
                return (
                  <li
                    className="currency-block__list-item"
                    key={index}
                    value={item.symbol}
                    onClick={this.handleCurrencyChange}
                  >
                    {item.symbol} {item.label}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}

const CurrenciesMenuWithData = graphql(GET_CURRENCIES, {
  options: {},
})(CurrenciesMenu);

const mapDispatchToProps = (dispatch) => {
  return {
    CHANGE_CURRENCY: (value) => {
      dispatch(CHANGE_CURRENCY(value));
    },
    CONVERT_TOTAL: (value) => {
      dispatch(CONVERT_TOTAL(value));
    },
  };
};

const mapStateToProps = (state) => ({
  reduxState: state,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesMenuWithData);
