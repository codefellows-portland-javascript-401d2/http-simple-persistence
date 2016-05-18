const fs = require('fs');

var db = {};

db.fetch = function(callback) {
  fs.readdir('./data', (err, fileNames) => {
    console.log(fileNames);
    if (err) callback(err);
    callback(null, fileNames);
  });
};

db.write = function(path, resource, callback) {
  var file = fs.createWriteStream(path, {encoding: 'utf-8'});
  file.write(resource);
  callback();
};

module.exports = db;