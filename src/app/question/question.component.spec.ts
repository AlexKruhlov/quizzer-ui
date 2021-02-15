import {getTestBed, TestBed} from '@angular/core/testing';
import {ServerService} from '../service/server.service';
import {Question, QuestionStrategy} from './question';
import {AnswerOption} from './answer-option';
import {QuestionComponent} from './question.component';
import {of} from 'rxjs';

describe('Server Service', () => {
  let injector: TestBed;
  let serverServiceSpy: jasmine.SpyObj<ServerService>;
  let appComponent: QuestionComponent;

  beforeEach(() => {
    const serverServiceTestConfSpy = jasmine.createSpyObj<ServerService>('ServerService', ['findAllQuestions', 'saveQuestion']);

    TestBed.configureTestingModule({
      providers: [
        QuestionComponent,
        {provide: ServerService, useValue: serverServiceTestConfSpy}
      ]
    });
    injector = getTestBed();
    appComponent = injector.inject(QuestionComponent);
    serverServiceSpy = injector.inject(ServerService) as jasmine.SpyObj<ServerService>;
  });

  it('should clear question text', () => {
    appComponent.question = createQuestion('Question text', 'ONE_ANSWER', []);
    appComponent.clearQuestionText();

    const expectedQuestion = createQuestion('', 'ONE_ANSWER', []);
    expect(appComponent.question).toEqual(expectedQuestion);
  });

  it('should save new question with non-empty answer options', () => {
    const answerOptionToBeSaved = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
      {
        id: null,
        answerOptionText: ''
      },
      {
        id: null,
        answerOptionText: 'Answer option 2'
      }
    ];
    const questionToBeSaved = createQuestion('Question text', 'ONE_ANSWER', answerOptionToBeSaved);
    appComponent.question = questionToBeSaved;

    const expectedAnswerOptions = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
      {
        id: null,
        answerOptionText: 'Answer option 2'
      }
    ];
    const expectedQuestion = createQuestion('Question text', 'ONE_ANSWER', expectedAnswerOptions);
    serverServiceSpy.saveQuestion.withArgs(questionToBeSaved).and.returnValue(of(expectedQuestion));
    serverServiceSpy.findAllQuestions.and.returnValue(of([expectedQuestion]));

    appComponent.saveQuestion();

    expect(serverServiceSpy.saveQuestion.calls.count()).toBe(1);
    expect(serverServiceSpy.findAllQuestions.calls.count()).toEqual(1);
    expect(appComponent.question).toEqual(createQuestion('', 'ONE_ANSWER', [{id: null, answerOptionText: ''}]));
  });

  it('should renew question', () => {
    appComponent.question = createQuestion('Question text', 'ONE_ANSWER', []);
    appComponent.renewQuestion();

    const expectedQuestion = createQuestion('', 'ONE_ANSWER', [{id: null, answerOptionText: ''}]);
    expect(appComponent.question).toEqual(expectedQuestion);
  });

  it('should calculate answer options count', () => {
    const answerOptionToBeSaved = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
      {
        id: null,
        answerOptionText: ''
      },
      {
        id: null,
        answerOptionText: 'Answer option 2'
      }
    ];
    appComponent.question = createQuestion('Question text', 'ONE_ANSWER', answerOptionToBeSaved);
    expect(appComponent.calculateAnswerOptionCount()).toEqual(2);
  });

  it('should add new answer option', () => {
    expect(appComponent.question.answerOptions.length).toBe(1);

    appComponent.addNewAnswerOption();

    expect(appComponent.question.answerOptions.length).toBe(2);
  });

  it('should track by func', () => {
    const expectedId = 'this is id';
    const item = {id: expectedId, property: 'property'};

    expect(appComponent.trackByFn(null, item)).toBe(expectedId);
  });

  it('should remove answer question from list with more than one answer question', () => {
    appComponent.question.answerOptions = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
      {
        id: null,
        answerOptionText: 'Answer option 2'
      }
    ];
    expect(appComponent.question.answerOptions.length).toBe(2);

    appComponent.removeAnswerOption(0);

    expect(appComponent.question.answerOptions.length).toBe(1);
  });

  it('should remove answer question from list with one and renew such list', () => {
    appComponent.question.answerOptions = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
    ];
    expect(appComponent.question.answerOptions.length).toBe(1);

    appComponent.removeAnswerOption(0);

    expect(appComponent.question.answerOptions.length).toBe(1);

    const expectedAnswerOption = {id: null, answerOptionText: ''};
    expect(appComponent.question.answerOptions[0]).toEqual(expectedAnswerOption);
  });

  it('should return true when answer option is last and non-empty', () => {
    appComponent.question.answerOptions = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
      {
        id: null,
        answerOptionText: ''
      },
      {
        id: null,
        answerOptionText: 'Answer option 2'
      }
    ];
    expect(appComponent.question.answerOptions.length).toBe(3);
    expect(appComponent.isAnswerOptionLastAndNonEmpty(appComponent.question.answerOptions[2], 2)).toBeTrue();
  });

  it('should return false when answer option is last but empty', () => {
    appComponent.question.answerOptions = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
      {
        id: null,
        answerOptionText: ''
      }
    ];
    expect(appComponent.question.answerOptions.length).toBe(2);
    expect(appComponent.isAnswerOptionLastAndNonEmpty(appComponent.question.answerOptions[1], 1)).toBeFalse();
  });

  it('should return false when answer option is not last and non-empty empty', () => {
    appComponent.question.answerOptions = [
      {
        id: null,
        answerOptionText: 'Answer option 1'
      },
      {
        id: null,
        answerOptionText: 'Answer option 2'
      }
    ];
    expect(appComponent.question.answerOptions.length).toBe(2);
    expect(appComponent.isAnswerOptionLastAndNonEmpty(appComponent.question.answerOptions[0], 0)).toBeFalse();
  });

  it(`should save button disable function return false
  when question text is non-empty and at least one non-empty answer option exists`,
    () => {
      appComponent.question.questionText = 'Question?';
      appComponent.question.answerOptions = [
        {
          id: null,
          answerOptionText: 'Answer option 1'
        }
      ];
      expect(appComponent.isSaveButtonDisabled()).toBeFalse();
    });

  it(`should save button disable function return true
  when question text is empty and at least one non-empty answer option exists`,
    () => {
      appComponent.question.answerOptions = [
        {
          id: null,
          answerOptionText: 'Answer option 1'
        }
      ];
      expect(appComponent.isSaveButtonDisabled()).toBeTrue();
    });

  it(`should save button disable function return true
  when question text is non-empty and at least one non-empty answer option exists`,
    () => {
      appComponent.question.answerOptions = [
        {
          id: null,
          answerOptionText: 'Answer option 1'
        }
      ];
      expect(appComponent.isSaveButtonDisabled()).toBeTrue();
    });

  function createQuestion(questionText: string, questionStrategy: QuestionStrategy, answerOptions: AnswerOption[]): Question {
    return {
      ['id']: null,
      ['questionText']: questionText,
      ['questionStrategy']: questionStrategy,
      ['answerOptions']: answerOptions
    };
  }
});
