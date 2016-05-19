const http = require('http');
const routes = require('./routes');

const server = {};

server.req;
server.res;

server.new = () => {
  return http.createServer((req, res) => {
    routes.routing(req, res, server.output);
  });
};

server.output = (err, data, res) => {
  let statusCode = 400;
  let resData = {
    status: 'error',
    results: {
      message: 'Bad Request'
    }
  };

  if (data) {
    statusCode = 200;
    resData = {
      status: 'success',
      results: data
    };
  }

  res.writeHead(statusCode, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(resData));
};

module.exports = server;
