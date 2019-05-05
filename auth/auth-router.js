const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const jwtKey =
  process.env.JWT_SECRET ||
  'BWBE';


const Users = require('../users/users-model.js');
// const Authenticate = require('../auth/authenticate.js')


authRouter.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;
  // console.log(user);
  Users.insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({error: 'error registering user'});
    });
});

authRouter.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); 

        
        res.status(200).json({
          message: `${user.username} working...`,
          token,
          username: `${user.username}`,
          id: `${user.id}`,
          thumbnail: `${user.thumbnail}`
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
   
  };

  const options = {
    expiresIn: '25d',
  };

  return jwt.sign(payload, jwtKey, options);
}

module.exports = authRouter;