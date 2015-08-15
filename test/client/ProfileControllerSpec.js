var expect = chai.expect;

describe('ProfileController', function() {
  var $scope, $rootScope;

  beforeEach(module('Profile'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('ProfileController', {
        $scope: $scope
      });
    };

    createController();
  }));

  // checking for test is just a test to test the tests
  // we'll probably remove eventually
  it('should have a username property on the $scope.user', function() {
    expect($scope.user.username).to.be.a('string');
  });
});
