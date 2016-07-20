
const HomeController = require('../controllers/HomeController');
const StockController = require('../controllers/StockController');

// Routes
module.exports = app => {
	app.get('/', HomeController.index);
	app.get('/api/stocks', StockController.all);
};
