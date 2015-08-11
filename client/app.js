(function() {

  var app = angular.module('TriviaWithFriends', ['ui.router', 'Navigation', 'Footer', 'Trivia', 'Profile', 'Home', 'User', 'Stats']); // need User dependency

  app.config ([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {

    //Authentication for navigating the site has been disabled.
    //We will re-engage this later when the feature is working.

    $stateProvider
      .state('trivia', {
        url: '/trivia',
        templateUrl: 'views/trivia.html'
        // resolve: {authenticate : authenticate}
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html'
        // resolve: {authenticate : authenticate}
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
        // resolve: {authenticate : authenticate}
      })
      .state('stats', {
        url: '/stats',
        templateUrl: 'views/stats.html'
        // resolve: {authenticate : authenticate}
      })
          .state('stats.global', {
            url: '/global',
            templateUrl: 'views/stats.global.html'
            // resolve: {authenticate : authenticate}
          })
          .state('stats.personal', {
            url: '/personal',
            templateUrl: 'views/stats.personal.html'
            // resolve: {authenticate : authenticate}
          })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html'
      });
    $urlRouterProvider.otherwise('home');
    $httpProvider.interceptors.push('AttachTokens');

    // reenable this when setting up auth
    // var authenticate = function($q, UserFactory, $state, $timeout) {
    //   if (UserFactory.isAuth()) {
    //     // Resolve the promise successfully
    //     return $q.when();
    //   } else {
    //     // The next bit of code is asynchronously tricky.

    //     $timeout(function() {
    //       // This code runs after the authentication promise has been rejected.
    //       // Go to the log-in page
    //       $state.go('signin');
    //     });

    //     // Reject the authentication promise to prevent the state from loading
    //     return $q.reject();
    //   }
    // };

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
  .run(function ($rootScope, $location, UserFactory) {
    // here inside the run phase of angular, our services and controllers
    // have just been registered and our app is ready
    // however, we want to make sure the user is authorized
    // we listen for when angular is trying to change routes
    // when it does change routes, we then look for the token in localstorage
    // and send that token to the server to see if it is a real user or hasn't expired
    // if it's not valid, we then redirect back to signin/signup
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !UserFactory.isAuth()) {
        $location.path('/signin');
      }
    });
  });
})();

