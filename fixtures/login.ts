import { test, expect } from '@playwright/test';

export async function homePage(page) {
  await page.goto('https://www.saucedemo.com/');
  const logo = page.locator('.login_logo', { hasText: 'Swag Labs' });
  await expect(logo).toBeVisible();
}

export async function login(page, username, password) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await page.waitForSelector('[data-test="title"]', { state: 'visible' });
}

