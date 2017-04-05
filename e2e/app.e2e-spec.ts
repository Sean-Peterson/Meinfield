import { MeinfieldPage } from './app.po';

describe('meinfield App', function() {
  let page: MeinfieldPage;

  beforeEach(() => {
    page = new MeinfieldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
