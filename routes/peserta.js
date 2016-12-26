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

router.post('/confirm',function (req,res) {
    var uuid = req.body.uuid;
    var data = {
        name: req.body.name,
        nominal: req.body.nominal,
        references: req.body.references
    };
    Peserta.update({uuid: uuid},{$set: { payment: data }}, function (err, result) {
        if(err){
            res.json(err);
        } else {
            if(result){
                res.json({
                    status: 'ok',
                    message: 'success'
                })
            } else {
                res.json({
                    status: 'ok',
                    message: 'not found'
                })
            }
        }
    })
});

router.get('/check/:uuid', function (req, res) {
   Peserta.findOne({uuid: req.params.uuid},function (err, result) {
       if(err){
           res.json(err);
       } else {
           if(result){
               res.json(result);
           } else {
               res.json({
                   status: 'ok',
                   message: 'not found'
               })
           }
       }
   })
});

module.exports = router;