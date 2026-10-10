import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  await page.waitForURL('/desk');
});

/*test('Create a customer',async({page,customerPage})=>{
await customerPage.clickSellingButton();
await expect(customerPage.sidebar).toBeVisible();
await customerPage.clickCustomerOption();
await customerPage.clickAddCustomerButton();
await expect(customerPage.modalTitle).toBeVisible();
const customerName = `Ana_${Date.now()}`;
await customerPage.fillmodal(customerName);
await customerPage.saveCustomerDetail();
await page.reload();
const a = customerPage.findName(customerName);
await expect(a).toContainText(customerName);
});

test('Create customer without customer name',async({page,customerPage})=>{
await customerPage.clickSellingButton();
await expect(customerPage.sidebar).toBeVisible();
await customerPage.clickCustomerOption();
await customerPage.clickAddCustomerButton();
await expect(customerPage.modalTitle).toBeVisible();
await customerPage.saveCustomerDetail();
await expect(customerPage.modalHeader).toContainText('Missing Values Required');

});

test('Search newly created customer',async({page,customerPage})=>{
await customerPage.clickSellingButton();
await expect(customerPage.sidebar).toBeVisible();
await customerPage.clickCustomerOption();
await customerPage.clearSearchField();
await customerPage.clickAddCustomerButton();
await expect(customerPage.modalTitle).toBeVisible();
const customerName = `Ana1_${Date.now()}`;
await customerPage.fillmodal(customerName);
await customerPage.saveCustomerDetail();
await page.reload();
await customerPage.fillSearchField(customerName);
const a = customerPage.findName(customerName);
await expect(a).toContainText(customerName);
});

test('Search newly created customer',async({page,customerPage})=>{
await customerPage.clickSellingButton();
await expect(customerPage.sidebar).toBeVisible();
await customerPage.clickCustomerOption();
await customerPage.clearSearchField();
await customerPage.clickAddCustomerButton();
await expect(customerPage.modalTitle).toBeVisible();
const customerName = `Ana1_${Date.now()}`;
await customerPage.fillmodal(customerName);
await customerPage.saveCustomerDetail();
await page.reload();
await customerPage.fillSearchField(customerName);
await customerPage.clickName(customerName);
const a = customerPage.findName(customerName);
await expect(customerPage.customerNameField).toHaveValue(customerName);

});*/

test('Update existing customer',async({page,customerPage})=>{
await customerPage.clickSellingButton();
await expect(customerPage.sidebar).toBeVisible();
await customerPage.clickCustomerOption();
await customerPage.clickAddCustomerButton();
const customerName = `Anas_${Date.now()}`;
await customerPage.fillmodal(customerName);
await customerPage.saveCustomerDetail();
await page.reload();
await customerPage.clickName(customerName);
const updateCustomerName = `Anas_${Date.now()}`;
await customerPage.fillmodal(updateCustomerName);
await customerPage.clickSaveCustomerUpdate();
await page.goBack();
await page.reload();
await customerPage.clickName(updateCustomerName);
await expect(customerPage.customerNameField).toHaveValue(updateCustomerName);
});