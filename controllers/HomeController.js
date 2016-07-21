'use strict';

const Stock = require('../models/Stock');

exports.index = (req, res, next) => {
	Stock.findAll().then((data => {
		res.render('index', { data });
	})).catch(next);
};
