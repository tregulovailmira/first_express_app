//const users = [];

const users = new Map().set('test@test.gmail', {
  id: 0,
  firstName: 'Test',
  lastName: 'Testovich',
  email: 'test@test.gmail',
  password: 'testpassword',
});

module.exports.signupUser = (req, res) => {
  const { body } = req;

  if (users.has(body.email)) {
    res.status(409).send('User with this email already exists');
  } else {
    const newUser = { id: users.size, ...body };
    users.set(newUser.email, newUser);

    const preparedUser = { ...newUser };
    delete preparedUser.password;
    res.status(201).send(preparedUser);
  }
};

module.exports.loginUser = (req, res) => {
  const { body } = req;
  if (users.has(body.email)) {
    const user = users.get(body.email);
    if (user.password === body.password) {
      delete user.password;
      res.status(200).send(user);
    } else {
      res.status(401).send('User is unauthorized');
    }
  } else {
    res.status(404).send('User not found');
  }
};
module.exports.logoutUser = (req, res) => {};
