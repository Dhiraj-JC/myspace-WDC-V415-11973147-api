const { verify } = require('jsonwebtoken');

const tokenValidatorMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verified = verify(token, process.env.JWT_SECRET_KEY);

    if (verified) {
      next();
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = tokenValidatorMiddleware;
