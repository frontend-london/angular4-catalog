import { ItemsPage } from './app.po';

describe('items App', () => {
  let page: ItemsPage;

  beforeEach(() => {
    page = new ItemsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
