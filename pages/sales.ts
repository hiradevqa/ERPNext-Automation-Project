/*import { BasePage } from './base';
import{Page,Locator,expect} from '@playwright/test';
import { GridHelper } from './gridHelper';

export class Sales  extends BasePage{
grid: GridHelper;
container1:Locator;
//inputField1: Locator;
//reportTableRow:Locator;
iF:Locator;
//tabler:Locator;
amount:Locator;
rate:Locator;
status:Locator;
id:Locator;
idContainer:Locator;

constructor(page:Page){
super(page);
this.grid = new GridHelper(page);
this.container1= page.locator('.frappe-control.input-max-width');
//this.inputField1=page.locator('.input[data-fieldname="s_warehouse"]');
this.iF=page.locator('.input-with-feedback.form-control');
//this.reportTableRow=page.locator('.dt-row.dt-row-0.vrow');
//this.tabler=page.locator('.grid-field');
this.amount=page.locator('input[data-fieldname="amount"]');
this.page = page;
this.row = page.locator('.grid-row');
this.rate = this.row.nth(1).locator('input[data-fieldname="basic_rate"]');
this.status=page.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');
this.idContainer=page.locator('.form-name-container.mt-1.flex.justify-between.form-name-copy');
this.id= this.idContainer.locator('span.ellipsis.mr-3');

}

async selectDeliveryDate(deliveryDate: string) {
  const row1 = this.row.nth(1);
const clickDate=row1.locator('div.grid-static-col[data-fieldname="delivery_date"]');
const fillDate=row1.locator('input[data-fieldname="delivery_date"]');
await clickDate.click();
await fillDate.fill(deliveryDate);
 
await expect(fillDate).toHaveValue(deliveryDate);
//await fillDate.blur();
 await fillDate.press('Enter');
}

async clickField1(fieldName:string){
   const a = this.container.filter({has:this.page.getByText(fieldName)});
   const b = a.locator(this.iF);
     await b.fill('Finished'); 
}

//worked in sales
async selectItemCode1(itemC:string){
  const row1 = this.row.nth(1);
  const itemCell = row1.locator('div.grid-static-col[data-fieldname="item_code"]');
  await itemCell.click();
  const itemInput = row1.locator('input[data-fieldname="item_code"]');
  await itemInput.fill(itemC);
  const option = this.page.locator('div[role="option"]:visible').getByText(itemC, { exact: true });
  await option.click();
}


async fillQuantity(itemQuantity:string) {
   const row1 = this.row.nth(1);
   const qtyCell = row1.locator('div.grid-static-col[data-fieldname="qty"]');
   const quantity = row1.locator('input[data-fieldname="qty"]');
   await qtyCell.click();
   await quantity.fill(itemQuantity);
   await expect(quantity).toHaveValue(itemQuantity);
   await quantity.blur();
}

//sales
async fillItemRate1(itemRate:string) {
   const row1 = this.row.nth(1);
   const rate = row1.locator('div.grid-static-col[data-fieldname="rate"]');
   const rate1 = row1.locator('input[data-fieldname="rate"]');
    await rate.click();//useful in sales(test case 2)
    await rate1.fill(itemRate);
    await rate1.blur();
    await expect(rate1).toHaveValue(Number(itemRate).toLocaleString('en-US', {
    minimumFractionDigits: 2
  }));
    
}

async Fid (){
const  firstId = await this.id.textContent();
return firstId;
}

getItemCodeCell() {
  const itemRow = this.row.nth(1);

  return itemRow.locator(
  'div.grid-static-col[data-fieldname="item_code"]'
  );
}

}*/




import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base';
import { GridHelper } from './gridHelper';

export class Sales extends BasePage {
  grid: GridHelper;

  salesOrderContainer: Locator;
  salesOrderRow: Locator;
  customerField: Locator;

  warehouseInput:Locator;
  warehouseContainer:Locator;

  amount: Locator;
  orderId: Locator;
  

  constructor(page: Page) {
    super(page);

    this.grid = new GridHelper(page);

    this.salesOrderContainer = page.locator('#page-Sales\\ Order');

    this.row = this.salesOrderContainer.locator('.grid-row');
    this.salesOrderRow = this.row.nth(1);

    this.customerField = this.grid.getCustomer(this.salesOrderContainer);

    this.warehouseContainer = this.salesOrderContainer.locator('.frappe-control.input-max-width');
    this.warehouseInput = page.locator('.input-with-feedback.form-control');

    this.amount = this.salesOrderRow.locator(
      'input[data-fieldname="amount"]'
    );

    const orderIdContainer = this.salesOrderContainer.locator(
      '.form-name-container.mt-1.flex.justify-between.form-name-copy'
    );

    this.orderId = orderIdContainer.locator('span.ellipsis.mr-3');
  }


  async clickCustomerField() {
  await this.customerField.click();
  }

  async selectDeliveryDate(deliveryDate: string) {
    const dateCell = this.salesOrderRow.locator(
      'div.grid-static-col[data-fieldname="delivery_date"]'
    );

    const dateInput = this.salesOrderRow.locator(
      'input[data-fieldname="delivery_date"]'
    );

    await dateCell.click();
    await dateInput.fill(deliveryDate);
    await expect(dateInput).toHaveValue(deliveryDate);
    await dateInput.press('Enter');
  }

 async selectSourceWarehouse(fieldName: string) {
  const warehouseField = this.warehouseContainer.filter({
    has: this.page.getByText(fieldName)
  });

  const warehouseInput = warehouseField.locator(this.warehouseInput);
  await warehouseInput.fill('Finished');
}

  async selectItemCode(itemCode: string) {
    const itemCell = this.salesOrderRow.locator(
      'div.grid-static-col[data-fieldname="item_code"]'
    );

    await itemCell.click();

    const itemInput = this.salesOrderRow.locator(
      'input[data-fieldname="item_code"]'
    );

    await itemInput.fill(itemCode);

    const option = this.page
      .locator('div[role="option"]:visible')
      .getByText(itemCode, { exact: true });

    await option.click();
  }

  async fillQuantity(quantity: string) {
    const qtyCell = this.salesOrderRow.locator(
      'div.grid-static-col[data-fieldname="qty"]'
    );

    const quantityInput = this.salesOrderRow.locator(
      'input[data-fieldname="qty"]'
    );

    await qtyCell.click();
    await quantityInput.fill(quantity);
    await expect(quantityInput).toHaveValue(quantity);
    await quantityInput.blur();
  }

  async fillItemRate(rate: string) {
    const rateCell = this.salesOrderRow.locator(
      'div.grid-static-col[data-fieldname="rate"]'
    );

    const rateInput = this.salesOrderRow.locator(
      'input[data-fieldname="rate"]'
    );

    await rateCell.click();
    await rateInput.fill(rate);
    
    await rateInput.blur();

    await expect(rateInput).toHaveValue(
      Number(rate).toLocaleString('en-US', {
        minimumFractionDigits: 2
      })
    );
  }

  async getSalesOrderId() {
    await expect(this.orderId).toHaveText(/^SAL-ORD-\d{4}-\d+$/);
    return await this.orderId.textContent();
  }

  getItemCodeCell() {
    return this.salesOrderRow.locator(
      'div.grid-static-col[data-fieldname="item_code"]'
    );
  }
}
