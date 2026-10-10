import { test,expect } from '../fixtures/fixtures';
import { user } from '../data/users';

test.beforeEach(async({page,loginPage,customerPage,itemPage})=>{
await page.goto('/');
await loginPage.login(
    user.validUser.email,
    user.validUser.password
  );
  console.log(page.url());
  await page.waitForURL('/desk');
  //await expect(customerPage.containerOnDesk).toBeVisible();
  await itemPage.clickDesktopOption('Selling');
  //await itemPage.clickItemAndPricing();
  //await itemPage.clickItemOption();
});

/*test('Create stock item',async({page,itemPage})=>{
await itemPage.clickaddItem();
const itemCode=`QA-MOUSE-${Date.now()}`;
const itemName=`QA Wireless Mouse-${Date.now()}`
await itemPage.fillItemCode(itemCode)
await itemPage.fillItemName(itemName);
await itemPage.selectItemGroup('Products');
await itemPage.save();
await page.reload();
const a = itemPage.findName(itemName);
await expect(a).toContainText(itemName);

});


test('Create item without Item Code field',async({page,itemPage})=>{
await itemPage.clickaddItem();
const itemCode='';
const itemName=`QA Wireless Mouse-${Date.now()}`
await itemPage.fillItemCode(itemCode)
await itemPage.fillItemName(itemName);
await itemPage.selectItemGroup('Products');
await itemPage.save();
await expect(itemPage.errorMsg).toContainText('Missing Values Required');
await expect(itemPage.errorFields).toContainText('Item Code');
});


test('Create item without Item Group',async({page,itemPage})=>{
await itemPage.clickaddItem();
const itemCode=`QA-MOUSE-${Date.now()}`;
const itemName=`QA Wireless Mouse-${Date.now()}`
await itemPage.fillItemCode(itemCode)
await itemPage.fillItemName(itemName);
await itemPage.save();
await expect(itemPage.errorMsg).toContainText('Missing Values Required');
await expect(itemPage.errorFields).toContainText('Item Group');
});

	
test('Search newly created item',async({page,itemPage})=>{
await itemPage.clearSearchField();
await itemPage.clickaddItem();
const itemCode=`QA-MOUSE-${Date.now()}`;
const itemName=`QA Wireless Mouse-${Date.now()}`
await itemPage.fillItemCode(itemCode)
await itemPage.fillItemName(itemName);
await itemPage.selectItemGroup('Products');
await itemPage.save();
await page.reload();
await itemPage.fillSearchField(itemName);
const a = itemPage.findName(itemName);
await expect(a).toContainText(itemName);
});


test('Verify persisted item information',async({page,itemPage})=>{
await itemPage.clickaddItem();
const itemCode=`QA-MOUSE-${Date.now()}`;
const itemName=`QA Wireless Mouse-${Date.now()}`
await itemPage.fillItemCode(itemCode)
await itemPage.fillItemName(itemName);
await itemPage.selectItemGroup('Products');
await itemPage.save();
await page.reload();
await itemPage.fillSearchField(itemName);
await itemPage.findName(itemName).click();
const a = itemPage.getItemFields();
await expect(a.itemNameField).toHaveValue(itemName);
await expect(a.itemGroupField).toHaveValue('Products');
});

test('Update item info',async({page,itemPage})=>{
await itemPage.clickaddItem();
const itemCode=`QA-MOUSE-${Date.now()}`;
const itemName=`QA Wireless Mouse-${Date.now()}`
await itemPage.fillItemCode(itemCode)
await itemPage.fillItemName(itemName);
await itemPage.selectItemGroup('Products');
await itemPage.save();
await page.reload();
await itemPage.fillSearchField(itemName);
await itemPage.findName(itemName).click();
const updatedItemName = `QA Mouse-${Date.now()}`;
await itemPage.fillItemName(updatedItemName);
await itemPage.selectItemGroup('Consumable');
await itemPage.clickSaveUpdate();
await page.goBack();
await page.reload();
await itemPage.fillSearchField(updatedItemName);
await itemPage.findName(updatedItemName).click();
const a = itemPage.getItemFields();
await expect(a.itemNameField).toHaveValue(updatedItemName);
await expect(a.itemGroupField).toHaveValue('Consumable');

});*/

test('Make sure Item is being shown in sales',async({itemPage})=>{
await itemPage.clickSales();
await itemPage.clickAddButton('Add Sales Order');
await itemPage.clickName();
});