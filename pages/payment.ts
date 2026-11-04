
import { BasePage } from './base';
import { Page, Locator } from '@playwright/test';

export class Payment extends BasePage {
  // Payment Entry page
  paymentPageContainer: Locator;
  newPaymentEntryTitle: Locator;

  // Payment details
  customerField: Locator;
  invoiceReference: Locator;
  paidAmount: Locator;
  totalAllocatedAmount: Locator;
  paidFromAccount: Locator;
  paidToAccount: Locator;
  status: Locator;

  constructor(page: Page) {
    super(page);

    this.paymentPageContainer = page.locator('#page-Payment\\ Entry');
    this.newPaymentEntryTitle = this.getTitle(this.paymentPageContainer);

    // Customer and invoice reference
    this.customerField = this.paymentPageContainer.locator('input[data-fieldname="party"]');
    this.invoiceReference = this.paymentPageContainer.locator('.grid-body .grid-row [data-fieldname="reference_name"]');

    // Payment amounts
    this.paidAmount = this.paymentPageContainer.locator('input[data-fieldname="paid_amount"]');
    this.totalAllocatedAmount = this.paymentPageContainer.locator('[data-fieldname="total_allocated_amount"] .control-value');

    // Payment accounts
    this.paidFromAccount = this.paymentPageContainer.locator('input[data-fieldname="paid_from"]');
    this.paidToAccount = this.paymentPageContainer.locator('input[data-fieldname="paid_to"]');

    this.status = this.paymentPageContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');
  }

  // Enter cheque reference number
  async fillChequeNumber(number: string) {
    const chequeField = this.paymentPageContainer.locator('input[data-fieldname="reference_no"]');

    await chequeField.fill(number);
    await chequeField.blur();
  }
}
