const http = require('http');
const app = require('./app');

const port = 8080;
app.listen(port, 'localhost', (err) => {
  console.log(`Server is listening on ${port}`);
});
