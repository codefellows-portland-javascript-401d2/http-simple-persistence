var db = require('./database');
var router = require('./router');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var server = http.createServer((request, response) => {
  
  if (request.method === 'GET') {

    var pathname = url.parse(request.url).pathname;
    var basename = path.parse(request.url).base;
    
    db.fetchAll(function(err, array) {
      
      if (!basename) basename = '';
      
      var index = array.indexOf(basename);
      console.log('which item in array: ', array[index]);
      console.log('basename', basename);
      
      if (index !== -1) {
        
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('yes it is here!');
        response.end();
      }
       else {
         
        if (request.url === '/dogs') {
          console.log('GET /Dogs');
          response.writeHead(200, {'Content-Type': 'text/html'});
          db.fetchAll(function(err, results) {
            if (err) throw err;
            console.log(results);
            response.write(results.toString());
            response.end();
          });
          
        } else if (pathname === '/') {
          console.log('index page is here');
          response.writeHead(200, {'Content-Type': 'text/html'});
          // fs.createReadStream('./index.html').pipe(response);
          response.write('index page!');
          response.end();
          
        } else {
          response.writeHead(404, {'Content-Type': 'text/html'});
          response.write('404: Page Not Found');
          response.end();
        }

      }
      
    });
    
    
    
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