// home controller js here
(function() {

  var app = angular.module('Home',[]);

  app.controller('HomeController', ['$scope', function($scope) {

    //dummy data, just for layout, will change data types later
    $scope.activity = [
      {
        type: 'Geography',
        score: '5/10'
      },
      {
        type: 'Politics',
        score: '8/10'
      }
    ];

    $scope.progress = [
      {
        achievement: 'Mountaineer',
        ratio: '80%'
      },
      {
        achievement: 'Politician\'s Guru',
        ratio: '65%'
      }
    ];
    //end dummy data

  }]);

})();
