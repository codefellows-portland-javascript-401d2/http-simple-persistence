var db = require('./database');
var http = require('http');
var path = require('path');

// db.createDir();

var server = http.createServer((request, response) => {
  
  var baseName = path.parse(request.url).base;
  
  //  GET - - - - - - - - - - - - -- - - - - - - - - - - - - -
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
  } 
  //  POST  - - - - - - - - - - - - - - - 
  else if (request.method === 'POST') {
    var body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      var parsedBody = JSON.parse(body);
      var thisBreed = parsedBody.breed;
      db.write(`${thisBreed}.json`, body);
      response.end();
    });
  } 
   //  PUT  - - - - - - - - - - - - - - -
  else if (request.method === 'PUT') {
    var body = '';
    request.on('data', chunk => {
      body += chunk;  
    });
    request.on('end', () => {
      db.write(baseName, body);
      response.end();
    });
  } 
//  DELETE - - - - - - - - - - - - - - - - 
  else if (request.method === 'DELETE') {
    db.destroy(baseName, (err) => {
      if (err) {
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.write(`${baseName} not found in database, sorry.`);
        response.end();
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(`${baseName} deleted from database, are you happy now?`);
        response.end();
      }
    });
  } 
  
  else {
    response.writeHead(400, {'Content-Type': 'text/html'});
    response.write('Bad Verb');
    response.end();
  }
});

module.exports = server;