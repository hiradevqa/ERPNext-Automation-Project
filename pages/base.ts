
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  page: Page;
  modalContainer: Locator;
  saveButton: Locator;
  rowContainer: Locator;
  saveUpdate: Locator;
  desktopOptionContainer: Locator;
  sidebarContainer: Locator;
  filterSection: Locator;
  dropdownContainer: Locator;
  dropdownInputFill: Locator;
  container: Locator;
  inputField: Locator;
  errorFields: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = page.locator('.modal-content');
    this.saveButton = this.modalContainer.getByRole('button', { name: 'Save' });
    this.rowContainer = page.locator('.list-row-container');
    this.saveUpdate = page.locator('[data-label="Save"]');
    this.desktopOptionContainer = page.locator('.desktop-icon');
    this.sidebarContainer = page.locator('.sidebar-item-container');
    this.container = page.locator('.frappe-control.input-max-width');
    this.inputField = page.locator('.input-with-feedback.form-control.bold');
    this.filterSection = page.locator('.page-form.flex');
    this.dropdownContainer = page.locator('.dropdown-menu.show');
    this.dropdownInputFill = this.dropdownContainer.locator('input.form-control.input-xs');
    this.errorFields = this.modalContainer.locator('.msgprint');
  }

  // Save a modal form
  async save() {
    await this.saveButton.click();
  }

  // Find a record in the list
  findName(name: string) {
    return this.rowContainer.filter({ has: this.page.getByText(name) });
  }

  errorHeader(headerText: string) {
    return this.modalContainer.getByText(headerText, { exact: true });
  }

  // Click an input using its field label
  async clickField(fieldName: string) {
    const fieldContainer = this.container.filter({ has: this.page.getByText(fieldName) });
    const fieldInput = fieldContainer.locator(this.inputField);

    await fieldInput.click();
  }

  getTitle(container: Locator) {
    return container.locator('.title-area');
  }

  getCustomer(container: Locator) {
    return container.locator('input[data-fieldname="customer"]');
  }

  async clickSaveUpdate() {
    await this.saveUpdate.click();
  }

  // Click a page button by name
  async clickButton(name: string) {
    await this.page.getByRole('button', { name }).click();
  }

  // Open a workspace from the desktop
  async clickDesktopOption(name: string) {
    const desktopOption = this.desktopOptionContainer.filter({has: this.page.getByText(name, { exact: true })});

    await desktopOption.waitFor({ state: 'visible' });
    await desktopOption.click();
  }

  // Open a sidebar option
  async clickSidebarOption(name: string) {
    const sidebarOption = this.sidebarContainer.filter({has: this.page.getByText(name, { exact: true })});

    await sidebarOption.click();
  }

  // Open a nested sidebar option
  async clickSidebarInsideOption(sectionName: string, optionName: string) {
    const sidebarSection = this.sidebarContainer.filter({has: this.page.getByText(sectionName, { exact: true })});

    await sidebarSection.click();

    const nestedOption = sidebarSection.getByText(optionName, { exact: true });
    await nestedOption.click();
  }

  // Select an autocomplete option
  async selectOption(name: string) {
    const option = this.page.locator('div[role="option"]:visible').getByText(name, { exact: true });

    await expect(option).toBeVisible();
    await option.click();
  }

  // Apply a report filter if not already selected
  async applyFilter(name: string, filterValue: string) {
    const filterContainer = this.filterSection.filter({ has: this.page.getByText(name, { exact: true }) });
    const filterLabel = filterContainer.getByText(name, { exact: true });
    const selectedValueContainer = this.filterSection.filter({ has: this.page.getByText(filterValue, { exact: true }) });

    if (await selectedValueContainer.isVisible()) {
      return;
    }
    else {
      await filterLabel.click();
      await this.dropdownInputFill.fill(filterValue);

      const dropdownOption = this.page.locator('.selectable-items').filter({ hasText: filterValue });
      await dropdownOption.getByText(filterValue).click();
    }
  }

  // Select an option from an open dropdown menu
  async clickDropdownOption(name: string) {
    const dropdownOption = this.dropdownContainer.filter({has: this.page.getByText(name, { exact: true })});

    await dropdownOption.getByText(name, { exact: true }).click();
  }
}
