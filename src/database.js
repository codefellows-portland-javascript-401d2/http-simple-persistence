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

db.write = function(newFile, content) {
  var writeStream = fs.createWriteStream(`${db.directory}/${newFile}`);
  writeStream.write(content);       
};

db.destroy = function(path, callback) {
  fs.unlink(`${db.directory}/${path}`, (err) => {
    if (err) callback(err);
    else callback();
  });
};

module.exports = db;