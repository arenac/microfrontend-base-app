const axios = require('axios').default;

module.exports = axios.create(
  // {
  //   proxy: {
  //     host: 'proxyseso.scania.com',
  //     port: 8080,
  //     protocol: '',
  //     auth: {
  //       username: process.env.PROXY_USER,
  //       password: process.env.PROXY_PASSWORD
  //     }
  //   }
  // }
);