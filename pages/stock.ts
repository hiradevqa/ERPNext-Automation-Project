import { BasePage } from './base';
import{Page,Locator,expect} from '@playwright/test';
import { GridHelper } from './gridHelper';

export class Stock  extends BasePage{
grid: GridHelper;
//reportTable:Locator
reportTableRow:Locator;


constructor(page:Page){
super(page);
this.grid = new GridHelper(page);
//this.reportTable=page.locator('.datatable.dt-instance-1');
this.reportTableRow=page.locator('.dt-row.dt-row-0.vrow');
}


async selectItemCode(itemC:string) {
  const row1 = this.row.nth(1);
  const itemCode=row1.locator('div.form-group.frappe-control.input-max-width[data-fieldname="item_code"]')
  const itemCode1=row1.locator('input[data-fieldname="item_code"]');
  await itemCode.click();
  await itemCode1.fill(itemC);
  const itemOption = this.page.locator('div[role="option"]:visible').filter({ hasText: itemC });
  await itemOption.click();
    //await expect(itemCode).toHaveValue(itemC);
  
}

async fillQuantity(itemQuantity:string) {
   const row1 = this.row.nth(1);
   const quantity = row1.locator('input[data-fieldname="qty"]');
   await quantity.click();
   await quantity.fill(itemQuantity);
   await expect(quantity).toHaveValue(itemQuantity);
   await quantity.blur();
}
//stock
async fillItemRate(itemRate:string) {
   const row1 = this.row.nth(1);
   const rate = row1.locator('input[data-fieldname="basic_rate"]');
   await rate.fill(itemRate);
   await rate.blur();

}

async selectSourceWarehouse(sourceWarehouseName: string) {
  const row1 = this.row.nth(1);
  const sourceWarehouse = row1.locator('div.grid-static-col[data-fieldname="s_warehouse"]');
  const sourceWarehouse1 = row1.locator('input[data-fieldname="s_warehouse"]');
  await sourceWarehouse.click();
  await sourceWarehouse1.fill(sourceWarehouseName);
  const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: sourceWarehouseName });
  await warehouseOption.click();
}

async selectTargetWarehouse(targetWarehouseName: string) {
  const row1 = this.row.nth(1);
  const targetWarehouse = row1.locator('div.grid-static-col[data-fieldname="t_warehouse"]');
  const targetWarehouse1 = row1.locator('input[data-fieldname="t_warehouse"]');
  await targetWarehouse.click();
  await targetWarehouse1.fill(targetWarehouseName);
  const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: targetWarehouseName });
  await warehouseOption.click();
}

/*async selectItemCode(itemC:string) {
  const row1 = this.row.nth(1);
  const itemCode=row1.locator('input[data-fieldname="item_code"]');
  await itemCode.click();
  await itemCode.fill(itemC);
  const itemOption = this.page.locator('div[role="option"]:visible').filter({ hasText: itemC });
  await itemOption.click();
    await expect(itemCode).toHaveValue(itemC);
  
}

async fillQuantity(itemQuantity:string) {
   const row1 = this.row.nth(1);
   const quantity = row1.locator('input[data-fieldname="qty"]');
   await quantity.fill(itemQuantity);
   //await expect(quantity).toHaveValue(itemQuantity);
   await quantity.blur();
}

async fillItemRate(itemRate:string) {
   const row1 = this.row.nth(1);
   const rate = row1.locator('input[data-fieldname="basic_rate"]');
   await rate.fill(itemRate);
   //await expect(rate).toHaveValue(itemRate);
   //await rate.press('Tab');
   await rate.blur();

}*/


async getStockQuantity() {
    const stockRow = this.reportTableRow;
    const quantityText = await stockRow.locator('.dt-cell__content.dt-cell__content--col-6').textContent();
    const stockQuantity = Number(quantityText ?? '0');
    console.log(stockQuantity);
    return stockQuantity;
}


async clickReportActionButton(){
const reportButton = this.page.getByRole('button', {name: /^(Rebuild|Generate New Report)$/});
await reportButton.click();
}

}