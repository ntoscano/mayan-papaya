(function() {

  var app = angular.module('TriviaWithFriends', ['ui.router', 'Trivia', 'Profile', 'Home', 'User']); // need User dependency

  app.config ([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('trivia', {
        url: '/trivia',
        templateUrl: 'views/trivia.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html'
      });;
    $urlRouterProvider.otherwise('home');
  }]);

})();
