const env = process.env.NODE_ENV || 'development';
const config = require(appRoot+'/knexfile.js')[env];

module.exports = require('knex')(config);

console.log('-------------------|                 '+process.env.NODE_ENV.toUpperCase()+'             |-------------------')