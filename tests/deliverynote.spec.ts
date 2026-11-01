import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage,customerPage,itemPage,salesPage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  await page.waitForURL('/desk');
  await salesPage.clickDesktopOption('Selling');
await salesPage.clicksidebarOption('Sales Order');
await salesPage.clickAddButton('Add Sales Order');
await salesPage.clickCustomerField();
await salesPage.selectoption('Ahmed Traders');
await salesPage.selectSourceWarehouse('Set Source Warehouse');
await salesPage.selectoption('Finished Goods - TxlD');
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
await deliveryNotePage.clickDropsownOption('Delivery Note');
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
