const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findTripByUser
};

function find() {
  return db('trips').select('id', 'user_id', 'date', 'location', 'image');
}

function findBy(filter) {
  return db('trips').where(filter);
}

async function add(trip) {
  const [id] = await db('trips').insert(trip);

  return findById(id);
}

function findById(id) {
  return db('trips')
    .where({ id })
    .first();
}

function update(id, trips) {
  return db('trips')
    .where('id', Number(id))
    .update(trips);
}

function remove(id) {
  return db('trips')
    .where('id', Number(id))
    .del();
}

function findTripByUser(user_id) {
  return db('trips')
    .select('id', 'user_id', 'date', 'location', 'image')
    .where({ user_id })
//     .first();
}