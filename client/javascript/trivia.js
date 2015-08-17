(function() {

  var app = angular.module('Trivia', []);

  //factory to get and hold question data
  //also has methods for cleaning and augmenting question data
  app.factory('Questions', ['$http', function($http) {
    var obj = {};

    obj.getCleanAnswer = function(answer) {
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

    obj.getClue = function(answer) {
      var result = [];
      var to_ = /([a-zA-Z0-9])/g;
      _.each(answer, function(char) {
        if(char.match(to_) !== null) {
          result.push('_');
        } else {
          result.push(char);
        }
      });
      return result.join('');
    };

    obj.getQuestions = function() { // retrieves questions from backend
      return $http.get('/api/trivia').success(function(data) {
        // using Angular $http service to query our questions route
        // success cb executes when request returns
        // route returns a list of questions
        obj.questions = data;
      });
    };

    obj.updateUser = function(user){
      return $http.put('/api/users', {
        username: user.username,
        score: user.score,
        correct: user.correct,
        correctStreak: user.correctStreak,
        answered: user.answered
      });//TODO: update view based on respose
    };

    return obj;
  }]);


  app.controller('TriviaController', ['$scope', '$http', 'Questions', '$interval', '$location', '$rootScope', function($scope, $http, Questions, $interval, $location, $rootScope) {

    //sample trivia api response for chai test
    $scope.questions = [
      {
        "id": 46207,
        "answer": "England",
        "question": "This country's 1689 Bill of Rights stated that no Roman Catholic would ever rule it",
        "value": 100,
        "airdate": "2000-11-23T12:00:00.000Z",
        "created_at": "2014-02-11T23:13:46.149Z",
        "updated_at": "2014-02-11T23:13:46.149Z",
        "category_id": 5724,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": 5724,
          "title": "catholicism",
          "created_at": "2014-02-11T23:13:46.044Z",
          "updated_at": "2014-02-11T23:13:46.044Z",
          "clues_count": 10
        }
      }
    ];

    $scope.updateUser = Questions.updateUser;
    $scope.answered = 0;
    $scope.correct = 0;
    $scope.correctStreak = 0;
    $scope.currentStreak = 0;
    $scope.username = $rootScope.username;
    //for question navigation
    $scope.navLoc = 0;
    $scope.nextLoc = function() {
      $scope.navLoc++;
      $scope.setCountdown();
      if ($scope.navLoc === 10) {
        $scope.updateUser({
          username: $scope.username,
          score: $scope.score,
          correct: $scope.correct,
          correctStreak: $scope.correctStreak,
          answered: $scope.answered

        });
        $scope.answered = 0;
        $location.path("/trivia/endgame"); // render endgame view
      }
    };

    //for getting trivia questions from the jService API
    $scope.getQuestions = function() {
      Questions.getQuestions()
        .success(function(data) {
          $scope.questions = data;
          //clean the italics from the answers and add the clue to the object
          _.each($scope.questions, function(q) {
            q.answer = Questions.getCleanAnswer(q.answer);
            q.clue = Questions.getClue(q.answer);
          });
        });
    };
    $scope.getQuestions();

    $scope.score = 0;
    //for handling user answers to trivia
    $scope.checkAnswer = function(keyEvent, question) {
      if(keyEvent.keyCode === 13) {
        $scope.answered++;
        var userAns = question.userAnswer;
        if(userAns.toLowerCase() === question.answer.toLowerCase()) {
          $scope.correct++;
          $scope.currentStreak++;
          $scope.score += question.value;
        }else{
          $scope.currentStreak = 0;
        }
        if($scope.currentStreak > $scope.correctStreak){
          $scope.correctStreak = $scope.currentStreak;
        }
        //not used atm since the game is hard as shit
        // else {
        //   $scope.score -= Math.floor(question.value / 10);
        // }
        $scope.nextLoc();
      }
      $scope.finalScore = $scope.score || 0;
    };

    //Timer uses timeout function
    //cancels a task associated with the promise
    $scope.setCountdown = function() {
      //resets the timer
      if(angular.isDefined($scope.gameTimer)) {
        $interval.cancel($scope.gameTimer);
        $scope.gameTimer = undefined;
      }
      //initialize timer number
      $scope.counter = 20;
      //countdown
      $scope.gameTimer = $interval(function() {
        $scope.counter--;
        if($scope.counter === 0) {
          $scope.nextLoc();
          $scope.setCountdown();
        }
      }, 1000);
    };
    //cancel timer if user navigates away from questions
    $scope.$on('$destroy', function() {
      $interval.cancel($scope.gameTimer);
    });

  }]);

})();
