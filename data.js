const fs = require('fs');

const data = {};

data.createTodo = (task, isChecked) => {
  return {
    message: 'Create To-do'
  };
};

data.retrieveTodos = () => {
  return {
    message: 'Retrieve To-dos'
  };
};

data.modifyTodo = (id) => {
  return {
    message: 'Modify To-do'
  };
};

data.destroyTodo = (id) => {
  return {
    message: 'Destroy To-do'
  };
};

module.exports = data;
