import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/main');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  select(selector) {
  	return element(by.css(selector));
  }

  setStorage(element, value) {
  	browser.executeScript('localStorage.setItem("' + element + '", "' + value + '");');
  }
}
