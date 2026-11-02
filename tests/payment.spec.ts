import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';



let invoice_id:string;
let outstandingAmount: number;

test.beforeEach(async({page,loginPage,customerPage,itemPage,salesPage,deliveryNotePage,salesInvoicePage})=>{
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
await deliveryNotePage.clickButton('Create');
await expect(deliveryNotePage.dropdownContainer).toBeVisible();
await deliveryNotePage.clickDropdownOption('Delivery Note');
await expect(deliveryNotePage.deliveryNoteTitle).toContainText('New Delivery Note');
await deliveryNotePage.clickButton('Save');
await deliveryNotePage.clickButton('Submit');
await deliveryNotePage.clickButton('Yes');
await salesInvoicePage.clickButton('Create');
await expect(salesInvoicePage.dropdownContainer).toBeVisible();
await salesInvoicePage.clickDropdownOption('Sales Invoice');
await expect(salesInvoicePage.salesInvoiceTitle).toContainText('New Sales Invoice');
await salesInvoicePage.clickButton('Save');
invoice_id = await salesInvoicePage.getSalesInvoiceId();
console.log(invoice_id);
await salesInvoicePage.clickButton('Submit');
await salesInvoicePage.clickButton('Yes');
await expect(salesInvoicePage.status).toHaveText('Unpaid');
outstandingAmount = await salesInvoicePage.getOutstandingAmount();

});


test('Create Payment Entry from Sales Invoice', async ({ page, paymentPage }) => {

  await paymentPage.clickButton('Create');

  await expect(paymentPage.dropdownContainer).toBeVisible();

  await paymentPage.clickDropdownOption('Payment');

  await expect(paymentPage.newPaymentEntryTitle).toContainText('New Payment Entry');

  await expect(paymentPage.customerField).toHaveValue('Ahmed Traders');

  await expect(paymentPage.invoiceReference).toContainText(invoice_id);

});


test('Submit full payment', async ({ page, paymentPage }) => {

  await paymentPage.clickButton('Create');
  await expect(paymentPage.dropdownContainer).toBeVisible();
  await paymentPage.clickDropdownOption('Payment');

  await expect(paymentPage.newPaymentEntryTitle).toContainText('New Payment Entry');

  // Verify invoice reference
  await expect(paymentPage.invoiceReference).toContainText(invoice_id);

  // Verify full payment amount
  await expect(paymentPage.paidAmount).toHaveValue(outstandingAmount.toFixed(2));

  await expect(paymentPage.totalAllocatedAmount).toContainText(
       outstandingAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));

  // Verify payment accounts
  await expect(paymentPage.paidFromAccount).not.toHaveValue('');

  await expect(paymentPage.paidToAccount).not.toHaveValue('');

  await paymentPage.fillChequeNumber('212123131322213');

  await paymentPage.clickButton('Save');
  await expect(paymentPage.status).toHaveText('Draft');

  await expect(page.getByRole('button', { name: 'Submit', exact: true })).toBeVisible();

  await paymentPage.clickButton('Submit');
  await paymentPage.clickButton('Yes');

  await expect(paymentPage.status).toHaveText('Submitted');

});