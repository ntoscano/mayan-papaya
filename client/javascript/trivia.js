(function() {

  var app = angular.module('Trivia', []);

  // eventually will not need this
  app.factory('Questions', ['$http', function($http) {

    var obj = { // export object so you can later add new objects and methods to our factories
      questions: [
        {
          id: 1,
          question: 'What are you doing with that fish?',
          option1: 'Im cooking it up for dinner!',
          option2: 'Im using it to catch more fish',
          option3: 'Im taking it back to the lake',
          option4: 'Im just holding it',
          answer: '4'
        },
        {
          id: 2,
          question: 'Are you sandbagging Harry?!',
          option1: 'Not today',
          option2: 'You know it!',
          option3: 'I would but they found me out!',
          option4: 'No, Im looking for sand!',
          answer: '2'
        }
      ]
    };

    obj.getQuestions = function() { // retrieves questions from backend
      return $http.get('/api/questions').success(function(data) { // using Angular $http service to query our questions route
        // success cb executes when request returns
        // route returns a list of questions
        angular.copy(data, obj.questions); // copy that list to client-side questions object // .copy makes UI update properly
      });
    };

    return obj;
  }]);

  app.controller('TriviaCtrl', ['$scope', 'Questions', function($scope, Questions) {
    $scope.questions = Questions.questions; // Questions factory returns an object. Then we access its questions key
  }]);


  // unirest.get("https://pareshchouhan-trivia-v1.p.mashape.com/v1/getAllQuizQuestions?limit=10&page=1")
    //   .header("X-Mashape-Key", "<required>")
    //   .header("Accept", "application/json")
    //   .end(function (result) {
    //     console.log(result.status, result.headers, result.body);
    //   });

})();