require('dotenv/config')
const express = require('express');
const server = express();
const cors = require('cors');
const api = require('./api');

server.use(cors());

server.set('view engine', 'ejs');

const getContents = (url) => new Promise((resolve, reject) => {
  // requestWithProxy.get(url, (error, response, body) => {
  //   if (error) return resolve("Error loading " + url + ": " + error.message);

  //   return resolve(body);
  // });
  api.get(url)
  .then(data => resolve(data))
  .catch(error => resolve(`Error loading ${url}: ${error.response.data}`));

});

server.get('/', (req, res) =>
  Promise.all([
    getContents(process.env.HEADER_URL),
    getContents(process.env.PLANS_URL),
    getContents(process.env.CREATE_PLAN_URL)
  ]).then(responses =>
    res.render('index', { header: responses[0], plans: responses[1], createPlan: responses[2] })
  ).catch(error =>
    res.send(error.message)
  )
);


const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Base-app listening on port ${port}`);
});