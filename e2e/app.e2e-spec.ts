import { AirportsPage } from './app.po';

describe('airports App', () => {
  let page: AirportsPage;

  beforeEach(() => {
    page = new AirportsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
