import { BasePage } from './base';
import{Page,Locator,expect} from '@playwright/test';
import { GridHelper } from './gridHelper';

export class SalesInvoice  extends BasePage{
grid: GridHelper;
dropdownContainer:Locator;
salesInvoicePageContainer:Locator;
salesInvoiceTitle: Locator;
amount:Locator;
customerField:Locator;
itemCode:Locator;
itemQty:Locator;
itemRate:Locator;
status:Locator;


constructor(page:Page){
super(page);
this.grid = new GridHelper(page);
this.dropdownContainer=page.locator('.dropdown-menu.show');
this.salesInvoicePageContainer = page.locator('#page-Sales\\ Invoice');
this.salesInvoiceTitle = this.grid.getTitle(this.salesInvoicePageContainer);
this.itemCode=this.grid.getItemCode(this.salesInvoicePageContainer);
this.itemQty=this.grid.getItemQty(this.salesInvoicePageContainer);
this.itemRate=this.grid.getItemRate(this.salesInvoicePageContainer);
this.customerField=this.grid.getCustomer(this.salesInvoicePageContainer);
this.amount=this.grid.getAmount(this.salesInvoicePageContainer);
this.status=page.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');
}

//repeated in deliveryNote
async clickDropsownOption(name:string){
    const c = this.dropdownContainer.filter({has:this.page.getByText(name, { exact: true })});
    c.getByText(name, { exact: true }).click();
}

}