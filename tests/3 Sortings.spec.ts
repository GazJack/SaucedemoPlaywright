const { test, expect } = require('@playwright/test');
const { login } = require('../fixtures/login');

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