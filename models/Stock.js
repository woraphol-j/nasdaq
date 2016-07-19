var knex = require('../db/knex');
const TABLE = 'stock';

// Create a new stock
exports.create = stock => {
    return knex(TABLE).insert(stock);
};

// Retrieve all the stock information
exports.findAll = () => {
    return knex.select('index', 'value', 'changeNet', 'createdAt', 'updatedAt').from(TABLE);
};

// Delete all data in stock table
exports.deleteAll = () => {
    return knex(TABLE).del();
};
