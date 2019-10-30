require('dotenv').config({ path: './variables.env' });

const os = require('os');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const api = require('./registerationController');
// const User = require('./controllers/userController');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static('dist'));

// sign up endpoint
app.use('/api/user/register', api.createUser);

// // login endpoint
app.use('/api/user/login', api.getUserByEmail);

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));

// check connection to database
db.query('SELECT NOW()', (err, res) => {
  if (err.error) { return console.log(err.error); }
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});
