angular.module('TriviaWithFriends', ['ui.router']);

app.config ([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home', // / ?
      templateUrl: '/views.index.html',
      controller: 'MainCtrl',
    });
  $urlRouterProvider.otherwise('home');
}]);


app.factory('Questions', ['$http', function($http) {

  var obj = { // export object so you can later add new objects and methods to our factories
    questions: [
      {title: 'What are you doing with that fish?', upvotes: 15},
      {title: 'Are you sandbagging Harry?!', upvotes: 2}
    ]
  };

  obj.getAll = function() { // retrieves questions from backend
    return $http.get('/questions').success(function(data) { // using Angular $http service to query our questions route
      // success cb executes when request returns
      // route returns a list of questions
      angular.copy(data, obj.posts); // copy that list to client-side questions object // .copy makes UI update properly
    });
  };

  return obj;
}]);


app.controller('MainCtrl', ['$scope' function($scope) {
  $scope.questions = Questions.questions; // Questions factory returns an object. Then we access its questions key
}]);