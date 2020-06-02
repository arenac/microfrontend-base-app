require('dotenv/config')
const express = require('express');
const server = express();
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const api = require('./api');

server.use(cors());

server.set('view engine', 'ejs');

const createProxy = (path, target) =>
  server.use(path, createProxyMiddleware({ 
    target, 
    changeOrigin: true, 
    pathRewrite: {
      [`^${path}`]: ''
    } 
  }
));

createProxy('/header', process.env.HEADER_URL);
createProxy('/plans', process.env.PLANS_URL);
createProxy('/create-plan', process.env.CREATE_PLAN_URL);

server.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Base-app listening on port ${port}`);
});