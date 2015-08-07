(function() {

  var app = angular.module('TriviaWithFriends', ['ui.router', 'Trivia', 'Profile', 'Home']); // need User dependency

  app.config ([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('trivia', {
        url: '/triva',
        templateUrl: 'views/trivia.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      });;
    $urlRouterProvider.otherwise('home');
  }]);

})();
