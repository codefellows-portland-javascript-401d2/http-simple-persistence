const fs = require('fs');
var path = require('path');


var db = {};

db.directory = './data';

db.fetch = function(callback) {
  fs.readdir(db.directory, function(err, fileNames) {
    console.log(fileNames);
    if (err) callback(err);
    // fileNames.forEach(file => {
    //   fs.readFile
    // });
    callback(null, fileNames);
  });
};

db.write = function(path, resource, callback) {
  var file = fs.createWriteStream(path, {encoding: 'utf-8'});
  file.write(resource);
  callback();
};

module.exports = db;