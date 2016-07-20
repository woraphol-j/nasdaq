
const knex = require('../db/knex');
const TABLE = 'stock';

// Create a new stock
exports.create = stock => {
    return knex(TABLE).insert(stock, ['id', 'index', 'value', 'changeNet', 'createdAt', 'updatedAt']);
};

/**
 * Retrieve all the stock information with limit of latest 20 rows
 */
exports.findAll = () => {
    return knex.select('index', 'value', 'changeNet', 'createdAt', 'updatedAt').from(TABLE).limit(20);
};

// Delete all data in stock table
exports.deleteAll = () => {
    return knex(TABLE).del();
};
