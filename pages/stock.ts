import { BasePage } from './base';
import{Page,Locator,expect} from '@playwright/test';


export class Stock  extends BasePage{
container:Locator;
inputField: Locator;
//sourceWareHouse:Locator;


constructor(page:Page){
super(page);
this.container= page.locator('.frappe-control.input-max-width');
this.inputField=page.locator('.input-with-feedback.form-control.bold');
//this.sourceWareHouse=this.table.locator('input[data-fieldname="t_warehouse"]');
}

async clickField(fieldName:string){
   const a = this.container.filter({has:this.page.getByText(fieldName)});
   await a.locator(this.inputField).click();
}

async selectTargetWarehouse(warehouseName: string) {
  const row1 = this.row.nth(1);
  const targetWarehouse = row1.locator('[data-fieldname="t_warehouse"]');
  const targetWarehouse1 = row1.locator('input[data-fieldname="t_warehouse"]');
  await targetWarehouse.click();
  await targetWarehouse1.fill(warehouseName);
  const warehouseOption = this.page.locator('div[role="option"]').filter({ hasText: warehouseName }).first();
  await warehouseOption.click();
}

async selectItemCode(itemC:string) {
  const row1 = this.row.nth(1);
  const itemCode=row1.locator('input[data-fieldname="item_code"]');
  await itemCode.click();
  await itemCode.fill(itemC);
  const itemOption = this.page.locator('div[role="option"]').filter({ hasText: itemC }).first();
  await itemOption.click();
    await expect(itemCode).toHaveValue(itemC);
  
}

async fillQuantity(itemQuantity:string) {
   const row1 = this.row.nth(1);
   const quantity = row1.locator('input[data-fieldname="qty"]');
   await quantity.fill(itemQuantity);
}

async fillItemRate(itemRate:string) {
   const row1 = this.row.nth(1);
   const rate = row1.locator('input[data-fieldname="basic_rate"]');
   await rate.fill(itemRate);
   await expect(rate).toHaveValue(itemRate);
   //await rate.press('Tab');
   await rate.blur();

}

}