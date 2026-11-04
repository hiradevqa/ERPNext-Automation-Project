import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base';
import { GridHelper } from './gridHelper';

export class Sales extends BasePage {
  grid: GridHelper;

  // Sales Order page
  salesOrderContainer: Locator;
  salesOrderRow: Locator;
  customerField: Locator;

  // Warehouse
  warehouseInput: Locator;
  warehouseContainer: Locator;

  // Order details
  amount: Locator;
  orderId: Locator;
  status: Locator;

  constructor(page: Page) {
    super(page);
    this.grid = new GridHelper(page);

    this.salesOrderContainer = page.locator('#page-Sales\\ Order');

    this.salesOrderRow = this.grid.getRow(this.salesOrderContainer);

    this.customerField = this.getCustomer(this.salesOrderContainer);

    this.warehouseContainer = this.salesOrderContainer.locator('.frappe-control.input-max-width');
    this.warehouseInput = page.locator('.input-with-feedback.form-control');

    this.amount = this.grid.getInput(this.salesOrderRow, 'amount');

    const orderIdContainer = this.salesOrderContainer.locator('.form-name-container.mt-1.flex.justify-between.form-name-copy');
    this.orderId = orderIdContainer.locator('span.ellipsis.mr-3');

    this.status = this.salesOrderContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');
  }

  async clickCustomerField() {
    await this.customerField.click();
  }

  async selectDeliveryDate(deliveryDate: string) {
    const dateCell = this.grid.getCell(this.salesOrderRow, 'delivery_date');
    const dateInput = this.grid.getInput(this.salesOrderRow, 'delivery_date');

    await dateCell.click();
    await dateInput.fill(deliveryDate);
    await expect(dateInput).toHaveValue(deliveryDate);
    await dateInput.press('Enter');
  }

  async fillSourceWarehouseSearch(fieldName: string) {
    const warehouseField = this.warehouseContainer.filter({ has: this.page.getByText(fieldName) });
    const warehouseInput = warehouseField.locator(this.warehouseInput);

    await warehouseInput.fill('Finished');
  }

 async selectItemCode(itemCode: string) {
  const itemCell = this.grid.getCell(this.salesOrderRow, 'item_code');
  await itemCell.click();

  const itemInput = this.grid.getInput(this.salesOrderRow, 'item_code');
  await itemInput.fill(itemCode);

  const option = this.page.locator('div[role="option"]:visible').getByText(itemCode, { exact: true });

  await option.click();
}


  async fillQuantity(quantity: string) {
    const qtyCell = this.grid.getCell(this.salesOrderRow, 'qty');
    const quantityInput = this.grid.getInput(this.salesOrderRow, 'qty');

    await qtyCell.click();
    await quantityInput.fill(quantity);
    await expect(quantityInput).toHaveValue(quantity);
    await quantityInput.blur();
  }

  async fillItemRate(rate: string) {
    const rateCell = this.grid.getCell(this.salesOrderRow, 'rate');
    const rateInput = this.grid.getInput(this.salesOrderRow, 'rate');

    await rateCell.click();
    await rateInput.fill(rate);

    // ERPNext formats the rate after leaving the field
    await rateInput.blur();

    await expect(rateInput).toHaveValue(
      Number(rate).toLocaleString('en-US', { minimumFractionDigits: 2 })
    );
  }

  async getSalesOrderId() {
    await expect(this.orderId).toHaveText(/^SAL-ORD-\d{4}-\d+$/);
    return await this.orderId.textContent();
  }

  getItemCodeCell() {
    return this.grid.getCell(this.salesOrderRow, 'item_code');
  }
}
