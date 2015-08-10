(function() {

  var app = angular.module('User',[]);


  app.factory('userFactory', ['$http', function($http, $location, $window) {

    var obj = {} // export object so you can later add new objects and methods to our factories

    obj.signin = function (user) {
      return $http.post('/api/users/signin', {
        username: user.username,
        password: user.password
      })
      .then(function (resp) {
        return resp.data.token;
      });
    };

    obj.signup = function (user) {
      return $http.post('/api/users/signup', {
        username: user.username,
        password: user.password
      })
      .then(function (resp) {
        return resp.data.token;
      });
    };

    obj.isAuth = function () {
      return !!$window.localStorage.getItem('com.TriviaWithFriends');
    };

    obj.signout = function () {
      $window.localStorage.removeItem('com.TriviaWithFriends');
      $location.path('/signin');
    };


    return obj;
  }]);

  app.controller('userCtrl', ['$scope', '$window', '$location', 'userFactory', function($scope, $window, $location, userFactory) {
    $scope.test = 'test';
    $scope.user = {}
    $scope.signin = function () {
     userFactory.signin($scope.user)
       .then(function (token) {
         $window.localStorage.setItem('com.TriviaWithFriends', token);
         $location.path('/home');
       })
       .catch(function (error) {
         console.error(error);
       });
    };
    $scope.signup = function () {
     userFactory.signup($scope.user)
       .then(function (token) {
         $window.localStorage.setItem('com.TriviaWithFriends', token);
         $location.path('/home');
       })
       .catch(function (error) {
         console.error(error);
       });
    };

  }]);

})();
