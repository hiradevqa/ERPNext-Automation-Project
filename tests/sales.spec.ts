
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



test('Attempt stock transaction without required Field',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2026');
await salesPage.fillQuantity('2');
await salesPage.fillItemRate1('20');
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');


});


test('Verify Qty * Rate calculation',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2026');
const quantity = '2';
await salesPage.fillQuantity(quantity);
const rate = '1000';
await salesPage.fillItemRate1(rate);
const totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');


});


test('Recalculate amount after quantity change',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2026');
let quantity = '2';
await salesPage.fillQuantity(quantity);
const rate = '1000';
await salesPage.fillItemRate1(rate);
let totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(salesPage.row.nth(1)).toBeVisible();
quantity='3';
await salesPage.fillQuantity(quantity);
totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
});

test('Recalculate amount after rate change',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2026');
let quantity = '2';
await salesPage.fillQuantity(quantity);
let rate = '1000';
await salesPage.fillItemRate1(rate);
let totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(salesPage.row.nth(1)).toBeVisible();
rate='3000';
await salesPage.fillItemRate1(rate);
totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
});


//ISSUE
test('Save stock Sales Order without required Source Warehouse',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2026');
const quantity = '2';
await salesPage.fillQuantity(quantity);
const rate = '1000';
await salesPage.fillItemRate1(rate);
const totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(salesPage.modalContainer).toBeVisible();
await expect(salesPage.errorHeader('Message')).toBeVisible();
await expect(salesPage.errorFields).toContainText('Source warehouse required for stock item QA-MOUSE-001');


});

test('Verify newly saved Sales Order is Draft',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('20-10-2026');
await salesPage.fillQuantity('2');
await salesPage.fillItemRate1('20');
await salesPage.clickButton('Save');
await expect(salesPage.status).toHaveText('Draft');
});


//08 ad back page locator only 
test('Verify Sales Order ID generation',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('20-10-2026');
await salesPage.fillQuantity('2');
await salesPage.fillItemRate1('20');
await salesPage.clickButton('Save');
const firstId = await salesPage.getSalesOrderId();
console.log(firstId);
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickField('Customer');
await salesPage.selectoption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode1('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('20-10-2026');
await salesPage.fillQuantity('2');
await salesPage.fillItemRate1('20');
await salesPage.clickButton('Save');
const secondId = await salesPage.getSalesOrderId();
console.log(secondId);
expect(secondId).not.toBe(firstId);
});

*/


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



test('Attempt stock transaction without required Field',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2027');
await salesPage.fillItemRate('20');
await salesPage.fillQuantity('2');
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');


});


test('Verify Qty * Rate calculation',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2027');
const quantity = '2';
const rate = '1000';
await salesPage.fillItemRate(rate);
await salesPage.fillQuantity(quantity);
const totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');


});


test('Recalculate amount after quantity change',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2027');
let quantity = '2';
const rate = '1000';
await salesPage.fillItemRate(rate);
await salesPage.fillQuantity(quantity);
let totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(salesPage.row.nth(1)).toBeVisible();
quantity='3';
await salesPage.fillQuantity(quantity);
//console.log( 'Quantity after change:',await salesPage.salesOrderRow.locator('input[data-fieldname="qty"]').inputValue());

//console.log('Amount after change:',await salesPage.amount.inputValue());
totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
});

test('Recalculate amount after rate change',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2027');
let quantity = '2';
let rate = '1000';
await salesPage.fillItemRate(rate);
await salesPage.fillQuantity(quantity);
let totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(salesPage.row.nth(1)).toBeVisible();
rate='3000';
await salesPage.fillItemRate(rate);
totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
});


//ISSUE
test('Save stock Sales Order without required Source Warehouse',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('14-10-2027');
const quantity = '2';
const rate = '1000';
await salesPage.fillItemRate(rate);
await salesPage.fillQuantity(quantity);
const totalamount = Number(quantity)*Number(rate);
await expect(salesPage.amount).toHaveValue(totalamount.toLocaleString('en-US', { minimumFractionDigits: 2 }));
await salesPage.clickButton('Save');
await expect(salesPage.modalContainer).toBeVisible();
await expect(salesPage.errorHeader('Message')).toBeVisible();
await expect(salesPage.errorFields).toContainText('Source warehouse required for stock item QA-MOUSE-001');


});

test('Verify newly saved Sales Order is Draft',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('20-10-2027');
await salesPage.fillItemRate('20');
await salesPage.fillQuantity('2');
await salesPage.clickButton('Save');
await expect(salesPage.status).toHaveText('Draft');
});


//08 ad back page locator only 
test('Verify Sales Order ID generation',async({page,salesPage})=>{
await salesPage.clickDesktopOption('Selling');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('20-10-2027');
await salesPage.fillItemRate('20');
await salesPage.fillQuantity('2');
await salesPage.clickButton('Save');
await page.pause();
const firstId = await salesPage.getSalesOrderId();
console.log(firstId);
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await salesPage.clickButton('Submit');
await salesPage.clickButton('Yes');
await salesPage.clickSidebarOption('Sales Order');
await salesPage.clickButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectOption('Ahmed Traders');
//await salesPage.blurField('Customer');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectOption('Finished Goods - TxlD');
//await expect(salesPage.tabler).toBeVisible();
await salesPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await salesPage.selectDeliveryDate('20-10-2027');
await salesPage.fillItemRate('20');
await salesPage.fillQuantity('2');
await salesPage.clickButton('Save');
const secondId = await salesPage.getSalesOrderId();
console.log(secondId);
expect(secondId).not.toBe(firstId);
});
*/


import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('/');
  await loginPage.login(user.validUser.email, user.validUser.password);
  await page.waitForURL('/desk');
});

test('Attempt stock transaction without required Field', async ({ page, salesPage }) => {
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('14-10-2027');
  await salesPage.fillItemRate('20');
  await salesPage.fillQuantity('2');

  await salesPage.clickButton('Save');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await salesPage.clickButton('Submit');
  await salesPage.clickButton('Yes');
});

test('Verify Qty * Rate calculation', async ({ page, salesPage }) => {
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('14-10-2027');

  const quantity = '2';
  const rate = '1000';

  await salesPage.fillItemRate(rate);
  await salesPage.fillQuantity(quantity);

  const totalAmount = Number(quantity) * Number(rate);
  await expect(salesPage.amount).toHaveValue(totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }));

  await salesPage.clickButton('Save');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await salesPage.clickButton('Submit');
  await salesPage.clickButton('Yes');
});

test('Recalculate amount after quantity change', async ({ page, salesPage }) => {
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('14-10-2027');

  let quantity = '2';
  const rate = '1000';

  await salesPage.fillItemRate(rate);
  await salesPage.fillQuantity(quantity);

  let totalAmount = Number(quantity) * Number(rate);
  await expect(salesPage.amount).toHaveValue(totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }));

  await salesPage.clickButton('Save');
  await expect(salesPage.row.nth(1)).toBeVisible();

  // Change quantity and check the new amount
  quantity = '3';
  await salesPage.fillQuantity(quantity);

  totalAmount = Number(quantity) * Number(rate);
  await expect(salesPage.amount).toHaveValue(totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }));

  await salesPage.clickButton('Save');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await salesPage.clickButton('Submit');
  await salesPage.clickButton('Yes');
});

test('Recalculate amount after rate change', async ({ page, salesPage }) => {
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('14-10-2027');

  const quantity = '2';
  let rate = '1000';

  await salesPage.fillItemRate(rate);
  await salesPage.fillQuantity(quantity);

  let totalAmount = Number(quantity) * Number(rate);
  await expect(salesPage.amount).toHaveValue(totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }));

  await salesPage.clickButton('Save');
  await expect(salesPage.row.nth(1)).toBeVisible();

  // Change rate and check the new amount
  rate = '3000';
  await salesPage.fillItemRate(rate);

  totalAmount = Number(quantity) * Number(rate);
  await expect(salesPage.amount).toHaveValue(totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }));

  await salesPage.clickButton('Save');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await salesPage.clickButton('Submit');
  await salesPage.clickButton('Yes');
});

test('Save stock Sales Order without required Source Warehouse', async ({ page, salesPage }) => {
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('14-10-2027');

  const quantity = '2';
  const rate = '1000';

  await salesPage.fillItemRate(rate);
  await salesPage.fillQuantity(quantity);

  const totalAmount = Number(quantity) * Number(rate);
  await expect(salesPage.amount).toHaveValue(totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }));

  await salesPage.clickButton('Save');

  // Check the missing warehouse error
  await expect(salesPage.modalContainer).toBeVisible();
  await expect(salesPage.errorHeader('Message')).toBeVisible();
  await expect(salesPage.errorFields).toContainText('Source warehouse required for stock item QA-MOUSE-001');
});

test('Verify newly saved Sales Order is Draft', async ({ page, salesPage }) => {
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('20-10-2027');
  await salesPage.fillItemRate('20');
  await salesPage.fillQuantity('2');

  await salesPage.clickButton('Save');
  await expect(salesPage.status).toHaveText('Draft');
});

test('Verify Sales Order ID generation', async ({ page, salesPage }) => {
  await salesPage.clickDesktopOption('Selling');
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('20-10-2027');
  await salesPage.fillItemRate('20');
  await salesPage.fillQuantity('2');

  await salesPage.clickButton('Save');

  const firstId = await salesPage.getSalesOrderId();
  console.log(firstId);

  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await salesPage.clickButton('Submit');
  await salesPage.clickButton('Yes');

  // Create another order and compare the IDs
  await salesPage.clickSidebarOption('Sales Order');
  await salesPage.clickButton('Add Sales Order');
  await salesPage.clickCustomerField();
  await salesPage.selectOption('Ahmed Traders');

  await salesPage.selectSourceWarehouse('Set Source Warehouse');
  await salesPage.selectOption('Finished Goods - TxlD');

  await salesPage.selectItemCode('QA-MOUSE-001');
  await page.waitForTimeout(1000);
  await salesPage.selectDeliveryDate('20-10-2027');
  await salesPage.fillItemRate('20');
  await salesPage.fillQuantity('2');

  await salesPage.clickButton('Save');

  const secondId = await salesPage.getSalesOrderId();
  console.log(secondId);

  expect(secondId).not.toBe(firstId);
});

