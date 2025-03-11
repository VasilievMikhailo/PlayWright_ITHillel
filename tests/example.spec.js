import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

// const BASE_URL = 'https://guest:welcome2qauto@qauto.forstudy.space';


test('Invalid values for Fields - Name; Last Name', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'Проверка',
    lastName: 'на язык',
    email: 'aqa-lolhawkeromg+test@gmail.com',
    password: 'Qwer1234', 
    repeatPassword: 'Qwer1234'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupName', 'Name is invalid');
  await registrationPopUp.checkErrorField('signupLastName', 'Last name is invalid');
});

test('Invalid values as numbers for Fields - Name; Last Name and Email', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: '1',
    lastName: '1',
    email: '2',
    password: 'Qwer1234', 
    repeatPassword: 'Qwer1234'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupName', 'Name is invalidName has to be from 2 to 20 characters long');
  await registrationPopUp.checkErrorField('signupLastName', 'Last name is invalidLast name has to be from 2 to 20 characters long');
  await registrationPopUp.checkErrorField('signupEmail', 'Email is incorrect');
});


test('Ignoring SPACE in Fields - Name; Last Name', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'Test ',
    lastName: 'Task ',
    email: '2',
    password: 'Qwer1234', 
    repeatPassword: 'Qwer1234'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupName', 'Name is invalid');
  await registrationPopUp.checkErrorField('signupLastName', 'Last name is invalid');
  await registrationPopUp.checkErrorField('signupEmail', 'Email is incorrect');
});


test('Large possible length for Fields - Name; Last Name and Password', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'qwerqwerqwerqwerqwerW',
    lastName: 'qwerqwerqwerqwerqwerW',
    email: 'aqa-lolhawkeromg+test2@gmail.com',
    password: 'Qwer1234Qwer1234', 
    repeatPassword: 'Qwer1234Qwer1234'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupName', 'Name has to be from 2 to 20 characters long');
  await registrationPopUp.checkErrorField('signupLastName', 'Last name has to be from 2 to 20 characters long');
  await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});

test('Small possible length for Fields - Name; Last Name and Password', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'q',
    lastName: 'q',
    email: 'aqa-lolhawkeromg+test2@gmail.com',
    password: 'Qwer123', 
    repeatPassword: 'Qwer123'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupName', 'Name has to be from 2 to 20 characters long');
  await registrationPopUp.checkErrorField('signupLastName', 'Last name has to be from 2 to 20 characters long');
  await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});


test('Password without one integer number', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'Test',
    lastName: 'Task',
    email: 'aqa-lolhawkeromg+test2@gmail.com',
    password: 'Qwerasdf', 
    repeatPassword: 'Qwerasdf'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});


test('Password without one capital letter', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'Test',
    lastName: 'Task',
    email: 'aqa-lolhawkeromg+test2@gmail.com',
    password: 'qwerasdf1', 
    repeatPassword: 'qwerasdf1'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});


test('Password without one small letter', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'Test',
    lastName: 'Task',
    email: 'aqa-lolhawkeromg+test2@gmail.com',
    password: 'QWERASDF1', 
    repeatPassword: 'QWERASDF1'
  });

  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});


test('Re-enter Password should be the same as Password', async ({ page }) => {
  const registrationPopUp = new RegistrationPage(page);

  await registrationPopUp.open();
  
  await registrationPopUp.fillRegistrationForm({
    name: 'Test',
    lastName: 'Task',
    email: 'aqa-lolhawkeromg+test2@gmail.com',
    password: 'Qwer1234', 
    repeatPassword: 'Qwer4321'
  });

  await page.locator('#signupPassword').click();
  expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
  await registrationPopUp.checkErrorField('signupRepeatPassword', 'Passwords do not match');
});


// test('Successful registration', async ({ page }) => {
//   await page.goto(`${BASE_URL}/`);
//   await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
    
//   await page.fill('#signupName', 'Test');
//   await page.fill('#signupLastName', 'Task');
//   await page.fill('#signupEmail', `aqa-lolhawkeromg+test5@gmail.com`);
//   await page.fill('#signupPassword', 'Qwer1234');
//   await page.fill('#signupRepeatPassword', 'Qwer1234');
    
//   await page.click('text=Register');
    
//   await expect(page).toHaveURL(`https://qauto.forstudy.space/panel/garage`);
// });


// test('Empty Name', async ({ page }) => {
//   await page.goto(`${BASE_URL}/`);
//   await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
//   await page.click('#signupName');
//   await page.fill('#signupLastName', 'Task');
//   await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
//   await page.fill('#signupPassword', 'Qwer1234');
//   await page.fill('#signupRepeatPassword', 'Qwer1234');
  
//   await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
//   await expect(page.locator('.invalid-feedback')).toHaveText(`Name required`);

//   const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
//   console.log(`Колір тексту: ${color}`);
//   expect(color).toBe('rgb(220, 53, 69)');
// });


// test('Empty LastName', async ({ page }) => {
//   await page.goto(`${BASE_URL}/`);
//   await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
//   await page.fill('#signupName', 'Test');
//   await page.click('#signupLastName');
//   await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
//   await page.fill('#signupPassword', 'Qwer1234');
//   await page.fill('#signupRepeatPassword', 'Qwer1234');
  
//   await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
//   await expect(page.locator('.invalid-feedback')).toHaveText(`Last name required`);

//   const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
//   console.log(`Колір тексту: ${color}`);
//   expect(color).toBe('rgb(220, 53, 69)');
// });


// test('Empty Email', async ({ page }) => {
//   await page.goto(`${BASE_URL}/`);
//   await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
//   await page.fill('#signupName', 'Test');
//   await page.fill('#signupLastName', 'Task');
//   await page.click('#signupEmail');
//   await page.fill('#signupPassword', 'Qwer1234');
//   await page.fill('#signupRepeatPassword', 'Qwer1234');
  
//   await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
//   await expect(page.locator('.invalid-feedback')).toHaveText(`Email required`);

//   const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
//   console.log(`Колір тексту: ${color}`);
//   expect(color).toBe('rgb(220, 53, 69)');
// });


// test('Empty Password', async ({ page }) => {
//   await page.goto(`${BASE_URL}/`);
//   await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
//   await page.fill('#signupName', 'Test');
//   await page.fill('#signupLastName', 'Task');
//   await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
//   await page.click('#signupPassword');
//   await page.fill('#signupRepeatPassword', 'Qwer1234');
  
//   await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
//   await expect(page.locator('.invalid-feedback')).toHaveText(`Password required`);

//   const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
//   console.log(`Колір тексту: ${color}`);
//   expect(color).toBe('rgb(220, 53, 69)');
// });


// test('Empty Re-enter Password', async ({ page }) => {
//   await page.goto(`${BASE_URL}/`);
//   await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
//   await page.click('#signupRepeatPassword');
//   await page.fill('#signupName', 'Test');
//   await page.fill('#signupLastName', 'Task');
//   await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
//   await page.fill('#signupPassword', 'Qwer1234');
  
//   await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
//   await expect(page.locator('.invalid-feedback')).toHaveText(`Re-enter password required`);

//   const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
//   console.log(`Колір тексту: ${color}`);
//   expect(color).toBe('rgb(220, 53, 69)');
// });





// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
