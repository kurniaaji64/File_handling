/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
      return knex.schema.createTable('roles', function(table) {
          table.increments();
          table.string('name').notNullable().unique();
          table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.dropTable('roles');
  };