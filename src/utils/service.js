import axiosService from './axiosService';
import { updateItem } from '../redux/actions/ItemsActions';

class WebAPI {
  static Log_in = async (data) => {
    return axiosService.post(`/api/auth/login`, data);
  };

  // static requestPasswordReset = async (data) => {
  //   return axiosService.post(`/request-password-reset`, data);
  // };

  // static resetPassword = async (data) => {
  //   return axiosService.post(`/reset-password`, data);
  // };

  static fetchItems = async () => {
    return axiosService.get(`api/item/all`);
  };
  static fetchItemsByUserId = async (USER_ID) => {
    return axiosService.get(`/api/item/user/items/${USER_ID} `);
  };
  static fetchLastProducts = async () => {
    return axiosService.get(`/api/item/lastproducts`);
  };
  static updateItem = async (id, state) => {
    return axiosService.put(`/api/item/${id}`, state);
  };

  static pagesControlled = async (page) => {
    return axiosService.get(`api/item/page/${page}`);
  };

  static createItem = async (product) => {
    return axiosService.post('/api/item/new', product);
  };

  static addToCart = async (id, USER_ID) => {
    return axiosService.post(`/api/item/add-to-cart/${id}`, {
      userId: USER_ID,
    });
  };
  static allCarts = async (USER_ID) => {
    return axiosService.get(`/api/item/cart/${USER_ID}`);
  };
  static updateCart = async (id, number) => {
    return axiosService.put(`/api/item/updateCart/${id}`, number);
  };
  static getProfile = async (id) => {
    return axiosService.get(`/api/auth/me/${id}`);
  };

  static signUp = async (data) => {
    return axiosService.post(`/api/auth/signup`, data);
  };

  static editProfile = async (USER_ID, User) => {
    return axiosService.put(`/api/auth/user/${USER_ID}/edit`, User);
  };

  // static subscribeToPlan = (payload) => {
  //   return axiosService.post(`/user_plans`, {
  //     plan_id: payload.plan_id,
  //   });
  // };

  // static getPlans = () => {
  //   return axiosService.get(`/plans`);
  // };

  // static getMovies = (page) => {
  //   return axiosService.get(`/movies?page=${page}`);
  // };

  // static getMovieDetails = (id) => {
  //   return axiosService.get(`/movies/${id}`);
  // };

  // static getFavoriteMovies = (userId) => {
  //   return axiosService.get(`/favorites-by-user?user_id=${userId}`);
  // };

  // static addFavoriteMovies = (user_id, movie_id) => {
  //   return axiosService.post(`/favorites`, {
  //     user_id,
  //     movie_id,
  //   });
  // };

  // static removeFavoriteMovies = (userId, movieId) => {
  //   return axiosService({
  //     method: 'DELETE',
  //     url: `/favorites?user_id=${userId}&movie_id=${movieId}`,
  //   });
  // };
}

export default WebAPI;
