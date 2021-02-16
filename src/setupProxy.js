const { createProxyMiddleware } = require('http-proxy-middleware');
import { BACKEND_URL } from './config';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: BACKEND_URL,
      changeOrigin: true,
    }),
  );
};
