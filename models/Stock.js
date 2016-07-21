'use strict';

const knex = require('../db/knex');
const TABLE = 'stock';

/**
 * Create a new stock object
 * @param {Object} stock data
 * @return {Object} list of stock information
 */
exports.create = stock => {
    return knex(TABLE).insert(stock, ['id', 'index', 'value', 'changeNet', 'createdAt', 'updatedAt']);
};

/**
 * Retrieve all the stock information with limit of latest 20 rows
 * @return {Object} list of stock information
 */
exports.findAll = () => {
    return knex.select('index', 'value', 'changeNet', 'createdAt', 'updatedAt').from(TABLE).limit(20).orderBy('createdAt', 'desc');
};

/**
 * Delete all data in stock table
 * @return {void}
 */
exports.deleteAll = () => {
    return knex(TABLE).del();
};
