(function() {

  var app = angular.module('user',[]);

  app.controller('userCtrl', ['$scope', function($scope) {
    $scope.test = 'test';
  }]);

})();
