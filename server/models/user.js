var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var autoIncrement = require('mongodb-autoincrement');


var userSchema = mongoose.Schema({
  userID: {type : Number , unique : true, require : true},
  experience: {type : Number , require : true, default: 0},
  username: { type : String , unique : true, required : true},
  password: String
});

userSchema.plugin(autoincrement.userID);

var User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
  next();
})

User.prototye.comparePassword =  function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if(err) throw err;
    else callback(isMatch);
  });
},


module.exports = User;
