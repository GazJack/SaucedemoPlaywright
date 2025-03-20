// tests/saucedemo.spec.js
const { test, expect } = require('@playwright/test');
const { login } = require('../fixtures/login');

// Test Case 1 – Login patikrinimai
test.describe('Test Case 1', () => {
  const users = [
    { username: "standard_user", password: "secret_sauce", shouldLogin: true },
    { username: "locked_out_user", password: "secret_sauce", shouldLogin: false, error: "Sorry, this user has been locked out." },
    { username: "problem_user", password: "secret_sauce", shouldLogin: true },
    { username: "performance_glitch_user", password: "secret_sauce", shouldLogin: true },
    { username: "error_user", password: "secret_sauce", shouldLogin: true },
    { username: "visual_user", password: "secret_sauce", shouldLogin: true }
  ];

  users.forEach(user => {
    test(`Login ${user.username}`, async ({ page }) => {
      await login(page, user.username, user.password);
      if (user.shouldLogin) {
        await expect(page).toHaveURL(/\/inventory\.html/);
      } else {
        const errorLocator = page.locator("[data-test='error']");
        await expect(errorLocator).toContainText(user.error);
      }
    });
  });

  test('Empty username and correct password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  test('Correct username and empty password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // Atkreipkite dėmesį – iš originalaus kodo buvo klaida: "standart_user" vietoje "standard_user"
    await page.fill('[data-test="username"]', 'standart_user');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  test('Empty username and password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });
});

// Test Case 2 – Prekių pridėjimas ir šalinimas iš krepšelio
test.describe('Test Case 2', () => {
  const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];
  
  users.forEach(user => {
    test(`Adding and removing items from the cart with user: ${user}`, async ({ page }) => {
      await login(page, user, 'secret_sauce');
      
      // Pridedame prekes į krepšelį
      await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
      await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
      await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
      await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
      await page.click('[data-test="add-to-cart-sauce-labs-onesie"]');
      await page.click('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
      
      // Patikriname, kad krepšelyje yra 6 prekės
      await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('6');
      
      // Šaliname prekes iš krepšelio
      await page.click('[data-test="remove-sauce-labs-backpack"]');
      await page.click('[data-test="remove-sauce-labs-bike-light"]');
      await page.click('[data-test="remove-sauce-labs-bolt-t-shirt"]');
      await page.click('[data-test="remove-sauce-labs-fleece-jacket"]');
      await page.click('[data-test="remove-sauce-labs-onesie"]');
      await page.click('[data-test="remove-test.allthethings()-t-shirt-(red)"]');
      
      // Krepšelis turi būti tuščias (t.y. neturėti teksto)
      await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('');
    });
  });
});

// Test Case 3 – Produktų filtravimas ir rūšiavimas
test.describe('Test Case 3', () => {
  const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];

  users.forEach(user => {
    test.describe(`Testing with user: ${user}`, () => {
      test.beforeEach(async ({ page }) => {
        await login(page, user, 'secret_sauce');
      });

      test('Filters and sorts products by name (A to Z)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'az');
        const names = await page.$$eval('.inventory_item_name', items =>
          items.map(item => item.innerText.trim())
        );
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sortedNames);
      });

      test('Filters and sorts products by name (Z to A)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'za');
        const names = await page.$$eval('.inventory_item_name', items =>
          items.map(item => item.innerText.trim())
        );
        const sortedNamesDesc = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(sortedNamesDesc);
      });

      test('Filters and sorts products by price (low to high)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'lohi');
        const prices = await page.$$eval('.inventory_item_price', items =>
          items.map(item => parseFloat(item.innerText.replace('$', '')))
        );
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
      });

      test('Filters and sorts products by price (high to low)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'hilo');
        const prices = await page.$$eval('.inventory_item_price', items =>
          items.map(item => parseFloat(item.innerText.replace('$', '')))
        );
        const sortedPricesDesc = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPricesDesc);
      });
    });
  });
});

// Test Case 4 – Pirkimo procesas
  const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];

  test.describe('Test Case 4', () => {
  users.forEach(user => {
    test.describe(`Testing with user: ${user}`, () => {
      test.beforeEach(async ({ page }) => {
        await login(page, user, 'secret_sauce');
      });

      test('Purchasing', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="shopping-cart-link"]');
        await page.click('[data-test="checkout"]');
        await page.fill('[data-test="firstName"]', 'Zebrė');
        await page.fill('[data-test="lastName"]', 'Zebrauskė');
        await page.fill('[data-test="postalCode"]', '92317');
        await page.click('[data-test="continue"]');
        await expect(page.locator('[data-test="checkout-summary-container"]')).toBeVisible();
        await page.click('[data-test="finish"]');
        await expect(page.locator('[data-test="checkout-complete-container"]')).toBeVisible();
      });
    });
  });
});

// Test Case 5 – Logout funkcionalumas
  const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];

  test.describe('Test Case 5', () => {
  users.forEach(user => {
    test.describe(`Logout with user: ${user}`, () => {
      test.beforeEach(async ({ page }) => {
        await login(page, user, 'secret_sauce');
      });

      test('Logout', async ({ page }) => {
        await page.click('#react-burger-menu-btn');
        await page.click('[data-test="logout-sidebar-link"]');
        await expect(page.locator('[data-test="login-container"]')).toBeVisible();
      });
    });
  });
});
