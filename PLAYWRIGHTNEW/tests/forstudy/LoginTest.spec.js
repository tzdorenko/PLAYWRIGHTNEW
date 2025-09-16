import { test } from '@playwright/test';
import { DashboardPage } from '../../src/POM/DashboardPage.js';
import * as loginTestData from '../const/loginTestData.json';

loginTestData.tests.forEach((testData) => {
    test('Login test', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.visit();

        const loginForm = await dashboardPage.clickSignInBtn();
        await loginForm.isVisible();

        await loginForm.fillEmailInput(testData.email);
        await loginForm.fillPasswordInput(testData.password);

        const garagePage = await loginForm.clickLoginBtn();
        await garagePage.isVisible();
    });
});
