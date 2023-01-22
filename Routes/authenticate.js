const authenticateRouter = require('express').Router();
const User = require('../Models/user');
const { getHashedPassword, generateToken } = require('../Utilities');
const bcrypt = require('bcrypt');
const { validateEmail, validatePassword } = require('../Validators');

authenticateRouter.post('/signup', async (req, res) => {
  let { userName, password } = req.body;

  const emailValidation = validateEmail(userName);
  if (emailValidation.isInvalid) {
    res.status(400).json({ errorMessage: emailValidation.errorMessage });
    return;
  }

  const passwordValidation = validatePassword(password);
  if (passwordValidation.isInvalid) {
    res.status(400).json({ errorMessage: passwordValidation.errorMessage });
    return;
  }

  password = await getHashedPassword(password);

  const userEntity = new User({ userName: userName, password: password });

  try {
    await userEntity.save();
    const token = generateToken(userEntity);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authenticateRouter.post('/login', async (req, res) => {
  let { userName, password } = req.body;

  const emailValidation = validateEmail(userName);
  if (emailValidation.isInvalid) {
    res.status(400).json({ errorMessage: emailValidation.errorMessage });
    return;
  }

  const passwordValidation = validatePassword(password);
  if (passwordValidation.isInvalid) {
    res.status(400).json({ errorMessage: passwordValidation.errorMessage });
    return;
  }

  try {
    const user = await User.findOne({ userName: userName });
    const isPasswordSame = await bcrypt.compare(password, user?.password);

    if (!user || !isPasswordSame) {
      res.status(400).json({ error: 'Username or password is incorrect' });
    } else {
      const token = generateToken(user);
      res.json({ token: token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authenticateRouter;
