/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  var bcrypt = require('bcryptjs');
  await knex('users').del()
  await knex('users').insert([
    {
        name: 'administrator',
        email: 'admin@email.com',
        username: 'administrator',
        password: bcrypt.hashSync('password'),
        phone: '081881881881',
        role_id: '1'
    }
  ]);
};
