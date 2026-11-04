import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page, loginPage, salesPage, deliveryNotePage }) => {
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

  // Create and submit the Delivery Note
  await deliveryNotePage.clickButton('Create');
  await expect(deliveryNotePage.dropdownContainer).toBeVisible();
  await deliveryNotePage.clickDropdownOption('Delivery Note');
  await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');
  await deliveryNotePage.clickButton('Save');
  await deliveryNotePage.clickButton('Submit');
  await deliveryNotePage.clickButton('Yes');
});

test('Generate Sales Invoice from transaction', async ({ salesInvoicePage }) => {
  await salesInvoicePage.clickButton('Create');
  await expect(salesInvoicePage.dropdownContainer).toBeVisible();
  await salesInvoicePage.clickDropdownOption('Sales Invoice');

  await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
});

test('Verify Customer and Item on invoice', async ({ salesInvoicePage }) => {
  await salesInvoicePage.clickButton('Create');
  await expect(salesInvoicePage.dropdownContainer).toBeVisible();
  await salesInvoicePage.clickDropdownOption('Sales Invoice');

  await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
  await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
  await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
  await expect(salesInvoicePage.itemQty).toContainText('2');
  await expect(salesInvoicePage.itemRate).toContainText('20');
});

test('Verify invoice amount', async ({ salesInvoicePage }) => {
  await salesInvoicePage.clickButton('Create');
  await expect(salesInvoicePage.dropdownContainer).toBeVisible();
  await salesInvoicePage.clickDropdownOption('Sales Invoice');

  await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
  await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
  await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
  await expect(salesInvoicePage.itemQty).toContainText('2');
  await expect(salesInvoicePage.itemRate).toContainText('20');

  // Calculate the expected amount from quantity and rate
  const quantity = await salesInvoicePage.itemQty.textContent();
  const rate = await salesInvoicePage.itemRate.textContent();
  const totalAmount = Number(quantity) * Number(rate?.replace('₨', '').trim());

  const expectedAmount = `₨ ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  await expect(salesInvoicePage.amount).toHaveText(expectedAmount);

  await salesInvoicePage.clickButton('Save');
  await salesInvoicePage.clickButton('Submit');
  await salesInvoicePage.clickButton('Yes');
});

test('Save invoice as Draft', async ({ salesInvoicePage }) => {
  await salesInvoicePage.clickButton('Create');
  await expect(salesInvoicePage.dropdownContainer).toBeVisible();
  await salesInvoicePage.clickDropdownOption('Sales Invoice');

  await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
  await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
  await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
  await expect(salesInvoicePage.itemQty).toContainText('2');
  await expect(salesInvoicePage.itemRate).toContainText('20');

  const quantity = await salesInvoicePage.itemQty.textContent();
  const rate = await salesInvoicePage.itemRate.textContent();
  const totalAmount = Number(quantity) * Number(rate?.replace('₨', '').trim());

  const expectedAmount = `₨ ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  await expect(salesInvoicePage.amount).toHaveText(expectedAmount);

  await salesInvoicePage.clickButton('Save');
  await expect(salesInvoicePage.status).toHaveText('Draft');
});

test('Submit Sales Invoice', async ({ salesInvoicePage }) => {
  await salesInvoicePage.clickButton('Create');
  await expect(salesInvoicePage.dropdownContainer).toBeVisible();
  await salesInvoicePage.clickDropdownOption('Sales Invoice');

  await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
  await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
  await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
  await expect(salesInvoicePage.itemQty).toContainText('2');
  await expect(salesInvoicePage.itemRate).toContainText('20');

  const quantity = await salesInvoicePage.itemQty.textContent();
  const rate = await salesInvoicePage.itemRate.textContent();
  const totalAmount = Number(quantity) * Number(rate?.replace('₨', '').trim());

  const expectedAmount = `₨ ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  await expect(salesInvoicePage.amount).toHaveText(expectedAmount);

  await salesInvoicePage.clickButton('Save');
  await salesInvoicePage.clickButton('Submit');
  await salesInvoicePage.clickButton('Yes');
});
