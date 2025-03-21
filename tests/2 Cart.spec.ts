import { test, expect } from '@playwright/test';
import { login } from '../fixtures/login';

const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];
  
  test.describe('Test Case 2', () => {
    users.forEach(user => {
      test(`Adding and removing items from the cart with user: ${user}`, async ({ page }) => {
        await login(page, user, 'secret_sauce');
        
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        await page.click('[data-test="add-to-cart-sauce-labs-onesie"]');
        await page.click('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');

        await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('6');

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
        await page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
       
        await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('');
         })
      });
    });

