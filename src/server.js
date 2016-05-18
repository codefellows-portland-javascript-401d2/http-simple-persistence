var db = require('./database');
var router = require('./router');
var http = require('http');
var url = require('url');
var fs = require('fs');

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
      fs.createReadStream('./index.html').pipe(response);
    } else {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write('404: Page Not Found');
    }
    
  } else if (request.method === 'POST') {
    var body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
     
      var breed = body.split('=');
      var jsoned = JSON.stringify(breed);
      var writeStream = fs.createWriteStream(`./data/${breed[1]}.json`);
      writeStream.write(jsoned);  
    });
  }
  
  
  
});

module.exports = server;