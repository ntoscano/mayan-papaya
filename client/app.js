(function() {

  var app = angular.module('TriviaWithFriends', ['ui.router', 'Navigation', 'Footer', 'Trivia', 'Profile', 'Home', 'User', 'Stats']); // need User dependency

  app.config ([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        data: { publicallyAccessible: false }
      })
      .state('trivia', {
        url: '/trivia',
        templateUrl: 'views/trivia.html',
        data: { publicallyAccessible: false }
      })
          .state('trivia.categories', {
            url: '/categories',
            templateUrl: 'views/trivia.categories.html',
            data: { publicallyAccessible: false }
          })
          .state('trivia.play', {
            url: '/play',
            templateUrl: 'views/trivia.play.html',
            data: { publicallyAccessible: false }
          })

      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        data: { publicallyAccessible: false }
      })
      .state('stats', {
        url: '/stats',
        templateUrl: 'views/stats.html',
        data: { publicallyAccessible: false }
      })
          .state('stats.global', {
            url: '/global',
            templateUrl: 'views/stats.global.html',
            data: { publicallyAccessible: false }
          })
          .state('stats.personal', {
            url: '/personal',
            templateUrl: 'views/stats.personal.html',
            data: { publicallyAccessible: false }
          })

      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        data: { publicallyAccessible: true }
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        data: { publicallyAccessible: true }
      });
    $urlRouterProvider.otherwise('home');
    $httpProvider.interceptors.push('AttachTokens');

  }]);

  app.factory('AttachTokens', function ($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('com.TriviaWithFriends');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function ($rootScope, $state, UserFactory) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (!next.data.publicallyAccessible && !UserFactory.isAuth()) {
        event.preventDefault();
        $state.go('signin');
      }
    })
  });
})();

