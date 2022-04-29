export const miniCartItemsNumberSwitch = (cart) => {
  switch (cart) {
    case 1:
      return (
        <>
          <span className="mini-cart__header--bold">My Bag, </span>
          {cart} item
        </>
      );

    case 0:
      return "Your cart is empty";
    default:
      return (
        <>
          <span className="mini-cart__header--bold">My Bag, </span>
          {cart} items
        </>
      );
  }
};
