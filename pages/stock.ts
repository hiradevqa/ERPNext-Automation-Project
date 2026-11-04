import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base';
import { GridHelper } from './gridHelper';

  export class Stock extends BasePage {
  // Stock Entry
  stockEntryContainer: Locator;
  stockEntryRow: Locator;
  status: Locator;

  // Stock Entry grid fields
  itemCodeInput: Locator;
  quantityInput: Locator;
  basicRateInput: Locator;
  targetWarehouseInput: Locator;

  // Stock Balance report
  stockBalanceResultRow: Locator;
  stockBalanceQuantityCell: Locator;
  reloadReportButton: Locator;

  grid: GridHelper;

  constructor(page: Page) {
    super(page);

    this.grid = new GridHelper(page);

    this.stockEntryContainer = page.locator('#page-Stock\\ Entry');
    this.stockEntryRow = this.grid.getRow(this.stockEntryContainer);

    this.status = this.stockEntryContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');

    this.itemCodeInput = this.grid.getInput(this.stockEntryRow, 'item_code');
    this.quantityInput = this.grid.getInput(this.stockEntryRow, 'qty');
    this.basicRateInput = this.grid.getInput(this.stockEntryRow, 'basic_rate');
    this.targetWarehouseInput = this.grid.getInput(this.stockEntryRow, 't_warehouse');

    this.stockBalanceResultRow = page.locator('.dt-row.dt-row-0.vrow');

    this.stockBalanceQuantityCell = this.stockBalanceResultRow.locator('.dt-cell__content--col-6');

    this.reloadReportButton = page.locator('button[data-original-title="Reload Report"]');
  }


  // Select an item in the Stock Entry grid
  
async selectStockEntryItem(itemCode: string) {
  const itemCell = this.grid.getCell(this.stockEntryRow, 'item_code');

  await itemCell.click();

  const itemInput = this.grid.getInput(this.stockEntryRow, 'item_code');

  await expect(itemInput).toBeVisible();

  await itemInput.fill('');
  await itemInput.fill(itemCode);

  const option = this.page.locator('div[role="option"]:visible').filter({ hasText: itemCode });

  await option.click();
}

  // Enter item quantity
  async fillStockEntryQuantity(quantity: string) {
  await this.quantityInput.click();
  await this.quantityInput.fill(quantity);
  await this.quantityInput.blur();

  await expect(this.quantityInput).toHaveValue(Number(quantity).toFixed(3));
}

  // Enter item rate
async fillStockEntryRate(rate: string) {
  await this.basicRateInput.fill(rate);
  await this.basicRateInput.blur();
}

  // Select the warehouse stock is moving from
  async selectSourceWarehouse(sourceWarehouseName: string) {
    const sourceWarehouseCell = this.grid.getCell(this.stockEntryRow, 's_warehouse');

    const sourceWarehouseInput = this.stockEntryRow.locator('input[data-fieldname="s_warehouse"]:visible');

    await sourceWarehouseCell.click();
    await this.page.waitForTimeout(500);
    await sourceWarehouseInput.fill(sourceWarehouseName);

    const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: sourceWarehouseName });

    await warehouseOption.click();
  }

  // Select the warehouse receiving the stock
  async selectTargetWarehouse(targetWarehouseName: string, rowIndex: number = 1) {
    const stockRow = this.stockEntryContainer.locator(`.grid-row[data-idx="${rowIndex}"]`);

    const targetWarehouseCell = this.grid.getCell(stockRow, 't_warehouse');

    const targetWarehouseInput = stockRow.locator('input[data-fieldname="t_warehouse"]:visible');

    if (await targetWarehouseInput.count() === 0) {
      await targetWarehouseCell.click();
    }

    await expect(targetWarehouseInput).toBeVisible();
    await targetWarehouseInput.fill(targetWarehouseName);

    const warehouseOption = this.page.locator('div[role="option"]:visible').filter({ hasText: targetWarehouseName });

    await warehouseOption.click();
  }

  // Select both warehouses in the Stock Balance filter
  async selectStockBalanceWarehouses(sourceWarehouse: string, targetWarehouse: string) {
    const warehouseFilter = this.filterSection.locator('[data-fieldname="warehouse"]');

    const selectedValue = warehouseFilter.locator('div.status-text.ellipsis');

    await selectedValue.click();

    const searchInput = warehouseFilter.locator('li.dropdown-input-wrapper input.form-control.input-xs');

    const sourceOption = warehouseFilter.locator('li.selectable-item').filter({ hasText: sourceWarehouse });

    const targetOption = warehouseFilter.locator('li.selectable-item').filter({ hasText: targetWarehouse });

    await searchInput.fill('');

    const clearAll = warehouseFilter.getByRole('button', { name: 'Clear All' });
    await clearAll.click();

    await selectedValue.click();
    await searchInput.fill(sourceWarehouse);
    await sourceOption.click();

    await selectedValue.click();
    await searchInput.fill('');
    await searchInput.fill(targetWarehouse);
    await targetOption.click();
  }

  // Read the quantity from the Stock Balance report
  async getStockBalanceQuantity() {
  const quantityText = await this.stockBalanceQuantityCell.textContent();

  const quantity = Number(quantityText ?? '0');
  return quantity;
}

  // Generate or rebuild the Stock Balance report
  async clickStockReportAction() {
    const reportButton = this.page.getByRole('button', { name: /^(Rebuild|Generate New Report)$/});

    await reportButton.click();
  }
}
