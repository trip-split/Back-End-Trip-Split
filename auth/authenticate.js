const jwt = require('jsonwebtoken');

const jwtKey =
  process.env.JWT_SECRET ||
  'adding auth for FE';


module.exports = {
  authenticate,
};


function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;
      req.body.user_id = req.decoded.subject
      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}