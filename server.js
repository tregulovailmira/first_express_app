const http = require('http');
const app = require('./app');

const server = http.createServer(app);
PORT = 3001;

server.listen(PORT, () => {
  console.log('Server is running');
});
