(function() {

  var app = angular.module('Profile',[]);

  app.controller('ProfileController', ['$scope', function($scope) {
    $scope.test = 'test';
  }]);

})();
