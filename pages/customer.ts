/*import{Page,Locator} from '@playwright/test';

export class Customer {
  page: Page;
  containerOnDesk:Locator;
  sellingButton: Locator;
  sidebar:Locator;
  setupOption:Locator;
  customerOption:Locator;
  addCustomerButton:Locator;
  modalTitle:Locator;
  container:Locator;
  customerName:Locator;
  customerNameField:Locator;
  saveButton:Locator;
  rowContainer:Locator;
  modalContainer:Locator;
  modalHeader:Locator;
  nameSearchField:Locator;
  nameSearchFieldContainer:Locator;
  saveCustomerUpdate:Locator;
  


  constructor(page:Page){
this.page=page;
this.containerOnDesk=page.locator('.icons');
this.sellingButton=page.locator('[data-id="Selling"]');
this.sidebar=page.locator('.body-sidebar-top');
this.setupOption=page.locator('[data-id="Setup"]');
this.customerOption=page.locator('[data-id="Customer"]');
this.addCustomerButton=page.getByRole('button',{name:'Add Customer'});
this.modalContainer=page.locator('.modal-content');
this.container=page.locator('.frappe-control.input-max-width');
this.customerName=page.getByText('Customer Name');
this.customerNameField=page.locator('input.input-with-feedback.form-control.bold');
this.saveButton=this.modalContainer.getByRole('button',{name:'Save'});
this.rowContainer=page.locator('.list-row-container');
this.modalHeader=page.getByText('Missing Values Required');
this.nameSearchFieldContainer=page.locator('.standard-filter-section.flex');
this.nameSearchField=this.nameSearchFieldContainer.locator('input[data-fieldname="customer_name"]');
this.modalTitle=this.modalContainer.getByText('New Customer');
this.saveCustomerUpdate=page.locator('[data-label="Save"]');

}


async clickSellingButton(){
    await this.sellingButton.click();
}
 async clickCustomerOption(){
    await this.setupOption.click();
    await this.customerOption.click();
 }
 
 async clickAddCustomerButton(){
 await this.addCustomerButton.click();
 }

 async fillmodal(name:string){
    const a = this.container.filter({has:this.customerName});
    await a.locator(this.customerNameField).fill(name);
    
 }

async saveCustomerDetail(){
   await this.saveButton.click();
 }
 
 findName(name:string){
return this.rowContainer.filter({has:this.page.getByText(name)});
 }

async fillSearchField(name:string){
await this.nameSearchField.fill(name);
}

async clearSearchField() {
    await this.nameSearchField.clear();
}


async clickName(name:string){
   await this.rowContainer.filter({has:this.page.getByText(name)}).click();
}

async clickSaveCustomerUpdate(){
    await this.saveCustomerUpdate.click();
}
 
}



import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Customer extends BasePage {

  // Page
  customerListContainer: Locator;

  // Fields
  customerName: Locator;

  // Modal
  modalTitle: Locator;
  modalHeader: Locator;

  // Search
  nameSearchFieldContainer: Locator;
  nameSearchField: Locator;

  constructor(page: Page) {
    super(page);

    this.customerListContainer =page.locator('[id="page-List/Customer/List"]');

    this.customerName =page.getByText('Customer Name');

    this.modalTitle =this.modalContainer.getByText('New Customer');

    this.modalHeader =page.getByText('Missing Values Required');

    this.nameSearchFieldContainer =this.customerListContainer.locator('.standard-filter-section.flex');

    this.nameSearchField =this.nameSearchFieldContainer.locator('input[data-fieldname="customer_name"]');
  }

  async fillmodal(name: string) {
    const a = this.container.filter({
      has: this.customerName
    });

    await a.locator(this.inputField).fill(name);
  }

  async fillSearchField(name: string) {
    await this.nameSearchField.fill(name);
  }

  async clearSearchField() {
    await this.nameSearchField.clear();
  }

  async clickName(name: string) {
    await this.findName(name).click();
  }

  getCustomerNameField() {
  const a = this.container.filter({has: this.customerName});
  return a.locator(this.inputField);
}

}*/

import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Customer extends BasePage {

  // Page
  customerListContainer: Locator;
  customerFormContainer: Locator;

  // Fields
  customerNameField: Locator;

  // Modal
  modalTitle: Locator;
  modalHeader: Locator;
  modalCustomerNameField: Locator;

  // Search
  nameSearchFieldContainer: Locator;
  nameSearchField: Locator;

  constructor(page: Page) {
    super(page);

    this.customerListContainer =page.locator('[id="page-List/Customer/List"]');

    this.customerFormContainer =
      page.locator('#page-Customer');

    this.customerNameField =this.customerFormContainer.locator('input[data-fieldname="customer_name"]');

    this.modalTitle =this.modalContainer.getByText('New Customer');

    this.modalHeader =page.getByText('Missing Values Required');

    this.modalCustomerNameField =this.modalContainer.locator('input[data-fieldname="customer_name"]');

    this.nameSearchFieldContainer =
      this.customerListContainer.locator('.standard-filter-section.flex');

    this.nameSearchField =
      this.nameSearchFieldContainer.locator('input[data-fieldname="customer_name"]');
  }

  async fillModal(name: string) {
    await this.modalCustomerNameField.fill(name);
  }

  async fillCustomerName(name: string) {
    await this.customerNameField.fill(name);
  }

  async fillSearchField(name: string) {
    await this.nameSearchField.fill(name);
  }

  async clearSearchField() {
    await this.nameSearchField.clear();
  }

  async clickName(name: string) {
    await this.findName(name).click();
  }

  getCustomerNameField() {
    return this.customerNameField;
  }
}