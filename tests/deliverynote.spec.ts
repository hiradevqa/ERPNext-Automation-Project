/*import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage,customerPage,itemPage,salesPage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  await page.waitForURL('/desk');
  await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('30-10-2027');
await salesPage.fillItemRate('20');
await salesPage.fillQuantity('2');
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
});

test('2',async({page,deliveryNotePage})=>{
await deliveryNotePage.clickButton('Create');
await expect(deliveryNotePage.dropdownContainer).toBeVisible();
await deliveryNotePage.clickDropdownOption('Delivery Note');
await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');
//await page.pause();
const b = deliveryNotePage.getCustomerField();
await expect(b).toHaveValue('Ahmed Traders');
const c = deliveryNotePage.getSourceWarehoue();
await expect(c).toHaveValue('Finished Goods - TxlD');
const d = deliveryNotePage.getItemCode();
await expect(d).toContainText('QA-MOUSE-001');
const e= deliveryNotePage.getItemQty();
await expect(e).toContainText('2');
const f = deliveryNotePage.getItemRate();
await expect(f).toContainText('20');
await deliveryNotePage.clickButton('Save');
await expect(deliveryNotePage.status).toHaveText('Draft');
await deliveryNotePage.clickButton('Submit');
await deliveryNotePage.clickButton('Yes');

});
*/


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
  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');
  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('30-10-2027');
  await salesPage.fillItemRate('20');
  await salesPage.fillQuantity('2');

  await salesPage.clickButton('Save');
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
