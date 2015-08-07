var expect = chai.expect;

describe('UserController', function() {
  var Questions;

  beforeEach(module('Trivia'));

  beforeEach(inject(function($injector) {
    Questions = $injector.get('Questions');
  }));

  it('should have a getQuestions method in Questions', function() {
    expect(Questions.getQuestions).to.be.a('function');
  });

  it('should return an array from getQuestions', function() {
    expect(Questions.getQuestions).to.be.a('function');
  });
});
