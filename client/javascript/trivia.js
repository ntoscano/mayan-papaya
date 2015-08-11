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

  app.controller('TriviaCtrl', ['$scope', '$http', 'Questions', function($scope, $http, Questions) {

    $scope.getQuestions = function() {
      Questions.getQuestions()
        .success(function(data) {
          $scope.questions = data;
        });
    };
    $scope.getQuestions();

  }]);

})();
