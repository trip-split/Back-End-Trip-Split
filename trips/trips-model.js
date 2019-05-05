const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findTripByUser,
  // getTrips,
  // getUsers
};

function find() {
  return db('trips').select('id', 'user_id', 'date', 'location', 'image', 'isCurrent');
}

function findBy(filter) {
  return db('trips').where(filter);
}

// async function add(trip) {
//   const [id] = await db('trips').insert(trip);

//   return findById(id);
// }

function add(trip) {
  return db('trips')
   
  .insert(trip)
  .then(ids => {
    console.log(ids)
    ids[0]})
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

// function getTrips(id) {
//   return db("trips").where({ user_id: id });
// }

// function getUsers(id) {
//   return db("users")
//     .where({ id })
//     .first();
// }

