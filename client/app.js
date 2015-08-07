(function() {

  var app = angular.module('TriviaWithFriends', ['ui.router', 'Trivia']); // need User dependency

  app.config ([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home', // / ?
        templateUrl: 'views/trivia.html',
        // controller: 'TriviaCtrl',
      });
    // $urlRouterProvider.otherwise('home');
  }]);

})();