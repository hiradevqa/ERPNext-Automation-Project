import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';
let invoice_id:string;
test.beforeEach(async({page,loginPage,customerPage,itemPage,salesPage,deliveryNotePage,salesInvoicePage})=>{
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
await salesInvoicePage.clickButton('Create');
await expect(salesInvoicePage.dropdownContainer).toBeVisible();
await salesInvoicePage.clickDropsownOption('Sales Invoice');
await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
await salesInvoicePage.clickButton('Save');
const invoice_id = await salesInvoicePage.Fid();
console.log(invoice_id);
await salesInvoicePage.clickButton('Submit');
await salesInvoicePage.clickButton('Yes');

});

test('Create Payment Entry from Sales Invoice',async({page,paymentPage})=>{
await page.pause();
await paymentPage.clickButton('Create');
await expect(paymentPage.dropdownContainer).toBeVisible();
await paymentPage.clickDropsownOption('Payment');
await expect(paymentPage.newPaymentEntryTitle).toContainText('New Payment Entry');
await paymentPage.fillChecqueNo('212123131322213');
await paymentPage.clickButton('Save');
await paymentPage.clickButton('Submit');
await paymentPage.clickButton('Yes');
await paymentPage.clickButton('Payments');
await expect(paymentPage.dropdownContainer).toBeVisible();
await paymentPage.clickDropsownOption('Desktop');
});