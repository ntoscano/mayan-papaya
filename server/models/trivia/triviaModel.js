var mongoose = require('mongoose');

var TriviaSchema = new mongoose.Schema({
  id: Number,
  answer: String,
  question: String,
  value: Number,
  airdate: String,
  created_at: String,
  updated_at: String,
  category_id: Number
})

module.exports = mongoose.model('Trivia', TriviaSchema);