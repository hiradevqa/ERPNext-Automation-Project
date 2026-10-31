import { Page, Locator, expect } from '@playwright/test';

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
getTitle(container: Locator) {
  return container.locator('.title-area');
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
//used in Sales Invoice and Delivery Note
getCustomer(container: Locator){
return container.locator('input[data-fieldname="customer"]');
}

}

