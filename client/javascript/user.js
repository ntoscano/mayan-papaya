(function() {

  var app = angular.module('User',[]);


  app.factory('userFactory', ['$http', function($http) {

    var obj = {} // export object so you can later add new objects and methods to our factories

    obj.login = function(username, password) {
      return $http.post('/api/users/signin', {
        username: username,
        password, password
      }).success(function(data) { 
        console.log('success', data);
      });
    };

    obj.signup = function(username, password){
      return $http.post('/api/users/signup', {
        username: username,
        password, password
      })
    };

    return obj;
  }]);

  app.controller('userCtrl', ['$scope', 'userFactory', function($scope, userFactory) {
    $scope.test = 'test';
    $scope.username = '';
    $scope.password = '';
    $scope.login = userFactory.login;
    $scope.signup = userFactory.signup.success(function(data) { 
        console.log('success', data);
      });

  }]);

})();
