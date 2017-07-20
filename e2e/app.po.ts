import { browser, by, element } from 'protractor';

export class AirportsPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarElement(n) {
    return $$('app-root a').get(n).getText();
  }
}
