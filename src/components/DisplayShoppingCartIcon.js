import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function DisplayShoppingCartIcon({
  Carts,
  id,
  hanldeRemoveCart,
  handleAddCart,
  image,
}) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let carts = Carts && Carts.findIndex((item) => item.item._id === id) !== -1;
    if (carts) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [Carts, id]);
  return (
    <div>
      {image && (
        <div>
          {show && (
            <AddShoppingCartIcon
              onClick={() => hanldeRemoveCart(id)}
              style={{
                fontSize: 62,
                color: '#4BB543',
                backgroundColor: 'transparent',
              }}
            />
          )}
          {!show && (
            <ShoppingCartIcon
              style={{
                fontSize: 62,
                backgroundColor: 'transparent',
              }}
              onClick={() => handleAddCart(id)}
            />
          )}
        </div>
      )}
    </div>
  );
}
