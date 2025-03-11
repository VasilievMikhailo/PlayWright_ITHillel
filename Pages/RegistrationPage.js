import { expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.registerButtonToOpenRegisterPopUp = page.locator('.hero-descriptor_btn.btn.btn-primary');

    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('.btn.btn-primary:has-text("Register")');
    this.textError = page.locator('.invalid-feedback');
  }

  async open() {
    await this.page.goto('/');
    await this.registerButtonToOpenRegisterPopUp.click();
  }

  async fillRegistrationForm({ name, lastName, email, password, repeatPassword }) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async isRegisterButtonDisabled() {
    return await this.registerButton.isDisabled();
  }

  async checkErrorField(fieldId, expectedText, expectedColor = 'rgb(220, 53, 69)') {
    const errorLocator = this.page.locator(`#${fieldId}`).locator('..').locator('.invalid-feedback');
  
    await expect(errorLocator).toBeVisible();

    await expect(errorLocator).toHaveText(expectedText);
  
    const color = await errorLocator.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe(expectedColor);
  }
}