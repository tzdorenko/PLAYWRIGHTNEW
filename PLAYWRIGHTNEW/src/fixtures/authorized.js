import { test as base } from '@playwright/test';

export const test = base.extend({
    defaultItem: { someArray: ['Do stuff', { option: true }] },

     tests: {
        email: "tanyazdorenkoo+user@gmail.com",
        password: "ValidPass1"
    }
    authorized: async({request, tests}) => {
        await request.fetch('https://qauto.forstudy.space/api/auth/login',  {
            method: 'POST',
            headers: {
                'content-type': application/json,
            'accept': 'application/json, text/plain, */*'         
          },
            data: tests
        });

        await use({authorized}) => {
            const garagePage = new GaragePage(authorized);
            await garagePage.visit();
            await use(garagePage);
    },   


    garagePage: async ({ page, defaultItem }, use) => {
    }
});
