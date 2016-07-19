
var StockController = require('../controllers/StockController');

// Routes
module.exports = app => {
  app.get('/api/stocks', StockController.all);
};
