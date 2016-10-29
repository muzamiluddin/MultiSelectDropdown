import { MultiselectPage } from './app.po';

describe('multiselect App', function() {
  let page: MultiselectPage;

  beforeEach(() => {
    page = new MultiselectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
