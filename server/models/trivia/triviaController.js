var trivia = require('./triviaModel.js');
var Q = require('q');

module.exports = {
  checkAnswer: function(req, res){
    var id = req.body.id;
    var answer = req.body.answer;
    var findQuestion = Q.nbind(Trivia.findOne, Trivia);
    findQuestion({id: id})
    .then(function(question){
      if(question.answer === answer){
        console.log('correct');
      }else{
        console.log('incorrect');
      }
    })
  }

}