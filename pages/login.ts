
import { Page, Locator } from '@playwright/test';

export class Login {
  // Page
  page: Page;

  // Login locators
  emailField: Locator;
  passwordField: Locator;
  submitButton: Locator;
  invalidLoginMessage: Locator;

  // Validation locators
  inputGroup: Locator;
  validationMessage: Locator;

  // Logout locators
  loginContainer: Locator;
  profileMenu: Locator;
  profileMenuItems: Locator;
  logoutOption: Locator;
  confirmLogoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login
    this.emailField = page.locator('#login_email');
    this.passwordField = page.locator('#login_password');
    this.submitButton = page.getByRole('button', { name: 'Continue' });
    this.invalidLoginMessage = page.locator('.login-error-banner');

    // Validation
    this.inputGroup = page.locator('.form-group.invalid');
    this.validationMessage = page.locator('.field-error');

    // Logout
    this.loginContainer=page.locator('#page-desktop');
    this.profileMenu = this.loginContainer.locator('.desktop-avatar .avatar.avatar-medium');
    this.profileMenuItems = page.locator('.dropdown-menu-item');
    this.logoutOption = page.getByText('Logout');
    this.confirmLogoutButton = page.getByRole('button', { name: 'Yes' });
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  emailErrorMessage() {
    const emailFieldError = this.inputGroup.filter({has: this.emailField, });
    return emailFieldError.locator(this.validationMessage);
  }

  passwordErrorMessage() {
    const passwordFieldError = this.inputGroup.filter({has: this.passwordField,});
    return passwordFieldError.locator(this.validationMessage);
  }

  async logout() {
    await this.profileMenu.click();
    const logoutMenuItem = this.profileMenuItems.filter({has: this.logoutOption});
    await logoutMenuItem.click();
    await this.confirmLogoutButton.click();
  }
}

