require('dotenv').config();
const dbEngine = process.env.DB_ENV || 'development';
const config = require('../knexfile')[dbEngine];
module.exports = require('knex')(config);