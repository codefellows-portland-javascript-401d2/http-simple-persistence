const http = require('http');
const routes = require('./routes');

const server = {};

server.new = () => {
  return http.createServer((req, res) => {
    res.end();
  });
};

module.exports = server;
