export const productPagePriceSwitcher = (store, data) => {
  switch (store) {
    case "$":
      return (
        <>
          {
            data.product?.prices[
              data.product?.prices.findIndex((i) => {
                return i.currency.symbol === "$";
              })
            ].currency.symbol
          }
          {
            data.product?.prices[
              data.product?.prices.findIndex((i) => {
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
            data.product?.prices[
              [
                data.product?.prices.findIndex((i) => {
                  return i.currency.symbol === "£";
                }),
              ]
            ].currency.symbol
          }
          {
            data.product?.prices[
              [
                data.product?.prices.findIndex((i) => {
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
            data.product?.prices[
              [
                data.product?.prices.findIndex((i) => {
                  return i.currency.symbol === "A$";
                }),
              ]
            ].currency.symbol
          }
          {
            data.product?.prices[
              [
                data.product?.prices.findIndex((i) => {
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
            data.product?.prices[
              [
                data.product?.prices.findIndex((i) => {
                  return i.currency.symbol === "¥";
                }),
              ]
            ].currency.symbol
          }
          {
            data.product.prices[
              [
                data.product?.prices.findIndex((i) => {
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
            data.product?.prices[
              [
                data.product?.prices.findIndex((i) => {
                  return i.currency.symbol === "₽";
                }),
              ]
            ].currency.symbol
          }
          {
            data.product?.prices[
              [
                data.product?.prices.findIndex((i) => {
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
