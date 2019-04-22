const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js')
const { authenticate } = require('../auth/authenticate');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.use('/api', authRouter);
server.use('/api', authenticate);
server.use('/api/users', usersRouter);

module.exports = server;