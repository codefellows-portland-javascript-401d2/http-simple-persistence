var db = require('./database');
var router = require('./router');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var server = http.createServer((request, response) => {
  
  var baseName = path.parse(request.url).base;
  
  if (request.method === 'GET') {

    db.fetchAll(function(err, array) {
      var index = array.indexOf(baseName);
      // if requested resource exists in database
      if (index !== -1) {
        db.read(array[index], function(contents) {
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.write(contents);
          response.end();
        });
      } else {
         // List All Dogs
        if (request.url === '/dogs') {
          response.writeHead(200, {'Content-Type': 'text/html'});
          db.fetchAll(function(err, results) {
            if (err) throw err;
            response.write(results.toString());
            response.end();
          });
          //Index Page
        } else if (request.url === '/') {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write('index page!');
          response.end();
          // 404 
        } else {
          response.writeHead(404, {'Content-Type': 'text/html'});
          response.write('404: Page Not Found');
          response.end();
        }
      }
    });
      
  } // End of GET block - - - - - - - -
  
  else if (request.method === 'POST') {
    
    var body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    
    request.on('end', () => {
      var parsedBody = JSON.parse(body);
      var thisBreed = parsedBody.breed;
      var writeStream = fs.createWriteStream(`./data/${thisBreed}.json`);
      writeStream.write(body);  
      response.end();
    });
  }

  else if (request.method === 'PUT') {
    console.log('PUT request started');
    var body = '';
    request.on('data', chunk => {
      body += chunk;  
    });
    request.on('end', () => {
      console.log('request body: ', body);
      var writeStream = fs.createWriteStream(`./data/${baseName}`);
      writeStream.write(body); 
      response.end();
    });
  }
 
  
  else if (request.method === 'DELETE') {
    
  }
  
  else {
    //bad verb
  }
  
  
  
  
  
});

module.exports = server;