import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should input question text in text area and clear it by clicking on the button', async () => {
    await page.navigateTo();
    page.sendQuestionText('My question?');
    expect(await page.getQuestionText()).toBe('My question?');
    page.clickOnQuestionClearButton();
    expect(await page.getQuestionText()).toBe('');
  });

  it('should change answer type', async () => {
    await page.navigateTo();
    expect(await page.getCheckedRadioButtonValue()).toBe('ONE_ANSWER');
    await page.clickOnMultipleAnswerTypeRadioButton();
    expect(await page.getCheckedRadioButtonValue()).toBe('MANY_ANSWERS');
    await browser.sleep(3000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
