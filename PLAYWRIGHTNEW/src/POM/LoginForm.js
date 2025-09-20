import { BaseForm } from './BaseForm.js';
import { GaragePage } from './GaragePage.js';

export class LoginForm extends BaseForm {
    constructor(page) {
        super(page, '//*[contains(@class, "modal-title") and contains(., "Log in")]');
        this.emailInput = page.locator('#signinEmail');
        this.passwordInput = page.locator('#signinPassword');
        this.loginBtn = page.getByRole('button', { name: /login/i });
    }

    async fillEmailInput(email) {
        await this.emailInput.fill(email);
    }

    async fillPasswordInput(password) {
        await this.passwordInput.fill(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.waitFor({ state: 'visible' });
        await this.loginBtn.click();
        return new GaragePage(this._page);
    }
}
