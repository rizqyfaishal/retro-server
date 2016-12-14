var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',function (req,res) {
    User.create({ name: 'Rizqy' },function (er,data) {
        if(er) throw er;
        res.json({user: data});
    })
});

module.exports = router;
