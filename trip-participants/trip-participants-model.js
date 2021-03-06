const db = require('../data/dbConfig.js');

module.exports = {
  addParticipant,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
    return db('trip_participants').select('id', 'trips_id', 'name', 'thumbnail');
  }
  
  function findBy(filter) {
    return db('trip_participants').where(filter);
  }
  
  // async function add(trip) {
  //   const [id] = await db('trip_participants').insert(trip);
  
  //   return findById(id);
  // }
function addParticipant(trip) {
   return db('trip_participants')
    
   .insert(trip)
   .then(ids => ids[0])
  }
  
  function findById(id) {
    return db('trip_participants')
      .where({ id })
      .first();
  }
  
  function update(id, participant) {
    return db('trip_participants')
      .where('id', Number(id))
      .update(participant);
  }
  
  function remove(id) {
    return db('trip_participants')
      .where('id', Number(id))
      .del();
  }