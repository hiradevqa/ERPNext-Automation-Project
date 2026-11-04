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
  requiredFieldErrorHeader: Locator;
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

    this.requiredFieldErrorHeader =page.getByText('Missing Values Required');

    this.modalCustomerNameField =this.modalContainer.locator('input[data-fieldname="customer_name"]');

    this.nameSearchFieldContainer =
      this.customerListContainer.locator('.standard-filter-section.flex');

    this.nameSearchField =
      this.nameSearchFieldContainer.locator('input[data-fieldname="customer_name"]');
  }

  async fillCustomerModal(name: string) {
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

  async openCustomer(name: string) {
    await this.findName(name).click();
  }

  getCustomerNameField() {
    return this.customerNameField;
  }
}

