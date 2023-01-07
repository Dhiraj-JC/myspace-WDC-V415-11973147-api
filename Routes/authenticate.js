const authenticateRouter = require('express').Router();
const User = require('../Models/user');
const { getHashedPassword, generateToken } = require('../Utilities');

authenticateRouter.post('/signup', async (req, res) => {
  let { userName, password } = req.body;

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

module.exports = authenticateRouter;
