var db = require('./database');
var router = require('./router');
var http = require('http');
var url = require('url');

var server = http.createServer((request, response) => {
  
  if (request.method === 'GET') {
    var pathname = url.parse(request.url).pathname;
    
    if (pathname === '/dogs') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      db.fetch(function(err, results) {
        if (err) throw err;
        response.write(JSON.stringify(results));
      });
    } else if (pathname === '/') {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Woof! You have reached the Home Page for the Doggie Information Center\n To view all dogs, use the /dogs path in the URL');
    } else {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write('404: Page Not Found');
    }
    
    
    
  }// - - - - - - - - - - - - -
  
  
  
});

module.exports = server;