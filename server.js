const http = require('http');
const routes = require('./routes');

const server = {};

server.new = () => {
  return http.createServer((req, res) => {
    let statusCode = 200;
    let data = routes.routing(req, res);

    if (!data) {
      statusCode = 400;
      data = {
        error: 'Bad Request'
      };
    }

    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });
};

module.exports = server;
