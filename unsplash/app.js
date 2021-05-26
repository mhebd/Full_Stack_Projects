const fs = require('fs');
const http = require('http');
const url = require('url');
const axios = require('axios');

const app = http.createServer((req, res) => {
  const path = req.url;
  const pathName = url.parse(path, true).pathname;
  const query = url.parse(path, true).query.search;

  if (pathName === '/home' || pathName === '/') {
    fs.readFile(`./template/index.html`, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (pathName === '/photos') {
    if (query === '') {
      fs.readFile(`./template/query.html`, 'utf8', (err, data) => {
        const template = data;
        const result = template.replace(
          '{&IMAGE&}',
          '<h3>Please insert a key word on your search box..'
        );
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(result);
      });
    } else {
      getImage(req, res, query);
    }
  } else if (/.css$/i.test(pathName)) {
    fs.readFile(`./css${pathName}`, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h3>Somethin was wrong..!</h3>');
  }
});

const getImage = async (req, res, query) => {
  const key = 'OrhxU0W9Z03nJCKjuq4J1YTv8xXjut-zRU7m5KdTrhU';
  const data = await axios(
    `https://api.unsplash.com/photos/random?client_id=${key}&query=${query}&orientation=landscape`
  );
  const imgUrl = data.data.urls.regular;
  const alt = data.data.alt_description;

  if (imgUrl) {
    fs.readFile(`./template/query.html`, 'utf8', (err, data) => {
      const template = data;

      const result = template.replace(
        '{&IMAGE&}',
        `<img src="${imgUrl}" alt="${alt}" />`
      );

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(result);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h2>Something wrong in query..</h2>');
  }
};

module.exports = app;
