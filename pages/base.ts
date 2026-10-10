import { Page, Locator } from '@playwright/test';

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

  constructor(page: Page) {
    this.page = page;
    this.modalContainer=page.locator('.modal-content');
    this.saveButton=this.modalContainer.getByRole('button',{name:'Save'});
    this.rowContainer=page.locator('.list-row-container');
    this.saveUpdate=page.locator('[data-label="Save"]');
    this.submit=page.locator('[data-label="Submit"]');
    this.desktopOptionContainer=page.locator('.desktop-icon');
    this.sidebarContainer=page.locator('.sidebar-item-container');
    this.table=page.locator('.grid-field');
    this.row=page.locator('.grid-row');
    this.tableRow=this.table.locator('.grid-row');
    this.addRowButton=this.table.getByRole('button',{name:'Add row'});
    this.addMultilpeRowButton=this.table.getByRole('button',{name:'Add Multiple'});
    this.uploadButton=this.table.getByRole('button',{name:'Upload'});
    this.downloadButton=this.table.getByRole('button',{name:'Download'});
    this.addMultilpeRowButton=this.table.getByRole('button',{name:'Add Multiple'});
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

async clickSaveUpdate(){
await this.saveUpdate.click();
}

async submitButton(name:string){
  await this.page.getByRole('button',{ name }).click();
}

async clickDesktopOption(name:string){
const desktopOption = this.desktopOptionContainer.filter({has:this.page.getByText(name)});
await desktopOption.click();
}

async clicksidebarOption(name:string){
  const sidebarOption= this.sidebarContainer.filter({has:this.page.getByText(name, {exact:true})});
  await sidebarOption.click();
}

async selectoption(name:string){
await this.page.locator('div[role="option"]').filter({has:this.page.getByText(name)}).click();
}
}