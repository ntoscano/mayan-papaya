var mongoose = require('mongoose');

var TriviaSchema = new mongoose.Schema({
  id: Number,
  question: String,
  answer: String,
});

module.exports = mongoose.model('Trivia', TriviaSchema);