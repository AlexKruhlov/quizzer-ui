import {Component} from '@angular/core';
import {Question} from './question';
import {AnswerOption} from './answer-option';
import {ServerService} from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  question: Question = AppComponent.createNewQuestion();
  questions: Question[] = [];

  constructor(private serverService: ServerService) {
    this.findAllQuestions();
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

  clearQuestionText(): void {
    this.question.questionText = '';
  }

  saveQuestion(): void {
    if (confirm('Ok')) {
      this.question.answerOptions = this.searchNonEmptyAnswerOptions();
      this.serverService.saveQuestion(this.question)
        .subscribe(() => this.findAllQuestions());
      this.renewQuestion();
    }
  }

  renewQuestion(): void {
    this.question = AppComponent.createNewQuestion();
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
