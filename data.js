const fs = require('fs');

const data = {};

data.createTodo = (task, isChecked = false, callback) => {
  fs.readdir('data', (err, files) => {
    if (err) callback(err);

    let fileCount = files.length + 1;
    let fileBaseName = `${fileCount}.json`;
    let filePath = `data/${fileBaseName}`;
    let json = JSON.stringify({task, isChecked}, null, 2);

    fs.writeFile(filePath, json, (err) => {
      if (err) callback(err);

      callback(null, {
        status: 'success',
        results: `Create ${fileBaseName} in data directory.`
      });
    });
  });
};

data.retrieveTodos = (callback) => {
  fs.readdir('data', (err, files) => {
    if (err) callback(err);

    callback(null, {
      status: 'success',
      results: files
    });
  });
};

data.modifyTodo = (id, query, callback) => {
  let fileBaseName = `${id}.json`;
  let filePath = `data/${fileBaseName}`;

  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (err) console.error(err);

    let json = JSON.parse(data);
    if ('task' in query) json.task = query.task;
    if ('isCompleted' in query) json.isCompleted = query.isCompleted;
    json = JSON.stringify(json, null, 2);

    fs.writeFile(filePath, json, (err) => {
      if (err) callback(err);

      callback(null, {
        status: 'success',
        results: `${fileBaseName} has been updated.`
      });
    });
  });
};

data.destroyTodo = (id, callback) => {
  let fileBaseName = `${id}.json`;
  let filePath = `data/${fileBaseName}`;

  fs.unlink(filePath, () => {
    callback(null, {
      status: 'success',
      results: `${fileBaseName} has been removed.`
    });
  });
};

module.exports = data;
