/*import { Page, Locator,expect } from '@playwright/test';

export class BasePage {
   page: Page;
   modalContainer:Locator;
   saveButton: Locator;
   rowContainer:Locator;
   saveUpdate:Locator;
   desktopOptionContainer:Locator;
   sidebarContainer:Locator;
   table:Locator;
   row:Locator;
   submit:Locator;
   tableRow:Locator;
   addRowButton:Locator;
   addMultilpeRowButton:Locator;
   uploadButton:Locator;
   downloadButton:Locator;
   filterSection:Locator;
   dropdownInputContainer:Locator;
   dropdownInputFill:Locator;
   errorModalContainer:Locator;
   container:Locator;
   inputField: Locator;
   errorFields:Locator;
   status:Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer=page.locator('.modal-content');
    this.saveButton=this.modalContainer.getByRole('button',{name:'Save'});
    this.rowContainer=page.locator('.list-row-container');
    this.saveUpdate=page.locator('[data-label="Save"]');
    this.submit=page.locator('[data-label="Submit"]');
    this.desktopOptionContainer=page.locator('.desktop-icon');
    this.sidebarContainer=page.locator('.sidebar-item-container');
    this.container= page.locator('.frappe-control.input-max-width');
    this.inputField=page.locator('.input-with-feedback.form-control.bold');
    this.table=page.locator('.grid-field');
    this.row=page.locator('.grid-row');
    this.tableRow=this.table.locator('.grid-row');
    this.addRowButton=this.table.getByRole('button',{name:'Add row'});
    this.addMultilpeRowButton=this.table.getByRole('button',{name:'Add Multiple'});
    this.uploadButton=this.table.getByRole('button',{name:'Upload'});
    this.downloadButton=this.table.getByRole('button',{name:'Download'});
    this.addMultilpeRowButton=this.table.getByRole('button',{name:'Add Multiple'});
    this.filterSection=page.locator('.page-form.flex');
    this.dropdownInputContainer=page.locator('.dropdown-menu.show');
    this.dropdownInputFill=this.dropdownInputContainer.locator('input.form-control.input-xs');
    this.errorModalContainer=page.locator('.modal-content');
    this.errorFields=this.errorModalContainer.locator('.msgprint');
    //used in stocks,salesInvoice,deliveryNote,sales
    this.status=page.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');
  }

async clickAddButton(name: string) {
  await this.page.getByRole('button',{ name }).click();
}

async save() {
    await this.saveButton.click();
  }

findName(name:string){
return this.rowContainer.filter({has:this.page.getByText(name)});
 }


errorHeader(headerText: string) {
  return this.errorModalContainer.getByText(headerText, { exact: true });
}
 
async clickField(fieldName:string){
   const a = this.container.filter({has:this.page.getByText(fieldName)});
   const b = a.locator(this.inputField);
     await b.click();
}
//used in sales
async blurField(fieldName:string){
  const a = this.container.filter({
    has: this.page.getByText(fieldName)
  });

  const b = a.locator(this.inputField);

  await b.blur();
}

async clickSaveUpdate(){
await this.saveUpdate.click();
}

async clickButton(name:string){
  await this.page.getByRole('button',{ name }).click();
}

//delete 
/*async clickDesktopOption(name:string){
const desktopOption = this.desktopOptionContainer.filter({has:this.page.getByText(name)});
await desktopOption.click();
}

async clickDesktopOption(name: string) {
  const desktopOption = this.desktopOptionContainer.filter({
    has: this.page.getByText(name, { exact: true })
  });

  await desktopOption.waitFor({ state: 'visible' });

  await desktopOption.click();
}


async clicksidebarOption(name:string){
  const sidebarOption= this.sidebarContainer.filter({has:this.page.getByText(name, {exact:true})});
  await sidebarOption.click();
}

async clickSidebarInsideOption(sectionName: string, optionName: string) {
  const sidebarSection = this.sidebarContainer.filter({ has: this.page.getByText(sectionName, { exact: true }) });
  await sidebarSection.click();
  const nestedOption = sidebarSection.getByText(optionName, { exact: true });
  await nestedOption.click();
}


async selectoption(name:string){
  //remove after making sure that all test cases are passing(stock+sales)
//await this.page.locator('div[role="option"]:visible').filter({has:this.page.getByText(name,{ exact: true })}).click();
  const option = this.page
    .locator('div[role="option"]:visible')
    .getByText(name, { exact: true });

  await expect (option).toBeVisible();
await option.click();
}




async Filter1(name:string,n:string){
 const filterContainer= this.filterSection.filter({has:this.page.getByText(name, { exact: true })});
 const filterLabel= filterContainer.getByText(name, { exact: true });
 const selectedValueContainer = this.filterSection.filter({has: this.page.getByText(n, { exact: true })});

 if (await selectedValueContainer.isVisible())
  {
    return;
  }
 else
  {
    await filterLabel.click();
    await this.dropdownInputFill.fill(n);
    const dropdownOption=this.page.locator('.selectable-items').filter({hasText:n});
    await dropdownOption.getByText(n).click();
  }
  
}




}*/



import { Page, Locator,expect } from '@playwright/test';

export class BasePage {
   page: Page;
   modalContainer:Locator;
   saveButton: Locator;
   rowContainer:Locator;
   saveUpdate:Locator;
   desktopOptionContainer:Locator;
   sidebarContainer:Locator;
   row:Locator;
   filterSection:Locator;
   dropdownContainer:Locator;
   dropdownInputFill:Locator;
   container:Locator;
   inputField: Locator;
   errorFields:Locator;
   

  constructor(page: Page) {
    this.page = page;
    this.modalContainer=page.locator('.modal-content');
    this.saveButton=this.modalContainer.getByRole('button',{name:'Save'});
    this.rowContainer=page.locator('.list-row-container');
    this.saveUpdate=page.locator('[data-label="Save"]');
    this.desktopOptionContainer=page.locator('.desktop-icon');
    this.sidebarContainer=page.locator('.sidebar-item-container');
    this.container= page.locator('.frappe-control.input-max-width');
    this.inputField=page.locator('.input-with-feedback.form-control.bold');
    this.row=page.locator('.grid-row');
    this.filterSection=page.locator('.page-form.flex');
    this.dropdownContainer=page.locator('.dropdown-menu.show');
    this.dropdownInputFill=this.dropdownContainer.locator('input.form-control.input-xs');
    this.errorFields=this.modalContainer.locator('.msgprint');
    //used in stocks,salesInvoice,deliveryNote,sales
   
    
  }



   async save() {
    await this.saveButton.click();
  }

findName(name:string){
return this.rowContainer.filter({has:this.page.getByText(name)});
 }


errorHeader(headerText: string) {
  return this.modalContainer.getByText(headerText, { exact: true });
}
 
async clickField(fieldName:string){
   const a = this.container.filter({has:this.page.getByText(fieldName)});
   const b = a.locator(this.inputField);
   await b.click();
}

getTitle(container: Locator) {
  return container.locator('.title-area');
}

getCustomer(container: Locator) {
  return container.locator('input[data-fieldname="customer"]');
}

async clickSaveUpdate(){
  await this.saveUpdate.click();
}

async clickButton(name:string){
  await this.page.getByRole('button',{ name }).click();
}


async clickDesktopOption(name: string) {
  const desktopOption = this.desktopOptionContainer.filter({
    has: this.page.getByText(name, { exact: true })});

  await desktopOption.waitFor({ state: 'visible' });

  await desktopOption.click();
}


async clickSidebarOption(name:string){
  const sidebarOption= this.sidebarContainer.filter({has:this.page.getByText(name, {exact:true})});
  await sidebarOption.click();
}

async clickSidebarInsideOption(sectionName: string, optionName: string) {
  const sidebarSection = this.sidebarContainer.filter({ has: this.page.getByText(sectionName, { exact: true }) });
  await sidebarSection.click();
  const nestedOption = sidebarSection.getByText(optionName, { exact: true });
  await nestedOption.click();
}


async selectOption(name:string){
  //remove after making sure that all test cases are passing(stock+sales)
//await this.page.locator('div[role="option"]:visible').filter({has:this.page.getByText(name,{ exact: true })}).click();
  const option = this.page.locator('div[role="option"]:visible').getByText(name, { exact: true });

  await expect (option).toBeVisible();
  await option.click();
}




async applyFilter(name:string,n:string){
 const filterContainer= this.filterSection.filter({has:this.page.getByText(name, { exact: true })});
 const filterLabel= filterContainer.getByText(name, { exact: true });
 const selectedValueContainer = this.filterSection.filter({has: this.page.getByText(n, { exact: true })});

 if (await selectedValueContainer.isVisible())
  {
    return;
  }
 else
  {
    await filterLabel.click();
    await this.dropdownInputFill.fill(n);
    const dropdownOption=this.page.locator('.selectable-items').filter({hasText:n});
    await dropdownOption.getByText(n).click();
  }
  
}

async clickDropdownOption(name: string) {
  const dropdownOption = this.dropdownContainer.filter({ has: this.page.getByText(name, { exact: true })});
  await dropdownOption.getByText(name, { exact: true }).click();
}

}
