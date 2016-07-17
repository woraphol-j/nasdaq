var express = require('express');
var router = express.Router();
var knex = require('knex');


/* GET home page. */
router.get('/', (req, res, next) => {

  

  res.render('index', { title: 'Express' });

});

module.exports = router;
