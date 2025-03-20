const { test, expect } = require('@playwright/test');
const { login } = require('../fixtures/login');

const users = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
];

test.describe('Test case 5', () => {
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

