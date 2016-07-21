'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('stock', function (table) {
        table.increments();
        table.string('index');
        table.decimal('value');
        table.decimal('changeNet');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('stock');
};
