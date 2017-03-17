import { browser, element, by } from 'protractor';

export class SytacPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('meister-root h1')).getText();
  }
}
