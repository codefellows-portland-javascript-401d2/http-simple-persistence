var db = require('./database');
var router = require('./router');
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer((request, response) => {
  
  if (request.method === 'GET') {

    var pathname = url.parse(request.url).pathname;
    
    if (request.url === '/dogs') {
      console.log('GET /Dogs');
      response.writeHead(200, {'Content-Type': 'text/html'});
      db.fetch(function(err, results) {
        if (err) throw err;
        console.log(results);
        response.write(results);
        response.end();
      });
      
    } else if (pathname === '/') {
      response.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('./index.html').pipe(response);
    } else {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write('404: Page Not Found');
    }
    
  } else if (request.method === 'POST') {
    
    console.log('start post rquest');
    var body = '';
    request.on('data', (chunk) => {
      body += chunk;
      console.log(body);
    });
    
    
    request.on('end', () => {
     
      console.log(body);
      
      var parsedBody = JSON.parse(body);
      var thisBreed = parsedBody.breed;

      var writeStream = fs.createWriteStream(`./data/${thisBreed}.json`);
      writeStream.write(body);  
      response.end();
    });
  }
  
  
  
});

module.exports = server;