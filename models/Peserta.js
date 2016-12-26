var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
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
    enum: ['Laki laki','Perempuan']
  },
  'type': {
    type: String,
    required: [true, 'This field is required'],
    enum: ['SAINTEK','SOSHUM']
  },
  'status_pembayaran': { type: Boolean },
  'status_masuk': { type: Boolean },
  'uuid': { type: String },
  'no_kursi': { type: Number },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Peserta', newSchema);
