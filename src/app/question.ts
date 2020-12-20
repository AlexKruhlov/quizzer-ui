import {AnswerOption} from './answeroption';

export interface Question {
  id: string;
  questionText: string;
  questionStrategy: 'ONE_ANSWER' | 'MANY_ANSWERS';
  answerOptions: [AnswerOption];
}
