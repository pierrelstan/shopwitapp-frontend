import axiosService from './axiosService';

class WebAPI {
    static Log_in = async (data) => {
        return axiosService.post(`/api/auth/login`, data);
    };

    static fetchItems = async () => {
        return axiosService.get(`/api/items`);
    };
    static fetchItemsByUserId = async (USER_ID) => {
        return axiosService.get(`/api/items/items/${USER_ID}`);
    };
    static fetchItemById = async (id) => {
        return axiosService.get(`/api/items/${id}`);
    };
    static fetchLastProducts = async () => {
        return axiosService.get('/api/items/lastproducts');
    };
    static updateItem = async (id, formData, USER_ID) => {
        return axiosService.put(`/api/items/${id}`, formData);
    };
    static removeItemById = async (id, USER_ID) => {
        return axiosService.post(`/api/items/${id}`, {
            userId: USER_ID,
        });
    };
    static pagesControlled = async (page) => {
        return axiosService.get(`/api/items/page/${page}`);
    };

    static createItem = async (formData) => {
        return axiosService.post('/api/items/new', formData);
    };

    static addToCart = async (id, USER_ID) => {
        return axiosService.post(`/api/carts/${id}`, {
            userId: USER_ID,
        });
    };
    static allCarts = async (USER_ID) => {
        return axiosService.get(`/api/carts/${USER_ID}`);
    };
    static updateCart = async (id, number, USER_ID) => {
        return axiosService.put(`/api/carts/${id}`, {
            number,
            userId: USER_ID,
        });
    };
    static removeCart = async (id, USER_ID) => {
        return axiosService.post(`/api/carts/${id}`, { userId: USER_ID });
    };
    static addToFavorites = async (id, USER_ID) => {
        return axiosService.post(`/api/favorites/${id}`, {
            userId: USER_ID,
        });
    };
    static allFavorites = async (USER_ID) => {
        return axiosService.get(`/api/favorites/${USER_ID}`);
    };
    static removeFavorites = async (id, USER_ID) => {
        return axiosService.post(`/api/favorites/remove/${id}`, {
            userId: USER_ID,
        });
    };
    static getProfile = async (id) => {
        return axiosService.get(`/api/auth/me/${id}`);
    };

    static signUp = async (formData) => {
        return axiosService.post(`/api/auth/signup`, formData);
    };

    static editProfile = async (USER_ID, formData) => {
        return axiosService.put(`/api/auth/user/${USER_ID}/edit`, formData);
    };
    static addPayments = async (token) => {
        return axiosService.post(`/api/orders/payments`, token);
    };
    static addRatings = async (id, newValue) => {
        return axiosService.post(`/api/ratings/${id}`, {
            rating: newValue,
        });
    };
    static fetchRatingById = async (id) => {
        return axiosService.get(`/api/ratings/${id}`);
    };
}

export default WebAPI;
