import { BasePage } from './base';
import{Page,Locator} from '@playwright/test';
import { GridHelper } from './gridHelper';

export class Payment  extends BasePage{
grid: GridHelper;
paymentPageContainer:Locator;
newPaymentEntryTitle: Locator;
customerField: Locator;
invoiceReference: Locator;
paidAmount: Locator;
totalAllocatedAmount: Locator;
paidFromAccount: Locator;
paidToAccount: Locator;
status:Locator;

  constructor(page: Page) {
    super(page);
    this.grid = new GridHelper(page);
    this.paymentPageContainer = page.locator('#page-Payment\\ Entry');
    this.newPaymentEntryTitle= this.getTitle(this.paymentPageContainer);
    this.customerField = this.paymentPageContainer.locator('input[data-fieldname="party"]');
    this.invoiceReference = this.paymentPageContainer.locator('.grid-body .grid-row [data-fieldname="reference_name"]');
    this.paidAmount = this.paymentPageContainer.locator('input[data-fieldname="paid_amount"]');
    this.totalAllocatedAmount = this.paymentPageContainer.locator('[data-fieldname="total_allocated_amount"] .control-value');
    this.paidFromAccount = this.paymentPageContainer.locator('input[data-fieldname="paid_from"]');
    this.paidToAccount = this.paymentPageContainer.locator('input[data-fieldname="paid_to"]');
    this.status = this.paymentPageContainer.locator('.indicator-pill.no-indicator-dot.whitespace-nowrap');
  }

async fillChequeNumber(number: string) {
  const chequeField = this.paymentPageContainer.locator('input[data-fieldname="reference_no"]');

  await chequeField.fill(number);
  await chequeField.blur();
}



}