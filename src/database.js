const fs = require('fs');
var mkdirp = require('mkdirp');
var db = {};

db.directory = './data';

db.createDir = function() {
  mkdirp('./data', function(err) {
    if (err) throw err;
    else console.log('/data created in project folder');
  });
};

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