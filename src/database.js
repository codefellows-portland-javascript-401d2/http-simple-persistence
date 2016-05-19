const fs = require('fs');
var path = require('path');


var db = {};

db.directory = './data';

db.fetchAll = function(callback) {
  fs.readdir(db.directory, function(err, fileNames) {
    if (err) throw err;
    callback(null, fileNames);
  });
};

db.read = function(file, callback) {
  fs.readFile(`${db.directory}/${file}`,(err, contents) => {
    callback(contents.toString());
  });
};

db.write = function(path, resource, callback) {
  var file = fs.createWriteStream(path, {encoding: 'utf-8'});
  file.write(resource);
  callback();
};

module.exports = db;