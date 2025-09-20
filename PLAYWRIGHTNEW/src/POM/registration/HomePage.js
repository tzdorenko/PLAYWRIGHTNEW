import { BaseForm } from '../BaseForm.js';
import { RegistrationForm } from './RegistrationForm.js';

export class HomePage extends BaseForm {
    constructor(page) {
        super(page, '//h1[contains(., "Do more")]');
        this.signUpBtn = this._page.getByText('Sign Up');
    }

    async clickSignUpBtn() {
        await this.signUpBtn.click();
        return new RegistrationForm(this._page);
    }
}
