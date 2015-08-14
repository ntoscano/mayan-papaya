(function() {

  var app = angular.module('Timer',[]);

  app.controller('TimerController', ['$scope', function($scope) {

    console.log('$scope = ', $scope);
    // $scope.time = 15;
    $scope.interval = 1000;
    // $scope.countdown = function() {
    //   setInterval(function () {
    //     $scope.countdown--;
    //   }, 1000);
    // }


  }]);

})();
