var express = require('express'),
    router = express.Router(),
    Peserta = require('../models/Peserta');


router.post('/register',function (req,res) {
    Peserta.create(req.body, function (err, peserta) {
        if(err){
            res.json(err);
        } else {
            res.json(peserta);
        }
    });
});

module.exports = router;