(function() {

  var app = angular.module('Profile',[]);

  app.controller('ProfileController', ['$scope', function($scope) {

    $scope.user = {
      name: 'Harry Sadler',
      username: 'Dragooon',
      email: 'harrysadlermusic@gmail.com',
      level: 9
    };

  }]);

})();
