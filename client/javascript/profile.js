(function() {

  var app = angular.module('Profile',[]);


  app.factory('ProfileFactory', function($http, $location, $window) {

    var obj = {}; // export object so you can later add new objects and methods to our factories

    obj.getUsername = function() {
      var username = $window.localStorage.getItem('com.TriviaWithFriends.username');
      console.log(username);
      return username;
    };

    obj.getUserData = function (username) {
      console.log('getting username: ' + username + "from DB");
      return $http.get('/api/users/profile', {
        username: username
      })
      .then(function (res) {
        return res.data;
      });
    };

    return obj;
  });


  app.controller('ProfileController', ['$scope', 'ProfileFactory', 'UserFactory', 'CurrentUser', function($scope, ProfileFactory, UserFactory, CurrentUser) {

    ProfileFactory.getUserData(ProfileFactory.getUsername())
      .then(function(data) {
        console.log("profile factory invoked, user data: ", data);
        $scope.user = JSON.parse(data);
      });

  }]);

})();
