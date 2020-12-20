import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  question = '';
  answerOptions = [''];

  trackByFn(index: any, item: any): any {
    return item.id;
  }

  getAnswerOptionCount(): number {
    let emptyAnswerOptionCount = 0;
    this.answerOptions.forEach((answOption) => {
      if (answOption === '') {
        emptyAnswerOptionCount++;
      }
    });
    return this.answerOptions.length - emptyAnswerOptionCount;
  }

  addNewAnswerOption(): void {
    this.answerOptions.push('');
  }

  deleteAnswerOption(index: number): void {
    this.answerOptions.splice(index, 1);
    if (this.answerOptions.length === 0) {
      this.addNewAnswerOption();
    }
  }

  isAnswerOptionLastAndNonEmpty(answer: string, answerOptionIndex: number): boolean {
    return answer !== '' && answerOptionIndex === this.answerOptions.length - 1;
  }

  saveQuestion(): void {
    if (confirm('save question')) {
      this.clearAllQuestion();
    }
  }

  clearAllQuestion(): void {
    this.question = '';
    this.answerOptions = [''];
  }

  isDisabled(): boolean {
    return this.question === '' || this.allAnswerOptionsIsEmpty();
  }

  allAnswerOptionsIsEmpty(): boolean {
    return !this.answerOptions.find(answerOption => answerOption !== '');
  }
}
