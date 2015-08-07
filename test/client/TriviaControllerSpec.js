var expect = chai.expect;

describe('TriviaController', function() {
  var $scope, $rootScope;

  beforeEach(module('Trivia'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('TriviaCtrl', {
        $scope: $scope
      });
    };

    createController();
  }));

  it('should have a questions property on the $scope', function() {
    expect($scope.questions).to.be.an('array');
  });
});
