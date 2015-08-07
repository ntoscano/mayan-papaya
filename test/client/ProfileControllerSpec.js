var expect = chai.expect;

describe('ProfileController', function() {
  var $scope, $rootScope;

  beforeEach(module('Profile'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('profileController', {
        $scope: $scope
      });
    };

    createController();
  }));

  // checking for test is just a test to test the tests
  // we'll probably remove eventually
  it('should have a name property on the $scope.user', function() {
    expect($scope.test).to.be.a('string');
  });
});
