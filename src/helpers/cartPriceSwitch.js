export const cartPriceSwitch = (store, item) => {
  switch (store) {
    case "$":
      return (
        <>
          {
            item.product.prices[
              item.product.prices.findIndex((i) => {
                return i.currency.symbol === "$";
              })
            ].currency.symbol
          }
          {
            item.product.prices[
              item.product.prices.findIndex((i) => {
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
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
                  return i.currency.symbol === "£";
                }),
              ]
            ].currency.symbol
          }
          {
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
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
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
                  return i.currency.symbol === "A$";
                }),
              ]
            ].currency.symbol
          }
          {
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
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
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
                  return i.currency.symbol === "¥";
                }),
              ]
            ].currency.symbol
          }
          {
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
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
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
                  return i.currency.symbol === "₽";
                }),
              ]
            ].currency.symbol
          }
          {
            item.product.prices[
              [
                item.product.prices.findIndex((i) => {
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
};
