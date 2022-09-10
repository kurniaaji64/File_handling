/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('file_handling', function(table) {
            table.increments();
            table.string('name').notNullable().unique();
            table.string('type').notNullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      })
      
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
      return knex.schema.dropTable('file_handling');
};
