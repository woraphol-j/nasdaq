var knex = require('../db/knex');

// Create a new stock
exports.create = stock => {
    return knex('stock').insert(stock);
};

// Get a particular comment
exports.findAll = (id, cb) => {
    return knex.select('index', 'value', 'changeNet', 'createdAt', 'updatedAt2').from('stock');
};
