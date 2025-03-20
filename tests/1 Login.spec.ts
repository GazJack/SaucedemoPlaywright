const { test, expect } = require('@playwright/test');
const { login } = require('../fixtures/login');

test.describe("Test Case 1", () => {
    const users = [
      { username: "standard_user", password: "secret_sauce", shouldLogin: true },
      { username: "locked_out_user", password: "secret_sauce", shouldLogin: false, error: "Sorry, this user has been locked out." },
      { username: "problem_user", password: "secret_sauce", shouldLogin: true },
      { username: "performance_glitch_user", password: "secret_sauce", shouldLogin: true },
      { username: "error_user", password: "secret_sauce", shouldLogin: true },
      { username: "visual_user", password: "secret_sauce", shouldLogin: true }
    ]

    users.forEach(user => {
      test(`Login  ${user.username}`, async ({ page }) => {
        await login(page, user.username, user.password);
        if (user.shouldLogin) {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        } else {
          const errorLocator = page.locator('[data-test="error"]');
            await expect(errorLocator).toContainText(user.error);
        };
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
        await page.fill('[data-test="username"]', 'standard_user');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="title]')).toBeVisible();
    });

    test('Empty username and password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="title"]')).toBeVisible();
    });
  });
  
  