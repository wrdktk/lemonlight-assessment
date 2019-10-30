const bcrypt = require('bcryptjs');
const db = require('./database');

const salt = bcrypt.genSaltSync(10);

// TODO encrypt password before saving to DB (bcrypt)
const createUser = (req, res, next) => {
  const {
    firstName, lastName, email, password
  } = req.body;

  const hash = bcrypt.hashSync(password, salt);
  const emailLower = email.toLowerCase();
  db.query('INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, emailLower, hash], (err, result) => {
    if (err) { return res.json(err); }
    return res.json(result);
  });
  console.log('User added to database successfully');
};

// ////// TODO
// verify user on login (jwt)
const getUserByEmail = (req, res, next) => {
  const { email } = req.body;

  db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
    if (err) { return res.json(err); }
    return res.json(result);
  });

  console.log('User logged in successfully');
};

module.exports = {
  getUserByEmail,
  createUser,
};
