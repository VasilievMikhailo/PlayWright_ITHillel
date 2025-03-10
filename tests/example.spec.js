import { test, expect } from '@playwright/test';
// import { RegistrationPage } from '../pages/RegistrationPage';

const BASE_URL = 'https://guest:welcome2qauto@qauto.forstudy.space';


test('Successful registration', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
    
  await page.fill('#signupName', 'Test');
  await page.fill('#signupLastName', 'Task');
  await page.fill('#signupEmail', `aqa-lolhawkeromg+test4@gmail.com`);
  await page.fill('#signupPassword', 'Qwer1234');
  await page.fill('#signupRepeatPassword', 'Qwer1234');
    
  await page.click('text=Register');
    
  await expect(page).toHaveURL(`https://qauto.forstudy.space/panel/garage`);
});


test('Empty Name', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
  await page.click('#signupName');
  await page.fill('#signupLastName', 'Task');
  await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
  await page.fill('#signupPassword', 'Qwer1234');
  await page.fill('#signupRepeatPassword', 'Qwer1234');
  
  await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
  await expect(page.locator('.invalid-feedback')).toHaveText(`Name required`);

  const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
  console.log(`Колір тексту: ${color}`);
  expect(color).toBe('rgb(220, 53, 69)');
});


test('Empty LastName', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
  await page.fill('#signupName', 'Test');
  await page.click('#signupLastName');
  await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
  await page.fill('#signupPassword', 'Qwer1234');
  await page.fill('#signupRepeatPassword', 'Qwer1234');
  
  await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
  await expect(page.locator('.invalid-feedback')).toHaveText(`Last name required`);

  const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
  console.log(`Колір тексту: ${color}`);
  expect(color).toBe('rgb(220, 53, 69)');
});


test('Empty Email', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
  await page.fill('#signupName', 'Test');
  await page.fill('#signupLastName', 'Task');
  await page.click('#signupEmail');
  await page.fill('#signupPassword', 'Qwer1234');
  await page.fill('#signupRepeatPassword', 'Qwer1234');
  
  await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
  await expect(page.locator('.invalid-feedback')).toHaveText(`Email required`);

  const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
  console.log(`Колір тексту: ${color}`);
  expect(color).toBe('rgb(220, 53, 69)');
});


test('Empty Password', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
  await page.fill('#signupName', 'Test');
  await page.fill('#signupLastName', 'Task');
  await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
  await page.click('#signupPassword');
  await page.fill('#signupRepeatPassword', 'Qwer1234');
  
  await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
  await expect(page.locator('.invalid-feedback')).toHaveText(`Password required`);

  const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
  console.log(`Колір тексту: ${color}`);
  expect(color).toBe('rgb(220, 53, 69)');
});


test('Empty Re-enter Password', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.locator('.hero-descriptor_btn.btn.btn-primary').click();
  
  await page.click('#signupRepeatPassword');
  await page.fill('#signupName', 'Test');
  await page.fill('#signupLastName', 'Task');
  await page.fill('#signupEmail', `aqa-lolhawkeromg+test2@gmail.com`);
  await page.fill('#signupPassword', 'Qwer1234');
  
  await page.locator('.btn.btn-primary').getByText('Register').isDisabled();
  
  await expect(page.locator('.invalid-feedback')).toHaveText(`Re-enter password required`);

  const color = await page.locator('.invalid-feedback').evaluate(el => getComputedStyle(el).color);
  console.log(`Колір тексту: ${color}`);
  expect(color).toBe('rgb(220, 53, 69)');
});


// test('Empty Name', async ({ page }) => {
//   const registrationPage = new RegistrationPage(page);

//   await registrationPage.open();
  
//   await registrationPage.fillRegistrationForm({
//     lastName: 'Task',
//     email: 'aqa-lolhawkeromg+test2@gmail.com',
//     password: 'Qwer1234',
//     repeatPassword: 'Qwer1234'
//   });

//   expect(await registrationPage.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPage.checkNameError('Name required');
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
