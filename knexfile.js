// Update with your config settings.

const localPgConnection = {
  host: 'localhost',
  database: 'users',
  user: 'will',
  password: 'pass'
}

const prodDbConnection = process.env.DATABASE_URL || localPgConnection

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/users.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: prodDbConnection, // an object or a string
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  }


};