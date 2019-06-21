const router = require('express').Router();

const Users = require('./users-model.js');


router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post('/new-user', (req, res) => {
  let user = req.body;
  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({error: 'error registering user'});
    });
});


module.exports = router;