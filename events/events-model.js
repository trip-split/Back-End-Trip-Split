const db = require('../data/dbConfig.js');

module.exports = {
  addEvent,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
    return db('events').select('id', 'trips_id', 'date', 'title', 'total_price', 'participants', 'userOnTrip', 'userPaid', 'participantPaid');
  }
  
  function findBy(filter) {
    return db('events').where(filter);
  }
  
  // async function add(trip) {
  //   const [id] = await db('trip_participants').insert(trip);
  
  //   return findById(id);
  // }
function addEvent(event) {
   return db('events')
    
   .insert(event)
   .then(ids => ids[0])
  }
  
  function findById(id) {
    return db('events')
      .where({ id })
      .first();
  }
  
  function update(id, event) {
    return db('events')
      .where('id', Number(id))
      .update(event);
  }
  
  function remove(id) {
    return db('events')
      .where('id', Number(id))
      .del();
  }