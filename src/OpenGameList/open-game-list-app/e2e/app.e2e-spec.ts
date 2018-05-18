import { OpenGameListAppPage } from './app.po';

describe('open-game-list-app App', () => {
  let page: OpenGameListAppPage;

  beforeEach(() => {
    page = new OpenGameListAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
