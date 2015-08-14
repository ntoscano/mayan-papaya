(function() {

  var app = angular.module('Navigation',[]);

  app.controller('NavigationController', ['$scope', '$location', '$state', function($scope, $location, $state) {

    //for changing active nav tab
    $scope.getClass = function(stateName) {
      if (stateName === $state.current.name) {
        return 'active';
      } else {
        return '';
      }
    };

    //hack for hiding nav on signin or signup
    $scope.show = function() {
      if($location.$$url === '/signin' || $location.$$url === '/signup') {
        return false;
      } else {
        return true;
      }
    };

  }]);


})();
