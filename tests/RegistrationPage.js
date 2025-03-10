import { expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('.btn.btn-primary:has-text("Register")');
    this.nameError = page.locator('.invalid-feedback');
    this.openRegisterButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
  }

  async open() {
    await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await this.openRegisterButton.click();
  }

  async fillRegistrationForm({ name = '', lastName, email, password, repeatPassword }) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async isRegisterButtonDisabled() {
    return await this.registerButton.isDisabled();
  }

  async checkNameError(expectedText, expectedColor = 'rgb(220, 53, 69)') {
    await expect(this.nameError).toHaveText(expectedText);
    const color = await this.nameError.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe(expectedColor);
  }
}