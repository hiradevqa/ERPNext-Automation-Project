import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base';
import { GridHelper } from './gridHelper';

export class SalesInvoice extends BasePage {
  grid: GridHelper;

  // Sales Invoice page
  salesInvoicePageContainer: Locator;
  salesInvoiceTitle: Locator;

  // Invoice fields
  amount: Locator;
  customerField: Locator;
  itemCode: Locator;
  itemQty: Locator;
  itemRate: Locator;
  status: Locator;

  // Invoice details
  invoiceId: Locator;
  invoiceIdContainer: Locator;
  outstandingAmount: Locator;

  constructor(page: Page) {
    super(page);
    this.grid = new GridHelper(page);

    this.salesInvoicePageContainer = page.locator('#page-Sales\\ Invoice');
    this.salesInvoiceTitle = this.getTitle(this.salesInvoicePageContainer);

    this.itemCode = this.grid.getItemCode(this.salesInvoicePageContainer);
    this.itemQty = this.grid.getItemQty(this.salesInvoicePageContainer);
    this.itemRate = this.grid.getItemRate(this.salesInvoicePageContainer);
    this.customerField = this.getCustomer(this.salesInvoicePageContainer);
    this.amount = this.grid.getAmount(this.salesInvoicePageContainer);

    this.status = this.salesInvoicePageContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');

    this.invoiceIdContainer = this.salesInvoicePageContainer.locator('.form-name-container.mt-1.flex.justify-between.form-name-copy');
    this.invoiceId = this.invoiceIdContainer.locator('span.ellipsis.mr-3');

    this.outstandingAmount = this.salesInvoicePageContainer.locator('[data-fieldname="outstanding_amount"] .control-value');
  }

  async getSalesInvoiceId(): Promise<string> {
    await expect(this.invoiceId).toHaveText(/^ACC-SINV-\d{4}-\d+$/);
    return await this.invoiceId.innerText();
  }

  async getOutstandingAmount(): Promise<number> {
    const amount = await this.outstandingAmount.innerText();

    // Remove currency symbols before converting to a number
    const numericAmount = amount.replace('Rs', '').replace('₨', '').replaceAll(',', '').trim();

    return Number(numericAmount);
  }
}
