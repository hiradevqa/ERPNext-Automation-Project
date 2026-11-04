import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';
import { GridHelper } from './gridHelper';

export class DeliveryNote extends BasePage {
  grid: GridHelper;

  // Delivery Note page
  deliveryNotePageContainer: Locator;
  deliveryNoteTitle: Locator;
  status: Locator;

  // Fields
  customerField: Locator;
  sourceWarehouseField: Locator;

  // Item details
  itemCode: Locator;
  itemQty: Locator;
  itemRate: Locator;

  constructor(page: Page) {
    super(page);

    this.grid = new GridHelper(page);

    this.deliveryNotePageContainer = page.locator('#page-Delivery\\ Note');
    this.deliveryNoteTitle = this.getTitle(this.deliveryNotePageContainer);
    this.status = this.deliveryNotePageContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');

    this.customerField = this.getCustomer(this.deliveryNotePageContainer);
    this.sourceWarehouseField = this.deliveryNotePageContainer.locator('input[data-fieldname="set_warehouse"]');

    // Get item details from the Delivery Note table
    this.itemCode = this.grid.getItemCode(this.deliveryNotePageContainer);
    this.itemQty = this.grid.getItemQty(this.deliveryNotePageContainer);
    this.itemRate = this.grid.getItemRate(this.deliveryNotePageContainer);
  }

  getCustomerField() {
    return this.customerField;
  }

  getSourceWarehouse() {
    return this.sourceWarehouseField;
  }

  getItemCode() {
    return this.itemCode;
  }

  getItemQty() {
    return this.itemQty;
  }

  getItemRate() {
    return this.itemRate;
  }
}
