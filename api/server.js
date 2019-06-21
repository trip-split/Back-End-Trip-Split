const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/users-router.js');
const tripsRouter = require('../trips/trips-router');
const tripParticipants = require('../trip-participants/trip-participants-router.js')
const events = require('../events/events-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.use('/api', tripsRouter);
server.use('/api/users', usersRouter);
server.use('/api', tripParticipants);
server.use('/api', events);

module.exports = server;