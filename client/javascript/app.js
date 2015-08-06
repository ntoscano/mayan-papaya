angular.module('TriviaWithFriends', ['user']);

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/user', {
        templateUrl: 'views/profile.html',
        controller: 'userCtrl',
        controllerAs: 'profile'
      })
}])