import { SytacPage } from './app.po';

describe('sytac App', () => {
  let page: SytacPage;

  beforeEach(() => {
    page = new SytacPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('meister works!');
  });
});
