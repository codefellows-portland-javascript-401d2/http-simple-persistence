const url = require('url');
const data = require('./data');

const routes = {};

routes.routing = (req, res, callback) => {
  const reqUrlParse = url.parse(req.url, true);
  const reqMethod = req.method.toLowerCase();
  const reqUriSegments = reqUrlParse.pathname.split('/');

  return routes[reqMethod](reqUriSegments, reqUrlParse.query, res, callback);
};

routes.delete = (reqUriSegments, reqQuery, res, callback) => {
  if (reqUriSegments[1] === 'todos' && /[1-9]/.test(reqUriSegments[2])) {
    return data.destroyTodo(reqUriSegments[2], res, callback);
  }
};

routes.get = (reqUriSegments, reqQuery, res, callback) => {
  if (reqUriSegments[1] === 'todos' && !reqUriSegments[2]) {
    return data.retrieveTodos(res, callback);
  }
};

routes.post = (reqUriSegments, reqQuery, res, callback) => {
  if (reqUriSegments[1] === 'todos' && reqQuery.task) {
    return data.createTodo(reqQuery.task, reqQuery.isCompleted, res, callback);
  }
};

routes.put = (reqUriSegments, reqQuery, res, callback) => {
  if (reqUriSegments[1] === 'todos' && /[1-9]/.test(reqUriSegments[2]) && (reqQuery.task || reqQuery.isCompleted)) {
    return data.modifyTodo(reqUriSegments[2], reqQuery, res, callback);
  }
};

module.exports = routes;
