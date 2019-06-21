const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  insert
};

function find() {
  return db('users').select('id', 'username', 'thumbnail');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const id = await db('users').insert(user, 'id')
  return db('users')
  .where({id})
  .first()
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function findById(id) {
  return db('users')
    .where({id})
    .first();
}