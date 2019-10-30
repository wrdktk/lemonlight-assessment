require('dotenv').config({ path: './variables.env' });

const os = require('os');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.status(200).send("Welcome to our restful API");
});
// // sign up endpoint
app.post('/api/user/register', api.createUser);
// app.post('/api/user/register', (req, res) => {
//   res.send('Hello from A!');
// });
// // log in endpoint
app.get('/api/user/login', api.getUserByEmail);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
