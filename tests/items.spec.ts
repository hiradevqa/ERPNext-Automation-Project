import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page, loginPage, itemPage }) => {
  await page.goto('/');

  await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );

  await page.waitForURL('/desk');

  await itemPage.clickDesktopOption('Selling');
  await itemPage.clickItemAndPricing();
  await itemPage.clickItemOption();
});

test('Create stock item', async ({ page, itemPage }) => {
  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.clickButton('Add Item');

  const itemCode = `QA-MOUSE-${Date.now()}`;
  const itemName = `QA Wireless Mouse-${Date.now()}`;

  await itemPage.fillItemCode(itemCode);
  await itemPage.fillItemName(itemName);
  await itemPage.selectItemGroup('Products');

  await itemPage.save();

  // Reload and check the item in the list
  await page.waitForTimeout(1000);
  await page.reload();

  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();
  await itemPage.fillSearchField(itemName);

  await expect(itemPage.searchField).toHaveValue(itemName);

  const itemRow = itemPage.findItem(itemName);

  await expect(itemRow).toBeVisible({ timeout: 15000 });
  await expect(itemRow).toContainText(itemName);
});

test('Create item without Item Code field', async ({ itemPage }) => {
  await itemPage.clickButton('Add Item');

  const itemCode = '';
  const itemName = `QA Wireless Mouse-${Date.now()}`;

  await itemPage.fillItemCode(itemCode);
  await itemPage.fillItemName(itemName);
  await itemPage.selectItemGroup('Products');

  await itemPage.save();

  await expect(itemPage.errorHeader('Missing Values Required')).toBeVisible();
  await expect(itemPage.errorFields).toContainText('Item Code');
});

test('Create item without Item Group', async ({ itemPage }) => {
  await itemPage.clickButton('Add Item');

  const itemCode = `QA-MOUSE-${Date.now()}`;
  const itemName = `QA Wireless Mouse-${Date.now()}`;

  await itemPage.fillItemCode(itemCode);
  await itemPage.fillItemName(itemName);

  await itemPage.save();

  await expect(itemPage.errorHeader('Missing Values Required')).toBeVisible();
  await expect(itemPage.errorFields).toContainText('Item Group');
});

test('Search newly created item', async ({ page, itemPage }) => {
  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.clickButton('Add Item');

  const itemCode = `QA-MOUSE-${Date.now()}`;
  const itemName = `QA Wireless Mouse-${Date.now()}`;

  await itemPage.fillItemCode(itemCode);
  await itemPage.fillItemName(itemName);
  await itemPage.selectItemGroup('Products');

  await itemPage.save();

  await page.waitForTimeout(1000);
  await page.reload();

  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.fillSearchField(itemName);

  await expect(itemPage.searchField).toHaveValue(itemName);

  const itemRow = itemPage.findItem(itemName);

  await expect(itemRow).toBeVisible({ timeout: 15000 });
  await expect(itemRow).toContainText(itemName);
});

test('Verify persisted item information', async ({ page, itemPage }) => {
  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.clickButton('Add Item');

  const itemCode = `QA-MOUSE-${Date.now()}`;
  const itemName = `QA Wireless Mouse-${Date.now()}`;

  await itemPage.fillItemCode(itemCode);
  await itemPage.fillItemName(itemName);
  await itemPage.selectItemGroup('Products');

  await itemPage.save();

  await page.waitForTimeout(1000);
  await page.reload();

  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.fillSearchField(itemName);

  const itemRow = itemPage.findItem(itemName);

  await expect(itemRow).toBeVisible({ timeout: 15000 });
  await itemRow.click();

  // Check the saved values after opening the item
  const itemFields = itemPage.getItemFields();

  await expect(itemFields.itemNameField).toHaveValue(itemName);
  await expect(itemFields.itemGroupField).toHaveValue('Products');
});

test('Update item info', async ({ page, itemPage }) => {
  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.clickButton('Add Item');

  const itemCode = `QA-MOUSE-${Date.now()}`;
  const itemName = `QA Wireless Mouse-${Date.now()}`;

  await itemPage.fillItemCode(itemCode);
  await itemPage.fillItemName(itemName);
  await itemPage.selectItemGroup('Products');

  await itemPage.save();
  await expect(itemPage.modalContainer).toBeHidden();

  await page.waitForTimeout(1000);
  await page.reload();

  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.fillSearchField(itemName);

  const itemRow = itemPage.findItem(itemName);

  await expect(itemRow).toBeVisible({ timeout: 15000 });
  await itemRow.click();

  const updatedItemName = `QA Mouse-${Date.now()}`;

  await itemPage.fillItemName(updatedItemName);
  await itemPage.selectItemGroup('Consumable');

  await itemPage.clickSaveUpdate();

  // Search again to confirm the updated values
  await page.goBack();
  await page.reload();

  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.fillSearchField(updatedItemName);

  const updatedItemRow = itemPage.findItem(updatedItemName);

  await expect(updatedItemRow).toBeVisible({ timeout: 15000 });
  await updatedItemRow.click();

  const itemFields = itemPage.getItemFields();

  await expect(itemFields.itemNameField).toHaveValue(updatedItemName);
  await expect(itemFields.itemGroupField).toHaveValue('Consumable');
});

test('Make sure Item is being shown in sales', async ({ page, itemPage, salesPage }) => {
  await itemPage.clearSearchField();
  await itemPage.clearItemGroup();

  await itemPage.clickButton('Add Item');

  const itemCode = `QA-MOUSE-${Date.now()}`;
  const itemName = `QA Wireless Mouse-${Date.now()}`;

  await itemPage.fillItemCode(itemCode);
  await itemPage.fillItemName(itemName);
  await itemPage.selectItemGroup('Products');

  await itemPage.save();

  await page.waitForTimeout(1000);

  await itemPage.clickSidebarOption('Sales Order');
  await itemPage.clickButton('Add Sales Order');

  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');
  await page.waitForTimeout(1000);
  await salesPage.selectItemCode(itemCode);

  const itemCodeCell = salesPage.getItemCodeCell();

  await expect(itemCodeCell).toContainText(itemCode);
});
