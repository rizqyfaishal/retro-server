var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var pdf = require('html-pdf');
var qrcode = require('qrcode-js');
var Peserta = require('../models/Peserta');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/pdf/:uuid',function (req,res) {
    var uuid = req.params.uuid;

    Peserta.findOne({uuid: uuid},function (err,ress) {
        if(err){
            res.json(err);
        }  else{
            if(ress){
                var code = qrcode.toDataURL(uuid,7);
                var pdfConfig = {
                    height: '300px',
                    width: '640px'
                };
                var data = {
                    qr: code,
                    uuid: uuid,
                    data: ress
                };
                ejs.renderFile('./views/pdf/invoice.ejs',data,function (err, str) {
                    pdf.create(str,pdfConfig).toBuffer(function (err, buffer) {
                        if(err) {
                            res.json(err);
                        } else {
                            res.write(buffer);
                            res.end('<title>Bukti Pendaftaran</title>');
                        }
                    })
                })
            } else {
                res.json({
                    status: 'ok',
                    message: 'not found'
                })
            }
        }
    });

});

module.exports = router;
