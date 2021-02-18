let BACKEND_URL = 'http://localhost:4000';

if (process.env.NODE_ENV === 'production') {
  BACKEND_URL = 'https://mern-shopwit-backend.herokuapp.com';
}

export { BACKEND_URL };
