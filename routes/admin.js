var express = require('express'),
    Peserta = require('../models/Peserta'),
    router = express.Router(),
    auth = require('../middleware/Auth');


router.post('/login',auth.authenticate('local',{session:false}),function (req, res) {
    res.json(req.user);
});

router.get('/getData',auth.authenticate('jwt',{ session: false}),function (req, res) {
    Peserta.find({},function (err, result){
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;