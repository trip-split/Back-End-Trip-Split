exports.up = function(knex) {
    return knex.schema.createTable('trip_participants', tripParticipants => {
      tripParticipants.increments();
      tripParticipants
        .integer("trips_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tripParticipants
        .string("name", 128)
        .notNullable()
      tripParticipants
        .string("thumbnail")
    })
};
  
exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('trip_participants')
};
