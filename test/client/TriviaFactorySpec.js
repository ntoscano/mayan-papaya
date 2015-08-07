var expect = chai.expect;

describe('UserController', function() {
  var Questions, $httpBackend;

  beforeEach(module('Trivia'));

  beforeEach(inject(function($injector) {
    Questions = $injector.get('Questions');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a getQuestions method in Questions', function() {
    expect(Questions.getQuestions).to.be.a('function');
  });

  it('should set questions from HTTP response', function() {
    var mockQuestions = [{}, {}, {}];
    $httpBackend.expectGET('/questions').respond(mockQuestions);
    Questions.getQuestions();
    $httpBackend.flush();
    expect(Questions.questions).to.eql(mockQuestions);
  });
});
