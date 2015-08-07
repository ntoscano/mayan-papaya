(function() {

  var app = angular.module('TriviaWithFriends', ['ui.router', 'Trivia', 'Profile']); // need User dependency

  app.config ([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/trivia.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html'
      });
    $urlRouterProvider.otherwise('home');
  }]);

})();
