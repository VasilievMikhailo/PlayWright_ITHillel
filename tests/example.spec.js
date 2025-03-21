// import { test, expect } from './fixtures';
// import { test } from '@playwright/test';
// import { LogInPage } from '../Pages/LoginPage';
import dotenv from 'dotenv';
// import { test, expect } from '@playwright/test';
import { test, expect, request } from '@playwright/test';

dotenv.config();

test('POST to ADD a car, GET car by ID, DELETE the car by ID, DELETE again (negative case), and GET again (negative case)', async ({ page }) => {
  await page.goto(process.env.BASE_URL);

  await page.locator('.btn.btn-outline-white.header_signin').click();
  await page.locator('#signinEmail').fill(process.env.EMAIL_LOGIN);
  await page.locator('#signinPassword').fill(process.env.PASSWORD_LOGIN);
  await page.locator('.btn.btn-primary:has-text("Login")').click();

  console.log("Авторизация успешна");

  await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

  const cookies = await page.context().cookies();
  const sidCookie = cookies.find(cookie => cookie.name === 'sid');

  if (!sidCookie) {
    throw new Error('Ошибка: Токен не найден в cookies!');
  }

  const expires = sidCookie.expires || 0;
  const httpOnly = sidCookie.httpOnly !== undefined ? sidCookie.httpOnly : true;
  const secure = sidCookie.secure !== undefined ? sidCookie.secure : true;
  const sameSite = sidCookie.sameSite || 'Lax';

  const client = await request.newContext({
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    },
    storageState: {
      cookies: [{
        name: 'sid',
        value: sidCookie.value,
        domain: 'qauto.forstudy.space',
        path: '/',
        expires: expires,
        httpOnly: httpOnly,
        secure: secure,
        sameSite: sameSite
      }]
    }
  });

  // 1. Создаем машину (POST)
  const postResponse = await client.post('https://qauto.forstudy.space/api/cars', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "carBrandId": 1,
      "carModelId": 1,
      "mileage": 122
    }
  });

  console.log('POST Response status:', postResponse.status());
  const postResponseBody = await postResponse.json();
  console.log('POST Response body:', postResponseBody);

  const carId = postResponseBody.data.id;
  expect(carId).toBeDefined();
  console.log('ID созданной машины (POST):', carId);

  // 2. Получаем машину по ID (GET)
  const getResponse = await client.get(`https://qauto.forstudy.space/api/cars/${carId}`);

  console.log('GET Response status:', getResponse.status());
  const getResponseBody = await getResponse.json();
  console.log('GET Response body:', getResponseBody);

  expect(getResponse.status()).toBe(200);

  expect(getResponseBody.data.id).toBe(carId);
  expect(getResponseBody.data.carBrandId).toBe(1);
  expect(getResponseBody.data.carModelId).toBe(1);
  expect(getResponseBody.data.mileage).toBe(122);

  // 3. Удаляем машину по ID (DELETE)
  const deleteResponse = await client.delete(`https://qauto.forstudy.space/api/cars/${carId}`);

  console.log('DELETE Response status:', deleteResponse.status());
  const deleteResponseBody = await deleteResponse.json();
  console.log('DELETE Response body:', deleteResponseBody);

  expect(deleteResponse.status()).toBe(200);

  // 4. Попытка удалить машину повторно (негативный кейс)
  const deleteAgainResponse = await client.delete(`https://qauto.forstudy.space/api/cars/${carId}`);

  console.log('DELETE Again Response status:', deleteAgainResponse.status());
  const deleteAgainResponseBody = await deleteAgainResponse.json();
  console.log('DELETE Again Response body:', deleteAgainResponseBody);

  expect(deleteAgainResponse.status()).toBe(404);

  // 5. Проверяем, что машина больше не существует, делаем GET запрос после удаления
  const getAfterDeleteResponse = await client.get(`https://qauto.forstudy.space/api/cars/${carId}`);

  console.log('GET After DELETE Response status:', getAfterDeleteResponse.status());
  const getAfterDeleteResponseBody = await getAfterDeleteResponse.json();
  console.log('GET After DELETE Response body:', getAfterDeleteResponseBody);

  expect(getAfterDeleteResponse.status()).toBe(404);
});


// test('POST to ADD a car', async ({ page }) => {
//   await page.goto(process.env.BASE_URL);

//   await page.locator('.btn.btn-outline-white.header_signin').click();
//   await page.locator('#signinEmail').fill(process.env.EMAIL_LOGIN);
//   await page.locator('#signinPassword').fill(process.env.PASSWORD_LOGIN);
//   await page.locator('.btn.btn-primary:has-text("Login")').click();

//   console.log("Авторизация успешна");

//   // await page.locator('.btn.btn-primary:has-text("Add car")').click();

//   // Ожидаем редирект на страницу профиля
//   await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

//   const localStorageData = await page.evaluate(() => Object.assign({}, localStorage));
//   console.log('Local Storage Data:', localStorageData);

//   const sessionStorageData = await page.evaluate(() => Object.assign({}, sessionStorage));
//   console.log('Session Storage Data:', sessionStorageData);

//   const cookies = await page.context().cookies();
//   console.log('Cookies:', cookies);

//   const sidCookie = cookies.find(cookie => cookie.name === 'sid');

//   if (!sidCookie) {
//     throw new Error('Ошибка: Токен не найден в cookies!');
//   }
  
//   // Устанавливаем expires в 0 или какой-то другой подходящий момент
//   const expires = sidCookie.expires || 0;
  
//   // Устанавливаем httpOnly, если оно отсутствует
//   const httpOnly = sidCookie.httpOnly !== undefined ? sidCookie.httpOnly : true;  // Предполагаем, что cookie httpOnly должно быть true
  
//   // Устанавливаем secure, если оно отсутствует
//   const secure = sidCookie.secure !== undefined ? sidCookie.secure : true;  // Предполагаем, что cookie secure должно быть true, если используем HTTPS
  
//   // Устанавливаем sameSite, если оно отсутствует
//   const sameSite = sidCookie.sameSite || 'Lax';  // Предполагаем, что sameSite должно быть 'Lax' по умолчанию
  
//   const client = await request.newContext({
//     extraHTTPHeaders: {
//       'Content-Type': 'application/json'
//     },
//     storageState: {
//       cookies: [{
//         name: 'sid',
//         value: sidCookie.value,
//         domain: 'qauto.forstudy.space',
//         path: '/',
//         expires: expires,
//         httpOnly: httpOnly,
//         secure: secure,
//         sameSite: sameSite  // добавляем sameSite
//       }]
//     }
//   });
  

//   const response = await client.post('https://qauto.forstudy.space/api/cars', {
//     headers: {
//       'Content-Type': 'application/json',  // Указываем тип контента
//     },
//     data: JSON.stringify({
//       "carBrandId": 1,  // Идентификатор бренда
//       "carModelId": 1,  // Идентификатор модели
//       "mileage": 122
//     })
//   });
  
//   console.log('Response status:', response.status());
//   console.log('Response body:', await response.json());
  
//   expect(response.status()).toBe(201);
// });



// test('GET car by ID', async ({ page }) => {
//   await page.goto(process.env.BASE_URL);

//   await page.locator('.btn.btn-outline-white.header_signin').click();
//   await page.locator('#signinEmail').fill(process.env.EMAIL_LOGIN);
//   await page.locator('#signinPassword').fill(process.env.PASSWORD_LOGIN);
//   await page.locator('.btn.btn-primary:has-text("Login")').click();

//   console.log("Авторизация успешна");

//   // await page.locator('.btn.btn-primary:has-text("Add car")').click();

//   await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

//   const localStorageData = await page.evaluate(() => Object.assign({}, localStorage));
//   console.log('Local Storage Data:', localStorageData);

//   const sessionStorageData = await page.evaluate(() => Object.assign({}, sessionStorage));
//   console.log('Session Storage Data:', sessionStorageData);

//   const cookies = await page.context().cookies();
//   console.log('Cookies:', cookies);

//   const sidCookie = cookies.find(cookie => cookie.name === 'sid');

//   if (!sidCookie) {
//     throw new Error('Ошибка: Токен не найден в cookies!');
//   }
  
//   const expires = sidCookie.expires || 0;
  
//   const httpOnly = sidCookie.httpOnly !== undefined ? sidCookie.httpOnly : true; 
  
//   const secure = sidCookie.secure !== undefined ? sidCookie.secure : true; 
  
//   const sameSite = sidCookie.sameSite || 'Lax'; 
  
//   const client = await request.newContext({
//     extraHTTPHeaders: {
//       'Content-Type': 'application/json'
//     },
//     storageState: {
//       cookies: [{
//         name: 'sid',
//         value: sidCookie.value,
//         domain: 'qauto.forstudy.space',
//         path: '/',
//         expires: expires,
//         httpOnly: httpOnly,
//         secure: secure,
//         sameSite: sameSite  // добавляем sameSite
//       }]
//     }
//   });
  

//   const response = await client.get('https://qauto.forstudy.space/api/cars/300893', {
//     body: JSON.stringify({
//       "id": 300893,
//       // "carBrandId": 1, 
//       // "carModelId": 1,  
//       // "mileage": 122
//     })
//   });
  
//   console.log('Response status:', response.status());
//   console.log('Response body:', await response.json());
  
//   expect(response.status()).toBe(200);
// });

test('Перевірка підміни response body на сторінці профілю', async ({ page }) => {

  await page.route('https://qauto.forstudy.space/api/users/profile', async (route) => {
    const originalResponse = await route.fetch();
    let json = await originalResponse.json();


    json.data.userId = 99999;
    json.data.name = "Inspector";
    json.data.lastName = "Request";

    console.log('Modified Response:', json);


    await route.fulfill({
        status: originalResponse.status(),
        contentType: 'application/json',
        body: JSON.stringify(json),
        headers: { 'Cache-Control': 'no-store' }
    });
  });

  await page.goto(process.env.BASE_URL);

  await page.locator('.btn.btn-outline-white.header_signin').click();
  await page.locator('#signinEmail').fill(process.env.EMAIL_LOGIN);
  await page.locator('#signinPassword').fill(process.env.PASSWORD_LOGIN);
  await page.locator('.btn.btn-primary:has-text("Login")').click();
    

  await page.locator('a[class*="btn-sidebar"]:has-text("Profile")').click();

  await expect(page.locator('.profile_name.display-4')).toHaveText('Inspector Request');
});


// test('LogIn on main page', async ({ page }) => {

//   const loginPopUp = new LogInPage(page);

//   await loginPopUp.openLogInPopUp();

//   await loginPopUp.fillLogInPage({
//     email:  process.env.EMAIL_LOGIN,
//     password: process.env.PASSWORD_LOGIN,
//   });

//   console.log('Login button enabled:', await loginPopUp.isLogInButtonEnabled());

//   // expect(await loginPopUp.isLogInButtonEnabled()).toBeTruthy();

//   await loginPopUp.clickLogInButton();

//   await loginPopUp.saveAuthStorage();
// });

// test('User can see their garage page', async ({ userGaragePage }) => {
//   const loginPopUp = new LogInPage(userGaragePage);

//   await loginPopUp.checkGaragePage();
// });

// const BASE_URL = 'https://guest:welcome2qauto@qauto.forstudy.space';


// test('Invalid values for Fields - Name; Last Name', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'Проверка',
//     lastName: 'на язык',
//     email: 'aqa-lolhawkeromg+test@gmail.com',
//     password: 'Qwer1234', 
//     repeatPassword: 'Qwer1234'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupName', 'Name is invalid');
//   await registrationPopUp.checkErrorField('signupLastName', 'Last name is invalid');
// });

// test('Invalid values as numbers for Fields - Name; Last Name and Email', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: '1',
//     lastName: '1',
//     email: '2',
//     password: 'Qwer1234', 
//     repeatPassword: 'Qwer1234'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupName', 'Name is invalidName has to be from 2 to 20 characters long');
//   await registrationPopUp.checkErrorField('signupLastName', 'Last name is invalidLast name has to be from 2 to 20 characters long');
//   await registrationPopUp.checkErrorField('signupEmail', 'Email is incorrect');
// });


// test('Ignoring SPACE in Fields - Name; Last Name', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'Test ',
//     lastName: 'Task ',
//     email: '2',
//     password: 'Qwer1234', 
//     repeatPassword: 'Qwer1234'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupName', 'Name is invalid');
//   await registrationPopUp.checkErrorField('signupLastName', 'Last name is invalid');
//   await registrationPopUp.checkErrorField('signupEmail', 'Email is incorrect');
// });


// test('Large possible length for Fields - Name; Last Name and Password', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'qwerqwerqwerqwerqwerW',
//     lastName: 'qwerqwerqwerqwerqwerW',
//     email: 'aqa-lolhawkeromg+test2@gmail.com',
//     password: 'Qwer1234Qwer1234', 
//     repeatPassword: 'Qwer1234Qwer1234'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupName', 'Name has to be from 2 to 20 characters long');
//   await registrationPopUp.checkErrorField('signupLastName', 'Last name has to be from 2 to 20 characters long');
//   await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
// });

// test('Small possible length for Fields - Name; Last Name and Password', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'q',
//     lastName: 'q',
//     email: 'aqa-lolhawkeromg+test2@gmail.com',
//     password: 'Qwer123', 
//     repeatPassword: 'Qwer123'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupName', 'Name has to be from 2 to 20 characters long');
//   await registrationPopUp.checkErrorField('signupLastName', 'Last name has to be from 2 to 20 characters long');
//   await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
// });


// test('Password without one integer number', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'Test',
//     lastName: 'Task',
//     email: 'aqa-lolhawkeromg+test2@gmail.com',
//     password: 'Qwerasdf', 
//     repeatPassword: 'Qwerasdf'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
// });


// test('Password without one capital letter', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'Test',
//     lastName: 'Task',
//     email: 'aqa-lolhawkeromg+test2@gmail.com',
//     password: 'qwerasdf1', 
//     repeatPassword: 'qwerasdf1'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
// });


// test('Password without one small letter', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'Test',
//     lastName: 'Task',
//     email: 'aqa-lolhawkeromg+test2@gmail.com',
//     password: 'QWERASDF1', 
//     repeatPassword: 'QWERASDF1'
//   });

//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupPassword', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
// });


// test('Re-enter Password should be the same as Password', async ({ page }) => {
//   const registrationPopUp = new RegistrationPage(page);

//   await registrationPopUp.open();
  
//   await registrationPopUp.fillRegistrationForm({
//     name: 'Test',
//     lastName: 'Task',
//     email: 'aqa-lolhawkeromg+test2@gmail.com',
//     password: 'Qwer1234', 
//     repeatPassword: 'Qwer4321'
//   });

//   await page.locator('#signupPassword').click();
//   expect(await registrationPopUp.isRegisterButtonDisabled()).toBeTruthy();
//   await registrationPopUp.checkErrorField('signupRepeatPassword', 'Passwords do not match');
// });


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
