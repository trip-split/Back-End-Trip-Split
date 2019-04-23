
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "Mike", password: 'pass', email: 'Mike@lambda.com'},
        {username: "Ted", password: 'pass', email: 'Ted@lambda.com'},
        {username: "Fred", password: 'pass', email: 'Fred@lambda.com'}
      ]);
    });
};
