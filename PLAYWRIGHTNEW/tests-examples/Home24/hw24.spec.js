// import { test, expect } from '@playwright/test';
import { test } from '../../src/fixtures/authorized';

test.describe('Login tests', () => {
    test.beforeEach(async ({ page, defaultitem }) => {
        await page.goto('/');
        console.log(defaultitem);
    });

    // Positive scenario
    test('positive login test', async ({ page }) => {
        await page.click('text=Sign Up');
        await page.locator('#signupName').fill('Tetiana');
        await page.locator('#signupLastName').fill('Zdorenko');
        await page.locator('#signupEmail').fill('tanyazdorenkoo+test123@gmail.com');
        await page.locator('#signupPassword').fill('Qwerty123!');
        await page.locator('#signupRepeatPassword').fill('Qwerty123!');
        await page.getByRole('button', { name: 'Register' }).click();
    });

    // Negative scenarios
    test('user already exists', async ({ page }) => {
        await page.click('text=Sign Up');
        await page.locator('#signupName').fill('Tetiana');
        await page.locator('#signupLastName').fill('Zdorenko');
        await page.locator('#signupEmail').fill('aqa-tanyazdorenkoo+test123@gmail.com');
        await page.locator('#signupPassword').fill('Qwerty123!');
        await page.locator('#signupRepeatPassword').fill('Qwerty123!');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('.alert')).toContainText('User already exists');
    });
    test('password do not match', async ({ page }) => {
        await page.click('text=Sign Up');
        await page.locator('#signupName').fill('Tetiana');
        await page.locator('#signupLastName').fill('Zdorenko');
        await page.locator('#signupEmail').fill('-aqa-tanyazdorenkoo+test123@gmail.com');
        await page.locator('#signupPassword').fill('Qwerty12dsge3!');
        await page.locator('#signupRepeatPassword').fill('Qwerty12dsge3!1');
        await page.locator('#signupPassword').click();
        await expect(page.locator('.invalid-feedback')).toContainText('Passwords do not match');
    });

    test('email is incorrect', async ({ page }) => {
        await page.click('text=Sign Up');
        await page.locator('#signupName').fill('Tetiana');
        await page.locator('#signupLastName').fill('Zdorenko');
        await page.locator('#signupEmail').fill('invalid-email');
        await page.locator('#signupPassword').fill('123');
        await expect(page.locator('.invalid-feedback')).toContainText('Email is incorrect');
    });

    test('password is too short', async ({ page }) => {
        await page.click('text=Sign Up');
        await page.locator('#signupName').fill('Tetiana');
        await page.locator('#signupLastName').fill('Zdorenko');
        await page.locator('#signupEmail').fill('aqa-tanyazdorenkoo+test123@gmail.com');
        await page.locator('#signupPassword').fill('123');
        await page.locator('#signupRepeatPassword').fill('Qwerty12dsge3!1');
        await expect(page.locator('.invalid-feedback')).toContainText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
    });
});
