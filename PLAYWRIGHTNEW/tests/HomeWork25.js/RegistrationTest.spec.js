import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/POM/registration/HomePage.js';
import * as testData from '../const/RegistrationTestDate.json';

test.describe('Registration Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('positive registration test', async ({ page }) => {
        const homePage = new HomePage(page);
        const registrationForm = await homePage.clickSignUpBtn();

        const randomEmail = `aqa-tanyazdorenkoo+${Date.now()}@gmail.com`;
        await registrationForm.fillFirstName(testData.validUser.firstName);
        await registrationForm.fillLastName(testData.validUser.lastName);
        await registrationForm.fillEmail(randomEmail);
        await registrationForm.fillPassword('Qwerty123!');
        await registrationForm.fillRepeatPassword('Qwerty123!');
        await registrationForm.clickRegisterBtn();

        await expect(page.locator('h1')).toContainText('Garage');
    });

    test('user already exists', async ({ page }) => {
        const homePage = new HomePage(page);
        const registrationForm = await homePage.clickSignUpBtn();

        await registrationForm.fillFirstName(testData.existingUser.firstName);
        await registrationForm.fillLastName(testData.existingUser.lastName);
        await registrationForm.fillEmail(testData.existingUser.email);
        await registrationForm.fillPassword(testData.existingUser.password);
        await registrationForm.fillRepeatPassword(testData.existingUser.password);
        await registrationForm.clickRegisterBtn();

        await expect(registrationForm.alertMessage).toContainText('User already exists');
    });

    test('passwords do not match', async ({ page }) => {
        const homePage = new HomePage(page);
        const registrationForm = await homePage.clickSignUpBtn();

        await registrationForm.fillFirstName('Tetiana');
        await registrationForm.fillLastName('Zdorenko');
        await registrationForm.fillEmail('random+email@gmail.com');
        await registrationForm.fillPassword('Qwerty123!');
        await registrationForm.fillRepeatPassword('Qwerty123!1');
        await page.locator('#signupPassword').click();
        await expect(registrationForm.errorMessage).toContainText('Passwords do not match');
    });

    test('email is incorrect', async ({ page }) => {
        const homePage = new HomePage(page);
        const registrationForm = await homePage.clickSignUpBtn();

        await registrationForm.fillFirstName('Tetiana');
        await registrationForm.fillLastName('Zdorenko');
        await registrationForm.fillEmail('invalid-email');
        await registrationForm.fillPassword('123');

        await expect(registrationForm.errorMessage).toContainText('Email is incorrect');
    });

    test('password is too short', async ({ page }) => {
        const homePage = new HomePage(page);
        const registrationForm = await homePage.clickSignUpBtn();

        await registrationForm.fillFirstName('Tetiana');
        await registrationForm.fillLastName('Zdorenko');
        await registrationForm.fillEmail('aqa-tanyazdorenkoo+test123@gmail.com');
        await registrationForm.fillPassword('123');
        await registrationForm.fillRepeatPassword('Qwerty12dsge3!1');

        await expect(registrationForm.errorMessage).toContainText(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
    });
});
