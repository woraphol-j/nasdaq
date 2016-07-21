'use strict';

const Stock = require('../models/Stock');
const _ = require('lodash');

exports.all = (req, res, next) => {
	Stock.findAll().then(stocks => {
		res.json(_.reverse(stocks));
	}).catch(next);
};
