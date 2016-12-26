var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/Auth');


router.post('/login',auth.authenticate('local',{session:false}),function (req, res) {
    res.json(req.user);
});

router.post('/test',auth.authenticate('jwt',{session: false}),function (req,res) {
    res.json(req.user);
});

module.exports = router;