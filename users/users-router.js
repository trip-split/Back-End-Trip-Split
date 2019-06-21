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
  Users.insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({error: 'error registering user'});
    });
});


module.exports = router;