var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../server/utility');

var db = require('../server/config');
var User = require('../server/models/user');

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user){
      if (!user) {
        res.send('user not found');
      } else {
        user.comparePassword(password, function(err, match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.send('incorrect password');
          }
        })
      }
    });
}

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  UserfindOne({ username: username })
    .exec(function(err, user){
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
          if(err){
            res.send(500, err);
          }else{
          util.createSession(req, res, newUser);
          }
        });
      } else {
        console.log('Account already exists');
        res.send('username taken');
      }
    })
};