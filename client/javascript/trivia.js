(function() {

  var app = angular.module('Trivia', []);

  //factory to get and hold question data
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

    return obj;
  }]);

  app.controller('TriviaController', ['$scope', '$http', 'Questions', function($scope, $http, Questions) {

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
      },
      {
        "id": 46208,
        "answer": "The fittest",
        "question": "Herbert Spencer summed up Darwin's theory as \"Survival of\" these",
        "value": 100,
        "airdate": "2000-11-23T12:00:00.000Z",
        "created_at": "2014-02-11T23:13:46.199Z",
        "updated_at": "2014-02-11T23:13:46.199Z",
        "category_id": 5725,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": 5725,
          "title": "the mostest",
          "created_at": "2014-02-11T23:13:46.056Z",
          "updated_at": "2014-02-11T23:13:46.056Z",
          "clues_count": 5
        }
      },
      {
        "id": 46209,
        "answer": "\"Peter Pan\"",
        "question": "John Darling, Wendy Darling,Tinker Bell",
        "value": 100,
        "airdate": "2000-11-23T12:00:00.000Z",
        "created_at": "2014-02-11T23:13:46.221Z",
        "updated_at": "2014-02-11T23:13:46.221Z",
        "category_id": 5726,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": 5726,
          "title": "plays by characters",
          "created_at": "2014-02-11T23:13:46.068Z",
          "updated_at": "2014-02-11T23:13:46.068Z",
          "clues_count": 5
        }
      }
    ];

    //for question navigation
    $scope.navLoc = 0;
    $scope.nextLoc = function() {
      $scope.navLoc++;
    };
    $scope.isLoc = function(index) {
      return index === $scope.navLoc;
    };

    $scope.getQuestions = function() {

      Questions.getQuestions()
        .success(function(data) {
          $scope.questions = data;

          //clean the italics from the answers and add the clue to the object
          _.each($scope.questions, function(q) {
            q.answer = Questions.getCleanAnswer(q.answer);
            q.clue = Questions.getClue(q.answer);
          });
          console.log($scope.questions);

        });
    };
    $scope.getQuestions();

  }]);

})();
