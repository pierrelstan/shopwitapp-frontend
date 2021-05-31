import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { openFavoritesAndClosing } from '../redux/actions/OpenAndCloseFavorites';
import { removeFavorites } from '../redux/actions/favorites';
import { setAlert } from '../redux/actions/alert';
import FavStyles from '../Styles/FavStyles';
import CloseButton from '../Styles/CloseButton';
import Supreme from '../Styles/Supreme';
import {BACKEND_URL} from "../config";

function FavoritesItem(props) {
  const handleDeleteCart = (id) => {
    props.removeFavorites(id);
  };
  const handleClickOpenCart = () => {
    props.openFavoritesAndClosing(false);
  };
  return (
    <FavStyles open={props.favOpenOrClose}>
      <header>
        <Supreme>ShopWit</Supreme>
        <CloseButton onClick={handleClickOpenCart}>&times;</CloseButton>
        <h1>
          You have {props.favs.allFavorites.length} items in your favorites
        </h1>
      </header>
      <div>
        {
          <ul>
            {props.favs.allFavorites.map((cart) => (
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
                      <img
                        src={`${BACKEND_URL}/${cart.item.imageUrl}`}
                        alt={cart.item.title}
                      />

                      <div>Quantity {cart.quantity}</div>
                      <h2>
                        Price <span>${cart.item.price} </span>
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
        }
      </div>
    </FavStyles>
  );
}

const mapStateToProps = (state) => ({
  favs: state.favorites,
  userId: state.auth.user._id,
  favOpenOrClose: state.openFavoritesAndClosing.open,
});
export default withRouter(
  connect(mapStateToProps, {
    removeFavorites,
    setAlert,
    openFavoritesAndClosing,
  })(FavoritesItem)
);
