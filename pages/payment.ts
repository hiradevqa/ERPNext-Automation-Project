import { BasePage } from './base';
import{Page,Locator,expect} from '@playwright/test';
import { GridHelper } from './gridHelper';

export class Payment  extends BasePage{
grid: GridHelper;
dropdownContainer:Locator;
paymentPageContainer:Locator;
newPaymentEntryTitle: Locator;
customerField: Locator;
invoiceReference: Locator;
/*itemCode:Locator;
itemQty:Locator;
itemRate:Locator;
status:Locator;*/

  constructor(page: Page) {
    super(page);
    this.grid = new GridHelper(page);
    this.dropdownContainer=page.locator('.dropdown-menu.show');
    this.paymentPageContainer = page.locator('#page-Payment\\ Entry');
    this.newPaymentEntryTitle= this.grid.getTitle(this.paymentPageContainer);
    this.customerField = this.paymentPageContainer.locator('input[data-fieldname="party"]');
    this.invoiceReference = this.paymentPageContainer.locator('.grid-body .grid-row [data-fieldname="reference_name"]');
  }

async clickDropsownOption(name:string){
    const c = this.dropdownContainer.filter({has:this.page.getByText(name, { exact: true })});
    c.getByText(name, { exact: true }).click();
}

async fillChecqueNo(number:string){
 await this.paymentPageContainer.locator('input[data-fieldname="reference_no"]').fill(number);
}



}