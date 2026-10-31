
// u  have to change the logic of selection from dropdown(rn  it is selecting first which should not happen)
/*import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage,customerPage,itemPage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  await page.waitForURL('/desk');
  
});

test('Create stock item1',async({page,stockPage})=>{
await stockPage.clickDesktopOption('Stock');
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Receipt');
await stockPage.selectTargetWarehouse('Finished');
await stockPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await stockPage.fillQuantity('10');
await stockPage.fillItemRate('20');
await stockPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await stockPage.clickButton('Submit');
await stockPage.clickButton('Yes');
});

test('2',async({page,stockPage})=>{ //this Test is not according to requirements- needs updation also
await stockPage.clickDesktopOption('Stock');
await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
await stockPage.Filter1('Items','QA-MOUSE-001');
await stockPage.Filter1('Warehouses','Finished Goods - TxlD');
await stockPage.clickReportActionButton();
await expect(stockPage.reportTableRow).toBeVisible();
await page.reload();
await expect(stockPage.reportTableRow).toBeVisible();
await stockPage.getStockQuantity();
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
//await expect(stockPage.saveUpdate).toBeVisible();
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Receipt');
const row1 = stockPage.row.nth(1);
await stockPage.selectTargetWarehouse('Finished');
await expect(
  row1.locator('input[data-fieldname="t_warehouse"]')
).toHaveValue(/Finished/);
await stockPage.selectItemCode('QA-MOUSE-001');
await expect(
  row1.locator('input[data-fieldname="item_code"]')
).toHaveValue('QA-MOUSE-001');
await page.waitForTimeout(1000);
await stockPage.fillQuantity('10');
await expect(
  row1.locator('input[data-fieldname="qty"]')
).toHaveValue(/10/);
await stockPage.fillItemRate('20');
await expect(
  row1.locator('input[data-fieldname="basic_rate"]')
).toHaveValue(/20/);
await stockPage.clickButton('Save');
//await expect(stockPage.submit).toBeVisible();
await stockPage.clickButton('Submit');
await expect(stockPage.modalContainer).toBeVisible();
await stockPage.clickButton('Yes');
await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
await page.reload();
await stockPage.clickReportActionButton();
await stockPage.Filter1('Items','QA-MOUSE-001');
await stockPage.Filter1('Warehouses','Finished Goods - TxlD');
await expect(stockPage.reportTableRow).toBeVisible();
await page.reload();
await stockPage.getStockQuantity();
});



test('Create stock item',async({page,stockPage})=>{
await stockPage.clickDesktopOption('Stock');
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
await stockPage.clickField('Stock Entry Type');
const stockEntryType = 'Material Transfer';
await stockPage.selectoption(stockEntryType);
await stockPage.selectSourceWarehouse('Finished');
await stockPage.selectTargetWarehouse('Goods In Transit');
await stockPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await stockPage.fillQuantity('1');
if(stockEntryType === 'Material Transfer'){
await expect(stockPage.grid.rate).toBeDisabled();
}
await stockPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await stockPage.clickButton('Submit');
await stockPage.clickButton('Yes');
});

test('Verify quantities after warehouse transfer',async({page,stockPage})=>{ //this Test is not according to requirements- needs updation also
await stockPage.clickDesktopOption('Stock');
await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
await stockPage.clickReportActionButton();
await stockPage.Filter1('Items','QA-MOUSE-001');
await stockPage.Filter1('Warehouses','Finished Goods - TxlD');
await stockPage.clickReportActionButton();
await page.reload();
//await expect(stockPage.reportTableRow).toBeVisible();
await expect(stockPage.reportTableRow).toBeVisible();
//await stockPage.getStockQuantity();
const sourceQuantityBefore = await stockPage.getStockQuantity();
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
//await expect(stockPage.saveUpdate).toBeVisible();
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Transfer');
const row1 = stockPage.row.nth(1);
await stockPage.selectSourceWarehouse('Finished');
await stockPage.selectTargetWarehouse('Goods In Transit');
await expect(row1.locator('input[data-fieldname="t_warehouse"]')).toHaveValue(/Goods/);
await stockPage.selectItemCode('QA-MOUSE-001');
await expect(row1.locator('input[data-fieldname="item_code"]')).toHaveValue('QA-MOUSE-001');
await page.waitForTimeout(1000);
const quantity = '3';
await stockPage.fillQuantity(quantity);
//await expect(row1.locator('input[data-fieldname="qty"]')).toHaveValue(quantity);
console.log(quantity);
//await stockPage.fillItemRate('20');
//await expect( row1.locator('input[data-fieldname="basic_rate"]')).toHaveValue(/20/);
await stockPage.clickButton('Save');
//await expect(stockPage.submit).toBeVisible();
await stockPage.clickButton('Submit');
await expect(stockPage.modalContainer).toBeVisible();
await stockPage.clickButton('Yes');
await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
await page.reload();
await stockPage.clickReportActionButton();
await stockPage.Filter1('Items','QA-MOUSE-001');
await stockPage.Filter1('Warehouses','Finished Goods - TxlD');
await stockPage.clickReportActionButton();
await page.reload();
await expect(stockPage.reportTableRow).toBeVisible();
await page.reload();
const sourceQuantityAfter = await stockPage.getStockQuantity();
expect(sourceQuantityAfter).toBe(sourceQuantityBefore - Number(quantity));


});

test('Attempt stock transaction without required Field',async({page,stockPage})=>{
await stockPage.clickDesktopOption('Stock');
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Receipt');
await stockPage.selectTargetWarehouse('Finished');
//await page.waitForTimeout(1000);
await stockPage.fillItemRate('20');
await stockPage.clickButton('Save');
await expect(stockPage.modalContainer).toBeVisible();
await expect(stockPage.errorHeader('Missing Fields')).toBeVisible();
await expect(stockPage.errorFields).toContainText('Item Code');
await expect(stockPage.errorFields).toContainText('Qty');

});*/





// u  have to change the logic of selection from dropdown(rn  it is selecting first which should not happen)
import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage,customerPage,itemPage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  await page.waitForURL('/desk');
  
});

test('Receive stock using Material Receipt',async({page,stockPage})=>{
await stockPage.clickDesktopOption('Stock');
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Receipt');
await stockPage.selectTargetWarehouse('Finished');
await stockPage.selectItem('QA-MOUSE-001');
await page.waitForTimeout(1000);
await stockPage.fillItemQuantity('10');
await stockPage.fillItemRate('20');
await stockPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await stockPage.clickButton('Submit');
await stockPage.clickButton('Yes');
await expect(stockPage.status).toHaveText('Submitted');
});


test('Verify received quantity increased stock', async ({ page, stockPage }) => {
  await stockPage.clickDesktopOption('Stock');
  await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
  await stockPage.Filter1('Items', 'QA-MOUSE-001');
  await stockPage.Filter1('Warehouses', 'Finished Goods - TxlD');
  await stockPage.clickStockReportAction();
  await expect(stockPage.stockBalanceRow).toBeVisible();
  await page.reload();
  await expect(stockPage.stockBalanceRow).toBeVisible();

  const quantityBefore = await stockPage.getStockBalanceQuantity();

  await stockPage.clicksidebarOption('Stock Entry');
  await stockPage.clickAddButton('Add Stock Entry');
  await stockPage.clickField('Stock Entry Type');
  await stockPage.selectoption('Material Receipt');

  const row1 = stockPage.row.nth(1);

  await stockPage.selectTargetWarehouse('Finished');
  await expect(row1.locator('input[data-fieldname="t_warehouse"]')).toHaveValue(/Finished/);

  await stockPage.selectItem('QA-MOUSE-001');
  await expect(row1.locator('input[data-fieldname="item_code"]')).toHaveValue('QA-MOUSE-001');

  await page.waitForTimeout(1000);
  await stockPage.fillItemQuantity('10');

  await expect(row1.locator('input[data-fieldname="qty"]')).toHaveValue(/10/);

  await stockPage.fillItemRate('20');
  await expect(row1.locator('input[data-fieldname="basic_rate"]')).toHaveValue(/20/);

  await stockPage.clickButton('Save');
  await stockPage.clickButton('Submit');
  await expect(stockPage.modalContainer).toBeVisible();
  await stockPage.clickButton('Yes');
  await expect(stockPage.status).toHaveText('Submitted');

  await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
  await page.reload();
  await stockPage.clickStockReportAction();
  await stockPage.Filter1('Items', 'QA-MOUSE-001');
  await stockPage.Filter1('Warehouses', 'Finished Goods - TxlD');
  await expect(stockPage.stockBalanceRow).toBeVisible();
  await page.reload();

  const quantityAfter = await stockPage.getStockBalanceQuantity();

  expect(quantityAfter).toBe(quantityBefore + 10);
});


test('Transfer stock between warehouses',async({page,stockPage})=>{
await stockPage.clickDesktopOption('Stock');
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
await stockPage.clickField('Stock Entry Type');
const stockEntryType = 'Material Transfer';
await stockPage.selectoption(stockEntryType);
await stockPage.selectSourceWarehouse('Finished');
await stockPage.selectTargetWarehouse('Goods In Transit');
await stockPage.selectItem('QA-MOUSE-001');
await page.waitForTimeout(1000);
await stockPage.fillItemQuantity('1');
if(stockEntryType === 'Material Transfer'){
await expect(stockPage.grid.rate).toBeDisabled();
}
await stockPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await stockPage.clickButton('Submit');
await stockPage.clickButton('Yes');
await expect(stockPage.status).toHaveText('Submitted');
});


/*test('Verify source warehouse quantity decreases after transfer',async({page,stockPage})=>{ //this Test is not according to requirements- needs updation also
await stockPage.clickDesktopOption('Stock');
await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
await stockPage.clickStockReportAction();
await stockPage.Filter1('Items','QA-MOUSE-001');
await stockPage.Filter1('Warehouses','Finished Goods - TxlD');
await stockPage.clickStockReportAction();
await page.reload();
//await expect(stockPage.stockBalanceRow).toBeVisible();
await expect(stockPage.stockBalanceRow).toBeVisible();
//await stockPage.getStockBalanceQuantity();
const sourceQuantityBefore = await stockPage.getStockBalanceQuantity();
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
//await expect(stockPage.saveUpdate).toBeVisible();
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Transfer');
const row1 = stockPage.row.nth(1);
await stockPage.selectSourceWarehouse('Finished');
await stockPage.selectTargetWarehouse('Goods In Transit');
await expect(row1.locator('input[data-fieldname="t_warehouse"]')).toHaveValue(/Goods/);
await stockPage.selectItem('QA-MOUSE-001');
await expect(row1.locator('input[data-fieldname="item_code"]')).toHaveValue('QA-MOUSE-001');
await page.waitForTimeout(1000);
const quantity = '3';
await stockPage.fillItemQuantity(quantity);
//await expect(row1.locator('input[data-fieldname="qty"]')).toHaveValue(quantity);
console.log(quantity);
//await stockPage.fillItemRate('20');
//await expect( row1.locator('input[data-fieldname="basic_rate"]')).toHaveValue(/20/);
await stockPage.clickButton('Save');
//await expect(stockPage.submit).toBeVisible();
await stockPage.clickButton('Submit');
await expect(stockPage.modalContainer).toBeVisible();
await stockPage.clickButton('Yes');
await expect(stockPage.status).toHaveText('Submitted');
await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
await page.reload();
await stockPage.clickStockReportAction();
await stockPage.Filter1('Items','QA-MOUSE-001');
await stockPage.Filter1('Warehouses','Finished Goods - TxlD');
await stockPage.clickStockReportAction();
await page.reload();
await expect(stockPage.stockBalanceRow).toBeVisible();
await page.reload();
const sourceQuantityAfter = await stockPage.getStockBalanceQuantity();
expect(sourceQuantityAfter).toBe(sourceQuantityBefore - Number(quantity));


});*/



test('Verify source warehouse quantity decreases after transfer', async ({ page, stockPage }) => {
  await stockPage.clickDesktopOption('Stock');
  await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');
  await stockPage.Filter1('Items', 'QA-MOUSE-001');
  await stockPage.Filter1('Warehouses', 'Finished Goods - TxlD');
  await stockPage.clickStockReportAction();
  await expect(stockPage.stockBalanceRow).toBeVisible();

  const sourceQuantityBefore = await stockPage.getStockBalanceQuantity();

  await stockPage. selectStockBalanceWarehouses(
    'Finished Goods - TxlD',
    'Goods In Transit - TxlD'
  );

  //await stockPage.clickStockReportAction();
  await expect(stockPage.stockBalanceRow).toBeVisible();

  const targetQuantityBefore = await stockPage.getStockBalanceQuantity();

  await stockPage.clicksidebarOption('Stock Entry');
  await stockPage.clickAddButton('Add Stock Entry');
  await stockPage.clickField('Stock Entry Type');
  await stockPage.selectoption('Material Transfer');

  const row1 = stockPage.row.nth(1);

  await stockPage.selectSourceWarehouse('Finished');
  await stockPage.selectTargetWarehouse('Goods In Transit');

  await expect(
    row1.locator('input[data-fieldname="t_warehouse"]')
  ).toHaveValue(/Goods/);

  await stockPage.selectItem('QA-MOUSE-001');

  await expect(
    row1.locator('input[data-fieldname="item_code"]')
  ).toHaveValue('QA-MOUSE-001');

  await page.waitForTimeout(1000);

  const quantity = '3';
  await stockPage.fillItemQuantity(quantity);

  await stockPage.clickButton('Save');
  await stockPage.clickButton('Submit');
  await expect(stockPage.modalContainer).toBeVisible();
  await stockPage.clickButton('Yes');
  await expect(stockPage.status).toHaveText('Submitted');
await page.pause();
  await stockPage.clickSidebarInsideOption('Reports', 'Stock Balance');

  await stockPage.selectStockBalanceWarehouses(
    'Goods In Transit - TxlD',
    'Finished Goods - TxlD'
  );

  await stockPage.clickStockReportAction();
  await expect(stockPage.stockBalanceRow).toBeVisible();

  const sourceQuantityAfter = await stockPage.getStockBalanceQuantity();

  await stockPage. selectStockBalanceWarehouses(
    'Finished Goods - TxlD',
    'Goods In Transit - TxlD'
  );

  await stockPage.clickStockReportAction();
  await expect(stockPage.stockBalanceRow).toBeVisible();

  const targetQuantityAfter = await stockPage.getStockBalanceQuantity();

  expect(sourceQuantityAfter).toBe(sourceQuantityBefore - Number(quantity));
  expect(targetQuantityAfter).toBe(targetQuantityBefore + Number(quantity));
});



test('Attempt stock transaction without required Field',async({page,stockPage})=>{
await stockPage.clickDesktopOption('Stock');
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Receipt');
await stockPage.selectTargetWarehouse('Finished');
//await page.waitForTimeout(1000);
await stockPage.fillItemRate('20');
await stockPage.clickButton('Save');
await expect(stockPage.modalContainer).toBeVisible();
await expect(stockPage.errorHeader('Missing Fields')).toBeVisible();
await expect(stockPage.errorFields).toContainText('Item Code');
await expect(stockPage.errorFields).toContainText('Qty');

});


