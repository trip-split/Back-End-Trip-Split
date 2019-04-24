const db = require('../data/dbConfig.js');

module.exports = {
  addParticipant,
  findById,
  findByTripId,
getTrips,
getTripParticipants

};


async function addParticipant(tripParticiapnt) {
    const [trips_id] = await db('trip_participants').insert(tripParticiapnt);
    //   console.log(newParticipant);
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

function getTrips(id) {
    return db("trips")
      .where({ id })
      .first();
  }


function getTripParticipants(id) {
  return db("trip_participants").where({ trips_id: id });
}