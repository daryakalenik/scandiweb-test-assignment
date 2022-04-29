import React from "react";

export class AttributesBlock extends React.Component {
  render() {
    return (
      <div className="cart-attributes cart-product__cart-attributes">
        {this.props.item.product.attributes.map((atr) => {
          return atr.type === "text" ? (
            <div>
              <p className="cart-attributes__name">{atr.name}</p>
              {atr.items.map((atrItem) => {
                return (
                  <span
                    className={
                      this.props.item.attributes[atr.name] === atrItem.value
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
              <p className="cart-attributes__name">{atr.name}</p>
              {atr.items.map((atrItem) => {
                return (
                  <span
                    style={{
                      backgroundColor: atrItem.value,
                    }}
                    className={
                      this.props.item.attributes[atr.name] === atrItem.value
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
    );
  }
}
