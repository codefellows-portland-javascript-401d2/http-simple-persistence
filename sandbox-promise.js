const fs = require('fs');



//= = = =  P R O M I S E S = = = = = = = = 

getFile('data.txt')
  .then(file => {
    console.log(file.toString());
  })
  .catch(err => {
    console.log('error:', err);
  });

function getFile(name, cb) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(name, (err, file) => {
      if (err) {
        reject(err);
        if (cb) cb(err); //better error handling that wont break everything else, but instead pass err to callback
      }
      else {
        resolve(file);
        if (cb) cb(null, file); 
      }
    });
  });
  
  return promise;
}

function getFile(name, cb) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, (err, file) => {
      if (err) {
        reject(err);
        if (cb) cb(err);
      }
    })   
  });
}