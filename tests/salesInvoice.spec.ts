import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage,customerPage,itemPage,salesPage,deliveryNotePage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
await page.waitForURL('/desk');
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.clickField1('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('30-10-2026');
await salesPage.fillQuantity('2');
await salesPage.fillItemRate1('20');
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
await deliveryNotePage.clickButton('Create');
await expect(deliveryNotePage.dropdownContainer).toBeVisible();
await deliveryNotePage.clickDropsownOption('Delivery Note');
await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');
await deliveryNotePage.clickButton('Save');
await deliveryNotePage.clickButton('Submit');
await deliveryNotePage.clickButton('Yes');
});

test('Generate Sales Invoice from transaction',async({page,salesInvoicePage})=>{
await page.pause();
await salesInvoicePage.clickButton('Create');
await expect(salesInvoicePage.dropdownContainer).toBeVisible();
await salesInvoicePage.clickDropsownOption('Sales Invoice');
await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
await expect(salesInvoicePage.itemQty).toContainText('2');
await expect(salesInvoicePage.itemRate).toContainText('20');

});

test('Verify Customer and Item on invoice',async({page,salesInvoicePage})=>{
await page.pause();
await salesInvoicePage.clickButton('Create');
await expect(salesInvoicePage.dropdownContainer).toBeVisible();
await salesInvoicePage.clickDropsownOption('Sales Invoice');
await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
await expect(salesInvoicePage.itemQty).toContainText('2');
await expect(salesInvoicePage.itemRate).toContainText('20');

});

test('Verify invoice amount',async({page,salesInvoicePage})=>{
await salesInvoicePage.clickButton('Create');
await expect(salesInvoicePage.dropdownContainer).toBeVisible();
await salesInvoicePage.clickDropsownOption('Sales Invoice');
await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
await expect(salesInvoicePage.itemQty).toContainText('2');
await expect(salesInvoicePage.itemRate).toContainText('20');
await page.pause();
const a = await salesInvoicePage.itemQty.textContent();
const b = await salesInvoicePage.itemRate.textContent();
const c = Number(a)*Number(b?.replace('₨', '').trim());
console.log(a);
console.log(b);
console.log(c);
const expectedAmount = `₨ ${c.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
await expect (salesInvoicePage.amount).toHaveText(expectedAmount);
await salesInvoicePage.clickButton('Save');
await salesInvoicePage.clickButton('Submit');
await salesInvoicePage.clickButton('Yes');

});


test('Save invoice as Draft',async({page,salesInvoicePage})=>{
await salesInvoicePage.clickButton('Create');
await expect(salesInvoicePage.dropdownContainer).toBeVisible();
await salesInvoicePage.clickDropsownOption('Sales Invoice');
await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
await expect(salesInvoicePage.itemQty).toContainText('2');
await expect(salesInvoicePage.itemRate).toContainText('20');
await page.pause();
const a = await salesInvoicePage.itemQty.textContent();
const b = await salesInvoicePage.itemRate.textContent();
const c = Number(a)*Number(b?.replace('₨', '').trim());
const expectedAmount = `₨ ${c.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
await expect (salesInvoicePage.amount).toHaveText(expectedAmount);
await salesInvoicePage.clickButton('Save');
await salesInvoicePage.clickButton('Submit');
await salesInvoicePage.clickButton('Yes');
await expect(salesInvoicePage.status).toHaveText('Draft');

});

test('Submit Sales Invoice',async({page,salesInvoicePage})=>{
await salesInvoicePage.clickButton('Create');
await expect(salesInvoicePage.dropdownContainer).toBeVisible();
await salesInvoicePage.clickDropsownOption('Sales Invoice');
await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
await expect(salesInvoicePage.customerField).toHaveValue('Ahmed Traders');
await expect(salesInvoicePage.itemCode).toContainText('QA-MOUSE-001');
await expect(salesInvoicePage.itemQty).toContainText('2');
await expect(salesInvoicePage.itemRate).toContainText('20');
await page.pause();
const a = await salesInvoicePage.itemQty.textContent();
const b = await salesInvoicePage.itemRate.textContent();
const c = Number(a)*Number(b?.replace('₨', '').trim());
const expectedAmount = `₨ ${c.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
await expect (salesInvoicePage.amount).toHaveText(expectedAmount);
await salesInvoicePage.clickButton('Save');
await salesInvoicePage.clickButton('Submit');
await salesInvoicePage.clickButton('Yes');
});