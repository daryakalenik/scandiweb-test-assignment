export const categoryPagePriceSwitch = (store, item) => {
  switch (store) {
    case "$":
      return (
        <>
          {
            item.prices[
              item.prices.findIndex((i) => {
                return i.currency.symbol === "$";
              })
            ].currency.symbol
          }
          {
            item.prices[
              item.prices.findIndex((i) => {
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
            item.prices[
              [
                item.prices.findIndex((i) => {
                  return i.currency.symbol === "£";
                }),
              ]
            ].currency.symbol
          }
          {
            item.prices[
              [
                item.prices.findIndex((i) => {
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
            item.prices[
              [
                item.prices.findIndex((i) => {
                  return i.currency.symbol === "A$";
                }),
              ]
            ].currency.symbol
          }
          {
            item.prices[
              [
                item.prices.findIndex((i) => {
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
            item.prices[
              [
                item.prices.findIndex((i) => {
                  return i.currency.symbol === "¥";
                }),
              ]
            ].currency.symbol
          }
          {
            item.prices[
              [
                item.prices.findIndex((i) => {
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
            item.prices[
              [
                item.prices.findIndex((i) => {
                  return i.currency.symbol === "₽";
                }),
              ]
            ].currency.symbol
          }
          {
            item.prices[
              [
                item.prices.findIndex((i) => {
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
