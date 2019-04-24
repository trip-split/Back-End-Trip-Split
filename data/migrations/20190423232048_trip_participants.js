exports.up = function(knex) {
    return knex.schema.createTable('trip_participants', tripParticipants => {
      tripParticipants.increments();
      tripParticipants
        .integer("trips_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("trips")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tripParticipants
        .string("name", 128)
        .notNullable()
      tripParticipants
        .string('thumbnail')
    })
}
exports.down = function(knex, Promise) {
    return knex.schema
        // .dropTableIfExists('trips')
        // .dropTableIfExists('trip_participants_id')
        .dropTableIfExists('trip_participants')
        // .dropTableIfExists('events')
        // .dropTableIfExists('events_details')
  };