import { BaseForm } from '../BaseForm.js';

export class RegistrationForm extends BaseForm {
    constructor(page) {
        super(page, '//*[contains(@class, "modal-title") and contains(., "Registration")]');
        this.firstNameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');
        this.registerBtn = page.getByRole('button', { name: /register/i });

        // Локатори для повідомлень
        this.alertMessage = page.locator('.alert-danger');
        this.errorMessage = page.locator('.invalid-feedback');
    }

    async fillFirstName(name) {
        await this.firstNameInput.fill(name);
    }

    async fillLastName(lastname) {
        await this.lastNameInput.fill(lastname);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async fillRepeatPassword(password) {
        await this.repeatPasswordInput.fill(password);
    }

    async clickRegisterBtn() {
        await this.registerBtn.click();
    }
}
