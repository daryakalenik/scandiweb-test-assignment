import React from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";

import { GET_CURRENCIES } from "../../../query/query";
import { CHANGE_CURRENCY, CONVERT_TOTAL } from "../../../ducks/main/reducer";

import "./styles.scss";

class CurrenciesMenu extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    isOpened: false,
    currency: "$",
  };

  componentDidMount() {
    this.props.CHANGE_CURRENCY(this.state.currency);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  togglingCurrencyMenu = (e) => {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        isOpened: false,
      });
    }
  }

  handleCurrencyChange = (e) => {
    this.setState({
      isOpened: !this.state.isOpened,
      currency: e.target.getAttribute("value"),
    });
    this.props.CHANGE_CURRENCY(e.target.getAttribute("value"));
  };

  render() {
    return (
      <div
        className="currency-block__wrapper"
        ref={this.wrapperRef}
        onClick={this.togglingCurrencyMenu}
      >
        <div>
          <p value={this.state.currency} className="currency-block__header">
            {this.state.currency}
            <span
              className={
                this.state.isOpened
                  ? "currency-block__tick currency-block__tick--opened"
                  : "currency-block__tick"
              }
            ></span>
          </p>
        </div>
        <ul
          className={
            this.state.isOpened
              ? "currency-block__list currency-block__list--opened"
              : "currency-block__list"
          }
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
