var express = require('express'),
    Peserta = require('../models/Peserta'),
    router = express.Router(),
    auth = require('../middleware/Auth');


router.post('/login',auth.authenticate('local',{session:false}),function (req, res) {
    res.json(req.user);
});

router.get('/dashboard',auth.authenticate('jwt',{ session: false}),function (req, res) {

});

// router.post('/test',auth.authenticate('jwt',{session: false}),function (req,res) {
//     res.json(req.user);
// });

module.exports = router;