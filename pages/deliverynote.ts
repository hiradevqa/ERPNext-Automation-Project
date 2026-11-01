import { BasePage } from './base';
import{Page,Locator,expect} from '@playwright/test';
import { GridHelper } from './gridHelper';

export class DeliveryNote  extends BasePage{
grid: GridHelper;
dropdownContainer:Locator;
deliveryNotePageContainer:Locator;
customerField: Locator;
deliveryNoteTitle:Locator;
sourceWarehouseField:Locator;
itemCode:Locator;
itemQty:Locator;
itemRate:Locator;
status:Locator;

constructor(page:Page){
super(page);
this.grid = new GridHelper(page);
this.deliveryNotePageContainer = page.locator('#page-Delivery\\ Note');
this.dropdownContainer=page.locator('.dropdown-menu.show');
this.deliveryNoteTitle = this.deliveryNotePageContainer.locator('.title-area');
this.customerField = this.deliveryNotePageContainer.locator('input[data-fieldname="customer"]');
this.sourceWarehouseField=this.deliveryNotePageContainer.locator('input[data-fieldname="set_warehouse"]');
this.itemCode =this.deliveryNotePageContainer.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="item_code"]');
this.itemQty =this.deliveryNotePageContainer.locator('.grid-body .grid-row').locator('div.grid-static-col[data-fieldname="qty"]');
this.itemRate =this.deliveryNotePageContainer.locator('.grid-body .grid-row').locator('[data-fieldname="rate"]');
this.status= this.deliveryNotePageContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');

}

async clickDropsownOption(name:string){
    const dropdownOption = this.dropdownContainer.filter({has:this.page.getByText(name, { exact: true })});
    dropdownOption.getByText(name, { exact: true }).click();
}

getCustomerField(){
    return this.customerField;
}

getSourceWarehoue(){
return this.sourceWarehouseField;
}

getItemCode(){
    return this.itemCode; 
}

getItemQty(){
    return this.itemQty;
}

getItemRate(){
    return this.itemRate;
}


}