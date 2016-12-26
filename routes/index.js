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
                var code = qrcode.toDataURL(uuid,4);
                var pdfConfig = {
                    height: '300px',
                    width: '640px'
                };
                var no = ress.counter;
                var nom = '';
                if(no <10){

                    no = 'RTR000' + no;
                } else if(no <100){
                    nom = 'Rp. 20.0' + no;
                    no = 'RTR00' + no;

                } else if(no <1000){
                    nom = 'Rp. 20.' + no;

                    no = 'RTR0' + no;
                } else {
                    nom = 'Rp. 20.00' + (no%1000);
                    no = 'RTR' + no;
                }
                var data = {
                    qr: code,
                    uuid: uuid,
                    data: ress,
                    no: no,
                    nom: nom
                };
                ejs.renderFile('./views/pdf/invoice.ejs',data,function (err, str) {
                    console.log(ress);
                    pdf.create(str).toBuffer(function (err, buffer) {
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
