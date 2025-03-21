import { test, expect } from '@playwright/test';
import { login } from '../fixtures/login';

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

