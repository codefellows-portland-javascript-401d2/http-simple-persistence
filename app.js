const server = require('./server');

const app = server.new();

app.listen(8080, (err) => {
  if (err) console.error('Error message: %j', err);

  console.log('Opened server on %j', app.address());
});
