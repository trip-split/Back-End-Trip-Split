exports.up = function(knex) {
    return knex.schema.createTable('events', events => {
        events.increments();
        events
            .integer("trips_id")
            .unsigned()
            .references("id")
            .inTable("trips")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        events
            .date('date')
            .notNullable();
        events
            .text("title", 128)
            .notNullable();
        events
            .decimal("total_price")
            .notNullable();
        events
            .string('participants')
        events 
            .boolean('userOnTrip')
            .notNullable();
        events
            .boolean('userPaid')
            .notNullable();
        events
            .string('participantPaid');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
        // .dropTableIfExists('trips')
        // .dropTableIfExists('trip_participants_id')
        // .dropTableIfExists('trip_participants')
        .dropTableIfExists('events')
        // .dropTableIfExists('events_details')
  };