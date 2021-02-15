import {AnswerOption} from './answer-option';

export type QuestionStrategy = 'ONE_ANSWER' | 'MANY_ANSWERS';

export interface Question {
  id: string | null;
  questionText: string;
  questionStrategy: QuestionStrategy;
  answerOptions: AnswerOption[];
}
