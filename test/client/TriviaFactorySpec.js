var expect = chai.expect;

describe('Questions', function() {
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
    var mockQuestions = [
      {
        "id": 46207,
        "answer": "England",
        "question": "This country's 1689 Bill of Rights stated that no Roman Catholic would ever rule it",
        "value": 100,
        "airdate": "2000-11-23T12:00:00.000Z",
        "created_at": "2014-02-11T23:13:46.149Z",
        "updated_at": "2014-02-11T23:13:46.149Z",
        "category_id": 5724,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": 5724,
          "title": "catholicism",
          "created_at": "2014-02-11T23:13:46.044Z",
          "updated_at": "2014-02-11T23:13:46.044Z",
          "clues_count": 10
        }
      },
      {
        "id": 46208,
        "answer": "The fittest",
        "question": "Herbert Spencer summed up Darwin's theory as \"Survival of\" these",
        "value": 100,
        "airdate": "2000-11-23T12:00:00.000Z",
        "created_at": "2014-02-11T23:13:46.199Z",
        "updated_at": "2014-02-11T23:13:46.199Z",
        "category_id": 5725,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": 5725,
          "title": "the mostest",
          "created_at": "2014-02-11T23:13:46.056Z",
          "updated_at": "2014-02-11T23:13:46.056Z",
          "clues_count": 5
        }
      },
      {
        "id": 46209,
        "answer": "\"Peter Pan\"",
        "question": "John Darling, Wendy Darling,Tinker Bell",
        "value": 100,
        "airdate": "2000-11-23T12:00:00.000Z",
        "created_at": "2014-02-11T23:13:46.221Z",
        "updated_at": "2014-02-11T23:13:46.221Z",
        "category_id": 5726,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": 5726,
          "title": "plays by characters",
          "created_at": "2014-02-11T23:13:46.068Z",
          "updated_at": "2014-02-11T23:13:46.068Z",
          "clues_count": 5
        }
      }
    ];
    $httpBackend.expectGET('/api/trivia').respond(mockQuestions);
    Questions.getQuestions();
    $httpBackend.flush();
    expect(Questions.questions).to.eql(mockQuestions);
  });
});
