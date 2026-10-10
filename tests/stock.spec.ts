import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage,customerPage,itemPage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  await page.waitForURL('/desk');
  
});

test('Create stock item',async({page,stockPage})=>{
await stockPage.clickDesktopOption('Stock');
await stockPage.clicksidebarOption('Stock Entry');
await stockPage.clickAddButton('Add Stock Entry');
await stockPage.clickField('Stock Entry Type');
await stockPage.selectoption('Material Receipt');
await stockPage.selectTargetWarehouse('Finished');
await stockPage.selectItemCode('QA-MOUSE-001');
await page.waitForTimeout(1000);
await stockPage.fillQuantity('10');
await stockPage.fillItemRate('20');
await stockPage.submitButton('Save');
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await stockPage.submitButton('Submit');
await stockPage.submitButton('Yes');
});
