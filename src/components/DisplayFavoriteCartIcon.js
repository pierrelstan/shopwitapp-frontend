import React from 'react';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export const DisplayFavoriteCartIcon = ({
  id,
  Favs,
  handleRemoveFavorite,
  handleAddFavorites,
}) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let favs = Favs && Favs.findIndex((item) => item.item._id === id) !== -1;

    if (favs) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [Favs, id]);

  return (
    <div>
      {show && (
        <FavoriteSharpIcon
          onClick={() => handleRemoveFavorite(id)}
          style={{
            fontSize: 62,
            color: '#cb436b',
          }}
        />
      )}
      {!show && (
        <FavoriteBorderIcon
          style={{
            fontSize: 62,
          }}
          onClick={() => handleAddFavorites(id)}
        />
      )}
    </div>
  );
};
