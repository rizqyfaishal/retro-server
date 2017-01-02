var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/Auth'),
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
        reference: req.body.reference
    };
    Peserta.update({uuid: uuid, payment: { $exists: false }},{$set: { payment: data }}, function (err, result) {
        if(err){
            res.json(err);
        } else {
            if(result.nModified != 0){
                res.json({
                    status: 'ok',
                    message: 'success'
                })
            } else {
                res.json({
                    status: 'ok',
                    message: 'found'
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

router.get('/payment/:uuid',auth.authenticate('jwt',{session:false}),function (req, res) {
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
    });
});

router.post('/payment/:uuid/toggle',auth.authenticate('jwt',{session:false}),function (req, res) {
    var status = req.body.status;
   Peserta.update({uuid: req.params.uuid},{ status_pembayaran: !status },function (err, result) {
       if(err){
           res.json(err);
       } else {
           if(result){
               res.json(result);
           } else{
               res.json({
                   status:'ok',
                   message: 'notFound'
               })
           }
       }

   })
});
module.exports = router;