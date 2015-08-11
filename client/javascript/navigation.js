(function() {

  var app = angular.module('Navigation',[]);

  app.controller('NavigationController', ['$scope', '$location', '$state', function($scope, $location, $state) {

    $scope.getClass = function(stateName) {
      if (stateName === $state.current.name) {
        return 'active';
      } else {
        return '';
      }
    };

  }]);


})();
