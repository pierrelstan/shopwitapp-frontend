import React from 'react';
import CartStyles from '../Styles/CartStyles';
import CloseButton from '../Styles/CloseButton';
import Supreme from '../Styles/Supreme';

export default function Cart() {
  return (
    <CartStyles open>
      <header>
        <Supreme>Your cart</Supreme>
        <CloseButton title='close'>&times;</CloseButton>
        <p>You have items in your cart</p>
      </header>
      <footer>
        <p>100.0$</p>
        <button>Check</button>
      </footer>
    </CartStyles>
  );
}
