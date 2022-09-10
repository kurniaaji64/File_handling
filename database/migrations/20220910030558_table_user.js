/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('users', function(table) {
            table.increments();
            table.string('name').nullable();
            table.string('email').nullable();
            table.string('username').nullable();
            table.string('password').nullable();
            table.string('phone').nullable();
            table.integer('role_id').unsigned().notNullable();
            table.boolean('deleted').defaultTo(false)
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

            table
            .foreign('role_id')
            .references('id')
            .inTable('roles')
            .onDelete("RESTRICT")
            .onUpdate("RESTRICT");
      })
      
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
