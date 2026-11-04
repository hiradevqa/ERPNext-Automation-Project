import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page, loginPage, salesPage }) => {
  await page.goto('/');
  await loginPage.login(user.validUser.email, user.validUser.password);
  await page.waitForURL('/desk');

  // Create and submit a Sales Order
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');
  await salesPage.fillSourceWarehouseSearch('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');
  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('30-10-2027');
  await salesPage.fillItemRate('20');
  await salesPage.fillQuantity('2');
  await salesPage.clickButton('Save');
  await expect(salesPage.status).toHaveText('Draft');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await salesPage.clickButton('Submit');
  await salesPage.clickButton('Yes');
});

test('Create Delivery Note from Sales Order', async ({ deliveryNotePage }) => {
  await deliveryNotePage.clickButton('Create');
  await expect(deliveryNotePage.dropdownContainer).toBeVisible();

  await deliveryNotePage.clickDropdownOption('Delivery Note');

  await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');
});

test('Verify Sales Order data carried to Delivery Note', async ({ deliveryNotePage }) => {
  await deliveryNotePage.clickButton('Create');
  await expect(deliveryNotePage.dropdownContainer).toBeVisible();
  await deliveryNotePage.clickDropdownOption('Delivery Note');

  await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');

  const customerField = deliveryNotePage.getCustomerField();
  const sourceWarehouse = deliveryNotePage.getSourceWarehouse();
  const itemCode = deliveryNotePage.getItemCode();
  const itemQuantity = deliveryNotePage.getItemQty();
  const itemRate = deliveryNotePage.getItemRate();

  await expect(customerField).toHaveValue('Ahmed Traders');
  await expect(sourceWarehouse).toHaveValue('Finished Goods - TxlD');
  await expect(itemCode).toContainText('QA-MOUSE-001');
  await expect(itemQuantity).toContainText('2');
  await expect(itemRate).toContainText('20');
});

test('Save Delivery Note as Draft', async ({ deliveryNotePage }) => {
  await deliveryNotePage.clickButton('Create');
  await expect(deliveryNotePage.dropdownContainer).toBeVisible();
  await deliveryNotePage.clickDropdownOption('Delivery Note');

  await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');

  await deliveryNotePage.clickButton('Save');

  await expect(deliveryNotePage.status).toHaveText('Draft');
});

test('Submit Delivery Note', async ({ deliveryNotePage }) => {
  await deliveryNotePage.clickButton('Create');
  await expect(deliveryNotePage.dropdownContainer).toBeVisible();
  await deliveryNotePage.clickDropdownOption('Delivery Note');

  await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');

  await deliveryNotePage.clickButton('Save');
  await expect(deliveryNotePage.status).toHaveText('Draft');

  await deliveryNotePage.clickButton('Submit');
  await deliveryNotePage.clickButton('Yes');

  await expect(deliveryNotePage.status).toHaveText('To Bill');
});
