import formatMoney from './formatMoney';

const CalculatePriceTotal = (carts, setCartImage, setTotal) => {
  let arr = [];

  let mapped = carts.map((cart) => {
    if (cart.item === null) {
      setCartImage('imageUrl.jpg');
    } else {
      setCartImage(cart.item.imageUrl);
    }
    let p = cart.item === null ? 0 : cart.item.price;
    if (carts.length >= 2) {
      let a = cart.quantity + 1;
      arr.push(a);

      return cart.quantity * p;
    } else if (carts.length === 1) {
      return cart.quantity * formatMoney(p);
    } else {
      let b = cart.quantity + 1;
      arr.push(b);
      return cart.quantity * p;
    }
  });

  let gatherTotals = mapped.reduce((a, b) => {
    return a + b;
  }, 0);

  setTotal(gatherTotals.toFixed(1));
};

export { CalculatePriceTotal };
