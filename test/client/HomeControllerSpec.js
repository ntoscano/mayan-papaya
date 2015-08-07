var expect = chai.expect;

describe('HomeController', function() {
  var $scope, $rootScope;

  beforeEach(module('Home'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('HomeController', {
        $scope: $scope
      });
    };

    createController();
  }));

  // checking for test is just a test to test the tests
  // we'll probably remove eventually
  it('should have an activity property on the $scope which is an array', function() {
    expect($scope.activity).to.be.a('array');
  });

  it('should have an progress property on the $scope which is an array', function() {
    expect($scope.progress).to.be.a('array');
  });
});
