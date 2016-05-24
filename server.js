const http = require('http');
const routes = require('./routes');

const server = {};
let serverRes;

server.new = () => {
  return http.createServer((req, res) => {
    serverRes = res;
    routes.routing(req, res, serverResponse);
  });
};

const serverResponse = (err, data) => {
  let statusCode = 400;
  let resData = {
    status: 'error',
    results: {
      message: 'Bad Request'
    }
  };

  if (data) {
    resData = data;
  }

  serverRes.writeHead(statusCode, {'Content-Type': 'application/json'});
  serverRes.end(JSON.stringify(resData));
};

module.exports = server;
