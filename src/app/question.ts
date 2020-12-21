import {AnswerOption} from './answer-option';

export interface Question {
  id: string | null;
  questionText: string;
  questionStrategy: 'ONE_ANSWER' | 'MANY_ANSWERS';
  answerOptions: [AnswerOption];
}
