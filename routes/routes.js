
var StockController = require('../controllers/StockController');

// Routes
module.exports = app => {
  app.get('/', (req, res) => {
    res.json('ok');
  });
  app.get('/api/stocks', StockController.all);
};
