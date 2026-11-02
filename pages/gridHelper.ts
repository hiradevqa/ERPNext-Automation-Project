/*import { Page, Locator, expect } from '@playwright/test';

export class GridHelper {
    page: Page;
    row: Locator;
    rate: Locator;
  constructor(page: Page) {
    this.page = page;
    this.row = page.locator('.grid-row');
    this.rate = this.row.nth(1).locator('input[data-fieldname="basic_rate"]');
  
  }

//used in Sales Invoice and Delivery Note
getItemCode(container: Locator){
return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="item_code"]');

}
//used in Sales Invoice and Delivery Note
getItemQty(container: Locator){
return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="qty"]');
}
//used in Sales Invoice and Delivery Note
getItemRate(container: Locator){
return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="rate"]');
}

getAmount(container: Locator){
return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="amount"]');
}


}*/


import { Page, Locator } from '@playwright/test';

export class GridHelper {
  page: Page;
  row: Locator;
  rate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.row = page.locator('.grid-row');
    this.rate = this.row.nth(1).locator('input[data-fieldname="basic_rate"]');
  }

  getRow(container: Locator) {
    return container.locator('.grid-row').nth(1);
  }

  getCell(row: Locator, fieldName: string) {
    return row.locator(`div.grid-static-col[data-fieldname="${fieldName}"]`);
  }

  getInput(row: Locator, fieldName: string) {
    return row.locator(`input[data-fieldname="${fieldName}"]`);
  }

  getItemCode(container: Locator) {
    return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="item_code"]');
  }

  getItemQty(container: Locator) {
    return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="qty"]');
  }

  getItemRate(container: Locator) {
    return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="rate"]');
  }

  getAmount(container: Locator) {
    return container.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="amount"]');
  }
}
