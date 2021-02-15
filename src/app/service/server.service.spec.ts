import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {ServerService} from './server.service';
import {Question} from '../question/question';

describe('Server Service', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let serverService: ServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServerService]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    serverService = injector.inject(ServerService);
  });

  it('should invoke findAllQuestions', () => {
    serverService.findAllQuestions().subscribe((questions) => {
      expect(questions).toEqual([]);
    });

    const req = httpMock.expectOne('http://localhost:8081/question');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should invoke saveQuestion', () => {
    const newQuestion: Question = {
      id: null,
      questionText: '',
      questionStrategy: 'ONE_ANSWER',
      answerOptions: [{
        id: null,
        answerOptionText: ''
      }]
    };
    serverService.saveQuestion(newQuestion).subscribe((savedQuestion) => {
      expect(savedQuestion).toBe(newQuestion);
    });

    const req = httpMock.expectOne('http://localhost:8081/question');
    expect(req.request.method).toBe('POST');
    req.flush(newQuestion);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
