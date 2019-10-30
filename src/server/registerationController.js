// //// TODO
// encrypt password before saving to DB (bcrypt)
const createUser = (req, res, next) => {
  const {
    firstname, lastname, email, password,
  } = req.body;

  // res.status(200).send('User info saved successfully');
  const query = {
    text: 'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',
    values: [firstname, lastname, email, password],
  };
  db.query(query)
    .then(user => res.status(201).send(user))
    .catch((err, res) => {
      console.error(err.stack);
      res.status(400).send(err);
    });
  next();
};

// ////// TODO
// verify user on login (jwt)
const getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  console.log(`get email${email}`);

  // res.status(200).send('User info saved successfully');

  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  db.query(query)
    .then((res) => {
      res.status(201);
    })
    .catch((err, res) => {
      console.error(err.stack);
      res.status(400).send(err);
    });
  next();
};

module.exports = {
  getUserByEmail,
  createUser,
};
