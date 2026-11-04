
import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('/');
  await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  await page.waitForURL('/desk');
});

test('Receive stock using Material Receipt', async ({ page, stockPage }) => {
  await stockPage.clickDesktopOption('Stock');
  await stockPage.clickSidebarOption('Stock Entry');
  await stockPage.clickButton('Add Stock Entry');
  await stockPage.clickField('Stock Entry Type');
  await stockPage.selectOption('Material Receipt');

  // Enter the receiving warehouse and item
  await stockPage.selectTargetWarehouse('Finished');
  await stockPage.selectStockEntryItem('QA-MOUSE-001');

  await page.waitForTimeout(1000);
  await stockPage.fillStockEntryQuantity('10');
  await stockPage.fillStockEntryRate('20');

  // Save and submit the receipt
  await stockPage.clickButton('Save');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

  await stockPage.clickButton('Submit');
  await stockPage.clickButton('Yes');

  await expect(stockPage.status).toHaveText('Submitted');
});

test('Transfer stock between warehouses', async ({ page, stockPage }) => {
  await stockPage.clickDesktopOption('Stock');
  await stockPage.clickSidebarOption('Stock Entry');
  await stockPage.clickButton('Add Stock Entry');
  await stockPage.clickField('Stock Entry Type');

  const stockEntryType = 'Material Transfer';

  await stockPage.selectOption(stockEntryType);
  await expect(stockPage.stockEntryRow).toBeVisible();

  // Select source, target, and item
  await stockPage.selectSourceWarehouse('Finished');
  await stockPage.selectTargetWarehouse('Goods In Transit');
  await stockPage.selectStockEntryItem('QA-MOUSE-001');

  await page.waitForTimeout(1000);
  await stockPage.fillStockEntryQuantity('1');

  // Rate should be disabled for Material Transfer
  await expect(stockPage.grid.rate).toBeDisabled();

  // Save and submit the transfer
  await stockPage.clickButton('Save');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

  await stockPage.clickButton('Submit');
  await stockPage.clickButton('Yes');

  await expect(stockPage.status).toHaveText('Submitted');
});


test('Attempt stock transaction without required warehouse', async ({ stockPage }) => {
  await stockPage.clickDesktopOption('Stock');
  await stockPage.clickSidebarOption('Stock Entry');
  await stockPage.clickButton('Add Stock Entry');
  await stockPage.clickField('Stock Entry Type');
  await stockPage.selectOption('Material Receipt');

  // Enter item details without a warehouse
  await stockPage.selectStockEntryItem('QA-MOUSE-001');
  await expect(stockPage.itemCodeInput).toHaveValue('QA-MOUSE-001');
  await stockPage.fillStockEntryQuantity('10');
  await stockPage.fillStockEntryRate('20');

  // Save without selecting a target warehouse
  await stockPage.clickButton('Save');

  // Verify warehouse validation
  await expect(stockPage.modalContainer).toBeVisible();
  await expect(stockPage.errorFields).toContainText('Target warehouse is mandatory for row 1');
});
