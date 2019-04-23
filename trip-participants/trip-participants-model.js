const db = require('../data/dbConfig.js');

module.exports = {
  addParticipant,
  findById,
  findByTripId
};


async function addParticipant(tripParticiapnt) {
const newTraveler = await db('trip_participants').insert(tripParticiapnt);
  console.log(newParticipant);
  return findById(trips_id);
}

function findById(id) {
  return db('trips_id')
    .where({ id })
    .first();
}

function findByTripId(trips_id) {
    return db('trips')
      .select('id', 'trips_id', 'date', 'location', 'image')
      .where({ trips_id })
  //     .first();
  }
