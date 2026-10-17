import{Page,Locator} from '@playwright/test';
import { BasePage } from './base';

export class Item  extends BasePage{
itemAndPricingContainer:Locator;
label:Locator;
item:Locator;
//addItemButton:Locator;
itemCodeClass:Locator;
itemCode:Locator;
itemName:Locator;
itemGroup:Locator;
//productOption:Locator;

filter:Locator;
searchField:Locator;
salesAndOrderContainer:Locator;
salesAndOrderText:Locator;
container:Locator;
customerName:Locator;
customerNameField:Locator;


constructor(page:Page){
super(page);
this.itemAndPricingContainer=page.locator('.item-anchor');
this.label=page.getByText('Items & Pricing');
this.item=page.getByText('Item', { exact: true });
//this.addItemButton=page.locator('[data-label="Add Item"]');
this.itemCodeClass=page.locator('.control-input');
this.itemCode = page.locator('input[data-fieldname="item_code"]');
this.itemName= page.locator('input[data-fieldname="item_name"]');
this.itemGroup=page.locator('[data-fieldname="item_group"]');
//this.productOption=page.getByRole('option').filter({ hasText: 'Products' });


this.filter=page.locator('.standard-filter-section.flex');
this.searchField=this.filter.locator('input[data-fieldname="item_name"]');
this.salesAndOrderText=page.getByText('Sales Order', { exact: true });
this.salesAndOrderContainer=page.locator('.sidebar-item-container').filter({has:this.salesAndOrderText});
this.container=page.locator('.frappe-control.input-max-width');
this.customerName=page.getByText('Customer');
this.customerNameField=page.locator('input.input-with-feedback.form-control.bold');

}

async clickItemAndPricing(){
await this.itemAndPricingContainer.filter({has:this.label}).click();
}
async clickItemOption(){
await this.itemAndPricingContainer.filter({has:this.item}).click();
}

async fillItemCode(code:string){
   const a = this.itemCodeClass.filter({has:this.itemCode});
   await a.locator(this.itemCode).fill(code);
}

async fillItemName(name:string){
   const b= this.itemCodeClass.filter({has:this.itemName});
   await b.locator(this.itemName).fill(name);
}

 
 async selectItemGroup(groupName: string){
  const itemGroupContainer = this.itemCodeClass.filter({has:this.itemGroup});
  const itemGroupField = itemGroupContainer.locator(this.itemGroup);
  await itemGroupField.fill(groupName);
  await this.page.locator('div[role="option"]').filter({hasText: groupName }).click();
}

async fillSearchField(name:string){
    await this.searchField.fill(name);
}

async clearSearchField() {
    await this.searchField.clear();
}

getItemFields(){
  
    const itemNameContainer= this.itemCodeClass.filter({has:this.itemName});
    const itemNameField= itemNameContainer.locator(this.itemName);
    const itemGroupContainer =this.itemCodeClass.filter({has:this.itemGroup});
    const itemGroupField= itemGroupContainer.locator(this.itemGroup);
     return {
        itemNameField,
        itemGroupField
     };
}


async clickSales(){
    await this.salesAndOrderContainer.click();
}

async clickName(){
    const a = this.container.filter({has:this.customerName});
    await a.locator(this.customerNameField).click();
    
 }

}
