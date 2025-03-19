import { test, expect } from '@playwright/test';

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
        await page.goto('https://saucedemo.com/');
        await page.fill('[data-test="username"]', user.username);
        await page.fill('[data-test="password"]', user.password);
        await page.click('[data-test="login-button"]');
        if (user.shouldLogin) {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        } else {
            await expect(page.locator('[data-test="error]')).toHaveText('user.error');
        };
      });
    });

    test('Empty username and correct password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveTitle('[data-test="title"]');
    });

    test('Correct username and empty password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('[data-test="username"]', 'standart_user');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveTitle('[data-test="title]');
    });

    test('Empty username and password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL('[data-test="title"]');
    });
  
  