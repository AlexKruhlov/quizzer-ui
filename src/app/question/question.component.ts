import { Component, OnInit } from '@angular/core';
import {Question} from './question';
import {ServerService} from '../service/server.service';
import {AnswerOption} from './answer-option';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: Question = QuestionComponent.createNewQuestion();
  questions: Question[] = [];

  constructor(private serverService: ServerService) {
  }

  private static createNewQuestion(): Question {
    return {
      id: null,
      questionText: '',
      questionStrategy: 'ONE_ANSWER',
      answerOptions: [{
        id: null,
        answerOptionText: ''
      }]
    };
  }

  ngOnInit(): void {
    this.findAllQuestions();
  }

  clearQuestionText(): void {
    this.question.questionText = '';
  }

  saveQuestion(): void {
    this.question.answerOptions = this.searchNonEmptyAnswerOptions();
    this.serverService.saveQuestion(this.question)
      .subscribe(() => this.findAllQuestions());
    this.renewQuestion();
  }

  renewQuestion(): void {
    this.question = QuestionComponent.createNewQuestion();
  }

  private findAllQuestions(): void {
    this.serverService.findAllQuestions()
      .subscribe((questions: Question[]) => this.questions = questions);
  }

  calculateAnswerOptionCount(): number {
    return this.searchNonEmptyAnswerOptions().length;
  }

  private searchNonEmptyAnswerOptions(): AnswerOption[] {
    return this.question.answerOptions.filter((answerOption) => answerOption.answerOptionText !== '');
  }

  addNewAnswerOption(): void {
    this.question.answerOptions.push({
      id: null,
      answerOptionText: ''
    });
  }

  trackByFn(index: any, item: any): any {
    return item.id;
  }

  removeAnswerOption(index: number): void {
    this.question.answerOptions.splice(index, 1);
    if (!this.question.answerOptions.length) {
      this.addNewAnswerOption();
    }
  }

  isAnswerOptionLastAndNonEmpty(answerOption: AnswerOption, answerOptionIndex: number): boolean {
    return answerOption.answerOptionText !== '' && answerOptionIndex === this.question.answerOptions.length - 1;
  }

  private areAllAnswerOptionsEmpty(): boolean {
    return !this.question.answerOptions.find(answerOption => answerOption.answerOptionText !== '');
  }

  isSaveButtonDisabled(): boolean {
    return this.question.questionText === '' || this.areAllAnswerOptionsEmpty();
  }
}
