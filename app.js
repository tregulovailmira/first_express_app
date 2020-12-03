const express = require('express');
const { validate } = require('./middleware');
const userController = require('./controllers/user.controller');

//require search files
//1. node modules API node
//2. npm package (node modules folder)
//3. *.js
//4.1 package.json main
//4.2 index.js

const PORT = 3001;
const app = express();

//const bodyParser = express.json(); //req.body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(`Get handler is running Request from url: ${req.path}`);
});

app.post('/signup', validate.signupValidate, userController.signupUser);

app.post('/login', userController.loginUser);

app.use((error, req, res, next) => {
  res.status(500).send(error);
});

app.delete('/', () => {
  console.log('Delete handler is running');
});

app.put(
  '/users/user',
  (req, res, next) => {
    console.log('Request body >> ', req.body);
    next();
  },
  (req, res) => {
    res.status(201).send(req.body);
  }
);

module.exports = app;
