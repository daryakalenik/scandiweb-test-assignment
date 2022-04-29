export const totalPriceSwitch = (currency, cart, convert) => {
  let total = 0;
  switch (currency) {
    case "$":
      total = cart
        .map((item) => {
          return item.product.prices[0].amount;
        })
        .reduce((item, prev) => {
          return item + prev;
        }, 0);
      convert(total);
      return total;
    case "£":
      total = cart
        .map((item) => {
          return item.product.prices[1].amount;
        })
        .reduce((item, prev) => {
          return item + prev;
        }, 0);
      convert(total);
      return total;
    case "A$":
      total = cart
        .map((item) => {
          return item.product.prices[2].amount;
        })
        .reduce((item, prev) => {
          return item + prev;
        }, 0);
      convert(total);
      return total;
    case "¥":
      total = cart
        .map((item) => {
          return item.product.prices[3].amount;
        })
        .reduce((item, prev) => {
          return item + prev;
        }, 0);
      convert(total);
      return total;
    case "₽":
      total = cart
        .map((item) => {
          return item.product.prices[4].amount;
        })
        .reduce((item, prev) => {
          return item + prev;
        }, 0);
      convert(total);
      return total;
    default:
      return null;
  }
};
