import axiosService from './axiosService';

class WebAPI {
  static Log_in = async (data) => {
    return axiosService.post(`/api/auth/login`, data);
  };

  static fetchItems = async () => {
    return axiosService.get(`api/item/all`);
  };
  static fetchItemsByUserId = async (USER_ID) => {
    return axiosService.get(`/api/item/user/items/${USER_ID} `);
  };
  static fetchItemById = async (id) => {
    return axiosService.get(`/api/item/${id}`);
  };
  static fetchLastProducts = async () => {
    return axiosService.get(`/api/item/lastproducts`);
  };
  static updateItem = async (id, state, USER_ID) => {
    return axiosService.put(`/api/item/${id}`, state);
  };
  static removeItemById = async (id, USER_ID) => {
    return axiosService.post(`/api/item/item_id=${id}`, {
      userId: USER_ID,
    });
  };
  static pagesControlled = async (page) => {
    return axiosService.get(`api/item/page/${page}`);
  };

  static createItem = async (product) => {
    return axiosService.post('/api/item/new', product);
  };

  static addToCart = async (id, USER_ID) => {
    return axiosService.post(`/api/add-to-cart/${id}`, {
      userId: USER_ID,
    });
  };
  static allCarts = async (USER_ID) => {
    return axiosService.get(`/api/cart/${USER_ID}`);
  };
  static updateCart = async (id, number, USER_ID) => {
    return axiosService.put(`/api/updateCart/${id}`, {
      number,
      userId: USER_ID,
    });
  };
  static removeCart = async (id, USER_ID) => {
    return axiosService.post(`/api/removecart/${id}`, { userId: USER_ID });
  };
  static addToFavorites = async (id, USER_ID) => {
    return axiosService.post(`/api/item/add-to-favorites/${id}`, {
      userId: USER_ID,
    });
  };
  static allFavorites = async (USER_ID) => {
    return axiosService.get(`/api/item/favorites/${USER_ID}`);
  };
  static removeFavorites = async (id, USER_ID) => {
    return axiosService.post(`/api/item/removeFavorites/${id}`, {
      userId: USER_ID,
    });
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
}

export default WebAPI;
