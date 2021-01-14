import {browser, by, element} from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  sendQuestionText(questionText: string): void {
    element(by.css('app-root .new-question-textarea textarea')).sendKeys(questionText);
  }

  async getQuestionText(): Promise<string> {
    return element(by.css('app-root .new-question-textarea textarea')).getAttribute('value');
  }

  clickOnQuestionClearButton(): void {
    element(by.css('app-root .new-question-textarea button')).click();
  }

  async getCheckedRadioButtonValue(): Promise<string> {
    return element(by.css('app-root .answer-type-rb mat-radio-group')).getAttribute('ng-reflect-model');
  }

  async clickOnMultipleAnswerTypeRadioButton(): Promise<void> {
    return element(by.css('app-root .answer-type-rb mat-radio-group')).all(by.tagName('mat-radio-button')).get(1).click();
  }

  setAnswerTypeRadioButtonTo(value: string): void {
    element(by.css(`[value="${value}"]`)).click();
  }
}
