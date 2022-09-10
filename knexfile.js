// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: process.env.DB_MYSQL_CLIENT,
    connection: {
      database: process.env.DB_MYSQL_NAME,
      user:     process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeders',
    },
  },
  testing: {
    client: process.env.DB_MYSQL_CLIENT,
    connection: {
      database: process.env.DB_MYSQL_NAME,
      user:     process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeders',
    },
  },
  
};
