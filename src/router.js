var db = require('./database');

var router = {};

router.paths  = [];


router.route = function(path, res, type) {
  if (!type) type = 'application/json';
  var status_code = 200;
  if (path === '/') {
    path = '/index';
  }
  // } else if (router.paths.indexOf(path) === -1) {
  //   path = '/404';
  //   status_code = 404;
  // }
  res.writeHead(status_code, {'Content-Type': type});

};

module.exports = router;