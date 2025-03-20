import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';


export class LogInPage {
  constructor(page) {
    this.page = page;

    this.signInButton = page.locator('.btn.btn-outline-white.header_signin');

    this.emailLogInInput = page.locator('#signinEmail');
    this.passwordLogInInput = page.locator('#signinPassword');
    this.loginButton = page.locator('.btn.btn-primary:has-text("Login")');

    this.garagePanel = page.locator('.panel-page_heading').locator('h1:has-text("Garage")')
  }


  async openLogInPopUp() {
    await this.page.goto(process.env.BASE_URL);

    await this.signInButton.click();
  }

  async fillLogInPage({email, password}) {
    await this.emailLogInInput.fill(email);
    await this.passwordLogInInput.fill(password);
  }

  async isLogInButtonEnabled() {
    return await this.loginButton.isEnabled();
  }

  async clickLogInButton() {
    await this.loginButton.click();
  }

  async checkGaragePage() {
    await expect(this.garagePanel).toHaveText('Garage');
  }

  
  async saveAuthStorage() {
    const storageState = await this.page.context().storageState();
    const filePath = path.join(process.cwd(), 'tests', 'authStorage.json');
    console.log('Saving storage state to:', filePath);
    fs.writeFileSync(filePath, JSON.stringify(storageState));
  }

}