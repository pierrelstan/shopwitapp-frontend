import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { openCart } from '../redux/actions/openCart';
import { allCarts, removeCart, updateCart } from '../redux/actions/carts';
import { setAlert } from '../redux/actions/alert';
import CartStyles from '../Styles/CartStyles';
import CloseButton from '../Styles/CloseButton';
import Supreme from '../Styles/Supreme';
// import formatMoney from './formatMoney';
import SickButton from '../Styles/SickButton';
import { CalculatePriceTotal } from '../utils/CalcutateCartTotal';
import Payments from './Payments';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(10, 15, 10),
    },
}));

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
    const classes = useStyles();
    const [Open, setOpen] = React.useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log(paymentMethod);
    };

    return (
        <CartStyles open={open}>
            <header>
                <Supreme>ShopWit</Supreme>
                <CloseButton onClick={handleClickOpenCart}>&times;</CloseButton>
                {<h1>You have {carts.length} items in your cart</h1>}
            </header>
            <div
                style={{
                    marginTop: '10px',
                }}
            >
                <ul>
                    {carts &&
                        carts.map((cart) => (
                            <Paper
                                style={{
                                    margin: '5px',
                                }}
                                key={cart._id}
                            >
                                <li>
                                    {cart.item === null ? (
                                        <div>
                                            <h4>
                                                {' '}
                                                This item has been removed by
                                                the owner
                                            </h4>

                                            <button
                                                onClick={() =>
                                                    handleDeleteCart(cart._id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h2> {cart.item.title}</h2>
                                            <img
                                                src={cart.item.imageUrl}
                                                alt={cart.item.title}
                                            />
                                            <h2>Quantity</h2>
                                            <input
                                                className="cart_input"
                                                type="number"
                                                name="quantity"
                                                defaultValue={cart.quantity}
                                                onChange={handleChange(
                                                    cart._id
                                                )}
                                                min="1"
                                                max="250"
                                            />
                                            <h2>
                                                Price{' '}
                                                <span>
                                                    {' '}
                                                    ${cart.item.price}{' '}
                                                </span>
                                            </h2>

                                            <button
                                                style={{
                                                    borderRadius: '5px',
                                                }}
                                                onClick={() =>
                                                    handleDeleteCart(cart._id)
                                                }
                                            >
                                                Remove
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
                <Payments />
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
    })(Cart)
);
