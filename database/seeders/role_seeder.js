/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del().then(function () {
    // Inserts seed entries
    return knex('roles').insert([
      {
          id: 1,
          name: 'Administrator'
      },
      {
          id: 2,
          name: 'Member'
      }
    ]);
  });
};
