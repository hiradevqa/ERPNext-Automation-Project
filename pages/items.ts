

/*import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Item extends BasePage {

  // Page
  itemListContainer: Locator;

  // Navigation
  itemAndPricingContainer: Locator;
  label: Locator;
  item: Locator;

  // Fields
  itemCodeClass: Locator;
  itemCode: Locator;
  itemName: Locator;
  itemGroup: Locator;

  // Search
  filter: Locator;
  searchField: Locator;

  constructor(page: Page) {
    super(page);

    this.itemListContainer = page.locator('[id="page-List/Item/List"]');

    this.itemAndPricingContainer = page.locator('.item-anchor');

    this.label = page.getByText('Items & Pricing');

    this.item = page.getByText('Item', { exact: true });

    this.itemCodeClass = page.locator('.control-input');

    this.itemCode = page.locator('input[data-fieldname="item_code"]');

    this.itemName = page.locator('input[data-fieldname="item_name"]');

    this.itemGroup = page.locator('[data-fieldname="item_group"]');

    this.filter = this.itemListContainer.locator('.standard-filter-section.flex');

    this.searchField = this.filter.locator('input[data-fieldname="item_name"]');
   
  }

  async clickItemAndPricing() {
    await this.itemAndPricingContainer.filter({ has: this.label }).click();
  }

  async clickItemOption() {
    await this.itemAndPricingContainer.filter({ has: this.item }).click();
  }

  async fillItemCode(code: string) {
    const a = this.itemCodeClass.filter({has: this.itemCode});
    await a.locator(this.itemCode).fill(code);
  }

  async fillItemName(name: string) {
    const a = this.itemCodeClass.filter({has: this.itemName});
    await a.locator(this.itemName).fill(name);
  }

async selectItemGroup(groupName: string) {
  const a = this.itemCodeClass.filter({has: this.itemGroup});

  const field = a.locator(this.itemGroup);

  await field.click();
  await field.fill(groupName);

  const option = this.page
    .locator('div[role="option"]:visible').filter({ hasText: groupName });

  await option.click();
}

  async fillSearchField(name: string) {
    await this.searchField.fill(name);
  }

  async clearSearchField() {
    await this.searchField.clear();
  }

  async clearItemGroup(){
    await this.filter.locator('input[data-fieldname="item_group"]').clear();
  }

  getItemFields() {
    const itemNameContainer =this.itemCodeClass.filter({has: this.itemName});
    const itemGroupContainer = this.itemCodeClass.filter({has: this.itemGroup});

    return {
      itemNameField: itemNameContainer.locator(this.itemName),
      itemGroupField: itemGroupContainer.locator(this.itemGroup)
    };
  }

  findItem(name: string) {
  return this.itemListContainer
   .locator('.list-row-container').filter({ has: this.page.getByText(name, { exact: true })});
}
}*/


import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Item extends BasePage {

  // Item list
  itemListContainer: Locator;

  // Navigation
  itemAndPricingContainer: Locator;
  label: Locator;
  item: Locator;

  // Item fields
  itemCodeClass: Locator;
  itemCode: Locator;
  itemName: Locator;
  itemGroup: Locator;

  // Search filters
  filter: Locator;
  searchField: Locator;

  constructor(page: Page) {
    super(page);

    this.itemListContainer = page.locator('[id="page-List/Item/List"]');

    this.itemAndPricingContainer = page.locator('.item-anchor');
    this.label = page.getByText('Items & Pricing');
    this.item = page.getByText('Item', { exact: true });

    this.itemCodeClass = page.locator('.control-input');
    this.itemCode = page.locator('input[data-fieldname="item_code"]');
    this.itemName = page.locator('input[data-fieldname="item_name"]');
    this.itemGroup = page.locator('[data-fieldname="item_group"]');

    this.filter = this.itemListContainer.locator('.standard-filter-section.flex');
    this.searchField = this.filter.locator('input[data-fieldname="item_name"]');
  }

  async clickItemAndPricing() {
    await this.itemAndPricingContainer.filter({ has: this.label }).click();
  }

  async clickItemOption() {
    await this.itemAndPricingContainer.filter({ has: this.item }).click();
  }

  async fillItemCode(code: string) {
    const itemCodeContainer = this.itemCodeClass.filter({ has: this.itemCode });
    await itemCodeContainer.locator(this.itemCode).fill(code);
  }

  async fillItemName(name: string) {
    const itemNameContainer = this.itemCodeClass.filter({ has: this.itemName });
    await itemNameContainer.locator(this.itemName).fill(name);
  }

  async selectItemGroup(groupName: string) {
    const itemGroupContainer = this.itemCodeClass.filter({ has: this.itemGroup });
    const field = itemGroupContainer.locator(this.itemGroup);

    await field.click();
    await field.fill(groupName);

    // Pick the matching group from the dropdown
    const option = this.page.locator('div[role="option"]:visible').filter({ hasText: groupName });
    await option.click();
  }

  async fillSearchField(name: string) {
    await this.searchField.fill(name);
  }

  async clearSearchField() {
    await this.searchField.clear();
  }

  async clearItemGroup() {
    await this.filter.locator('input[data-fieldname="item_group"]').clear();
  }

  getItemFields() {
    // Get the fields from the opened item
    const itemNameContainer = this.itemCodeClass.filter({ has: this.itemName });
    const itemGroupContainer = this.itemCodeClass.filter({ has: this.itemGroup });

    return {
      itemNameField: itemNameContainer.locator(this.itemName),
      itemGroupField: itemGroupContainer.locator(this.itemGroup)
    };
  }

  findItem(name: string) {
    // Search only in the Item list
    return this.itemListContainer.locator('.list-row-container').filter({ has: this.page.getByText(name, { exact: true }) });
  }
}
