var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('short-id');
var increment = require('mongoose-auto-increment');
if (mongoose.connection.readyState === 0) {
  var connect = mongoose.connect(require('./connection-string'));
  increment.initialize(connect);
}


var newSchema = new Schema({
  
  'name': {
    type: String,
    required: [true, 'This field is required'],
    validate: {
      validator: function (val) {
          return /^[A-Za-z \']{3,}$/.test(val);
    },
      message: '{VALUE} is not valid name!'}
  },
  'email': {
    type: String,
    required: [true, 'This field is required']
  },
  'phone': {
    type: String,
    required: [true, 'This field is requied!'],
    validate: {
      validator: function (val) {
        return /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/.test(val);
      },
      message: '{VALUE} is not valid phone number'
    }
  },
  'school': {
    type: String,
    required: [true, 'This field is required!'],
    validate: {
      validator: function (val) {
        return /^[A-Za-z \d]{3,}$/.test(val);
      },
      message: '{VALUE} is not valid school name'
    }
  },
  'gender': {
    type: String,
    required: [true, 'This field is required'],
    enum: ['Laki-laki','Perempuan']
  },
  'type': {
    type: String,
    required: [true, 'This field is required'],
    enum: ['SAINTEK','SOSHUM']
  },
  'payment' : {
      name: {
        type: String
      } ,
      nominal: {
        type: String
      },
      reference: {
        type: String
      }
  },
  'status_pembayaran': { type: Boolean },
  'status_masuk': { type: Boolean },
  'uuid': { type: String, default: shortid.generate },
  'no_kursi': { type: Number },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  this.status_masuk = false;
  this.status_pembayaran = false;
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


newSchema.plugin(increment.plugin, {model: 'Peserta', field: 'counter'});

module.exports = mongoose.model('Peserta', newSchema);
