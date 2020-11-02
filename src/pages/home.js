import React from 'react';
import Hero from '../components/Hero';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MenuNavigation from '../components/MenuNavigation';
import PopularProducts from '../components/PopularProducts';
import Wrapper from '../components/Wrapper';
import MostRated from '../components/MostRated';
import NewArrivals from '../components/NewArrivals';
import MarginTop from '../components/MarginTop';

const Home = (props) => {
  return (
    <div>
      <Hero ScrollNumber={props.values} />
      <Wrapper>
        <div>
          <MarginTop />
          <MenuNavigation />
          <MarginTop />
          <PopularProducts />
          <MarginTop />
          <MostRated />
          <MarginTop />
        </div>
      </Wrapper>
      <NewArrivals ScrollNumber={props.values} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  // items: state.items,
  // carts: state.RootCarts.allCarts,
  // favorites: state.toggleFavorite.favoriteFilm,
  values: state.scrollValues.values,
});

export default withRouter(connect(mapStateToProps, {})(Home));
