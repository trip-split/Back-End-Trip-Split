exports.up = function(knex) {
    return knex.schema.createTable('trips', trips => {
      trips.increments();
  
      trips
       .integer("user_id")
       .unsigned()
       .references("id")
       .inTable("users")
       .onDelete('CASCADE')
       .onUpdate('CASCADE');
      trips
        .date('date')
        .notNullable();
      trips
        .string('location', 128)
        .notNullable();
      trips
        .string('image', 128);
    })
    .createTable('trip_participants_id', tp => {
        tp.increments();
        tp
          .string('trip_participants_name', 128)
          .notNullable();
      })
    .createTable('trip_participants', tripParticipants => {
      tripParticipants.increments();
      tripParticipants
        .integer("trips_id")
        .unsigned()
        .references("id")
        .inTable("trips")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tripParticipants
        .integer("trip_participants_id")
        .unsigned()
        .references("id")
        .inTable("trip_participants_id")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('events', events => {
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
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        events
            .text("title", 128)
            .notNullable();
        events
            .decimal("total_price")
            .notNullable();
    })
    .createTable('events_details', ed => {
        ed.increments()
        ed
            .integer("events_id")
            .unsigned()
            .references("id")
            .inTable("events")
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        ed
            .integer("trip_participants_id")
            .unsigned()
            .references("id")
            .inTable("trip_participants")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('trips')
        .dropTableIfExists('trip_participants_id')
        .dropTableIfExists('trip_participants')
        .dropTableIfExists('events')
        .dropTableIfExists('events_details')
  };
