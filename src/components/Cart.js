import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { openCart } from '../redux/actions/openCart';
import {
  allCarts,
  removeCart,
  updateCart,
} from '../redux/actions/ItemsActions';
import { setAlert } from '../redux/actions/alert';
import CartStyles from '../Styles/CartStyles';
import CloseButton from '../Styles/CloseButton';
import Supreme from '../Styles/Supreme';
// import formatMoney from './formatMoney';
import SickButton from '../Styles/SickButton';
import { CalculatePriceTotal } from '../utils/CalcutateCartTotal';
function Cart({
  open,
  openCart,
  carts,
  allCarts,
  updateCart,
  setAlert,
  userId,
  removeCart,
}) {
  const [total, setTotal] = React.useState();

  const [cartImage, setCartImage] = React.useState();

  React.useEffect(() => {
    CalculatePriceTotal(carts, setCartImage, setTotal);
  }, [carts]);

  const handleChange = (id) => async (e) => {
    let number = {
      quantity: e.target.value,
    };
    await updateCart(id, number);
  };

  const handleDeleteCart = (id) => {
    removeCart(id);
  };
  const handleClickOpenCart = () => {
    openCart(false);
  };

  return (
    <CartStyles open={open}>
      <header>
        <Supreme>ShopWit</Supreme>
        <CloseButton onClick={handleClickOpenCart}>&times;</CloseButton>
        {<h1>You have {carts.length} items in your cart</h1>}
      </header>
      <div>
        <ul>
          {carts &&
            carts.map((cart) => (
              <Paper
                style={{
                  margin: '10px',
                }}
                key={cart._id}
              >
                <li>
                  {cart.item === null ? (
                    <div>
                      <h4> This item has been removed by the owner</h4>

                      <button onClick={() => handleDeleteCart(cart._id)}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2> {cart.item.title}</h2>
                      <img src={cart.item.imageUrl} alt={cart.item.title} />
                      <h2>Quantity</h2>
                      <input
                        className='cart_input'
                        type='number'
                        name='quantity'
                        defaultValue={cart.quantity}
                        onChange={handleChange(cart._id)}
                        min='1'
                        max='250'
                      />
                      <h2>
                        Price <span> ${cart.item.price} </span>
                      </h2>

                      <button onClick={() => handleDeleteCart(cart._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              </Paper>
            ))}
        </ul>
      </div>
      <footer>
        <p
          style={{
            color: '#cb436b',
          }}
        >
          {total}$
        </p>
        <SickButton>Check</SickButton>
      </footer>
    </CartStyles>
  );
}
const mapStateToProps = (state) => ({
  carts: state.carts.allCarts,
  userId: state.auth.user._id,
  openCart: state.openCart.cart,
});
export default withRouter(
  connect(mapStateToProps, {
    removeCart,
    updateCart,
    setAlert,
    allCarts,
    openCart,
  })(Cart),
);
