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
  question: Question = this.createNewQuestion();
  questions: Question[] = [];

  constructor(private serverService: ServerService) {
    this.findAllQuestions();
  }

  private findAllQuestions(): void {
    this.serverService.findAllQuestions()
      .subscribe((questions: Question[]) => this.questions = questions);
  }

  addQuestion(): void {
    this.serverService.saveQuestion(this.question)
      .subscribe(() => this.findAllQuestions());
  }

  trackByFn(index: any, item: any): any {
    return item.id;
  }

  getAnswerOptionCount(): number {
    let emptyAnswerOptionCount = 0;
    this.question.answerOptions.forEach((answerOption) => {
      if (answerOption.answerOptionText === '') {
        emptyAnswerOptionCount++;
      }
    });
    return this.question.answerOptions.length - emptyAnswerOptionCount;
  }

  addNewAnswerOption(): void {
    this.question.answerOptions.push({
      id: null,
      answerOptionText: ''
    });
  }

  deleteAnswerOption(index: number): void {
    this.question.answerOptions.splice(index, 1);
    if (!this.question.answerOptions.length) {
      this.addNewAnswerOption();
    }
  }

  isAnswerOptionLastAndNonEmpty(answerOption: AnswerOption, answerOptionIndex: number): boolean {
    return answerOption.answerOptionText !== '' && answerOptionIndex === this.question.answerOptions.length - 1;
  }

  saveQuestion(): void {
    if (confirm('Ok')) {
      console.log(this.question);
      this.addQuestion();
      this.clearAllQuestion();
    }
  }

  clearAllQuestion(): void {
    this.question = this.createNewQuestion();
  }

  isDisabled(): boolean {
    return this.question.questionText === '' || this.allAnswerOptionsIsEmpty();
  }

  allAnswerOptionsIsEmpty(): boolean {
    return !this.question.answerOptions.find(answerOption => answerOption.answerOptionText !== '');
  }

  createNewQuestion(): Question {
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
}
