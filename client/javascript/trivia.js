(function() {

  var app = angular.module('Trivia', []);

  //factory to get and hold question data
  app.factory('Questions', ['$http', function($http) {

    var obj = {};

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
    $scope.questions = [{
      "id": 152933,
      "answer": "Syria",
      "question": "This country is bordered by Turkey to the north & Iraq to the east",
      "value": 200,
      "airdate": "2015-01-02T12:00:00.000Z",
      "created_at": "2015-01-22T02:40:00.134Z",
      "updated_at": "2015-01-22T02:40:00.134Z",
      "category_id": 17840,
      "game_id": 4773,
      "invalid_count": null,
      "category": {
        "id": 17840,
        "title": "places that end in \"ia\"",
        "created_at": "2015-01-18T18:16:16.428Z",
        "updated_at": "2015-01-18T18:16:16.428Z",
        "clues_count": 10
      }
    }];

    $scope.getQuestions = function() {
      Questions.getQuestions()
        .success(function(data) {
          $scope.questions = data;
          console.log($scope.questions);
        });
    };

    //disable for testing
    // $scope.getQuestions();



  }]);

})();
