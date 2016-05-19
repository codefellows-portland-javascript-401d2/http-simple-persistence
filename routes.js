const url = require('url');
const data = require('./data');

const routes = {};

routes.routing = (req, res) => {
  const reqUrlParse = url.parse(req.url, true);
  const reqMethod = req.method.toLowerCase();
  const reqUriSegments = reqUrlParse.pathname.split('/');

  return routes[reqMethod](reqUriSegments, reqUrlParse.query);
};

routes.delete = (reqUriSegments, reqQuery) => {
  if (reqUriSegments[1] === 'todos' && /[1-9]/.test(reqUriSegments[2])) {
    return data.destroyTodo(reqUriSegments[2]);
  }
};

routes.get = (reqUriSegments, reqQuery) => {
  if (reqUriSegments[1] === 'todos' && !reqUriSegments[2]) {
    return data.retrieveTodos();
  }
};

routes.post = (reqUriSegments, reqQuery) => {
  if (reqUriSegments[1] === 'todos' && reqQuery.task) {
    return data.createTodo(reqQuery.task, reqQuery.isCompleted);
  }
};

routes.put = (reqUriSegments, reqQuery) => {
  if (reqUriSegments[1] === 'todos' && /[1-9]/.test(reqUriSegments[2]) && (reqQuery.task || reqQuery.isCompleted)) {
    return data.modifyTodo(reqUriSegments[2], reqQuery);
  }
};

module.exports = routes;
