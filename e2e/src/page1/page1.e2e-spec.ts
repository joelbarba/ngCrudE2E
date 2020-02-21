import { Page1PO } from './page1.po';
import { browser, logging } from 'protractor';

describe('test page1 component', () => {
  let page: Page1PO;

  beforeEach(() => {
    page = new Page1PO();
    page.navigateTo();
  });

  it('should display the initial list', async () => {
    const iniList = await page.getListArr();
    expect(iniList).toEqual([
      { num: '0', name: 'joel.barba' },
      { num: '1', name: 'syrax' },
      { num: '2', name: 'vermithor' },
    ]);
  });

  it('should add rows at the end', async () => {
    await page.getAddBtn().click();
    expect(await page.getListArr()).toEqual([
      { num: '0', name: 'joel.barba' },
      { num: '1', name: 'syrax' },
      { num: '2', name: 'vermithor' },
      { num: '3', name: 'CAraxes' },
    ]);
    await page.getAddBtn().click();
    expect(await page.getListArr()).toEqual([
      { num: '0', name: 'joel.barba' },
      { num: '1', name: 'syrax' },
      { num: '2', name: 'vermithor' },
      { num: '3', name: 'CAraxes' },
      { num: '4', name: 'silverwing' },
    ]);
  });

  it('should remove rows', async () => {
    await page.getAddBtn().click();
    await page.getAddBtn().click();
    await page.getAddBtn().click();
    await page.getDelBtn(2).click();
    expect(await page.getListArr()).toEqual([
      { num: '0', name: 'joel.barba' },
      { num: '1', name: 'syrax' },
      // { num: '2', name: 'vermithor' },
      { num: '2', name: 'CAraxes' },
      { num: '3', name: 'silverwing' },
      { num: '4', name: 'sunfyre' },
    ]);
    await page.getDelBtn(3).click();
    expect(await page.getListArr()).toEqual([
      { num: '0', name: 'joel.barba' },
      { num: '1', name: 'syrax' },
      // { num: '2', name: 'vermithor' },
      { num: '2', name: 'CAraxes' },
      // { num: '3', name: 'silverwing' },
      { num: '3', name: 'sunfyre' },
    ]);
  });



  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
