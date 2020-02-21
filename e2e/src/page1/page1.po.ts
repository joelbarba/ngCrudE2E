import {$, $$, browser, by, element} from 'protractor';

export class Page1PO {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getAddBtn = () => $('.add-btn');
  getDelBtn = (num) => $('.item-' + num + ' .del-btn');

  getItemNum = (num) => $('.item-' + num + ' .item-num').getText();
  getItemName = (num) => $('.item-' + num + ' .item-name').getText();

  // Return an object array with the displayed elements on the list
  getListArr = () => {
    return $$('div[class*="item-"]').map((rowEl, ind) => {
      return {
        num  : rowEl.$('.item-num').getText(),
        name : rowEl.$('.item-name').getText(),
      };
    });
  }
}
