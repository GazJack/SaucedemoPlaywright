import { test, expect } from '@playwright/test';
import { login } from '../fixtures/login';

const users = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user'
];

test.describe('Test Case 3', () => {
  users.forEach(user => {
    test.describe(`Testing with user: ${user}`, () => {
      test.beforeEach(async ({ page }) => {
        await login(page, user, 'secret_sauce');
      });

      test('Filters and sorts products by name (A to Z)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'az');
        const names = await page.$$eval('.inventory_item_name', items =>
          items.map(item => (item as HTMLElement).innerText.trim())
        );
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sortedNames);
      });

      test('Filters and sorts products by name (Z to A)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'za');
        const names = await page.$$eval('.inventory_item_name', items =>
          items.map(item => (item as HTMLElement).innerText.trim())
        );
        const sortedNamesDesc = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(sortedNamesDesc);
      });

      test('Filters and sorts products by price (low to high)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'lohi');
        const prices = await page.$$eval('.inventory_item_price', items =>
          items.map(item => parseFloat((item as HTMLElement).innerText.replace('$', '')))
        );
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
      });

      test('Filters and sorts products by price (high to low)', async ({ page }) => {
        await page.selectOption('[data-test="product-sort-container"]', 'hilo');
        const prices = await page.$$eval('.inventory_item_price', items =>
          items.map(item => parseFloat((item as HTMLElement).innerText.replace('$', '')))
        );
        const sortedPricesDesc = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPricesDesc);
      });
    });
  });
});