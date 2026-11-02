/*import { BasePage } from './base';
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

}


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

}*/



import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base';
import { GridHelper } from './gridHelper';

export class Stock extends BasePage {

  // Page
  stockEntryContainer: Locator;
  stockBalanceRow: Locator;

  // Grid
  grid: GridHelper;
  stockEntryRow: Locator;

  status:Locator;

  constructor(page: Page) {
    super(page);

    this.grid = new GridHelper(page);

    this.stockEntryContainer = page.locator('#page-Stock\\ Entry');

    this.stockEntryRow = this.stockEntryContainer.locator('.grid-row').nth(1);

    this.stockBalanceRow = page.locator('.dt-row.dt-row-0.vrow');

    this.status = this.stockEntryContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');
  }

  async selectItem(itemCode: string) {
    const itemField = this.stockEntryRow.locator('div.form-group.frappe-control.input-max-width[data-fieldname="item_code"]');
    const itemInput = this.stockEntryRow.locator('input[data-fieldname="item_code"]');

    await itemField.click();
    await itemInput.fill(itemCode);

    const option = this.page.locator('div[role="option"]:visible').filter({ hasText: itemCode });
    await option.click();
  }

  async fillItemQuantity(quantity: string) {
    const quantityInput = this.stockEntryRow.locator('input[data-fieldname="qty"]');

    await quantityInput.click();
    await quantityInput.fill(quantity);
    await expect(quantityInput).toHaveValue(quantity);
    await quantityInput.blur();
  }

  async fillItemRate(rate: string) {
    const rateInput = this.stockEntryRow.locator('input[data-fieldname="basic_rate"]');

    await rateInput.fill(rate);
    await rateInput.blur();
  }

  





  async selectStockBalanceWarehouses(sourceWarehouse: string, targetWarehouse: string) {
  const warehouseFilter = this.filterSection.locator('[data-fieldname="warehouse"]');

  const selectedValue = warehouseFilter.locator('div.status-text.ellipsis');

  await selectedValue.click();

  const searchInput = warehouseFilter.locator(
    'li.dropdown-input-wrapper input.form-control.input-xs'
  );

  const sourceOption = warehouseFilter.locator('li.selectable-item')
    .filter({ hasText: sourceWarehouse });

  const targetOption = warehouseFilter.locator('li.selectable-item')
    .filter({ hasText: targetWarehouse });

  await searchInput.fill('');

  const clearAll = warehouseFilter.getByRole('button', { name: 'Clear All' });
  await clearAll.click();

  await selectedValue.click();
  await searchInput.fill(sourceWarehouse);
  await sourceOption.click();

  await selectedValue.click();
  await searchInput.fill('');
  await searchInput.fill(targetWarehouse);
  await targetOption.click();
 }




  /*async selectSourceWarehouse(sourceWarehouseName: string) {
  const sourceWarehouseCell = this.stockEntryRow.locator('div.grid-static-col[data-fieldname="s_warehouse"]' );
  const sourceWarehouseInput = this.stockEntryRow.locator( 'input[data-fieldname="s_warehouse"]:visible');

  await sourceWarehouseCell.dblclick();
  await expect(sourceWarehouseInput).toBeVisible({ timeout: 10000 });
  await sourceWarehouseInput.fill(sourceWarehouseName);

  const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: sourceWarehouseName });
  await warehouseOption.click();
 }*/



async selectSourceWarehouse(sourceWarehouseName: string) {
  const stockRow = this.stockEntryContainer.locator('.grid-row[data-idx="1"]');
  const editRowButton = stockRow.locator('.btn-open-row');

  // Open the item row
  await editRowButton.click();

  const sourceWarehouseInput = this.stockEntryContainer.locator('input[data-fieldname="s_warehouse"]:visible');

  await expect(sourceWarehouseInput).toBeVisible();
  await sourceWarehouseInput.fill(sourceWarehouseName);

  const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: sourceWarehouseName });
  await warehouseOption.click();
}
  
  /*async selectTargetWarehouse(targetWarehouseName: string) {
  const targetWarehouseCell = this.stockEntryRow.locator('div.grid-static-col[data-fieldname="t_warehouse"]');
  const targetWarehouseInput = this.stockEntryRow.locator('input[data-fieldname="t_warehouse"]');

  await targetWarehouseCell.click();
  await targetWarehouseInput.fill(targetWarehouseName);

  const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: targetWarehouseName });
  await warehouseOption.click();
  }*/


  async selectTargetWarehouse(targetWarehouseName: string) {
  const targetWarehouseField = this.stockEntryContainer.locator('.grid-row-open [data-fieldname="t_warehouse"]');
  const targetWarehouseInput = targetWarehouseField.locator('input:visible');

  await expect(targetWarehouseInput).toBeVisible();
  await targetWarehouseInput.fill(targetWarehouseName);

  const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: targetWarehouseName });
  await warehouseOption.click();
}

  async getStockBalanceQuantity() {
    const quantityText = await this.stockBalanceRow.locator('.dt-cell__content.dt-cell__content--col-6').textContent();

    const quantity = Number(quantityText ?? '0');

    console.log(quantity);
    return quantity;
  }

  async clickStockReportAction() {
    const reportButton = this.page.getByRole('button', {name: /^(Rebuild|Generate New Report)$/});

    await reportButton.click();
  }
}
