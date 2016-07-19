
const Stock = require('../models/Stock');

exports.all = (req, res, next) => {
  Stock.findAll().then(stocks => {
    res.json(stocks);
  }).catch(next);
};
