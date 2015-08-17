var Trivia = require('./triviaModel.js');
var Q = require('q');

module.exports = {
  checkAnswer: function(req, res){
    var id = req.body.id;
    var userAns = req.body.userAns;
    var findQuestion = Q.nbind(Trivia.findOne, Trivia);
    findQuestion({id: id})
    .then(function(DBquestion){
      var question = {};
      if(userAns !== undefined && DBquestion.answer.toLowerCase() === userAns.toLowerCase()){
        question.correct = true;
        res.send(question);
      }else{
        question.correct = false;
        res.send(question);
      }
    });
  },

  getClue: function(answer) {
    var result = [];
    var to_ = /([a-zA-Z0-9])/g;
    for(var i = 0; i < answer.length; i++){
      if(answer[i].match(to_) !== null) {
        result.push('_');
      } else {
        result.push(answer[i]);
      }
    }
    return result.join('');
  },

  addQuestion: function(result){
    var questions = [];
    var cleanAnswer = function(answer) {
      var str = answer, startItal, endItal;
      while(str.indexOf('<i>') !== -1) {
        startItal = str.indexOf('<i>');
        str = str.slice(0, startItal) + str.slice(startItal + 3);
      }
      while(str.indexOf('</i>') !== -1) {
        endItal = str.indexOf('</i>');
        str = str.slice(0, endItal) + str.slice(endItal + 4);
      }
      return str;
    };
    for(var i = 0; i < result.body.length; i++){
      var answer = cleanAnswer(result.body[i].answer);
      questions.push({
        id: result.body[i].id,
        question: result.body[i].question,
        answer: answer
      })
    }
    Trivia.collection.insert(questions, function(){
      //null
    })
  }

};