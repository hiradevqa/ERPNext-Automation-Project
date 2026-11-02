/*import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page, loginPage, customerPage }) => {
  await page.goto('/');

  await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );

  await page.waitForURL('/desk');

  await customerPage.clickDesktopOption('Selling');
  await customerPage.clickSidebarInsideOption('Setup', 'Customer');
});

test('Create a customer', async ({ customerPage }) => {
  await customerPage.clickButton('Add Customer');

  const customerName = `Ana_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField)
    .toHaveValue(customerName);

  const customerRow = customerPage.findName(customerName);

  await expect(customerRow)
    .toBeVisible({ timeout: 15000 });

  await expect(customerRow).toContainText(customerName);
});

test('Create customer without customer name', async ({ customerPage }) => {
  await customerPage.clickButton('Add Customer');

  await expect(customerPage.modalTitle)
    .toBeVisible();

  await customerPage.save();

  await expect(customerPage.modalHeader)
    .toContainText('Missing Values Required');
});

test('Search newly created customer', async ({ customerPage }) => {
  await customerPage.clearSearchField();

  await customerPage.clickButton('Add Customer');

  const customerName = `Ana1_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField)
    .toHaveValue(customerName);

  const customerRow = customerPage.findName(customerName);

  await expect(customerRow)
    .toBeVisible({ timeout: 15000 });

  await expect(customerRow)
    .toContainText(customerName);
});

test('Open newly created customer', async ({ customerPage }) => {
  await customerPage.clearSearchField();

  await customerPage.clickButton('Add Customer');

  const customerName = `Ana1_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField)
    .toHaveValue(customerName);

  const customerRow = customerPage.findName(customerName);

  await expect(customerRow)
    .toBeVisible({ timeout: 15000 });

  await customerPage.clickName(customerName);

  const customerNameField =
    customerPage.getCustomerNameField();

  await expect(customerNameField)
    .toHaveValue(customerName);
});

test('Update existing customer', async ({ customerPage }) => {
  await customerPage.clearSearchField();

  await customerPage.clickButton('Add Customer');

  const customerName = `Anas_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField)
    .toHaveValue(customerName);

  const customerRow =
    customerPage.findName(customerName);

  await expect(customerRow)
    .toBeVisible({ timeout: 15000 });

  await customerPage.clickName(customerName);

  const updateCustomerName = `Anas_${Date.now()}`;

  await customerPage.fillCustomerName(updateCustomerName);

  const updatedField =
    customerPage.getCustomerNameField();

  await expect(updatedField)
    .toHaveValue(updateCustomerName);

  await updatedField.blur();

  await customerPage.clickSaveUpdate();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(updateCustomerName);

  await expect(customerPage.nameSearchField)
    .toHaveValue(updateCustomerName);

  const updatedCustomerRow =
    customerPage.findName(updateCustomerName);

  await expect(updatedCustomerRow)
    .toBeVisible({ timeout: 15000 });

  await customerPage.clickName(updateCustomerName);

  const customerNameField =
    customerPage.getCustomerNameField();

  await expect(customerNameField)
    .toHaveValue(updateCustomerName);
});*/


import { test, expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async ({ page, loginPage, customerPage }) => {
  await page.goto('/');

  await loginPage.login(user.validUser.email, user.validUser.password);
  await page.waitForURL('/desk');

  await customerPage.clickDesktopOption('Selling');
  await customerPage.clickSidebarInsideOption('Setup', 'Customer');
});

test('Create a customer', async ({ customerPage }) => {
  await customerPage.clickButton('Add Customer');

  const customerName = `Ana_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  // Return to the list and search for the new customer
  await customerPage.clickSidebarInsideOption('Setup', 'Customer');
  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField).toHaveValue(customerName);

  const customerRow = customerPage.findName(customerName);

  await expect(customerRow).toBeVisible({ timeout: 15000 });
  await expect(customerRow).toContainText(customerName);
});

test('Create customer without customer name', async ({ customerPage }) => {
  await customerPage.clickButton('Add Customer');

  await expect(customerPage.modalTitle).toBeVisible();

  await customerPage.save();

  await expect(customerPage.modalHeader).toContainText('Missing Values Required');
});

test('Search newly created customer', async ({ customerPage }) => {
  await customerPage.clearSearchField();
  await customerPage.clickButton('Add Customer');

  const customerName = `Ana1_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField).toHaveValue(customerName);

  const customerRow = customerPage.findName(customerName);

  await expect(customerRow).toBeVisible({ timeout: 15000 });
  await expect(customerRow).toContainText(customerName);
});

test('Open newly created customer', async ({ customerPage }) => {
  await customerPage.clearSearchField();
  await customerPage.clickButton('Add Customer');

  const customerName = `Ana1_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField).toHaveValue(customerName);

  const customerRow = customerPage.findName(customerName);

  await expect(customerRow).toBeVisible({ timeout: 15000 });

  await customerPage.clickName(customerName);

  const customerNameField = customerPage.getCustomerNameField();

  await expect(customerNameField).toHaveValue(customerName);
});

test('Update existing customer', async ({ customerPage }) => {
  await customerPage.clearSearchField();
  await customerPage.clickButton('Add Customer');

  const customerName = `Anas_${Date.now()}`;

  await customerPage.fillModal(customerName);
  await customerPage.save();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(customerName);

  await expect(customerPage.nameSearchField).toHaveValue(customerName);

  const customerRow = customerPage.findName(customerName);

  await expect(customerRow).toBeVisible({ timeout: 15000 });

  await customerPage.clickName(customerName);

  const updateCustomerName = `Anas_${Date.now()}`;

  await customerPage.fillCustomerName(updateCustomerName);

  const updatedField = customerPage.getCustomerNameField();

  await expect(updatedField).toHaveValue(updateCustomerName);

  // Leave the field before saving the change
  await updatedField.blur();
  await customerPage.clickSaveUpdate();

  await customerPage.clickSidebarInsideOption('Setup', 'Customer');

  await customerPage.clearSearchField();
  await customerPage.fillSearchField(updateCustomerName);

  await expect(customerPage.nameSearchField).toHaveValue(updateCustomerName);

  const updatedCustomerRow = customerPage.findName(updateCustomerName);

  await expect(updatedCustomerRow).toBeVisible({ timeout: 15000 });

  await customerPage.clickName(updateCustomerName);

  const customerNameField = customerPage.getCustomerNameField();

  await expect(customerNameField).toHaveValue(updateCustomerName);
});
